__Syntax: gulp <task> [options]__

Local config can be defined in ./Gulpfile.js/config/local.js and will be merged
over the default configs.

## build[:client][:mobile][:api] [-p] [--no-babel] [--no-lint] [--safari] [--rebuild] [--push]
> builds client spas (and legacy bundles) and injects them into the
> appropriate .html pages

  - -p
    build for 'production'

  - --no-babel
    skip Babel compilation (faster builds, but only works in ES2015 compliant browsers)

## watch [-p] [--no-babel]
> performs same task as `build`, except it does not terminate
> and updates on saved changes

## serve [-p] [--no-babel]
> starts the webpack dev server

## test [--coverage]
> runs tests on all apps

  - --coverage
    generate test coverage report
