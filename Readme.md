# Cogent - A code generation engine for React
Think code generation is cool but it seems too hard? Also love react? Well you're in the right place. 

```bash
npm install react cogent-engine --save
```

## Background 
React provides a powerful abstraction for thinking about software development that has been applied to the internet, mobile operating systems and now to code generation. One of the hardest aspects of building a code generator is writing unwieldy templates that can be combined recursively to output clean source code. We think component-based-programming is ripe for code generation so we built a backend for React that just renders well...strings. 

We hope that by making codegen as easy as writing React Components more teams will find ways to incorporate generators into their projects.

**Built by the Optic team as an experiment. If you like it give us stars and start using it so we can justify investing more time in it. PRs Welcome!**

## How it works
tl;dr just like react!

```javascript
import React from 'react'
import Cogent from "cogent-engine";

Cogent.render(
<JSClass name={"Example"}>
	<ClassMethod name="render">
		<source>var two = 1+1</source>
	</ClassMethod>
</JSClass>)

//outputs
//class Example{
//  render(){
//    var two = 1+1
//   }
// }

```
This example relies on 3 components (omitted above for simplicity):
```javascript
const Brackets = ({children, indent = 0}) => (
	<>{'{'}
	<line/>
	<indent level={indent}>{children}</indent>
	<line/>
	{'}'}
	</>)

const ClassMethod = ({name, children}) => {
return (
<source>{name}()<Brackets>
	{children}
</Brackets></source>)
}

const JSClass = ({name, extendsClass, children}) => {

return (
<source>class {name}{(extendsClass) ? extendsClass : null}
<Brackets indent={1}>
	{children}
</Brackets>
</source>)
}
```

## Included Components
- source: renders raw code (because some things don't deserve their own component)
```javascript
<source>Any code you want</source>
//Any code you want
```
- line: renders a new line character
```javascript
<>Hello<line />World</>
//Hello
//World
```

- indent: indents it's children. These work as you'd hope when nested -- The prop 'level' sets the level relative to its parent, not the root of the file. 
```javascript
<>{'{'}
<line/>
<indent level={1}>
    Hello
    <indent level={1}>
        <source>AlsoIndented</source>
        <source>SoCool</source>
    </indent>
</indent>
<line/>{'}'}</>
//{
//  Hello
//    AlsoIndented
//    SoCool
//}
```

Coming soon: file, directory & comment components

## Purposefully Omitted
The hard part! There's no state, class components or any concept of diffing. That might come later but it's hard to imagine real world uses that justify all that work.     
