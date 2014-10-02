'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
//    camelModuleName: '',
//    capitalModuleName: '',
//    lowerModuleName: '',
    init: function () {
        console.log('Creating the module - ' + this.name);
    },

    askFor: function () {
        var done = this.async();

        var prompts = [
            {
                name: 'rootFolder',
                message: 'Where do you want to place this module - what is the root folder?',
                default: 'app'
            }
        ];

        this.prompt(prompts, function (props) {
            this.rootFolder = props.rootFolder;
            done();
        }.bind(this));
    },

    files: function () {
        this.projectName = this.config.get('projectName');
        this.camelModuleName = this._.camelize(this.name);
        this.capitalModuleName = this._.capitalize(this.name);
        this.lowerModuleName = this.name.toLowerCase();
        var modulePath = path.join('src', this.rootFolder, this.camelModuleName);
        this.mkdir(modulePath);
        this.template('_module.js', path.join(modulePath, this.camelModuleName + '.js'));
        this.template('_moduleSpec.js', path.join(modulePath, this.camelModuleName + '.spec.js'));
        this.template('_moduleHtml.tpl.html', path.join(modulePath, this.camelModuleName + '.tpl.html'));
        this.template('_module.less', path.join(modulePath, this.camelModuleName + '.less'));

        this._addModuleToAppJs(this.projectName, this.camelModuleName, this.lowerModuleName);
    },

    touchIndexHtml: function() {
        // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new module to the scripts)
        var indexHtmlFilePath = 'src/index.html';
        touch(indexHtmlFilePath, {mtime: true});
    },

    _addModuleToAppJs: function app(projectName, camelModuleName, lowerModuleName) {
        var hook   = '])));',
            path   = 'src/app/app.js',
            insert = "    '" + projectName + "." + camelModuleName + "',\n";

        var file   = this.readFileAsString(path);

        if (file.indexOf(insert) === -1) {
            this.write(path, file.replace(hook, insert + hook));
        }
    }

});

module.exports = ModuleGenerator;