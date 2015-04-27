(function() {
	'use strict';

	var child_process = require('child_process'),
		fs = require('fs'),
		commandName,
		fileName;

	if (process.argv[2] === undefined || process.argv[3] === undefined) {
		throw 'Invalid number of arguments. Expect filename and method';
	}

	fileName = process.argv[2];
	commandName = process.argv[3];

	fs.watch(fileName, function(){
		console.log(fileName + ' changed!');

		switch(commandName) {
			case 'copy':
				copyFile();
				break;
			case 'del':
				deleteFile();
				break;
			default:
				console.log(commandName + ': command not found');
		}
	});

	function copyFile() {
		var now = new Date().toString(),
			newFileName = fileName.split('.')[0] + '_' + now.split(' ').join('_') + '.' + fileName.split('.')[1];

		child_process.spawn('cp', [fileName, newFileName]);
		console.log('File ' + fileName + ' copied to ' + newFileName);
	}

	function deleteFile() {
		child_process.spawn('rm', [fileName]);
		console.log('File ' + fileName + ' was deleted');
	}

	console.log('Watching ' + fileName + ' changes');
})();