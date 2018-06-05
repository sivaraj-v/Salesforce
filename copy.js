var fs = require('fs');
var prompt = require('prompt');
var cmd = require('node-command-line'),
    Promise = require('bluebird');
var colors = require('colors/safe');
prompt.message = colors.bgGreen(' ');
prompt.delimiter = colors.green(' ');
const ora = require('ora');
const spinner = ora('Loading Data');
var promisify = require('node-promisify');
var path = require("path");

// destination.txt will be created or overwritten by default.
function Head(value) {
    //return colors.inverse(colors.blackBG(' ' + colors.blue(colors.bold(value)) + ' '));
    return colors.bgBlue(' ' + colors.white(colors.bold(value)) + ' ');
}

function error(value) {
    return colors.yellow(value);
}

function success(value) {
    return colors.green(value);
}

function convertToJson(value) {
    return JSON.stringify(value);
}
const config = {
    source: path.resolve("./"),
    destination: path.resolve("./output"),
    collection: require('./array'),
    valueHolder: '',
    lastElemt: '',
    currentValue: 0
}

function cmd_Exec(value, process) {
    spinner.start('Loading..');
    var value = value.split('/');
    var removeLast = value.splice(-1, 1);
    config.lastElemt = removeLast;
    var urlFormation = value.join('\\');
    config.valueHolder = urlFormation;
    // if (!fs.existsSync(config.valueHolder)) {
    //   //console.log('Alread');
    // }
    Promise.coroutine(function*() {
        var response = yield cmd.run('mkdir ' + 'output\\' + urlFormation);
        if (response.success) {
            spinner.stop();
            console.log(success('mkdir ' + 'output\\' + urlFormation));
            prompt.start();
        } else {
            //  console.log(error('Invalid Comment, Please contact administrator'));
            spinner.stop();
        }
    })();

}

for (i = 0; i < config.collection.length; i++) {
    cmd_Exec(config.collection[i]);
}