function namespace(nsName) {
  var parts = nsName.split('.'),
    parent = this,
    i,
    len;

  if (parts[0] === "APP") {
    parts = parts.slice(1);
  }

  for (i = 0, len = parts.length; i < len; i += 1) {
    if (typeof parent[parts[i]] === "undefined") {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }

  return parent;
};
