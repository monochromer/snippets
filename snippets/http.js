;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.HTTP = factory();
  }

}(this, function () {
  // В IE8 и IE9 поддержка XMLHttpRequest ограничена (Не поддерживаются события, кроме onreadystatechange., Некорректно поддерживается состояние readyState = 3: браузер может сгенерировать его только один раз во время запроса, а не при каждом пакете данных. Кроме того, он не даёт доступ к ответу responseText до того, как он будет до конца получен)
  // Но IE9- по умолчанию кеширует все ответы, не снабжённые антикеш-заголовком
  // XDomainRequest - IE8, 9 (поддерживаются события onload, onerror и onprogress)
  var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

  var HTTP = {};

  /**
   * xhr.readyState
   */
  HTTP.STATES = {
    UNSENT: 0, // начальное состояние
    OPENED: 1, // вызван open
    HEADERS_RECEIVED: 2, // получены заголовки
    LOADING: 3, // загружается тело (получен очередной пакет данных)
    DONE: 4 // запрос завершён
  };

  HTTP.STATUS_CODES = {
    OK: 200
  };

  /**
   * Cобытия для xhr
   * readystatechange - происходит несколько раз в процессе отсылки и получения ответа
   * load – запрос был успешно (без ошибок) завершён.
   * loadstart – запрос начат.
   * loadend – запрос был завершён (успешно или неуспешно)
   * progress – браузер получил очередной пакет данных, можно прочитать текущие полученные данные в responseText.
   * abort – запрос был отменён вызовом xhr.abort().
   * error – произошла ошибка.
   * timeout – запрос был прекращён по таймауту.
   */

  /**
   * options
   *
   * method: enum['GET', 'POST', '...etc']
   * url: string
   * data: Object
   * onError: function
   * onSuccess: function
   * onStart: function
   * onEnd: function
   * timeout: Number
   * headers: Object
   */
  var request = function (options) {
    var xhr = new XHR();

    xhr.open(options.method, options.url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== HTTP.STATES.DONE) return;

      // status, statusText, responseText, responseXML
      if (xhr.status != HTTP.STATUS_CODES.OK) {
        console.error(xhr.status + ': ' + xhr.statusText);
        typeof options.onError === 'function' && options.onError(xhr);
      } else {
        typeof options.onSuccess === 'function' && options.onSuccess(xhr);
      }

      typeof options.onEnd === 'function' && options.onEnd(xhr);
    };

    if (options.timeout) {
      xhr.timeout = options.timeout;
    }

    if (options.headers) {
      for (var key in options.headers) {
        if (options.headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    options.onStart && typeof options.onStart === 'function' && options.onStart();

    if (options.method !== 'GET') {
      xhr.send(options.data);
    } else {
      xhr.send();
    }

    return xhr;
  };

  HTTP.request = request;

  return HTTP;
}));
