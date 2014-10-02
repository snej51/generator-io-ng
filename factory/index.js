/**
 * Created by joswald on 01.10.14.
 */
'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var FactoryGenerator = yeoman.generators.NamedBase.extend({
//    camelFactoryName: '',
//    capitalFactoryName: '',
//    lowerFactoryName: '',
  init: function () {
    console.log('Creating the factory - ' + this.factoryName);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'factoryName',
        message: 'How would you spell your factory - What is the name of the factory?',
        default: 'factory'
      },
      {
        name: 'rootFolder',
        message: 'Where do you want to place this factory - what is the root folder?',
        default: 'app'
      }
    ];

    this.prompt(prompts, function (props) {
      this.factoryName = props.factoryName;
      this.rootFolder = props.rootFolder;
      done();
    }.bind(this));
  },

  files: function () {
    this.projectName = this.config.get('projectName');
    this.camelFactoryName = this._.camelize(this.factoryName);
    this.capitalFactoryName = this._.capitalize(this.factoryName);
    this.lowerFactoryName = this.factoryName.toLowerCase();
    this.factoryPath = path.join('src', this.rootFolder, this.camelFactoryName);
    this.mkdir(this.factoryPath);
    this.template('_factory.js', path.join(this.factoryPath, this.camelFactoryName + '.fty.js'));
    this.template('_factorySpec.js', path.join(this.factoryPath, this.camelFactoryName + '.fty.spec.js'));
    this._addFactoryToAppJs(this.projectName, this.camelFactoryName, this.lowerFactoryName);
  },

  touchIndexHtml: function() {
    // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new factory to the scripts)
    var indexHtmlFilePath = 'src/index.html';
    touch(indexHtmlFilePath, {mtime: true});
  },

  _addFactoryToAppJs: function app(projectName, camelFactoryName, lowerFactoryName) {
    var hook   = '])));',
      path   = 'src/app/app.js',
      insert = "    '" + projectName + "." + camelFactoryName + "',\n";

    var file   = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = FactoryGenerator;