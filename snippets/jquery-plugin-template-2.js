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

    var pluginName = 'pluginName',
      DEFAULTS = {};

    /**
     * Набор API-методов
     */
    var methods = {
      'init': function (params) {
        return this.each(function () {
          var options = $.extend({}, DEFAULTS, params);

          if (!this.data(pluginName)) {
            this.data(pluginName, options);
            this.bind('click' + '.' + pluginName, function () {
              //$(this)
            });
          }
        })
      },

      'otherMethod': function () {
        return this;
      },

      'destroy': function () {
        return this;
      }
    };

    $.fn[pluginName] = function (method) {
      // this - ссылка на jQuery-обертку для элемента
      if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
      };

      if (methods[method] && typeof methods[method] === 'function') {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      }

      $.error('Метод "' + method + '" в плагине не найден');
    };
  }));
