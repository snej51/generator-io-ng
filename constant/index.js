/**
 * Created by joswald on 01.10.14.
 */
'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var ConstantGenerator = yeoman.generators.NamedBase.extend({
//    camelConstantName: '',
//    capitalConstantName: '',
//    lowerConstantName: '',
  init: function () {
    console.log('Creating the constant - ' + this.name);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'rootFolder',
        message: 'Where do you want to place this constant - what is the root folder?',
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
    this.camelConstantName = this._.camelize(this.name);
    this.capitalConstantName = this._.capitalize(this.name);
    this.lowerConstantName = this.name.toLowerCase();
    this.constantPath = path.join('src', this.rootFolder, this.camelConstantName);
    this.mkdir(this.constantPath);
    this.template('_constant.js', path.join(this.constantPath, this.camelConstantName + '.fty.js'));
    this.template('_constantSpec.js', path.join(this.constantPath, this.camelConstantName + '.fty.spec.js'));
    this._addConstantToAppJs(this.projectName, this.camelConstantName, this.lowerConstantName);
  },

  touchIndexHtml: function() {
    // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new constant to the scripts)
    var indexHtmlFilePath = 'src/index.html';
    touch(indexHtmlFilePath, {mtime: true});
  },

  _addConstantToAppJs: function app(projectName, camelConstantName, lowerConstantName) {
    var hook   = '])));',
      path   = 'src/app/app.js',
      insert = "    '" + projectName + "." + camelConstantName + "',\n";

    var file   = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = ConstantGenerator;
