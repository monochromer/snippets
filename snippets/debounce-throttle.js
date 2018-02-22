function debounce(fn, delay) {
  var timeout;
  return function (e) {
    timeout && clearTimeout(timeout);
    timeout = setTimeout(function() { fn(e) }, delay);
  };
}

function throttle(fn, delay) {
  var wait = false;
  return function (e) {
    if (wait) return;
    fn(e);
    wait = true;
    setTimeout(function() { wait = false }, delay);
  };
}


/**
 * debounce
 * https://davidwalsh.name/javascript-debounce-function
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * throttle
 * https://learn.javascript.ru/task/throttle
 */
function throttle(func, ms) {
  var isThrottled = false,
    savedArgs,
    savedThis;

  return function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  };
}
