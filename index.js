(function() {
    var NunjucksCompiler, fs, nunjucks, sysPath;

    fs = require("fs");
    nunjucks = require('nunjucks');
    sysPath = require('path');

    module.exports = NunjucksCompiler = (function() {

        function NunjucksCompiler() {}

        NunjucksCompiler.prototype.brunchPlugin = true;

        NunjucksCompiler.prototype.type = 'template';

        NunjucksCompiler.prototype.extension = 'html';

        NunjucksCompiler.prototype.getDependencies = function(data, path, callback) {
            var match = data.match(/extends '([a-zA-Z\/]*)'/i);
            var dependencies = [];
            if(match && match[1]) {
                dependencies.push("app/"+match[1]+".html");
            }
            callback(null, dependencies);
        };

        NunjucksCompiler.prototype.compile = function(data, path, callback) {
            var error, filename, result;
            try {
                var name = path.split(".")[0];
                return result = nunjucks.precompile(path, {name: name});
            } catch (err) {
                return error = err;
            } finally {
                callback(error, result);
            }
        };

        return NunjucksCompiler;

    })();

}).call(this);