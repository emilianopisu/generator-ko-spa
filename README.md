# generator-ko-spa

![NPM](https://img.shields.io/npm/v/generator-ko-spa.svg)
![MIT](https://img.shields.io/npm/l/generator-ko-spa.svg)
[![Travis](https://img.shields.io/travis/caseyWebb/generator-ko-spa.svg)](https://travis-ci.org/caseyWebb/generator-ko-spa)
[![CodeClimate](https://img.shields.io/codeclimate/github/caseyWebb/generator-ko-spa.svg)](https://codeclimate.com/github/caseyWebb/generator-ko-spa)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/caseyWebb/generator-ko-spa.svg)](https://codeclimate.com/github/caseyWebb/generator-ko-spa/coverage)
[![Dependency Status](https://img.shields.io/david/caseyWebb/generator-ko-spa.svg)](https://david-dm.org/caseyWebb/generator-ko-spa)

Quickly scaffold out [webpack](https://github.com/webpack/webpack) + [KnockoutJS](http://knockoutjs.com/) SPAs, complete with testing (via [karma](https://github.com/karma-runner/karma) & [tape](https://github.com/substack/tape))

Supports ES2015 and incremental loading ootb :collision: :tada:

Includes [jquery](https://github.com/jquery/jquery), [lodash](https://github.com/lodash/lodash), [knockout-punches](http://mbest.github.io/knockout.punches/) & [knockout-fast-foreach](https://github.com/brianmhunt/knockout-fast-foreach) by default because you *probably* want them.

```bash
$ npm install -g yo generator-ko-spa

...

$ mkdir my-app && cd my-app
$ yo ko-spa & yo ko-spa:view home /
$ npm run serve
```

## Generators

#### app `[entry]`
  Generates the basic app structure.

  When optional `entry` parameter is supplied, multi entry points are enabled and
  the app will be created in a subdirectory.

  __This can only be done the first time the app generator is ran__, unless you
  want to go tweaking files later (which isn't difficult, but nice is avoided.)


#### view `[entry] name route`
  Generates a new view (component) with the given route.

  If the project is using multiple entry points, entry will be required.

#### binding `name`
  Generates a new [binding](http://knockoutjs.com/documentation/custom-bindings.html).

#### component `name`
  Generates a new [component](http://knockoutjs.com/documentation/component-binding.html).

#### extender `name`
  Generates a new [extender](http://knockoutjs.com/documentation/extenders.html).

##### filter `name`
  Generates a new [knockout-punches](http://mbest.github.io/knockout.punches/#text-filters) filter.

#### util `name`
  Generates a new utility.

## Scripts

These are all available via `npm run <cmd>`

#### build `webpack`
  Builds the project

#### build:prod `webpack -p`
  Builds the project for production

#### watch `webpack --watch`
  Builds the project once and rebuilds on change.

#### watch:prod
  Same as watch, but with `-p`

#### serve
  Serves app via [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) *(caution: webpack's docs suck. that's why this project exists.)*

#### serve:prod
  Same as serve, but with `-p`
  
  __Note:__ You wouldn't actually want to use this in production.

#### test
  Runs the tests.

#### coverage
  Runs the tests and generates code coverage.
