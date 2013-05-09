<data>
{
    "date": "May 12, 2013",
    "title": "Making Promises",
    "synopsis": "",
    "tags": ["Promise"],
    "hidden": false
}
</data>

Perhaps you have started using jQuery or NodeJS and realized callbacks can get a
bit unwieldy after a while. On the other hand, you may be a seasoned JS
developer who has used Promise libraries such as [Q](#) before but want to
better understand what is going on under the hood. The goal for this post is to
learn how promises work by making a super simple Promise library which you can
use in your own projects. If you want to skip ahead, you can grab the final version of this code on [GitHub](https://github.com/kaw2k/Promise/blob/master/Promise.js).

To start this post, we will explore some code that could greatly benefit from
promises. The first example requires events to happen sequentially and the
second example simply needs all the events to finish before proceeding.


    // Sequential Events
    // -----------------

    // The asynchronous events
    function auth(callback) {
        setTimeout(function () {
            callback('Authorized!');
        }, 1000);
    }
    function getData(callback) {
        setTimeout(function () {
            callback('Here is your data!');
        }, 1000);
    }

    // Run the events
    auth(function (message) {
        console.log(message);
        getData(function (data) {
            console.log(data);
        });
    });

    // Parallel Events
    // ---------------

    // The asyncronouse events
    function findUsers(callback) {
        setTimeout(function () {
            callback('Here are your users!');
        }, 1000);
    }
    function findRepos(callback) {
        setTimeout(function () {
            callback('Here are your repos!');
        }, 2000);
    }

    // The method to join events
    var count = 0;
    var data = [];
    function join(value) {
        data.push(value);
        if (++count === 2) {
            console.log(data);
        }
    }

    // Run the events
    findUsers(join);
    findRepos(join);

As you can see, each method of treating asynchronous events as sequential events
has its own ugliness. We can help alleviate these problems with Promises!

## Define the API

Before jumping into code we need to define our API. We are going to keep things
fairly simply and only implement two public facing methods: `when` and `then`.

`then` deals with sequential tasks, you can think of it as executing one task *then* executing another task.  On the other hand, `when` tackles parallel tasks. Again, *when* all these tasks are done *then* do this action. You are actually using `then` to solve parallel issues!

We will make a few other methods to help behind the scenes, for now we will
focus on what the end user will see.

## Setting Up the Bones

    var Promise = (function () {
        var Promise = function() {};

        // ...

        return Promise;
    })();

    if (module) module.exports = Promise;


## Class and Instance methods


    // Class Methods
    Promise.when = function () {};

    // Instance Methods
    Promise.prototype.then = function (onResolved, onRejected) {}
    Promise.prototype.resolve = function (value) {}
    Promise.prototype.reject = function (value) {}




