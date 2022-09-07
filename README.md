# Welcome to Codeverter!

Codeverter is a tool to convert a TypeScript source file (*.ts) into differents languages (**go** or **c#** by the moment).

|Build status|Tests status|
|-|-|
|[![Codeverter Build](https://github.com/southworks/codeverter/actions/workflows/build.js.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/build.js.yml)|[![Codeverter tests](https://github.com/southworks/codeverter/actions/workflows/tests.js.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/tests.js.yml)|

# Installing

## NPM

### Public registry

`npm install -g codeverter`

### Locally

```
cd ./path-to-codeverter
npm install -g
```

# Building

### Prerequisites

- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://www.npmjs.com/get-npm)

### Dependencies

In order to build the project you must install the required dependencies by running the following command `npm install`

### Compilation

The project is written in TypeScript so you need to call the **tsc** compiler. To start the compilation process use the command `npm run build` once finished you will have all the final JavaScript files at **./out** folder.

### Testing

To run the available test suites run the command `npm test`
- The test framework is [Jest](https://jestjs.io/) so you can use any flag you want. For example: `npm test -- -t "constant"`

# Usage

## Command 'cdv'

`cdv` is the command to execute the tool

For example:
`cdv --src xxx --lang zzz --dest yyy <path>`

### Args

`--src`: Path to the source file or directory.
- Default value: _._

`--lang`: Target language. 
- Values: **csharp** | **go** 
- Default value: _go_

`--dest`: Destination

- Values: **console** | **file**
- - file has an extra parameter \<destination path>
- Default value: _console_

# Support

## Constants/Variables

#### Examples

|TS|C#|GO|
|-|-|-|
|`const  CONST_VALUE: string = "THIS IS A CONSTANT";`|`public const string CONST_VALUE = "THIS IS A CONSTANT";`|`const CONST_VALUE string = "THIS IS A CONSTANT"`|
|`let  foo: number = 50;`|`public static int Foo = 50;`|`var Foo int = 50`
|`var  foo: number = 50;`|`public static int Foo = 50;`|`var Foo int = 50`|

- In C# those are wrapped into a static class

```csharp
namespace xxx
{
    public static class Helper
    {
        public static int Foo = 50;
    }
}
```

#### Support

||C#|GO|
|-|-|-|
|Global|Y|Y|
|Function/Constructor body|Y|Y|

## Enums

#### Examples

|TS|C#|GO|
|-|-|-|
|<pre><code>export enum Animals {<div>  Dog = 1,</div><div>  Cat = 2</div>}</code></pre>|<pre><code>public enum Animals<div>{</div><div>  Dog = 1,</div><div>  Cat = 2</div>}</code></pre>|<pre><code>const (<div>  Dog int = 1</div><div>  Cat = 2</div>)</code></pre>
|<pre><code>export enum Animals {<div>  Dog = "dog",</div><div>  Cat = "cat"</div>}</code></pre>|<pre><code>public enum Animals<div>{</div><div>  Dog = "dog",</div><div>  Cat = "cat"</div>}</code></pre>|<pre><code>const (<div>  Dog string = "dog"</div><div>  Cat = "cat"</div>)</code></pre>|
|<pre><code>export enum Animals {<div>  Dog,</div><div>  Cat</div>}</code></pre>|<pre><code>public enum Animals {<div>  Dog,</div><div>  Cat</div>}</code></pre>|<pre><code>const (<div>  Dog int = iota</div><div>  Cat</div>)</code></pre>|

#### Support

||C#|GO|
|-|-|-|
|Numeric|Y|Y|
|String|Y|Y|
|Implicit|Y*|Y*|

_*pending_

## Interfaces

#### Examples

|TS|C#|GO|
|-|-|-|
|<pre><code>export interface Printable {<div>  content: string;</div><div>  doPrint(): void;</div>}</code></pre>|<pre><code>public interface IPrintable<div>{</div><div>  public string Content { get; set; }</div><div>  public void ();</div>}</code></pre>|<pre><code>type Printable interface {<div>  DoPrint()</div>}</code></pre>|

#### Support

||C#|GO|
|-|-|-|
|Members|Y|N|
|Method/Functions|Y|Y|
|Inheritance|Y|N|
|Implementation|Y|Y|

## Classes

#### Support

||C#|GO|
|-|-|-|
|Inheritance|Y|Y*|
|Interfaces|Y|Y|
|Visibility|Y|Y**|
|Static|P|P|

_*In a go way, using composition_
_\*\*Using naming conventions_

### Constructors

#### Examples

Consider a class named **Cat**
|TS|C#|GO|
|-|-|-|
|<pre><code>constructor(arg: number) {<div>  /\*content*/</div>}</code></pre>|<pre><code>public Cat(int arg)<div>{</div><div>  // /\*content*/</div>}</code></pre>|<pre><code>func NewCat(arg int) *Cat {<div>  c := Cat{}</div><div>  // /\*content*/</div><div>  return &c</div>}</code></pre>|

#### Support

||C#|GO|
|-|-|-|
|Visibility|Y|N|
|Parameters|Y|Y|
|Body|AS COMMENT|AS COMMENT|

### Properties

#### Examples

|TS|C#|GO|
|-|-|-|
|`public name: string;`|`public string Name { get; set; }`|`Name string`|
|`protected name: string;`|`protected string Name { get; set; }`|`name string`|
|`private name: string;`|`private string Name { get; set; }`|`name string`|

#### Support

||C#|GO|
|-|-|-|
|Visibility|Y|Y*|

_*Naming convention for pubic or private, protected is considered private_

### Methods/Functions

#### Examples

|TS|C#|GO|
|-|-|-|
|<pre><code>public  foo(): void {<div>  /* a lot of work! */ </div>}</code></pre>|<pre><code>public void Foo()<div>{</div><div>  ///\* a lot of work! */</div><div>  return;</div>}</code></pre>|<pre><code>func (f *Cat) Foo() {<div>  ///\* a lot of work! */</div><div>  return</div>}</code></pre>|

#### Support

||C#|GO|
|-|-|-|
|Visibility|Y|Y*|
|Parameters|Y|Y|
|Return type|Y|Y|
|Default return value|Y|Y|

_*Naming convention for pubic or private, protected is considered private_
