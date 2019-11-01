/*
* @Author: wangfpp
* @Date:   2019-11-01 13:22:41
* @Last Modified by:   wangfpp
* @Last Modified time: 2019-11-01 13:26:26
*/
const exec = require('child_process').exec;
let getInfo = function(cmd) {
	return new Promise((resolve, reject) => {
		exec(`${cmd}`,(error, stdout, stderr) => {
		  if (error) {
		  	reject(err);
		    process.exit(1)
		  }
		  resolve(stdout.replace('\n', ''))
		});
	})
}
module.exports = { getInfo };