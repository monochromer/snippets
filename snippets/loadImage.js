function withDecode(image, cb) {
  "decode" in image
    ? image.decode().then(function() { cb(image) })
    : cb(image)
}

function loadImage(image, callback) {
  var isImageElement = (image instanceof HTMLImageElement || image instanceof Image);
  var instance = isImageElement ? image : new Image();

  return new Promise(function (resolve, reject) {
    instance.onload = function () {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && withDecode(instance, function() { callback(null, instance) });
      withDecode(instance, resolve);
    };

    instance.onerror = function (e) {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && callback(e, null);
      reject(e);
    };

    if (!isImageElement) instance.src = image;
    if (instance.complete) withDecode(instance, resolve);
  })
}
