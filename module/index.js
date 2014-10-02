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
    console.log('Creating the module - ' + this.moduleName);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'moduleName',
        message: 'How would you spell your module - What is the name of the module?',
        default: 'module'
      },
      {
        name: 'rootFolder',
        message: 'Where do you want to place this module - what is the root folder?',
        default: 'app'
      }
    ];

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.rootFolder = props.rootFolder;
      done();
    }.bind(this));
  },

  files: function () {
    this.projectName = this.config.get('projectName');
    this.camelModuleName = this._.camelize(this.moduleName);
    this.capitalModuleName = this._.capitalize(this.moduleName);
    this.lowerModuleName = this.moduleName.toLowerCase();
    var modulePath = path.join('src', this.rootFolder, this.camelModuleName);
    this.mkdir(modulePath);
    this.template('_module.js', path.join(modulePath, this.camelModuleName + '.mod.js'));
    this.template('_moduleSpec.js', path.join(modulePath, this.camelModuleName + '.mod.spec.js'));
    this.template('_moduleHtml.tpl.html', path.join(modulePath, this.camelModuleName + '.tpl.html'));
    this.template('_module.less', path.join(modulePath, this.camelModuleName + '.less'));

    this._addModuleToAppJs(this.projectName, this.camelModuleName, this.lowerModuleName);
  },

  touchIndexHtml: function() {
    // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new module to the scripts)
    var indexHtmlFilePath = 'src/index.html';
    touch(indexHtmlFilePath, {mtime: true});
  },

  _addModuleToAppJs: function app(projectName, camelName) {
    var hook   = '\n])));',
        path   = 'src/app/app.js',
        insert = ",\n    '" + projectName + "." + camelName + "'";
    var file = this.readFileAsString(path);
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = ModuleGenerator;