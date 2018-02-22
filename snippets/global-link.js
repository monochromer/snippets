// ссылка на глобальный объект
var global = (function() {
  "use strict";
  return (new Function('return this'))();
})();
