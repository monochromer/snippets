// https://medium.com/devschacht/javascript-typeof-43591ab15bef
// https://habr.com/post/427253/

// Проверка на null
function isNull(value) {
  return value === null;
}

// Проверка на NaN
Number.isNaN = Number.isNaN || function(value) {
  return value !== value;
}

function isNan(value) {
  return Object.is(value, Number.NaN);
}

// Проверка для массивов
Array.isArray = Array.isArray || function(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}
/**
 * Реализация, учитывающая, что в некоторых окружениях Array
 * может быть не определен. Также есть оптимизация производительности
 */
var isArray = (function () {
  var toString = Object.prototype.toString,
    array = toString.call([]);

  return function (obj) {
    return obj != null
      && (obj instanceof Array
        || (typeof (obj) === "object"
            && !!obj.push
            && toString.call(obj) === array));
  };
}());

// Общий подход к проверке типов
function type(value) {
  var regex = /^\[object (\S+?)\]$/;
  var matches = Object.prototype.toString.call(value).match(regex) || [];

  return (matches[1] || 'undefined').toLowerCase();
}

function getTag(any) {
  if (typeof any === 'object' && any !== null) {
    if (typeof any[Symbol.toStringTag] === 'string') {
      return any[Symbol.toStringTag];
    }
    if (typeof any.constructor === 'function' 
        && typeof any.constructor.name === 'string') {
      return any.constructor.name;
    }
  }
  return Object.prototype.toString.call(any).match(/\[object\s(\w+)]/)[1];
}
