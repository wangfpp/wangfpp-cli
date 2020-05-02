/*
* @Author: wangfpp
* @Date:   2019-11-12 14:55:13
* @Last Modified by:   wangfpp
* @Last Modified time: 2020-05-02 13:08:57
*/
const ora = require('ora');
const fs = require('fs');
const axios = require('axios');
let  downloadGitRepo = require('download-git-repo');
const path = require('path');
const Chalk = require('chalk');
const { promisify } = require('util');
downloadGitRepo = promisify(downloadGitRepo);
/**
 * [封装Loading]
 * @param  {Function} fn      [axios函数]
 * @param  {[String]}   message [loading信息]
 * @return {Array}           []
 */
let loadingfn = (fn, message) => async (...args) => {
	let spinner = ora(`${message}`).start();
	try {
		let {data} = await fn(...args)
		spinner.succeed('获取成功');
		return data;
	} catch (error){
		// console.error(error)
		// throw Error(error);
		spinner.fail('获取失败1');
	}
	spinner.stop();

}

/**
 * [description] 获取仓库列表
 * @param  {[fn]} spinner [loading状态]
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
let fetch_reps_list = async (spinner, message) => {
	try {
		return await axios.get('https://api.github.com/orgs/zk-template/repos');
	}catch (err) {
		console.log('');
		console.log(Chalk.red(err.message));
		process.exit(1)
		return { data: []};
	}
	 
}

let downloadGitRepoFn = async (dir, name) => {
	let apiUrl = `zk-template/${name}`
	let downStatus = await downloadGitRepo(apiUrl, dir, {clone: false});
	if (downStatus) {
		process.exit(1)
		return {data: null};
	}
	return {data: dir};
}

const mkdirfn = async (dir, repo, option) => {
	let fsResult = await fs.mkdirSync(dir, { recursive: option });
	if (fsResult) {
        if (fsResult.code === "EEXIST") {
        	return console.error(`文件夹${appName}已存在`);
        } else {
       		return console.error(fsResult);
        } 
   }
   let data = await loadingfn(downloadGitRepoFn, '正在下载模板文件...')(dir, repo);
   return data;
}

module.exports = {
	loadingfn,
	fetch_reps_list,
	downloadGitRepoFn,
	mkdirfn
}