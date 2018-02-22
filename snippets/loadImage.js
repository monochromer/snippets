function loadImage(image, callback) {
  var isImageElement = (image instanceof HTMLImageElement || image instanceof Image);
  var instance = isImageElement ? image : new Image();

  return new Promise(function (resolve, reject) {
    instance.onload = function () {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && callback(null, instance);
      resolve(image);
    };

    instance.onerror = function (e) {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && callback(e, null);
      reject(e);
    };

    if (!isImageElement) instance.src = image;

    if (instance.complete) resolve(instance);
  })
}
