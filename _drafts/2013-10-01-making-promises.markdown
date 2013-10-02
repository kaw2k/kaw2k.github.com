---
layout: post
title: "Making Promises"
category: scripting
---

Perhaps you have started using jQuery or NodeJS and realized callbacks can get a bit unwieldy after a while. On the other hand, you may be a seasoned JS developer who has used Promise libraries such as [Q](#) before but want to better understand what is going on under the hood. The goal for this post is to learn how promises work by making a super simple Promise library which you can use in your own projects. If you want to skip ahead, you can grab the final version of this code on [GitHub](https://github.com/kaw2k/Promise/blob/master/Promise.js).

To start this post, we will explore some code that could greatly benefit from promises. The first example requires events to happen sequentially and the second example simply needs all the events to finish before proceeding.

As you can see, each method of treating asynchronous events as sequential events has its own ugliness. We can help alleviate these problems with Promises!

### Define the API

Before jumping into code we need to define our API. We are going to keep things fairly simply and only implement two public facing methods: `when` and `then`.

`then` deals with sequential tasks, you can think of it as executing one task *then* executing another task.  On the other hand, `when` tackles parallel tasks. Again, *when* all these tasks are done *then* do this action. You are actually using `then` to solve parallel issues!

We will make a few other methods to help behind the scenes, for now we will focus on what the end user will see.

### Setting Up the Bones

{% highlight javascript %}
var Promise = (function (undefined) {
    // Constructor
    var Promise = function (value) {};

    // ...

    // Expose the promise
    return Promise;
})();

if (module) module.exports = Promise;
{% endhighlight %}

To set the structure of the library, we are just assigning the value of a global variable `Promise` to the return result of the immediately executing anonymous function that has a return value of a constructor function. This closure will allow us **TODO: FIX THIS** a few private variables down the road.

The last line simply checks if we are running in NodeJS. If we have a module, then set the export value of the file to be the Promise constructor. This allows other NodeJS apps to access our library.

### Class and Instance methods

{% highlight javascript %}
// Class Method
Promise.when = function () {};

// Instance Methods
Promise.prototype.then = function(onFulfilled, onRejected) {};
Promise.prototype.resolve = function(value) {};

// Private Functions
{% endhighlight %}

Here we are setting up the public interface to our Promise. We are making one instance method `when` which we call *directly* on the `Promise` object. We also have several instance methods, `then`, `resolve`, and `reject`.

The subtle difference between the two is the scope of where we are attaching our methods. When we attach `when` to the `Promise` constructor, we are attaching a method to a *function*. When you invoke `new Promise()` the `Promise` constructor does not change. Furthermore, the scope of `when` is the `window`.  On the other hand, when we attach a function to the `prototype` of `Promise` we are giving future `Promise` instances access to the method.

Since instances have their `this` value set appropriately, we can access the prototype which gives us access to `then`, `resolve`, and `reject`.


### Then (v1)

The most simple place to get started is implementing a rudimentary `resolve` method. When a promise gets fulfilled, the promiser resolves the promise which allows all the callbacks on a promise to execute. The most basic implementation is:

{% highlight javascript %}
Promise.prototype.resolve = function(value) {
    this.data = value;

    if (this.onFulfilled) {
        this.onFulfilled(this.data);
    }
};
{% endhighlight %}

Quite simple, all we are doing is setting our `data` attribute to be what the user passes in and call our success callback. If you run `node test` right now, nothing happens. We still need to actually add the callbacks to our promise object!

{% highlight javascript %}
Promise.prototype.then = function(onFulfilled, onRejected) {
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;

    if (this.data !== undefined && this.onFulfilled) {
        this.onFulfilled(this.data);
    }

    return this;
};
{% endhighlight %}

`then` is how we register callbacks. Our implementation will take two parameters, a success and error callback. The conditional statement simply checks to see if we already have our data available at the time the `then` statement executes. Furthermore we check if we have a success callback (by the nature of having data we are not in an error state) and then call the success callback with our data. Finally, we return our instance so we can chain. Now we can pass tests such as.

{% highlight javascript %}
time(0).then(function(data) { console.log(data); });
time(10).then(function(data) { console.log(data); });
{% endhighlight %}

Just with those two simple implementations, a simple promise interface is 60% there. Lets pick off a few low hanging fruit before we jump into chaining `then` statements. We can easily add an initialization step for our Promise objects.  Lets fill out the constructor function a little.

{% highlight javascript %}
var Promise = function (value) {
    this.data = value;
};
{% endhighlight %}

If we pass anything to our promise object we then have an immediately fulfilled promise. Since `then` checks if `this.data` exists, we should be good to go writing code such as:

{% highlight javascript %}
new Promise(1).then(function(data) { console.log(data); })
//> 1
{% endhighlight %}

### Chaining With Then (v2)

With the simple setup out of the way we can start getting into a few more **TODO: ADD LINK** A+ specifications. Our goal is to be able to chain callbacks with `then`. These callbacks should forward their return to the next callback in the stack.

{% highlight javascript %}
time(10)
  .then(function (data) { return data + 10; })
  .then(function (data) { return data + 10 })
  .then(function (data) { console.log(data); });

//> 30
{% endhighlight %}

All we are aiming for is to push callbacks onto the stack of callbacks to execute when the promise returns. One cool feature we want to implement is to check if we return a promise in the callback chain and bake that promise into our callback chain. If you look at the example above, the entire callback chain will return after 10ms. The next example will produce the same result but return after 40ms.


{% highlight javascript %}
time(10)
  .then(function (data) { return time(data + 10); })
  .then(function (data) { return time(data + 10); })
  .then(function (data) { console.log(data); });

//> 30
{% endhighlight %}

So how do we go about implementing this? First, we need to have some sort of stack to store these callbacks. We can implement this as an array in our constructor function.


{% highlight javascript %}
var Promise = function (value) {
  this.data = value;
  this.stack = [];
};
{% endhighlight %}

The next step is to actually populate this stack with callbacks. To do this, we will first change the `then` method.


{% highlight javascript %}
Promise.prototype.then = function(onFulfilled, onRejected) {
    if (this.onFulfilled || this.onRejected) {
        this.stack.push({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        });
    } else {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    }

    if (this.data !== undefined && this.onFulfilled) {
        this.onFulfilled(this.data);
    }

    return this;
};
{% endhighlight %}

Instead of imidiatly checking to see if `onFulfilled` exists, we need to examine the stack. To help manage some of the complexity of managing the stack, we will implenet a `next` method that sets up our next callback in the stack.


{% highlight javascript %}
function next() {
    if (this.stack.length) {
        var obj = this.stack.shift();
        this.onFulfilled = obj.onFulfilled;
        this.onRejected = obj.onRejected;
        this.executed = false;
    }
}
{% endhighlight %}

This function is rather simple at heart. We check to see if we have a callback on the stack. If one exists we pop it off and update our state accordingly.

If you look closesly, you might think "Wait, this wont work at all!". Notice how we are decalaring this function. We are not attaching this function to our prototype. This function is *only* available within the scope of our closure. That means that the scope of `this` is the window object and *not* the promise itself. As a result of this design choice, to call this method we will need to use `Function.prototype.call` in order to set the scope correctly.

Why would we ever choose to do this? For one, it gives us the peace of mind to know that a malicious user can't (easily) trash our promises stack. Since this function is only available in the closure, a user can't manually call next or execute and send our promise into odd states.

Now we can finish of the `then` method to call our new function.

{% highlight javascript %}
Promise.prototype.then = function(onFulfilled, onRejected) {
    this.stack.push({
        onFulfilled: onFulfilled,
        onRejected: onRejected
    });

    next.call(this);

    if (this.data !== undefined && this.onFulfilled) {
        execute.call(this);
    }

    return this;
};
{% endhighlight %}

Note here, we call `next.call(this);` which then gives it access to our promise and can therefore set its inner state.

Similarly, we need to revisit `resolve`. Before we simply checked our internal state, now we need to make sure to call `next` before doing the same check.

{% highlight javascript %}
Promise.prototype.resolve = function(value) {
    this.data = value;
    next.call(this);

    if (this.onFulfilled) {
        this.onFulfilled(this.data);
    }
};
{% endhighlight %}

Looking closesly, we are spreading out our exicution logic between a variatey of functions and methods. Both the `then` and `resolve` methods execute `onFulfilled` callbacks. Spreading out our execution logic like this leads to unecicary complexity and heartache. We can  break out the execution of callbacks into a private `execute` function which will  encapsulate all the error checking to see if we have callbacks before trying to execute them.

{% highlight javascript %}
function execute() {
    next.call(this);

    if (!this.executed && this.onFulfilled) {
        this.onFulfilled(this.data);
    }
}
{% endhighlight %}

Now, we can safely remove these checks from `then` and `resolve`.

{% highlight javascript %}
Promise.prototype.then = function(onFulfilled, onRejected) {
    this.stack.push({
        onFulfilled: onFulfilled,
        onRejected: onRejected
    });

    if (this.data !== undefined) {
        execute.call(this);
    }

    return this;
};

Promise.prototype.resolve = function(value) {
    this.data = value;
    execute.call(this);
};
{% endhighlight %}

Cool! Load everyhting up, run `node test` and we are right back where we started. Not too exciting, lets *actually* get chaining working.

### Chainig With Then (v3)

With all our execution logic in one place, we simply need to modify `execute` to get chaining working correctly. Here is what we want to accomplish.

- Feed the return value of each callback into the paramater of the
  subsequent callback.
- If we return a promise, have the subsequent callback tap into the reolvement
  of the returned callback.

With this in mind, we want to save the return value of `onFulfilled` and pass it
into the next method of our callback stack.

{% highlight javascript %}
function execute() {
    next.call(this);

    if (!this.executed && this.onFulfilled) {
        this.executed = true;
        var result = this.onFulfilled(this.data);

        this.resolve(result);
    }
}
{% endhighlight %}

Here we are taking the return value and passing it to our own resolve method.  This is a divergence from the A+ Promise specifications, but it is fine for this demonstration.

If you run the code as is, you will note we pass a few more test cases such as:

{% highlight javascript %}
time(10)
    .then(function(data) { return data + 10; })
    .then(function(data) { return data + 10; })
    .then(function(data) { console.log(data); });
//> 30
{% endhighlight %}

To get this work with returned promises, we need to inspec the value of the return type to see what we are dealing with. We can do this by testing the existance of the `then` method.

{% highlight javascript %}
function execute() {
    next.call(this);

    if (!this.executed && this.onFulfilled) {
        this.executed = true;
        var result = this.onFulfilled(this.data);

        if (result && result.then) {
            result.stack = this.stack;
            this.stack = [];
        } else {
            this.resolve(result);
        }
    }
}
{% endhighlight %}

When we detect we have a promise, we simply transfer our stack to the new promise and clear our own stack. The new promise will have its own resolved state so we don't need to worry about transferring our data attribute. By clearing our own stack, we stop our own callback chain and let the new promise take over.

At this point we are 99% the way there with chaining. If you notice, we have one outstanding bug left. This bug stems from the fact that it is possible to execute callbacks before `resolve` or `then` returns. If you look at the stack size during each tick of `execute` you don't get the full stack you may expect. Callbacks go in the stack and get popped off keeping the stack at 0 elements.

To get around this, we will use the node method `nextTick`. This method allows us to call a function after the current event stack within the javascript interperater has cleared. Essentially, this will push the execution of the function to the *next* event cycle tha the javascript interperater executes.

One issue we need to face is `nextTick` is not available in all browsers. To get around this, we will use a simple ternary to test if it is available. If it isn't we can simulate the same behaviour with `setTimeout`.

{% highlight javascript %}
var nextTick = (process)
    ? process.nextTick
    : function (fn) {setTimeout(fn, 0);};
{% endhighlight %}

Now, all we need to do is wrap the contents of `execute` in our custom `nextTick` method.

{% highlight javascript %}
function execute() {
    nextTick(function() {
        next.call(this);

        if (!this.executed && this.onFulfilled) {
            this.executed = true;
            var result = this.onFulfilled(this.data);

            if (result && result.then) {
                result.stack = this.stack;
                this.stack = [];
            } else {
                this.resolve(result);
            }
        }
    }.bind(this));
}
{% endhighlight %}

Looking at the above code, you will see that we had to bind the context of the inner anonymous function. By the time that function executes, we have lost our scope. Using bind allows us to use `this` instead of making a custom `self` variable.

Run `node test` and we have passed all our `then` tests!

### When

Having completed `then`, `when` is relativly simple. You can think of `when` as spinning off and waiting for threads to complete. We have multiple promises that we are waiting for, and **when** these promises are resolved **then** execute this callback. At its core, `when` in of itself is a promise!

With this in mind, our first steps to implementing `when` is to make a new promise object which we give back to the user.

{% highlight javascript %}
Promise.when = function () {
    var promise = new Promise();

    // content...

    return promise;
};
{% endhighlight %}

Now the question is, how do we want to interact with `when`? For starters, we want to accept promise tokens as arguments and return a promise that combines them all together. It would also be nice to give an array of promise tokens and have `when` splat them all for us. For example:

{% highlight javascript %}
var first = time(10);
var second = time(20);
var third = time(30);

Promise.when(first, second, third).then(function(d1, d2, d3) {
    console.log(d1, d2, d3);
    //> 10, 20, 30
});
{% endhighlight %}

This is a simple example of how we may use `when`. For each promise we give when, we get a parameter for our callback function. Why would we want to have an array be passable to `when`? Imagine you have a large list of files or servers and want to query them all...

{% highlight javascript %}
var serverUrls = [/* many urls... */];
var promises = [];

serverUrls.forEach(function(url) {
    promises.push(get(url));
});

Promise.when(promises).then(function(/* data */) {
    console.log(arguments);
});
{% endhighlight %}

Really, that is just syntactic sugar, we could still achieve this result by calling `apply` on the `when` method. To get this sugar working, we will treat our arguments as an array from the start. If it turns out we got an array as our first argument, we just use that array instead.

{% highlight javascript %}
var args = Array.prototype.slice.call(arguments, 0);
if (args.length === 1 && args[0] instanceof Array) {
    args = args[0];
}
{% endhighlight %}

Now that we have our list of promise tokens we can tie them together to one cohesive promise.

{% highlight javascript %}
function fail (){};
function success (){};

args.forEach(function (arg) {
    arg.then(success, fail);
});
{% endhighlight %}

Here we are doing several things. First we are making custom `success` and `fail` functions that our individual promises can use. These functions will dictate if the returned promise resolves or not.

To actually join these promises together we will need another variable to keep track of how many promises have completed ed. Once all promises have completed we can then resolve. We will create this variable just under the creation of `args`.

{% highlight javascript %}
var args = Array.prototype.slice.call(arguments, 0);
if (args.length === 1 && args[0] instanceof Array) {
    args = args[0];
}
var count = args.length;
{% endhighlight %}

Now, all we need to do in `success` is decrement our count and call `resolve` on
the promise if we are finished.

{% highlight javascript %}
function success (){
    if (!--count) {
        var promiseData = args.map(function (arg){
            return arg.data;
        });

        promise.resolve(promiseData);
    }
};
{% endhighlight %}

We are using `map` here to lift the data out of each promise object. We then
feed this array to the resolve method of our promise and call it a day.

There is one issue though. In our `resolve` method, we take one value and assign `this.data` to that value. Subsequently, in our `execute` function we simply pass `this.data` to our `onFulfilled` callback. Ideally we would want to know if we are a `when` promise and use `apply` instead of just forwarding the data.

To do this, we will introduce a boolean flag to dictate if we are a `when` promise and then opptionally apply the data to the callback.


{% highlight javascript %}
{% endhighlight %}


