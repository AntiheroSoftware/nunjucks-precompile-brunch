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

        NunjucksCompiler.prototype.pattern = /(\.(html|njs))$/;

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