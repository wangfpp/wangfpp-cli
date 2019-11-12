/*
* @Author: wangfpp
* @Date:   2019-11-12 14:55:13
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-11-12 17:52:54
*/
const ora = require('ora');
const fs = require('fs');
const axios = require('axios');
let  downloadGitRepo = require('download-git-repo');
const path = require('path');
const { promisify } = require('util');
downloadGitRepo = promisify(downloadGitRepo);
/**
 * [封装Loading]
 * @param  {Function} fn      [axios函数]
 * @param  {[String]}   message [loading信息]
 * @return {Array}           []
 */
let loadingfn =  (fn, message) => async (...args) => {
	let spinner = ora(`${message}`).start();
	try {
		let { data } = await fn(...args)
		spinner.succeed('获取成功');
		return data;
	} catch (error){
		console.error(error)
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
	return await axios.get('https://api.github.com/orgs/zk-template/repos');
}

let downloadGitRepoFn = async (dir, name) => {
	let apiUrl = `zk-template/${name}`
	await downloadGitRepo(apiUrl, dir, {clone: false});
	return {data: dir};
}

const mkdirfn = async (dir, repo, option) => {
	fs.mkdir(dir, { recursive: option },async function(err){
	   if (err) {
	        if (err.code === "EEXIST") {
	        	return console.error(`文件夹${appName}已存在`);
	        } else {
	       		return console.error(err);
	        } 
	   }
	   let data = await loadingfn(downloadGitRepoFn, '正在下载模板文件...')(dir, repo);
	   console.log(data);	   
	});
}

module.exports = {
	loadingfn,
	fetch_reps_list,
	downloadGitRepoFn,
	mkdirfn
}