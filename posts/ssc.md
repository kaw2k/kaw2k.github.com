<data>
{
    "date": "Januar 6, 2013",
    "title": "Introducing SSC.JS",
    "synopsis": "SSC is a static website compiler. It was developed to be simple to install, use, and deploy with. Over the next few months we will go over how to make your own static website compiler using SSC as a baseline.",
    "tags": ["Static Site Compiler", "Node", "Javascript", "NPM"]
}
</data>

[SSC](http://kaw2k.github.com/ssc-start/) is a simple static website compiler. I started this project when I wanted to make a simple, static website. I considered using [Jekyll](https://github.com/mojombo/jekyll) / [Octopress](http://octopress.org/), but I wanted something a bit simpler. I also considered using [Hammer](http://hammerformac.com/), but not at the cost of spending money. I figured this was a good time to learn something new, and decided to role my own compiler.

SSC is an on-going project. The initial goal was to learn how to build a static site compiler. What fun is learning if you cant share? Over the next couple of months we will go over each step of creating a site compiler. The end goal is to produce something very similar to SSC.

So what does SSC do? Lets take a look!

<iframe width="560" height="315" src="http://www.youtube.com/embed/beFR_h2K7fQ" frameborder="0" allowfullscreen></iframe>

## Features

<div class="col-1-2">
    <strong>Strong Git integration</strong>
    <p>Built with git in mind from the start. Your site should be backed up and deployed in two commands.</p>

    <strong>Dynamic "Server Side" Javascript</strong>
    <p>Use Javascript just like any server side language to add additional features to your pages.</p>

    <strong>Store common code in partials</strong>
    <p>Squirl away repitious code in partials to keep your layouts DRY.</p>
</div>

<div class="col-1-2">
    <strong><em>Fast</em> setup and deployment</strong>
    <p>Sites take seconds to set up with the aid of SSC's initilization and generation commands.</p>

    <strong>Seperate layouts from content</strong>
    <p>You should not have to worry about layouts while writing content, and vice versa. Use smart layouts to seperate your concerns!</p>

    <strong>Easy templeting</strong>
    <p>Use Markdown and MustacheJS to effortlessly create content.</p>
</div>

### What are you waiting for?

Try it **now!** Run `sudo npm install -g ssc` and go check out the [documentation](http://kaw2k.github.com/ssc-start/).
