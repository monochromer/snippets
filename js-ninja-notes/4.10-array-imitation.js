/**
 * Имитация методов обработки массивов
 */
var elems = {
  length: 0,

  add: function (elem) {
    Array.prototype.push.call(this, elem);
  },

  gather: function (id) {
    this.add(document.getElementById(id));
  }
};