'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');


var DirectiveGenerator = yeoman.generators.NamedBase.extend({
//    camelDirectiveName: '',
//    capitalDirectiveName: '',
//    lowerDirectiveName: '',
  init: function () {
    console.log('Creating the directive - ' + this.name);
  },

  askFor: function () {
    var done = this.async();

    var prompts = [
      {
        name: 'rootFolder',
        message: 'Where do you want to place this directive - what is the root folder?',
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
    this.camelDirectiveName = this._.camelize(this.name);
    this.capitalDirectiveName = this._.capitalize(this.name);
    this.lowerDirectiveName = this.name.toLowerCase();
    this.directivePath = path.join('src', this.rootFolder, this.camelDirectiveName);
    this.mkdir(this.directivePath);
    this.template('_directive.js', path.join(this.directivePath, this.camelDirectiveName + '.dir.js'));
    this.template('_directiveSpec.js', path.join(this.directivePath, this.camelDirectiveName + '.dir.spec.js'));
    this.template('_directiveHtml.tpl.html', path.join(this.directivePath, this.camelDirectiveName + '.tpl.html'));
    this.template('_directive.less', path.join(this.directivePath, this.camelDirectiveName + '.less'));

    this._addDirectiveToAppJs(this.projectName, this.camelDirectiveName, this.lowerDirectiveName);
  },

  touchIndexHtml: function() {
    // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new directive to the scripts)
    var indexHtmlFilePath = 'src/index.html';
    touch(indexHtmlFilePath, {mtime: true});
  },

  _addDirectiveToAppJs: function app(projectName, camelDirectiveName, lowerDirectiveName) {
    var hook   = '])));',
      path   = 'src/app/app.js',
      insert = "    '" + projectName + "." + camelDirectiveName + "',\n";

    var file   = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + hook));
    }
  }

});

module.exports = DirectiveGenerator;
