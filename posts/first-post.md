<data>
{
    "date": "December 26, 2012",
    "title": "Planning a Static Site Compiler",
    "synopsis": "In this post we will discus how to appraoch building a very simple static site compiler. We will explore some existing options like Jekyll to see how they approach the task and adapt it to our needs.",
    "tags": ["Static Site Compiler", "Node", "Javascript", "NPM"],
    "hidden": true
}
</data>

This is the first post in a series about building a static site compiler in NodeJS. If you want to view the rest, visit the [Static Site Compiler](#) tag. This post will define what we want to accomplish and plan the layout of the engine.

## Motivation

There are plenty of static site compilers floating around the internet such as GitHub's [Jekyll](https://github.com/mojombo/jekyll) and [Hammer for Mac](http://hammerformac.com/). They all have their perks and drawbacks. When I decided to build this site, I thought it would be a good learning experience to roll my own version. It will incorporate some of the nicer aspects of the other popular engines with the added benefit of being extremely lightweight and unobtrusive. **(more)**


## Specifications & Objectives

Lets start with what we want to learn, then we will chose our development stack. We want to explore how to script with NodeJS and how to publish an application with NPM. This will end up being a command line application. Along the way, we also want to experiment with javascript regular expressions. **(more)** 

To accomplish these goals, we will pull in a various libraries and make assumptions about how sites should be made. We want will template layouts with Mustache and custom directives. Writing content will be done in markdown. **(more)**

## Jargon

Lets define some keywords we will be using throughout the project.

- **Partials:** Are a chunk of code that gets imported into a page. For example, having a header across various types of pages, you would want a partial for that task. *Possible Use:* `<!-- @partial('header') -->`
- **Layout:** A layout is used to define the structure of a page. Every post / page / whatever will have be inserted into a layout. Layouts are automatically given based on the containing folder name, and can be over written if desired. This will only be defined within the `<data>` tags of a page.
- **Placing:** Placing is used in conjunction with layouts and is typically only used within a layout file. Partials actually import when processed, placements are *(ahem)* placeholders for static content. It may be slightly unclear why we might need this now, it will be easier to understand once we talk about the flow of the compilation later. *Possible Use:* `<!-- @place('content') -->`
- **Templates:** For our purposes, templates require some dynamic content such as post titles. We will be using [Mustache](#) `{{}}` to handle their compilation. Again, once we talk about flow, the distinction between templates, partials, and placement will become more apparent. **(Perhaps the naming is slightly off here)**
- **Data:** Every file has an optional `<data>` meta tag it can have. This tag will be stripped from the file and run through `JSON.parse()`. Any information within these tags will over-write any defaults a file may pickup. Also, any data in these tags will be available to the page object at compilation time.
- **JS:** We may want to run server side code within a page at compilation time. This would be the equivalent of having a `<?php>` block in your HTML. For our use, we will have anything inside `<js>` tags be stripped and executed. The context will be the page object with access to the site object as well.
- **Posts / Pages:** Posts and pages are essentially the same thing (with some convenience baked in).

## 'Dat Flow

Cool. With the buzz words out of the way, we now can talk about how this compiler will flow. Here is a super high level breakdown of how the compilation will work:

1. Reading Step
2. Initial Execution Step
3. Linking Step
4. Placement Step
5. Mustaching Step
6. Output Step





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
