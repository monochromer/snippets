var events = {
  on: function() {
    var elem = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    elem.addEventListener.apply(elem, args);
  },

  off: function() {
    var elem = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);
    elem.removeEventListener.apply(elem, args);
  },

  once: function() {
    var self = this;
    var elem = arguments[0];
    var fn = arguments[1];
    var args = Array.prototype.slice.call(arguments, 2);
    self.on(elem, callback, args);
    callback = function callback(e) {
      fn(e);
      self.off(elem, callback, args);
    }
  },

  emit: function(element, name, bubbles, cancelable) {
    bubbles = bubbles || true;
    cancelable = cancelable || true;
    var event = document.createEvent('Event');
    event.initEvent(name, bubbles, cancelable);
    element.dispatchEvent(event);
  }
}
