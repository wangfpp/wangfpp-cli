/*
* @Author: wangfpp
* @Date:   2019-11-07 18:31:24
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-11-12 17:08:00
*/
const inquirer = require('inquirer');
const fs = require("fs");
const path = require('path');
const { getInfo } = require('../lib/userinfo.js');
const { fetch_reps_list, loadingfn, downloadGitRepoFn, mkdirfn } = require('../lib/comm.js');
const rmdir = require('../lib/rmdir.js');

const curr_path = process.cwd();



module.exports = async function(app) {
	let appName = app;
	inquirer.prompt([
		{
			name: 'author',
			type: 'input',
			message: '作者',
			default: () => {
				return getInfo('git config user.name');
			}
		},
		{
			name: 'email',
			type: 'input',
			message: '邮箱',
			default: () => {
				return getInfo('git config user.email');
			}
		},
		{
			name: 'repo',
			type: 'list',
			message: '选择一个模板',
			choices: async () => {
				let data = await loadingfn(fetch_reps_list, '正在获取模板列表...');
				let filter_repo = data.filter(item => {
					return item.name.includes('template');
				});
				let repoList = filter_repo.map(item => item.name);
				return repoList; 
			}
		}
	]).then(async result => {
		const { repo } = result;
		let dir = path.resolve(__dirname, `${curr_path}/${appName}`)
		if (fs.existsSync(dir)) {
			let {cover} = await inquirer.prompt([
				{
					name: 'cover',
					type: 'confirm',
					message: `${appName}项目已经存在是否覆盖`
				}
				])
				if (cover) { // 选择覆盖文件 先删除后创建
					rmdir(dir, async err => {
						if (err) {
							return console.error(`删除失败`);
						} else {
							console.log(1111)
							await mkdirfn(dir, repo, true);
						}
					})
				} else {
					process.exit(0)
				}
		} else {
			await mkdirfn(dir, repo, true);
		}		
	})
}















