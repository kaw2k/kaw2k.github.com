<data>
{
	"id": "testing-js",
	"urlName": "testing-js",
	"urlPath": "posts/",
  "date": "February 10, 2013",
  "title": "Fast Experimentation with Javascript",
  "synopsis": "What do you do when you are in want of testing snippets of javascript? Jump into Chrome's DevTools? Perhaps NodeJS repl? A HTML playground online? JSBin has easily won my affections for exploring javascript.",
  "tags": ["testing, javascript"],
  "hidden": false
}
</data>

How often do you find yourself in the situation where you are reading or writing new code and you come across something you need to test to believe? **tl;dr** [JSBin](http://jsbin.com/) is my new best friend.

Perhaps you would want to verify the scope of a function, or how a specific methods work. You wouldn't want to do this in the actual code you were working on as there is a good chance something else in the code would contaminate what you were testing. The ideal situation would be to enter a testing environment which you can quickly spin up, poke around inside objects, and quickly pull in frameworks you are using.

## Options

I find myself in this situation almost every day. Every time you go to test something out, you have four basic options to experiment with.

- Browser dev tools
- NodeJS repl
- Directly in the editor
- WebDev playgrounds

I have been down each of these paths, each have their benefits and drawbacks. What should you actually look for in a testing environment, how can we distinguish between these options?

**Pulling in assets / frameworks.** If we are working within a framework like jQuery, Backbone, etc, we should be able to pull them in quickly.

**Speed: setup and execution.** It should take only seconds to boot up your testing environment. Anything with high barriers to entry dissuades users from experimentation and can lead to using code without testing it first.

**A console to poke around in.** It helps when experimenting to dig deep into objects. Relying on logging is not ideal. 

**Easy (multiline) editing.** For quick experiments you may not need a full fledged editor to test your code. Perhaps you want to test out a regular expression on various strings before using it. When you start to experiment with larger snippets of code, being restricted to single line edits is a pain.

## Old Hats: Chrome

My old go to was to jump into the Chrome DevTools whenever I needed to experiment. Whenever I needed to test native functions, custom methods, regexs, or whatever, I would just jump into Chrome and have at it. This worked well for me, however it became cumbersome with larger experiments. Don't get me wrong here, the DevTools are *awesome*. [Addy Osmani](http://addyosmani.com/blog/) and [Paul Irish](http://paulirish.com/) frequently talk about how awesome the DevTools can be.

You can easily test quick snippets of javascript in the console, poke around, and do anything to your hearts content. If you need to write a function and test it out, you can make a new source and reference it from the console easily enough. At the end of the day though, I feel the DevTools are suited for experimenting with and debugging full fledged web apps and not so much for quick experiments. 

## New(ish) Faces: JSBin

I tried out several HTML playgrounds in the past such as [CodePen](http://codepen.io/) and [JSFiddle](http://jsfiddle.net/), however neither quite meet my needs. They both felt like they gave priority to HTML and CSS before javascript. 

Enter [JSBin](http://jsbin.com/) v2.

Holy cow, I really couldn't ask for (*much*) more. Slick interface, super quick to set up and import files, rudimentary tab completion, a console, smart indenting... In short, everything you need to quickly experiment with javascript.

<a class="jsbin-embed" href="http://jsbin.com/obarig/16/embed?javascript">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

With all this said, JSBin is not all smiles and fond looks. At the time of this writing, it has several bugs (features?) that are a bit annoying. For example, in the embedded example above, the output does not log to the embedded console. Instead, the browsers console captures the output. When you run the same code from the native website, the pages console captures the logs correctly. 

## Conclusion

I still jump into the DevTools for quick one liners, but [JSBin](http://jsbin.com/) has won my affections. If you have another way of doing things, share it in the comments bellow.
