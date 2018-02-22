/* Title: Klass (a pattern that should be generally avoided)
 Description: generally a pattern that should be avoided unless one is more comfortable with class than prototype
 */
// Drawback: it brings the whole confusing notion of classes, which don’t technically exist in the language
// Benefit: you can tweak the syntax and the conventions to resemble another of your favorite languages

var klass = function (Parent, props) {
  var Child, F, i;

  // 1.
  // new constructor
  Child = function () {
    if (Child.uber && Child.uber.hasOwnProperty("__construct")) {
      Child.uber.__construct.apply(this, arguments);
    }
    if (Child.prototype.hasOwnProperty("__construct")) {
      Child.prototype.__construct.apply(this, arguments);
    }
  };

  // 2.
  // inherit
  Parent = Parent || Object;
  F = function () {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.uber = Parent.prototype;
  Child.prototype.constructor = Child;

  // 3.
  // add implementation methods
  for (i in props) {
    if (Object.hasOwnProperty.call(props, i)) {
      Child.prototype[i] = props[i];
    }
  }

  // return the "class"
  return Child;
};


var Man = klass(null, {
  __construct: function (what) {
    console.log("Man's constructor");
    this.name = what;
  },
  getName: function () {
    return this.name;
  }
});

var first = new Man('Adam'); // logs "Man's constructor"
first.getName(); // "Adam"


var SuperMan = klass(Man, {
  __construct: function (what) {
    console.log("SuperMan's constructor");
  },
  getName: function () {
    var name = SuperMan.uber.getName.call(this);
    return "I am " + name;
  }
});


var clark = new SuperMan('Clark Kent');
clark.getName(); // "I am Clark Kent"

console.log(clark instanceof Man); // true
console.log(clark instanceof SuperMan); // true

/* Title: Classical Pattern #5 - A Temporary Constructor (a pattern that should be generally avoided)
 Description: first borrow the constructor and then also set the child's prototype to point to a new instance of the constructor
 */
/* Basic */
/*function inherit(C, P) {
 var F = function () {};
 F.prototype = P.prototype;
 C.prototype = new F();
 }*/
/* Storing the Superclass */
/*function inherit(C, P) {
 var F = function () {};
 F.prototype = P.prototype;
 C.prototype = new F();
 C.uber = P.prototype;
 }*/
/* Resetting the Constructor Pointer */
/*function inherit(C, P) {
 var F = function () {};
 F.prototype = P.prototype;
 C.prototype = new F();
 C.uber = P.prototype;
 C.prototype.constructor = C;
 }*/

/* in closure */
var inherit = (function () {
  var F = function () {};
  return function (C, P) {
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    C.prototype.constructor = C;
  }
}());

function Parent(name) {
  this.name = name || 'Adam';
}

// adding functionality to the prototype
Parent.prototype.say = function () {
  return this.name;
};

// child constructor
function Child(name) {}
inherit(Child, Parent);
var kid = new Child();
console.log(kid.name); // undefined
console.log(typeof kid.say); // function
kid.name = 'Patrick';
console.log(kid.say()); // Patrick
console.log(kid.constructor.name); // Child
console.log(kid.constructor === Parent); // false
// reference
// http://shop.oreilly.com/product/9780596806767.do


/**
 * https://github.com/nodejs/node-v0.x-archive/blob/master/lib/util.js#L634-L644
 */
inherits = function (ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};
