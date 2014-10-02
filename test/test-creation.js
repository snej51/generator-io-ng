/*global describe, before, it, beforeEach */
'use strict';

var path    = require('path');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;
var assert  = yeoman.assert;
var fs      = require('fs');
var test    = require('./helper');

describe('Angular-RequireJS generator appPath option', function () {
  var appPath = 'app';
  var appName = 'Generator io-ng Testing';
  var abbr = 'foo';
  var expected = {
    app: [
      'src/app/about/about.js',
      'src/app/about/about.tpl.html',
      'src/app/home/home.js',
      'src/app/home/home.spec.js',
      'src/app/home/home.less',
      'src/app/home/home.spec.js',
      'src/app/app.js',
      'src/app/app.spec.js',
      'src/app/README.md',
      'src/assets/README.md',
      'src/common/README.md',
      'src/less/main.less',
      'src/less/README.md',
      'src/less/variables.less',
      'src/index.html',
      'src/README.md'
    ],
    controller: [
      'src/common/'+ abbr + '/' + abbr + '.ctrl.js',
      'src/common/'+ abbr + '/' + abbr + '.ctrl.spec.js'
    ],
    directive: [
      'src/common/'+ abbr + '/' + abbr + '.dir.js',
      'src/common/'+ abbr + '/' + abbr + '.dir.spec.js',
      'src/common/'+ abbr + '/' + abbr + '.ctrl.js',
      'src/common/'+ abbr + '/' + abbr + '.svc.js',
      'src/common/'+ abbr + '/' + abbr + '.less',
      'src/common/'+ abbr + '/' + abbr + '.tpl.html'
    ],
    service: [
      'src/common/'+ abbr + '/' + abbr + '.svc.js',
      'src/common/'+ abbr + '/' + abbr + '.svc.spec.js'
    ],
    factory: [
      'src/common/'+ abbr + '/' + abbr + '.fty.js',
      'src/common/'+ abbr + '/' + abbr + '.fty.spec.js'
    ],
    module: [
      'src/app/'+ abbr + '/' + abbr + '.mod.js',
      'src/app/'+ abbr + '/' + abbr + '.mod.spec.js',
      'src/common/'+ abbr + '/' + abbr + '.less',
      'src/common/'+ abbr + '/' + abbr + '.tpl.html'
    ]
  };
  var mockPrompts = {
    app: {
      projectName: appName,
      author: 'Jens Oswald'
    },
    controller: {
      controllerName: abbr,
      rootFolder: 'common'
    },
    directive: {
      directiveName: abbr,
      rootFolder: 'common',
      withController: true,
      withService: true
    },
    service: {
      serviceName: abbr,
      rootFolder: 'common'
    },
    factory: {
      factoryName: abbr,
      rootFolder: 'common'
    },
    module: {
      moduleName: abbr,
      rootFolder: 'app'
    }
  };
  var genOptions = {
    'force': true,
    'appPath': appPath,
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };
  var deps = [
    '../../app'
  ];

  beforeEach(function (done) {
    this.angularRequire = {};

    this.angularRequire.app = helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, 'temp'), function () {
        var out = [
          '{',
          '  "generator-angular-require": {',
          '    "appPath": "app",',
            '    "appName": "' + appName + '"',
          '  }',
          '}'
        ];
        fs.writeFileSync('.yo-rc.json', out.join('\n'));
      })
      .withArguments([appName])
      .withOptions( genOptions )
      .withPrompts(mockPrompts.app)
      .withGenerators(deps);

    done();
  });

  describe('App files', function () {
    it('should generate dotfiles for apppath and creates expected JS files', function (done) {
      this.angularRequire.app
        .on('end', function() {
          assert.file(expected.app);
          done();
        });
    });
  });

  describe('Service Subgenerators', function () {
    var subGeneratorTest = function(generatorType, name, done) {
      test.createSubGenerator(
        generatorType,
        [name],
        [
            '../../' + generatorType,
          [
            helpers.createDummyGenerator(),
            'io-ng:app'
          ]
        ],
        genOptions,
        mockPrompts[generatorType],
        function() {
          assert.file(expected[generatorType]);
          done();
        }
      );
    };

    it('should generate a new controller', function (done) {
      this.angularRequire.app
        .on('end', function () {
          subGeneratorTest('controller', abbr, done );
        });
    });

    it('should generate a new directive', function (done) {
      this.angularRequire.app
        .on('end', function () {
          subGeneratorTest('directive', abbr, done);
        });
    });

    it('should generate a new factory', function (done) {
      this.angularRequire.app
        .on('end', function () {
          subGeneratorTest('factory', abbr, done);
        });
    });

    it('should generate a new service', function (done) {
      this.angularRequire.app
        .on('end', function () {
          subGeneratorTest('service', abbr, done);
        });
    });
  });
});