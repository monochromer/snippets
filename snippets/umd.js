(function (root, factory) {

  if (typeof define === "function" && define.amd) {
    define(["jquery", "underscore"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("jquery"), require("underscore"));
  } else {
    root.myModule = factory(root.$, root._);
  }

}(this, function ($, _) {
  // this is where I defined my module implementation

  var myModule = { /* ...*/ };

  return myModule;
}));
