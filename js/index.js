#!/usr/bin/env node
/*
* @Author: wangfpp
* @Date:   2019-02-28 11:33:07
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-11-13 09:52:44
*/
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { version } = require('../package.json'); // 引入package项目的相关信息
const minimist = require('minimist');
const yargs = require('yargs');
const {resolve} = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');

const { exists, copy } = require('../lib/copyfolder.js');

const mapAction = { //  command的映射表
	create: {
		alias: 'c',
		description: '创建一个项目',
		examples: [
			'zkcli create x  x',
			'zkcli c x x '
		]
	},
	clone: {
		alias: 'cl',
		description: '克隆一个项目',
		examples: [
			'zkcli clone path',
			'zkcli cl path'
		]
	},
	'*': {
		alias: '',
		description: "command is not found",
		examples: []
	}
}

let commandList = Object.keys(mapAction);

commandList.forEach(command => { // 循环注册command
	let commandItem = mapAction[command];
	program
		.command(command)
		.alias(commandItem.alias)
		.description(commandItem.description)
		.action(() => {
			if (command === '*') {
				console.log(`${commandItem.description} 试一试 ${chalk.green('zkcli --help')}`);
			} else {
				const fn = require(path.resolve(__dirname, `${command}.js`))
				const argv = process.argv.slice(3);
				fn(...argv);
			}
		})
})

// 监听用户的输入
program.on('--help', function() {
	console.log(`  Examples: \n`);
	commandList.forEach(item => {
		mapAction[item]['examples'].forEach(ex => {
			console.log(`    ${ex}`);
		})
	})
})

program
	.option('-v --version', '版本号')
	.version(version)
	.parse(process.argv)


