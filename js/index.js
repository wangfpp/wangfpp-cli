#!/usr/bin/env node
/*
* @Author: wangfpp
* @Date:   2019-02-28 11:33:07
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-02-28 20:11:48
*/
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const package = require('../package.json'); // 引入package项目的相关信息
const minimist = require('minimist');


// clear(); // 清空控制台
// console.log( // 
// 	chalk.green(
// 		figlet.textSync(`${package.name}`, { horizontalLayout: 'full'})
// 	)
// );
console.log(process.argv);
