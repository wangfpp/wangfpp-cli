#!/usr/bin/env node
/*
* @Author: wangfpp
* @Date:   2019-02-28 11:33:07
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-11-01 13:39:45
*/
const fs = require('fs');
const chalk = require('chalk');
const figlet = require('figlet');
const package = require('../package.json'); // 引入package项目的相关信息
const minimist = require('minimist');
const yargs = require('yargs');
const {resolve} = require('path');
const program = require('commander');
const inquirer = require('inquirer');

const { getInfo } = require('../lib/userinfo.js'); // 获取当前user信息

let PWD = process.cwd()
let args = yargs.argv._
let projectName = args[1];
let packageJson = {
	version: "0.0.1"
}; // package.json的构建信息

// cli argv参数获取
program
	.version(package.version, '-v, --version')
	.description('自定义项目创建cli工具')
	.option('create,  --init', '初始化项目')
	.option('-d, --download', '下载一些东西')
	.parse(process.argv);

// prompt Terminal交互获取项目信息
if (program.init) {
	inquirer.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: '请输入项目名称'
		},
		{
			type: 'input',
			name: 'description',
			message: '项目描述信息'
		},
		{
			type: 'input',
			name: 'anthor',
			message: '项目作者',
			default: () => {
				return getInfo('git config user.name');
			}
		},
		{
			type: 'input',
			name: 'email',
			message: '电子邮箱',
			default: () => {
				return getInfo('git config user.email');
			}
		},
		{
			type: 'list',
			name: 'type',
			message: '使用哪种项目模板?',
			choices: ['Vue', 'React']
		}
	]).then(result => {
		for(let k in result){
			if (k !== 'type') {
				packageJson[k] = result[k];
			}
		}
		console.log(packageJson);
	})
}

if (program.download) {
	console.log('downloading.....')
}