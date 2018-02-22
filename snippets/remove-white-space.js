/**
 * Удаление пробелов
 */

/* jQuery-плагин */
$.fn.removeSpace = function () {
  var $this = this;
  $this
    .contents()
    .filter(function () {
      return this.nodeType === 3;
    })
    .remove();

  return $this;
};

/* чистый JavaScript */
var removeSpace = function (node, recursive) {
  var child,
    i,
    len = node.childNodes.length;

  if (len === 0) {
    return;
  }

  // iterate backwards, as we are removing unwanted nodes
  for (i = len; i > 0; i -= 1) {
    child = node.childNodes[i - 1];
    // comment node? or empty text node
    if (child.nodeType === 8 || (child.nodeType === 3 && !/\S/.test(child.nodeValue))) {
      node.removeChild(child);
    } else {
      if (recursive && child.nodeType === 1) {
        removeSpace(child, recursive);
      }
    }
  }
};
