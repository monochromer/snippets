// matches polyfill
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      function matches(selector) {
        var element = this,
          elements = (element.document || element.ownerDocument).querySelectorAll(selector),
          index = 0;

        while (elements[index] && elements[index] !== element) {
          ++index;
        }

        return elements[index] ? true : false;
      };
  }
})();

//closest polyfill
(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (selector) {
      var node = this;

      while (node) {
        if (node.matches(selector)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
