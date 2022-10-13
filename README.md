<div align="center">

# Welcome to Codeverter!

Codeverter is a tool to convert a TypeScript source file (*.ts) into different languages (**go**, **c#** or **Visual Basic** by the moment).

![](.github/sample.png?raw=true)


[![Codeverter Build](https://github.com/southworks/codeverter/actions/workflows/build.js.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/build.js.yml)
[![Codeverter tests](https://github.com/southworks/codeverter/actions/workflows/tests.js.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/tests.js.yml)
[![Codeverter Playground](https://github.com/southworks/codeverter/actions/workflows/pages.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/pages.yml)
[![NPM](https://img.shields.io/npm/v/@southworks/codeverter.svg?logo=npm&logoColor=fff&label=NPM+package&color=limegreen)](https://www.npmjs.com/package/@southworks/codeverter)
[![GH Package](https://github.com/southworks/codeverter/actions/workflows/publish-gh-package.yml/badge.svg)](https://github.com/southworks/codeverter/actions/workflows/publish-gh-package.yml)
</div>
<br />

# Playground

If you want to try it, [click here!](https://southworks.github.io/codeverter)

# Installing

## NPM

### Public registry

`npm install -g @southworks/codeverter`

### Locally

```
cd ./path-to-codeverter
npm run build:prod
npm install -g
```

# Building

### Prerequisites

- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager](https://www.npmjs.com/get-npm)

### Dependencies

In order to build the project you must install the required dependencies by running the following command `npm install`

### Compilation

The project is written in TypeScript so you need to call the **tsc** compiler. To start the compilation process use the command `npm run build` once finished you will have all the final JavaScript files at **./out** folder.

For production use the command `npm run build:prod`

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
- Values: **csharp** | **go** | **vb** 
- Default value: _go_

`--template`: Custom template to perform the transformation. The extension must be '.t' followed by the language extension, for example: csharp => .tcs.
- Values: **Path to the custom tempate** 
- Default value: _''_

`--dest`: Destination
- Values: **console** | **file**
- - file has an extra parameter \<destination path>
- Default value: _console_

# Support

## Constants/Variables

#### Examples

|TS|C#|GO|Visual Basic
|-|-|-|-|
|`const  CONST_VALUE: string = "THIS IS A CONSTANT";`|`public const string CONST_VALUE = "THIS IS A CONSTANT";`|`const CONST_VALUE string = "THIS IS A CONSTANT"`|`Const CONST_VALUE As String = "THIS IS A CONSTANT"`|
|`let  foo: number = 50;`|`public static int Foo = 50;`|`var Foo int = 50`|`Dim Foo AS Integer  = 50`
|`var  foo: number = 50;`|`public static int Foo = 50;`|`var Foo int = 50`|`Dim Foo AS Integer  = 50`

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

||C#|GO|Visual Basic|
|-|-|-|-|
|Global|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Function/Constructor body|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

## Enums

#### Examples

|TS|C#|GO|Visual Basic|
|-|-|-|-|
|<pre><code>export enum Animals {<div>  Dog = 1,</div><div>  Cat = 2</div>}</code></pre>|<pre><code>public enum Animals<div>{</div><div>  Dog = 1,</div><div>  Cat = 2</div>}</code></pre>|<pre><code>const (<div>  Dog int = 1</div><div>  Cat = 2</div>)</code></pre>|<pre><code>Enum Animals<div></div><div>  Dog = 1</div><div>  Cat = 2</div>End Enum</code></pre>|
|<pre><code>export enum Animals {<div>  Dog = "dog",</div><div>  Cat = "cat"</div>}</code></pre>|<pre><code>public enum Animals<div>{</div><div>  Dog = "dog",</div><div>  Cat = "cat"</div>}</code></pre>|<pre><code>const (<div>  Dog string = "dog"</div><div>  Cat = "cat"</div>)</code></pre>|<pre><code>Enum Animals<div></div><div>  Dog</div><div>  Cat</div>End Enum</code></pre>|
|<pre><code>export enum Animals {<div>  Dog,</div><div>  Cat</div>}</code></pre>|<pre><code>public enum Animals {<div>  Dog,</div><div>  Cat</div>}</code></pre>|<pre><code>const (<div>  Dog int = iota</div><div>  Cat</div>)</code></pre>|<pre><code>Enum Animals<div></div><div>  Dog</div><div>  Cat</div>End Enum</code></pre>|

#### Support

||C#|GO|Visual Basic|
|-|-|-|-|
|:x:umeric|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|String|:heavy_check_mark:|:heavy_check_mark:|:x:|
|Implicit|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

## Interfaces

#### Examples

|TS|C#|GO|Visual Basic|
|-|-|-|-|
|<pre><code>export interface Printable {<div>  content: string;</div><div>  doPrint(): void;</div>}</code></pre>|<pre><code>public interface IPrintable<div>{</div><div>  string Content { get; set; }</div><div>  void DoPrint();</div>}</code></pre>|<pre><code>type Printable interface {<div>  DoPrint()</div>}</code></pre>|<pre><code>Public Interface IPrintable<div></div><div>  Property Content As String</div><div>  Sub DoPrint()</div>End Interface</code></pre>|

#### Support

||C#|GO|Visual Basic|
|-|-|-|-|
|Members|:heavy_check_mark:|:x:|:heavy_check_mark:|
|Method/Functions|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Inheritance|:heavy_check_mark:|:x:|:heavy_check_mark:|
|Implementation|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|

## Classes

#### Support

||C#|GO|Visual Basic|
|-|-|-|-|
|Inheritance|:heavy_check_mark:|:heavy_check_mark:*|:heavy_check_mark:|
|Interfaces|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Visibility|:heavy_check_mark:|:heavy_check_mark:**|:heavy_check_mark:|
|Static|P|P||

_*In a go way, using composition_
_\*\*Using naming conventions_

### Constructors

#### Examples

Consider a class named **Cat**
|TS|C#|GO|Visual Basic|
|-|-|-|-|
|<pre><code>constructor(arg: number) {<div>  /\*content*/</div>}</code></pre>|<pre><code>public Cat(int arg)<div>{</div><div>  // /\*content*/</div>}</code></pre>|<pre><code>func NewCat(arg int) \*Cat {<div>  c := Cat{}</div><div>  // /\*content*/</div><div>  return &c</div>}</code></pre>|<pre><code>Public Sub Cat(arg As Integer)<div></div><div>  // /\*content*/</div>End Sub</code></pre>|

#### Support

||C#|GO|Visual Basic|
|-|-|-|-|
|Visibility|:heavy_check_mark:|:x:|:heavy_check_mark:|
|Parameters|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Body|AS COMMENT|AS COMMENT|AS COMMENT|

### Properties

#### Examples

|TS|C#|GO|Visual Basic|
|-|-|-|-|
|`public name: string;`|`public string Name { get; set; }`|`Name string`|`Public Property Name AS String`|
|`protected name: string;`|`protected string Name { get; set; }`|`name string`|`Protected Property Name AS String`|
|`private name: string;`|`private string Name { get; set; }`|`name string`|`Private Property Name AS String`|

#### Support

||C#|GO|Visual Basic|
|-|-|-|-|
|Visibility|:heavy_check_mark:|:heavy_check_mark:*|:heavy_check_mark:|

_*Naming convention for pubic or private, protected is considered private_

### Methods/Functions

#### Examples

||C#|GO|Visual Basic|
|-|-|-|-|
|<pre><code>public  foo(): void {<div>  /* a lot of work! */ </div>}</code></pre>|<pre><code>public void Foo()<div>{</div><div>  ///\* a lot of work! */</div><div>  return;</div>}</code></pre>|<pre><code>func (f \*Cat) Foo() {<div>  ///\* a lot of work! */</div><div>  return</div>}</code></pre>|<pre><code>Public Sub Foo()<div></div><div>  '         /* a lot of work! */</div><div></div>End Sub</code></pre>

#### Support

||C#|GO|Visual Basic|
|-|-|-|-|
|Visibility|:heavy_check_mark:|:heavy_check_mark:*|:heavy_check_mark:|
|Parameters|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
|Return type|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:**|
|Default return value|:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:**|

_*Naming convention for pubic or private, protected is considered private_  
_\*\*As functions_