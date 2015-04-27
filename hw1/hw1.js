'use strict';

const fs = require('fs'),
	child_process = require('child_process');
var fileName,
	commandName;


if (process.argv[2] === undefined || process.argv[3] === undefined) {
	throw 'Invalid number of arguments. Expect filename and method';
}

fileName = process.argv[2];
commandName = process.argv[3];

function copyFile() {
	var now = new Date().toString(),
		newFileName = fileName.split('.')[0] + '_' + now.split(' ').join('_') + '.' + fileName.split('.')[1];

	console.log('File ' + fileName + ' will be copied to ' + newFileName);
	return child_process.spawn('cp', [fileName, newFileName]);
}

function deleteFile() {
	console.log('File ' + fileName + ' will be deleted');
	return child_process.spawn('rm', [fileName]);
}

fs.watch(fileName, function(){
	var action,
		now;

	console.log(fileName + ' changed!');

	switch(commandName) {
		case 'copy':
			action = copyFile();
			break;
		case 'del':
			action = deleteFile();
			break;
		default:
			console.log(commandName + ': command not found');
	}

	if (action) {
		action.stdout.pipe(process.stdout);
	}
});

console.log('Watching ' + fileName + ' changes');