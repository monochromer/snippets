(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jQuery'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jQuery'));
  } else {
    factory(root['jQuery']);
  }

}(this, function ($) {

  'use strict';

  var Func = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, this.DEFAULTS, options);
    // TODO: сделать extend с  использованием data-атрибутов
    // this.options = $.extend(
    //     {},
    //     this.DEFAULTS,
    //     options,
    //     $.parseJSON(this.$element.attr('data-' + pluginName))
    // );
    this.init();
  };

  Func.prototype.DEFAULTS = {};

  Func.prototype.init = function () {};

  Func.prototype.destroy = function () {};

  var pluginName = 'pluginName',
    Creator = Func;

  // Декоратор конструктора,
  // предотвращающий дублирование плагинов
  function Plugin(option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data(pluginName);

      if (!data) {
        data = new Creator(this, typeof option === 'object' && option);
        $this.data(pluginName, data);
      };

      if (typeof option === 'string') {
        // data[option].apply(data, Array.prototype.slice.call(arguments, 1));
        data[option](Array.prototype.slice.call(arguments, 1));
      }
    })
  }

  var old = $.fn[pluginName];

  $.fn[pluginName] = Plugin;
  $.fn[pluginName].Constructor = Creator;

  $.fn[pluginName].noConflict = function () {
    $.fn[pluginName] = old;
    return this;
  }
}));
