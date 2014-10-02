/**
 * Created by joswald on 01.10.14.
 */
'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var ServiceGenerator = yeoman.generators.NamedBase.extend({
//    camelServiceName: '',
//    capitalServiceName: '',
//    lowerServiceName: '',
  init: function () {
    console.log('Creating the service - ' + this.name);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'rootFolder',
        message: 'Where do you want to place this service - what is the root folder?',
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
    this.camelServiceName = this._.camelize(this.name);
    this.capitalServiceName = this._.capitalize(this.name);
    this.lowerServiceName = this.name.toLowerCase();
    this.servicePath = path.join('src', this.rootFolder, this.camelServiceName);
    this.mkdir(this.servicePath);
    this.template('_service.js', path.join(this.servicePath, this.camelServiceName + '.svc.js'));
    this.template('_serviceSpec.js', path.join(this.servicePath, this.camelServiceName + '.svc.spec.js'));

    this._addServiceToAppJs(this.projectName, this.camelServiceName, this.lowerServiceName);
  },

  touchIndexHtml: function() {
    // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new service to the scripts)
    var indexHtmlFilePath = 'src/index.html';
    touch(indexHtmlFilePath, {mtime: true});
  },

  _addServiceToAppJs: function app(projectName, camelServiceName, lowerServiceName) {
    var hook   = '])));',
      path   = 'src/app/app.js',
      insert = "    '" + projectName + "." + camelServiceName + "',\n";

    var file   = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = ServiceGenerator;
