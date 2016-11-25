
Application Structure

## Structure ##

	/bower_components
	/Content (static files)
	/app
	/node_modules
	/Gulp file
	/index.html

## Running the app #

Make sure you have Node.js installed

Installing node

```
# on OSX use homebrew
brew install node
# on Windows use chocolatey
choco install nodejs

```

Running on localhost

```
$ npm install
$ gulp run-local

```

For Production

```
$ gulp live --server=live --path='__PATH__'
// Replace __PATH__ with the path of the apache serve dir

```
