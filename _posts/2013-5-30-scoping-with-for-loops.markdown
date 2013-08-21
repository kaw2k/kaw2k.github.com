---
  layout: post
  title: "For Loops and Scope Issues"
  category: js
  published: false
---

We want to explore in simple example how function scoping can be confusing for
new javascript developers and tackle a few ways in which we can work around it.
To demonstrate this, we will construct an simple use case. We have a list of
objects and we want to programatically generate a `toString` method for each of
those objects. Look closely at the code and see if you can spot the error.

{% highlight javascript %}
// Our test array
var items = [
    {name: 'Joe'},
    {name: 'Sally'},
    {name: 'Jim'},
    {name: 'Ann'}
];

// Method 1: Simple for loops
function forLoop() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = function () {
            console.log(i + ': ' + (items[i].name));
        }
    }
}

forLoop();
for(var x = 0; x < items.length; x++) {
    items[x].toString();
}
{% endhighlight %}

If you run this code, you will get an error when you attepmt to print out
`items[i].name` in the `toString` method. Why is this? If we inspect the code
further, we find out that `i` is 4, not quite what we expected. To make this
code work, we could change the line to be:

{% highlight javascript %}
function forLoop() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = function () {
            console.log(i + ': ' + (items[i] && items[i].name);
        }
    }
}
{% endhighlight %}

This still does not make the code work as desired, it only stops the code from
crashing.

Just a note on symantics, a shortcut to check if a property or method
exists is to use the `&&` operator. If you wanted to check if a method exists
before running it you could execute it safely via `someMethod && someMethod()`.
We wrapped `items[i] && items[i].name` in parens in the above code to make we
are executing the return value and not the boolean expression.

Back to the code sample! The reason `i` is 4 and not 0-3 is due to functional
scoping. in the `forLoop` method, the inner `for` loop does not have a scope
context and therfore inner functions do not have a stack snapshot of the
variables. This results in the `for` loop executing to completion and saving `i`
as 4. When we call the `toString` method, our scope belongs to the `forLoop`
method and not the `for` loop itself. The `forLoop` method sees `i` as 4, again,
not our desired results.

## Bind

To overcome this, we need to ensure we are making a subscope every time we need
to access variables in a callback. Our first attempt will be to use the native
`bind` method to set the scope of the `toString` method.

{% highlight javascript %}
function forBind() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = function (i) {
            console.log(i + ': ' + items[i].name);
        }.bind({}, i);
    }
}
{% endhighlight %}

If you notice, the code looks very similar to what we had before. To emphasize
the differences, here is a clean anonymous function signature.

{% highlight javascript %}
// new
function (i) { /* code*/ }.bind({}, i);

// old
function () { /* code */ }
{% endhighlight %}

We are giving the new function a paramater and we are then using `bind` to set
the scope and initial paramaters. Now, when we call `forBind` the functions
scope is an empty object and has a paramater `i` which is equal to the desired
value.

All this is due to the fact that `bind` is executing imidiatly during the
execution of the `for` loop body, not during the callback. As a result, `i` is
set correctly. Behind the scenes, `bind` is taking the intial function, modifies
it, and returns a copy with a new scope and paramater list. This new function is
given to the `toString` method.

The question comes up, why cant we just give the paramater `i` to the origional
function like so?

{% highlight javascript %}
// old
function (i) { /* code */ }
{% endhighlight %}

Digging a little deeper, all this does is accepts a value from the *callers*
scope, not from the scope of the origional `for` loop.


## Closures

Looking back at the origional issue, we came into this mess by not having block
scope. Instead we are stuck with functional scope, so to solve it we could make
a new function to house our scope, this method is called using closures.

{% highlight javascript %}
function forClosure() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = (function (i) {
            return function() {
                console.log(i + ': ' + items[i].name);
            }
        }(i));
    }
}
{% endhighlight %}

Alot is going on here, here is the isolated anonymous function signature.

{% highlight javascript %}
(function (i) {
    return function() {};
}(i))
{% endhighlight %}

What in the world is this doing? Again, lets build up from scratch. In
javascript, we can make functions without names (which are called anonymous)
with the syntax:

{% highlight javascript %}
function () {};
{% endhighlight %}

The two most common use cases for these anonymous functions are for variable
assignment and durring method callbacks

{% highlight javascript %}
// variable assignment
var someVariable = function () {};

// method callbacks
someArray.forEach(function() {});
{% endhighlight %}

Once we have created this anonymous function, it sits there until it is called.
Typically we call these functions by their name or by calling the `var` which
the function was assigned to. In some cases, we want these functions to be
executed imidiatly uppon creation, to accomplis this, we have the following
syntax.

{% highlight javascript %}
(function () {})()
{% endhighlight %}

We take the function, wrap it in parens, and then append another set of parens
at the end. This ending parens set is the paramaters to the inner function. For
example...

{% highlight javascript %}
(function (name, age) {
    // name == 'Joe'
    // age == 10
})('Joe', 10);
{% endhighlight %}

Once the compiler hits goes over this function, it is imidiatly executed with
the given paramaters. Looking back at our origionl `forClosure` method we see
that we have the inner function accept one paramater `i` and we imidiatly
execute the function with the current value of `i`.

{% highlight javascript %}
(function (i) {
    return function() {};
}(i))
{% endhighlight %}

Cool, but why is there that `return` statment inside of the function body? Our
origional goal was to assign `toSring` to a function which we can call later to
print out the name of the object. Since the function we provide to `toString`
gets executed imidiatly, the return value of the function gets assigned to the
`toString` property. Javascript functions automatically returned `undefined` if
no return value is explicitly given. To properly set `toString` to be a
function, we have to *return* a function. Again, since the inner function has
access to the paramaters of the outer function, we now have a safe reference to
`i`.

## Native Functions

This is all terribly inconvenient, are we expected to use closures or bind every
time we want to use callbacks? The short answer is no, we just need to addapt to
a more functional style of coding over imperative coding.

Instead of using `for` loops which are imparative we can use the native
`forEach` function that javascript arrays have access to.

{% highlight javascript %}
function forEachLoop() {
    items.forEach(function (item, index, list) {
        item.toString = function () {
            console.log(index + ': ' + item.name);
        }
    });
}
{% endhighlight %}

Now, we rely on the javascript interpereter to properly call this function for
each of the items on the list. Since this is a function, we can safely rely on
the scope to stay as we expect it to be. Much simpler than the previous two
methods.

## Wrap Up

After looking through all of this, you may ask yourself why would you ever not
use the functional syntax?

One reason is performance. Every time the `forEach` method is called, the
interperter has to do additional work setting up the stack to house our local
variables. With the simple `for` loop, this is not needed and as a result will
run faster. Some other reasons include code style preference. Some argue that it is much
easier to read and comprehend the syntax of native `for` loops.


