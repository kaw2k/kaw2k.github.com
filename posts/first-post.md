<data>
{
    "date": "December 26, 2012",
    "title": "Planning a static site compiler",
    "synopsis": "In this post we will discus how to appraoch building a very simple static site compiler. We will explore some existing options like Jekyll to see how they approach the task and adapt it to our needs.",
    "tags": ["Static Site Compiler", "Node", "Javascript", "NPM"]
}
</data>

This is the first post in a series about building a static site compiler in NodeJS. If you want to view the rest, visit the [Static Site Compiler](#) tag. This post will define what we want to accomplish and plan the layout of the engine.

## Motivation and other tools

There are plenty of static site compilers floating around the internet such as GitHub's [Jekyll](#) and [The desktop one I think its called hammer or anvil](#). They all have their perks and drawbacks. When I decided to build this site, I thought it would be a good learning experience to roll my own version. It will incorporate some of the nicer aspects of the other popular engines with the added benefit of being extremely lightweight and unobtrusive. (probably change this more)


## Specifications and Objectives



## TODO:

1. Explore other tools
2. Define what our objective is
3. A general overview of how we are going to approach things (tools, algorithms)
4. Define some terminology, make some assumptions
5. Write very brief psuedo code (mayhaps)


## Keywords

- Partials: `@partial` Is a chunk of code that gets imported into a page. If you do not specify an ID the name of the file will be used
- Layout: `@layout` These are used to define the structure of a page.  Automatically set by the folder, can be overwritten
- Placing: `@place` Used in conjunction with @layout to place the content of a page. Automatically set by the folder, can be overwritten
- Templates: Are handled by mustache {{}}. Every file is processed for these before being compiled
- Link: `@link` If you are uncertain of a link path, you can use <!-- @link('id') --> and let the compiler take care of it
- Data: `<data>` Is meta data of the file. It will get parsed out and tagged on to the file's object
- Import: `<import>` Anything withing these tags will get executed during the processing step. The scope will be the file object
- Pages and Posts should live in the same list, you just filter them to get what you want

## Assumptions

- Reading in a folder gives a default layout to all files within the folder. If the folder ends in 's/' (ie: anything plural) the trailing 's/' will be removed. For example, the 'posts/' folder will give a default layout of 'post'
- Using Mustache.js for templates
- Using less for css (or plain css)
- All css / less will be compiled into one file as "styles.css". It will be available in 'css/styles.css'
- The assets folder will be copied over untouched to the public folder
- All folders will end in a / except the root folder ???

## Object Structure

- id: unique identifier, defaults to [name]
- rawName: The full file name 'test.md'
- name: The trimmed name 'test'
- extension: The trimmed extension 'md'
- rawFile: A saved veresion of the raw file
- file: The file as it gts processed
- layout: Defaults to index if not specified by the file
- title: The title of the post
- date: The date of the post
- tags: Any tags the post may have
- urlName: The last part of the url, no extension, defaults to [name]
- urlPath: What folder you want the file to live in defaults to passed in path
