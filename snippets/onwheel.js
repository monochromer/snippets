/**
 * Кроссбраузерная обработка события колесика мыши
 */
if (elem.addEventListener) {
  if ('onwheel' in document) {
    // IE9+, FF17+, Ch31+
    elem.addEventListener("wheel", onWheel);
  } else if ('onmousewheel' in document) {
    // устаревший вариант события
    elem.addEventListener("mousewheel", onWheel);
  } else {
    // 3.5 <= Firefox < 17, более старое событие DOMMouseScroll пропустим
    elem.addEventListener("MozMousePixelScroll", onWheel);
  }
} else { // IE8-
  elem.attachEvent("onmousewheel", onWheel);
}

function onWheel(e) {
  e = e || window.event;

  // wheelDelta не дает возможность узнать количество пикселей
  var delta = e.deltaY || e.detail || e.wheelDelta;

  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  e.stopPropagation ? e.stopPropagation() : (e.cancelBuble = true);
}

/*
  Ошибка в IE8
  В браузере IE8 (только версия 8) есть ошибка.
  При наличии обработчика mousewheel – элемент не скроллится.
  Иначе говоря, действие браузера отменяется по умолчанию.
  Это, конечно, не имеет значения, если элемент в принципе не прокручиваемый.
*/
