'use strict';

var path = require('path');
var fs = require('fs-extra');
var helpers = require('yeoman-generator').test;
var temp = require('temp').track();
var assert = require('assert');
var exec = require('child_process').exec;
var async = require('async');

describe('io-ng generator', function() {
  var expectedProjectFiles = [
    'src/app/about/about.js',
    'src/app/about/about.tpl.html',
    'src/app/home/home.js',
    'src/app/home/home.spec.js',
    'src/app/home/home.less',
    'src/app/home/home.tpl.html',
    'src/app/app.js',
    'src/app/app.spec.js',
    'src/app/README.md',
    'src/assets/README.md',
    'src/common/README.md',
    'src/less/main.less',
    'src/less/README.md',
    'src/less/variables.less',
    'src/index.html',
    'src/README.md',
    '.bowerrc',
    'Gruntfile.js',
    'bower.json',
    'package.json',
    'README.md'
  ];
  /**
   * Clean up temp directory
   */
  afterEach(function() {
    fs.remove( path.join( __dirname, 'temp', '*' ) );
    fs.remove( path.join( __dirname, 'temp', '.*' ) );
  });

  /**
   * Setup the temp directory
   */
  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) {
        console.log('Error', err);
        return err;
      }
      done();
    });
  });

  /**
   * Test project creation with
   */
  describe('Application generator without sample module', function() {
    beforeEach(function(done) {
      runGenerator('app',
        '',
        this, {
          'projectName': 'generator-io-ng test',
          'author': 'Jens Oswald'
        }, done
      );
    });

    it('should create expected files', function() {
      assert.file(expectedProjectFiles);
    });
  });


  /**
   * angularjs sub generator tests
   */

  describe('AngularJS Sub Generators Tests', function() {

    describe('Generate an AngularJS controller with tests through the sub-generator', function() {
      beforeEach(function(done) {
        runGenerator('controller',
          '',
          this, {
            'controllerName': 'core-xyz-foo',
            'rootFolder': 'common'
          }, done);
      });

      it('should generate an angular controller file', function(done) {
        assert.file('src/common/coreXyzFoo/coreXyzFoo.ctrl.js');
        assert.file('src/common/coreXyzFoo/coreXyzFoo.ctrl.spec.js');
        done();
      });
    });
  });
});

//Extending the yeoman helper method
function runGenerator(generatorType, name, context, promptAnswers, done) {
  var workspace = context.workspace = path.join( __dirname, 'temp' );
  helpers.testDirectory(workspace, function(err) {

    if (err) {
      return done(err);
    }

    this.app = helpers.createGenerator('io-ng:' + generatorType, [
      path.resolve(__dirname, '../' + generatorType)
    ], [name]);

    helpers.mockPrompt(this.app, promptAnswers);

    this.app.options['skip-install'] = true;

    this.app.run({}, function() {
      done();
    });

  }.bind(context));
}
