function loadScript(url, cb) {
  var script = document.createElement('script');

  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.async = true;

  script.onload = function() {
    script.onload = script.onerror = null;
    cb(null, script);
  }

  script.onerror = function(err) {
    script.onload = script.onerror = null;
    cb(err);
  }

  script.src = url;
  document.head.appendChild(script);
}
