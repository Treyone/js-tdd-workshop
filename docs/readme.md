# JavaScript TDD Template

This is a *template* project for TDD in JavaScript, this template define an architecture you can use to start your
JavaScript development.

I made some implementation choices :

 * [mocha][1] as a test runner
 * [ChaiJS][2] as an assertion framework, and bdd usage
    This mean that assertion will look like : **expect(true).to.be.true;**
 * Tests files will be in : **src/main/tests/js**
 * Sources files will be in : **src/main/js**

This project is based on [Grunt Js][3], which is base on [Node.js][4], so node js is required even if you won't make a node application.
Grunt must also be installed :

## Requirements

[Grunt Js][3] is required, maybe you will need bower, so you can install it globally (**-g**)

    npm install -g grunt-cli bower

## Usage

Clone the project :

    git clone https://bitbucket.org/mimiz33/javascript-tps.git

Retreive node dependencies

    npm install

Then run tests

   grunt test

## Tasks

 * **test** : The Test task, will run the tests.
 * **dev** : This task, will run the tests, and watch for filesytem modification, then run the tests again,
 this is used when doing TDD, to reduce feedback of tests crashes.

## test.html

The **test.hmtl** file is the mocha runner, this is the file used by [Grunt Js][3] (and PhantomJS) to run the tests

## Adding files :

If you want to add some files , you may want to edit configurations files, or observe a certain usage.

### Adding a JavaScript file :

A source file must be added in **src/main/js**, tests suites, must be added in **src/main/tests/js**
and the files referenced in the **test.html** file.

## TODO :

 * Use mocha / chai / sinon dependencies in tests
 * add uglify / minimisation
    * should rerun tests after uglify
 * Should not have to modify HTML file , even GruntFile.js
 * Finnish the Karma setup
    * use karma with Grunt
 * Add the packaging / versionning of the project



  [1]: http://visionmedia.github.io/mocha/
  [2]: http://chaijs.com/
  [3]: http://gruntjs.com/
  [4]: http://nodejs.org/