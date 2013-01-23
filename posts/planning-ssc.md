<data>
{
    "date": "January 23, 2013",
    "title": "Planning a Static Site Compiler",
    "synopsis": "In this post we will discus how to appraoch building a very simple static site compiler. We will explore some existing options like Jekyll to see how they approach the task and adapt it to our needs.",
    "tags": ["Static Site Compiler", "Node", "Javascript", "NPM"],
    "hidden": false
}
</data>

This is the second post in a series about building a static site compiler in NodeJS. If you want to view the rest, visit the [Static Site Compiler](#) tag. This post will define what we want to accomplish and plan the layout of the engine.

## Motivation

There are plenty of static site compilers floating around the internet such as GitHub's [Jekyll](https://github.com/mojombo/jekyll) and [Hammer for Mac](http://hammerformac.com/). They all have their perks and drawbacks. When I decided to build this site, I thought it would be a good learning experience to roll my own version. It will incorporate some of the nicer aspects of the other popular engines with the added benefit of being extremely lightweight and unobtrusive.


## Specifications & Objectives

Lets start with what we want to learn, then we will define our development stack. We want to explore...

- How static site compilers work
- Command line scripting with NodeJS
- Publishing an application with NPM
- Javascript regular expressions
- Popular Javascript libraries
- Basic Git commands

To accomplish these goals, we will pull in a various libraries and make assumptions about how a web site should be made. 

First, and most importantly, we want to have the ability to separate the concerns of our websites. We do not want to worry about style while we are writing content and vice versa. Additionally, we do not want to worry about structure while working on content or styling. To accomplish these three, we want: the ability to have layouts to define page style, Markdown to take care of structuring the DOM, and custom directives to pull in content.

Secondly, we want fast iterations during all aspects of the project; including the design of the compiler itself. This compiler should be simple and logical from the ground up. Setting up new sites should be effortless. Deploying your site should happen behind the scenes with a single command. In short, we want to design a tool that gets out of the way so you can just focus on your website.

## Jargon

With the objectives and specifications out of the way, lets define some keywords we will be using throughout the project. These will end up being directives and other words of importance during development.

- **Partials:** A partial is a common chunk of code that gets imported into various pages. Partials can contain static or dynamic code. For example, you would want a partial to define the header of your website. *Possible Use:* `<!-- @partial('header') -->`
- **Layout:** A layout is used to define the style of a page. Every post / page / etc will have be associated with a layout. Once a page object is parsed, it will be inserted into a layout. Layouts are automatically given based on the containing folder name, and can be over written if desired..
- **Placing:** Placing is used in conjunction with layouts and is only used within a layout file. The difference between a partial and placement is partials define a separate entity to get imported into the page. Placement searches the corresponding page object for an appropriate property tag. It will become apparent later why we want to separate the place command from how Mustache renders templates. *Possible Use:* `<!-- @place('file') -->`
- **Templates:** While layouts define the overall structure of a page, templates define the page's details. For example, a navigation partial would have a template defining how each link is meant to look. For our purposes, we will be using [Mustache](https://github.com/janl/mustache.js/) `{{}}` to handle templates.
- **Data:** Every file has an optional `<data>` meta tag it can have. This tag will be stripped from the file and run through `JSON.parse()`. Any information within these tags will over-write any defaults a file may pickup. Also, any data in these tags will be available to the page object at compilation time.
- **JS:** We may want to run server side code within a page at compilation time. This would be the equivalent of having a `<?php>` block in your HTML. For our use, we will have anything inside `<js>` tags be stripped and executed. The context will be the *final* page object with access to the site object as well.
- **Pages:** Pages are the actual output of the compiler. The compiler does not distinguish between *types* of pages, they should all be stored in one location. You can define the types of pages specifying so in the `<data>` tag of a page. Alternatively, you can group pages together in folders where the name of the folder is the plural of the type it should be given. For example, a folder named `sections/` would give the page a type of `section`

## Program Flow

Cool. With the buzz words out of the way, we now can talk about how this compiler will flow. Here is a super high level breakdown of how the compilation will work:

0. Initialization
1. Reading in files
2. Content placement
3. Partial imports
4. Dynamic code execution 
5. Mustache templating
6. Fix links 
7. Output Step

The compiler will start with an **initialization** phase where the command line utility starts running. In this stage, we will take care of all the housekeeping that is common between all processes of the utility. For example, we may want to read in the users settings at this stage as they will modify how the compiler behaves. The  initialization stage ends by executing the users command.

Next, assuming we have received a `build` command, the compiler will pro grammatically **read in all the files** of the project. As each file is read, it will be primitively processed. It's meta data and dynamic code will be parsed out and stored for later use, along with a few other simple tasks. It is important that all the information about the site is read in before any other actions are taken. At the end of this stage, the complete `site` object will have been formed.

We now iterate over each of the `pages` of the site and **implement it into it's layout**. Now, every page has a pseudo structure with a mixture of directives, templates, and markdown. We then take this transformed `page` object and **import it's partials.** By importing the partials after placing the content into layouts, we enable the user to have imports in both the individual pages and the layouts. We can later modify this step to not only take care of partials, but any other directives that will crop up down the road.

The `page` objects have all their static content at this time, they are now ready to **execute their dynamic code**. Both the partials and the layouts have transfered their meta data and scripts into the `page` object. When the combined scripts run, their scope should be the `page` and should also have access to the `site`.

With all the heavy lifting done, all we have to do now is clean house. First, we run each `page` through **Mustache and Markdown compilers**. Mustache will use the dynamic data generated from the previous step along side the meta data from the files to generate the final content of the page. We take this finalized document and fix any **dangling links,** and lastly we **output the file** to the appropriate location!


## Moving Forward

With the super high level planning out of the way, our next lesson  will actually have code! We will start a simple command line interface and get up and running with NPM :D 
