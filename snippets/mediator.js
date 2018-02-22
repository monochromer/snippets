/**
 * "Instead of using the Observer pattern to explicitly set many-to-many listeners and events,
 * Mediator allows you to broadcast events globally across colleagues."
 * — Paul Marcotte
 *
 * http://arguments.callee.info/2009/05/18/javascript-design-patterns--mediato
 */
var Mediator = (function () {

  /**
   * хранилише с модулями
   */
  var modules = {};

  /**
   * функция для оповещения модулей о событии
   */
  var notify = function (event, args, source) {
    if (!event) {
      return;
    }
    args = args || [];
    for (var m in modules) {
      if (typeof modules[m]['on' + event] == 'function') {
        try {
          source = source || modules[m];
          modules[m]['on' + event].apply(source, args);
        } catch (err) {
          console.log('Error: ' + err);
        }
      }
    }
  };

  /**
   * функция для добавления модулей в хранилище
   */
  var addModule = function (name, module, replaceDuplicate) {
    if (name in modules) {
      if (replaceDuplicate) {
        removeModule(name);
      } else {
        throw new Error('component name conflict: ' + name);
      }
    }
    modules[name] = typeof module === 'function' ? module() : module;
  };

  /**
   * функция для удаления модулей из хранилища
   */
  var removeModule = function (name) {
    if (name in modules) {
      delete modules[name];
    }
  };

  /**
   * функция для получения модуля из хранилища
   * вернет undefined, если копмонент не был добавлен
   */
  var getModule = function (name) {
    return modules[name];
  };

  /**
   * функция для проверки наличия модуля в хранилище
   * вернет undefined, если компонент не был добавлен
   */
  var contains = function (name) {
    return (name in modules);
  };

  return {
    trigger: notify,
    define: addModule,
    remove: removeModule,
    require: getModule,
    has: contains
  };

})();

Mediator.trigger("Initialize"); // alerts "TestObject initialized"
Mediator.trigger('FakeEvent'); // alerts "Handled 1 times!" (I know, bad grammar)
Mediator.trigger('SetString', ['test string']); // alerts "Assigned test string"
Mediator.trigger('FakeEvent'); // alerts "Handled 2 times!"
Mediator.trigger('SessionStart'); // this call is safely ignored
Mediator.trigger('Translate', ['this is also safely ignored']);
