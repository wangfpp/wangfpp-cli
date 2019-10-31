#!/usr/bin/env node
/*
* @Author: wangfpp
* @Date:   2019-02-28 11:33:07
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-10-31 17:10:51
*/
const fs = require('fs');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const package = require('../package.json'); // 引入package项目的相关信息
const minimist = require('minimist');
const yargs = require('yargs');
const {resolve} = require('path')

let PWD = process.cwd()
let args = yargs.argv._
let projectName = args[1];

if (args.length) {
	fs.mkdir(`${PWD}/${projectName}`,function(err){
	   if (err && err.code === 'EEXIST') {
	       return console.error('目录已经存在');
	   }
	   console.log("目录创建成功。");
	});
} else {
	console.log(
		chalk.black('请输入正确的参数')
	)
}
// clear(); // 清空控制台
// console.log( // 
// 	chalk.red(
// 		figlet.textSync(`love❤️wangfpp`, { horizontalLayout: 'full'})
// 	)
// );
// console.log(process.argv);
