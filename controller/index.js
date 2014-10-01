/**
 * Created by joswald on 01.10.14.
 */
'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var ControllerGenerator = yeoman.generators.NamedBase.extend({
//    camelControllerName: '',
//    capitalControllerName: '',
//    lowerControllerName: '',
  init: function () {
    console.log('Creating the controller - ' + this.name);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'rootFolder',
        message: 'Where do you want to place this controller - what is the root folder?',
        default: 'app'
      }
    ];

    this.prompt(prompts, function (props) {
      this.rootFolder = props.rootFolder;
//            this.includeRest = props.includeRest;
      done();
    }.bind(this));
  },

  files: function () {
    this.projectName = this.config.get('projectName');
    this.camelControllerName = this._.camelize(this.name);
    this.capitalControllerName = this._.capitalize(this.name);
    this.lowerControllerName = this.name.toLowerCase();
    this.controllerPath = path.join('src', this.rootFolder, this.camelControllerName);
    this.mkdir(this.controllerPath);
    this.template('_controller.js', path.join(this.controllerPath, this.camelControllerName + '.ctrl.js'));
    this.template('_controllerSpec.js', path.join(this.controllerPath, this.camelControllerName + '.ctrl.spec.js'));

    this._addControllerToAppJs(this.projectName, this.camelControllerName, this.lowerControllerName);
  },

  touchIndexHtml: function() {
    // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new controller to the scripts)
    var indexHtmlFilePath = 'src/index.html';
    touch(indexHtmlFilePath, {mtime: true});
  },

  _addControllerToAppJs: function app(projectName, camelControllerName, lowerControllerName) {
    var hook   = '])));',
      path   = 'src/app/app.js',
      insert = "    '" + projectName + "." + camelControllerName + "',\n";

    var file   = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = ControllerGenerator;
