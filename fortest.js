// Our test array
var items = [
    {name: 'Joe'},
    {name: 'Sally'},
    {name: 'Jim'},
    {name: 'Ann'}
];

// Opps, doesn't work
function forLoop() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = function () {
            console.log(i + ': ' + (items[i] && items[i].name));
        }
    }
}

// For Each
function forEachLoop() {
    items.forEach(function (item, index, list) {
        item.toString = function () {
            console.log(index + ': ' + item.name);
        }
    });
}

// Bind
function forBind() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = function (i) {
            console.log(i + ': ' + items[i].name);
        }.bind({}, i);
    }
}

// Closure
function forClosure() {
    for(var i = 0; i < items.length; i++) {
        items[i].toString = (function (i) {
            return function() {
                console.log(i + ': ' + items[i].name);
            }
        }(i));
    }
}


//forLoop();
//forEachLoop();
//forBind();
//forClosure();
for(var i = 0; i < items.length; i++) {
    items[i].toString();
}

