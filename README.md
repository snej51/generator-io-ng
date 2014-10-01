# generator-io-ng

> Yeoman Generator based on the popular ngBoilerplate AngularJS kickstarter.  ngBoilerplate is a best-practice boilerplate for scalable Angular projects built on a highly modular, folder-by-feature structure.  You work in vertical slices on a daily basis (view, controller, service, etc), so why not organize your projects to optimize your workflow, maximize discoverability, and get copy-paste module reuse for free?

## Update

6/13/2014 - I discovered that I had forgotten to npm publish several of the latest fixes and improvements.  If you're using npm to get latest, please "npm install -g generator-io-ng" again to get the latest fixes.

## Quick Start

Install generator-io-ng from npm, run:

```
$ npm install -g generator-io-ng
```

Create a new directory for your project and cd into it:

```
$ mkdir my-new-project
$ cd my-new-project
```

Initiate the generator:

```
$ yo io-ng
```

### Sub-Generators

There's only one subgenerator at the moment
    io-ng:module

To create a new module...

```
$ yo io-ng:module "moduleName"
```

You can specify the root folder of the module via prompt - default is "app".

You have to authorize the overwrite of app.js when the subgenerator adds a dependency for your new module (the default is Y, so you can just hit enter at the prompt).
There's also still a bug with grunt watch that doesn't always see new files in new folders - https://github.com/gruntjs/grunt-contrib-watch/issues/70. Stopping and
re-running grunt watch will always work though.

### More Info

To learn more about ngBoilerplate, [click here](https://github.com/io-ng/io-ng)



## License

MIT
