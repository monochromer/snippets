/**
 * Простая реализация - полифилл для Array.isArray
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
 */
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

/**
 * Реализация, учитывающая, что в некоторых окружениях Array
 * может быть не определен. Также есть оптимизация производительности
 */
var isArray = (function () {
  var toString = Object.prototype.toString,
    array = toString.call([]);

  return function (obj) {
    return obj != null && (obj instanceof Array || (typeof (obj) === "object" && !!obj.push && toString.call(obj) === array));
  };

}());
