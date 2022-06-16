const path = require('path')
const git = require('isomorphic-git')
const commandExists = require('command-exists');
const http = require('isomorphic-git/http/node')
const fs = require('fs')
const fse = require('fs-extra')
const { spawnSync, spawn } = require('child_process');

function checkForRust() {
	return new Promise((resolve, reject) => {
		commandExists('rustup', (e, exists) => {
			if (exists) {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	})
}

async function build_spwn() {
	console.log('Building SPWN... (Step 1: Checking for Rust)')
	const exists = await checkForRust();
	if (exists && fs.existsSync('C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\BuildTools\\SDK')) {
		console.log('Building SPWN... (Step 2: downloading)')
		const dir = path.join(process.cwd(), 'spwn')
		git.clone({ fs, http, dir, url: 'https://github.com/Spu7Nix/SPWN-language' }).then(() => {
			console.log('Building SPWN... (Step 3: building)')
			spawnSync('cd spwn && cargo build --release', {shell: true, stdio: "inherit"});
			console.log('Building SPWN... (Step 4: installing)')
			fs.mkdirSync('C:\\Program Files\\spwn\\latest')
			fse.moveSync('spwn/libraries', 'C:\\Program Files\\spwn\\latest\\libraries')
			fs.renameSync('spwn/target/release/spwn.exe', 'C:\\Program Files\\spwn\\latest\\spwn.exe')
			fs.rmSync('spwn', {recursive: true});
			fs.writeFileSync('C:\\Program Files\\spwn\\latest\\tags.txt', 'latest')
			console.log('Latest commit of SPWN installed! Switch to the latest commit using "spvm use latest".')
		})
	} else {
		console.log(`Rust or Visual Studio Build tools are not installed, install Rust and/or Visual Studio 2017 build tools here: 
		 (Visual Studio build tools necessary for building SPWN)
		- Rust: https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe
		- Visual Studio 2017 build tools (USE C++ BUILD TOOLS WITH WINDOWS 10 SDK: https://aka.ms/vs/17/latest/vs_BuildTools.exe)`)
	}
}
module.exports = build_spwn
