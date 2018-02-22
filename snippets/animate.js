;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.A = factory();
  }

}(this, function () {
  var A = {};

  A.ease = {
    linear: function (progress) {
      return progress;
    },
    quad: function (progress) {
      return Math.pow(progress, 2);
    },
    easeOut: function (progress) {
      return Math.pow(--progress, 5) + 1;
    },
    circ: function (progress) {
      return 1 - Math.sin(Math.acos(progress))
    },
    easeOutElastic: function (progress) {
      return Math.pow(2, -10 * progress) * Math.sin((progress - .1) * 5 * Math.PI) + 1;
    }
  };

  A.animate = function (opts) {
    var duration = opts.duration || 1000, // длительность анимации в мс
      draw = opts.draw || function () {}, // общий процесс изменения свойств
      ease = opts.ease || A.ease.linear, // характер изменения свойств
      before = opts.before, // функция выполняется перед анимацией
      after = opts.after, // функция выполняется после анимации
      start = performance.now(),
      requestId;

    typeof before === 'function' && before();

    requestId = requestAnimationFrame(function tick(time) {
      var timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      var progress = ease(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(tick);
      } else {
        typeof after === 'function' && after();
      }
    });

    return requestId;
  };

  return A;
}));
