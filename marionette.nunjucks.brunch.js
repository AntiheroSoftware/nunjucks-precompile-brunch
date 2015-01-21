var requireLoader = {
  on: function() {},
  getSource: function(name) {
    var result;

    result = this.getFromStorage(name);
    if(result !== false) {
      return result;
    } else {
      require(name);
      result = this.getFromStorage(name);
      if(result  !== false) {
        return result;
      }
    }
  },
  getFromStorage: function(storageName) {
    if (window.nunjucksPrecompiled && window.nunjucksPrecompiled[storageName]) {
      return {
        src: { type: 'code', obj: window.nunjucksPrecompiled[storageName] },
        path: name
      }
    } else {
      return false;
    }
  }
};

window.nunjucksEnv = {};
nunjucksEnv = new nunjucks.Environment([requireLoader]);

Backbone.Marionette.Renderer.render = function(templateName, data) {
  var rendered = nunjucksEnv.render(templateName, data);
  return rendered;
};
