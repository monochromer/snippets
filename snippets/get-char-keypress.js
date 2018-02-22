// Кросс-браузерная функция для получения символа из события keypress:

// event.type должен быть keypress
function getChar(event) {
  if (event.which == null) { // IE
    if (event.keyCode < 32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }

  if (event.which != 0 && event.charCode != 0) { // все кроме IE
    if (event.which < 32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }

  return null; // спец. символ
}

/*
1. Во всех браузерах, кроме IE, у события keypress есть свойство charCode, которое содержит код символа.

2. Браузер IE для keypress не устанавливает charCode,
а вместо этого он записывает код символа в keyCode (в keydown/keyup там хранится скан-код).

3. Также в функции выше используется проверка if(event.which!=0), а не более короткая if(event.which).
Это не случайно! При event.which=null первое сравнение даст true, а второе – false.
*/
