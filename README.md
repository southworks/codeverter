# Welcome to Codeverter!

Codeverter is a tool to convert a TypeScript source file (*.ts) into differents languages (**go** or **c#** by the moment).

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
`cdv --file xxx --lang zzz --dest yyy <path>`

### Args
`--file`: Path to the source file. 
- Default value: _tmp/index.ts_

`--lang`: Target language. 
- Values: **csharp** | **go** 
- Default value: _go_

`--dest`: Destination

- Values: **console** | **file**
- - file has an extra parameter \<destination path>
- Default value: _console_

# Support
## Constants/Variables
|TS|C#|GO|
|----------------|-------------------------------|-----------------------------|
|`const  CONST_VALUE: string = "THIS IS A CONSTANT";`|`public const string CONST_VALUE = "THIS IS A CONSTANT";`|`const CONST_VALUE string = "THIS IS A CONSTANT"`|
|`let  foo: number = 50;`|`public static int Foo = 50;`|`var Foo int = 50`
|`var  foo: number = 50;`|not supported yet|not supported yet

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
## Enums
|TS|C#|GO|
|----------------|-------------------------------|-----------------------------|
|<code>export enum Animals {<br>&nbsp;&nbsp;Dog = 1,<br>&nbsp;&nbsp;Cat = 2<br>}</code>|<code>public enum Animals<br>{<br>&nbsp;&nbsp;Dog = 1,<br>&nbsp;&nbsp;Cat = 2<br>}</code>|<code>const (<br>&nbsp;&nbsp;Dog int = 1<br>&nbsp;&nbsp;Cat = 2<br>)</code>|
|<code>export enum Animals {<br>&nbsp;&nbsp;Dog = "dog",<br>&nbsp;&nbsp;Cat = "cat"<br>}</code>|<code>public enum Animals<br>{<br>&nbsp;&nbsp;Dog = "dog",<br>&nbsp;&nbsp;Cat = "cat"<br>}</code>|<code>const (<br>&nbsp;&nbsp;Dog string = "dog"<br>&nbsp;&nbsp;Cat = "cat"<br>)</code>|
|<code>export enum Animals {<br>&nbsp;&nbsp;Dog,<br>&nbsp;&nbsp;Cat<br>}</code>|not supported yet|not supported yet

## Interfaces
|TS|C#|GO|
|----------------|-------------------------------|-----------------------------|
|<code>export interface Printable {<br>&nbsp;&nbsp;content: string;<br>&nbsp;&nbsp;doPrint(): void;<br>}</code>|TODO|TODO
# Classes
## Properties
|TS|C#|GO|
|----------------|-------------------------------|-----------------------------|
|`public name: string;`|`public string Name { get; set; }`|`Name string`|
|`protected name: string;`|`protected string Name { get; set; }`|`name string`|
|`private name: string;`|`private string Name { get; set; }`|`name string`|

## Methods/Functions
|TS|C#|GO|
|----------------|-------------------------------|-----------------------------|
|<code>public  foo(): void {<br>&nbsp;&nbsp;/* a lot of work! */ <br>}</code>|<code>public void Foo()<br>{<br>&nbsp;&nbsp;///\* a lot of work! */<br>&nbsp;&nbsp;return;<br>}</code>|<code>func (f *Cat) Foo() {<br>&nbsp;&nbsp;///\* a lot of work! */<br>&nbsp;&nbsp;return<br>}</code>|
