// https://habr.com/company/ruvds/blog/373499/

// Именно здесь происходит всё самое интересное
function optional(obj, evalFunc, def) {

  // Обработчик прокси
  const handler = {
    // Перехват всех операций доступа к свойствам
    get: function(target, prop, receiver) {
      const res = Reflect.get(...arguments);

      //Если наш ответ является объектом, обернём его в прокси, иначе - просто вернём
      return typeof res === "object" ? proxify(res) : res != null ? res : def;
    }
  };

  const proxify = target => {
    return new Proxy(target, handler);
  };

  // Вызовем функцию с проксированным объектом
  return evalFunc(proxify(obj, handler));
}

const obj = {
  items: [{ hello: "Hello" }]
};

console.log(optional(obj, target => target.items[0].hello, "def")); // => Hello
console.log(optional(obj, target => target.items[0].hell, { a: 1 })); // => { a: 1 }
