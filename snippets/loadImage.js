function loadImage(image, callback) {
  var isImageElement = (image instanceof HTMLImageElement || image instanceof Image);
  var instance = isImageElement ? image : new Image();

  return new Promise(function(resolve, reject) {
    instance.onload = function() {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && callback(null, instance);
      resolve(instance);
    };

    instance.onerror = function(error) {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && callback(error, null);
      reject(error);
    };

    if (!isImageElement) instance.src = image;
    if (instance.complete) {
      instance.onload = instance.onerror = null;
      typeof callback === 'function' && callback(null, instance);
      resolve(instance);
    }
  })
}


function loadImageWithDecode(image, callback) {
  var isImageElement = (image instanceof HTMLImageElement || image instanceof Image);
  var instance = isImageElement ? image : new Image();

  if ('decode' in instance) {
    if (!isImageElement) instance.src = image;
    return instance.decode()
      .then(function() {
        callback(null, instance);
      })
      .catch(function(error) {
        callback(error);
      })
  } else {
    return loadImage(image, callback)
  }
}
