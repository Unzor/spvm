#!/usr/bin/env node
const { promises: { readdir } } = require('fs')

const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
	
var urlExists = require('url-exists');
var fprompt = require('prompt-sync')();
var unzipper = require('unzipper');

var version = '1.0.3';

function download(v, f){
	const fs = require('fs');
	const https = require('https');
	// File URL
	var url;
	if (v !== '0.0.2' && v !== '0.0.1') {
		url = `https://spwn-downloads.seven7four4.repl.co/`+v.replaceAll(".", "")+'.msi';
	} else {
		url = `https://spwn-downloads.seven7four4.repl.co/`+v.replaceAll(".", "")+'.zip';
	}

urlExists(url, function(err, exists) {
  if (exists) {
	  // Download the file
	  https.get(url, (res) => {

		// Open file in local filesystem
		var filename;
		if (v !== '0.0.2' && v !== '0.0.1') {
			filename = `${v.replaceAll(".", "")}.msi`;
		} else {
			filename = `${v.replaceAll(".", "")}.zip`;
		}
		const file = fs.createWriteStream(filename);

		// Write data into local file
		res.pipe(file);

		// Close the file
		file.on('finish', () => {
			file.close();
			setTimeout(()=>{
				f()
			},1000)
		});

	}).on("error", (err) => {
		console.log(err)
		console.log("Version not found! Exiting...");
		process.exit(0);
	});
  } else {
	  console.log("Version not found! Exiting...")
	  process.exit(0);
  }
});
	
};

function rangethrough(sequence, str) {
    var a2 = [];
    str.split(sequence[0]).forEach(function(e) {
        var h = e.split(sequence[1]);
        if (h.length == 1) {
            h = h[0];
        }
        a2.push(h)
    })
    var a3 = [];
    a2.forEach(function(e) {
        var type = typeof e;
        if (type == "object") {
            a3.push(sequence[0] + e[0] + sequence[1]);
            a3.push(e[1]);
        } else {
            a3.push(e);
        }
    })
    return a3;
}

const fs = require('fs');
const fse = require('fs-extra');
const {execSync, spawnSync} = require('child_process');
var command = process.argv[2];
var arg = process.argv[3];

function get_ver(){
	let name = 'spvm_'+Date.now()+'.spwn';
	fs.writeFileSync(name, "$.print($.spwn_version())");
	var r = execSync('spwn build '+name+' -l').toString()
	fs.unlinkSync(name);
	return rangethrough(['———————————————————————————\n','———————————————————————————'], r)[1].replaceAll("\x1B", "").replaceAll("[0m", "").replaceAll("\n", "").replaceAll("[37m", "")
}

if (!fs.existsSync('C:/Program Files/spwn/tags.txt')) {
	fs.writeFileSync('C:/Program Files/spwn/tags.txt', fprompt('What is the current SPWN version? (this will be used for when switching versions. Example is 0.0.8.) '))
}

var version = fs.readFileSync('C:/Program Files/spwn/tags.txt').toString();

function use(v){
	if (command == "use") {
		if (version !== v) {
		fse.renameSync('C:/Program Files/spwn/tags.txt', 'C:/Program Files/spwn/'+version+'/tags.txt')
		fse.renameSync('C:/Program Files/spwn/spwn.exe', 'C:/Program Files/spwn/'+version+'/spwn.exe')
		fse.moveSync('C:/Program Files/spwn/libraries', 'C:/Program Files/spwn/'+version+'/libraries')
		if (command == 'use') {
			console.log('Switching to '+v+'...')
		}
		setTimeout(function(){
			if (command == 'use') {
				console.log('Moving files...');
			}
			fse.renameSync('C:/Program Files/spwn/'+v+'/spwn.exe', 'C:/Program Files/spwn/spwn.exe')
			fse.moveSync('C:/Program Files/spwn/'+v+'/libraries', 'C:/Program Files/spwn/libraries')
			fse.moveSync('C:/Program Files/spwn/'+v+'/tags.txt', 'C:/Program Files/spwn/tags.txt')
			if (command == 'use') {
				console.log('Switched to version '+v+'.')
			}
		}, 1000)
		} else {
			console.log('Version is already being used!')
		}
	} else {
		fse.renameSync('C:/Program Files/spwn/tags.txt', 'C:/Program Files/spwn/'+version+'/tags.txt')
		fse.renameSync('C:/Program Files/spwn/spwn.exe', 'C:/Program Files/spwn/'+version+'/spwn.exe')
		fse.moveSync('C:/Program Files/spwn/libraries', 'C:/Program Files/spwn/'+version+'/libraries')
		if (command == 'use') {
			console.log('Switching to '+v+'...')
		}
		setTimeout(function(){
			if (command == 'use') {
				console.log('Moving files...');
			}
			fse.renameSync('C:/Program Files/spwn/'+v+'/spwn.exe', 'C:/Program Files/spwn/spwn.exe')
			fse.moveSync('C:/Program Files/spwn/'+v+'/libraries', 'C:/Program Files/spwn/libraries')
			fse.moveSync('C:/Program Files/spwn/'+v+'/tags.txt', 'C:/Program Files/spwn/tags.txt')
			if (command == 'use') {
				console.log('Switched to version '+v+'.')
			}
		}, 1000)
	}
}



function move_to_cv() {
	if (fs.existsSync('C:/Program Files/spwn/spwn.exe')) {
		if (!fs.existsSync('C:/Program Files/spwn/0.0.8')) {
			fs.mkdirSync('C:/Program Files/spwn/'+version)
		}
		use(version);
	}
}


if (command == 'use') {
	if (arg) {
		if (fs.existsSync('C:/Program Files/spwn/'+version)) {
			use(arg);
		} else {
			console.log('Version '+arg+' is not installed! Install it using "spvm install '+arg+'".')
		}
	} else {
		console.log('No version specified, exiting...')
	}
}

if (command == 'install') {
	if (arg) {
		if (arg !== '0.0.1' && arg !== '0.0.2') {
			console.log('Installing version '+arg+'... (Step 1: downloading...)')
			download(arg, () => {
				console.log('Installing version '+arg+'... (Step 2: extracting...)')
				var dir = 'C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.','')+'\\PFiles\\spwn'
				spawnSync('msiexec /a '+arg.replaceAll('.','')+'.msi /qb TARGETDIR="C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.','')+"\"", {shell: true, detached: true})
				console.log('Installing version '+arg+'... (Step 3: installing...)')
				move_to_cv();
				fs.unlinkSync(arg.replaceAll('.','')+'.msi');
				fse.moveSync(dir+'\\libraries', 'C:/Program Files/spwn/'+arg+'/libraries')
				fs.renameSync(dir+'\\spwn.exe', 'C:/Program Files/spwn/'+arg+'/spwn.exe')
				fs.writeFileSync('C:/Program Files/spwn/'+arg+'/tags.txt', arg)
				fs.rmSync('C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.',''), {recursive: true});
				console.log('SPWN version '+arg+' installed! Switch to '+arg+' using "spvm use '+arg+'".')
			});
		} else {
			console.log('Installing version '+arg+'... (Step 1: downloading...)')
			download(arg, () => {
				console.log('Installing version '+arg+'... (Step 2: extracting...)')
				fs.renameSync(arg.replaceAll('.', '')+'.zip', 'C:\\Program Files\\spwn\\'+arg.replaceAll('.', '')+'.zip')
				var dir;
				if (arg == '0.0.1') {
					dir = 'C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.','')+'\\spwn-test'
				} else {
					dir = 'C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.','')+'\\spwn-lang-win'
				}
								fs.createReadStream('C:\\Program Files\\spwn\\'+arg.replaceAll('.', '')+'.zip')
  .pipe(unzipper.Extract({ path: 'C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.','') })) .on('close', function (entry) {
console.log('Installing version '+arg+'... (Step 3: installing...)')
setTimeout(()=>{
					move_to_cv();
				fs.unlinkSync('C:\\Program Files\\spwn\\'+arg.replaceAll('.', '')+'.zip');
				fse.moveSync(dir+'\\libraries', 'C:/Program Files/spwn/'+arg+'/libraries')
				fs.renameSync(dir+'\\spwn.exe', 'C:/Program Files/spwn/'+arg+'/spwn.exe')
				fs.writeFileSync('C:/Program Files/spwn/'+arg+'/tags.txt', arg)
				fs.rmSync('C:\\Program Files\\spwn\\extracted_'+arg.replaceAll('.',''), {recursive: true});
				console.log('SPWN version '+arg+' installed! Switch to '+arg+' using "spvm use '+arg+'".')
}, 500)
  });
			});
		}
	} else {
		console.log('No version specified, exiting...')
	}
}

if (command == 'uninstall') {
	if (arg) {
		if (version !== arg) {
			if (fs.existsSync('C:\\Program Files\\spwn\\'+arg)) {
				fs.rmSync('C:\\Program Files\\spwn\\'+arg, {recursive: true});
			} else {
				console.log('Version not installed or does not exists, exiting...')
				process.exit(0);
			}
			console.log('Version succesfully uninstalled.')
		} else {
			console.log('Version is currently in use! Please switch to another version before uninstalling this version.')
		}
	} else {
		console.log('No version specified, exiting...')
	}
}

if (command == 'list') {
	var versions = getDirectories('C:\\Program Files\\spwn').map(x=>x.includes('.')?x:null).join(',').replace(/null/g, '').replace(/,,/g, '').split(',').map(x=>version==x?x+" <- (currently using)":x).join('\n');
	console.log(versions);
}

if (command == 'version') {
	console.log(version);
}

if (!command) {
	console.log(`SPVM version v${version}
	Options:
	- install: installs a version.
	- use: switches to a SPWN version.
	- list: lists all versions.
	- uninstall: uninstalls a version.`)
}
