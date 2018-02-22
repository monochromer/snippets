/**
 * Обработка переменного числа аргументов функций
 */
function largest(array) {
  return Math.max.apply(Math, array);
}

function merge(root) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      root[key] = arguments[i][key];
    }
  }
  return root;
}