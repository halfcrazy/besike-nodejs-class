function Class(properties, parent) {
  var cons = properties.initialize ? properties.initialize : new Function;
  if (parent) {
    cons.prototype = new parent();
    cons.prototype.constractor = cons;
    cons.__super__ = parent;
  } else {
    cons.__super__ = Object;
  }

  Object.keys(properties).forEach(function(prop) {
    if (prop !== 'initialize') {
      cons.prototype[prop] = properties[prop];
    }
  });

  cons.prototype.super = function(name) {
    return parent.prototype[name].apply(this, [].slice.call(arguments, 1));
  }
  return cons;
};

module.exports = Class;
