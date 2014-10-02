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
    console.log('Creating the controller - ' + this.controllerName);
  },

  askFor: function () {
    var done = this.async();
    var prompts = [
      {
        name: 'controllerName',
        message: 'How do you spell this controller - what is the name of the controller?',
        default: 'controller'
      },
      {
        name: 'rootFolder',
        message: 'Where do you want to place this controller - what is the root folder?',
        default: 'app'
      }
    ];

    this.prompt(prompts, function (props) {
      this.controllerName = props.controllerName;
      this.rootFolder = props.rootFolder;
      done();
    }.bind(this));
  },

  files: function () {
    this.projectName = this.config.get('projectName');
    this.camelControllerName = this._.camelize(this.controllerName);
    this.capitalControllerName = this._.capitalize(this.controllerName);
    this.lowerControllerName = this.controllerName.toLowerCase();
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

  _addControllerToAppJs: function app(projectName, camelName) {
    var hook   = '\n])));',
        path   = 'src/app/app.js',
        insert = ",\n    '" + projectName + "." + camelName + "'";
    var file = this.readFileAsString(path);
    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = ControllerGenerator;
