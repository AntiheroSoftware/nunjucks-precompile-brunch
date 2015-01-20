var requireLoader = {
  on: function() {},
  getSource: function(name) {
    var storageName = "app/"+name;
    var result;

    result = this.getFromStorage(storageName);
    if(result !== false) {
      return result;
    } else {
      require(name);
      result = this.getFromStorage(storageName);
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
  return nunjucksEnv.render(templateName, data);
};
