# 创建自己的Cli命令行工具

# 将要实现的功能
- 初始化项目
```bash
  zkcli create projectName
```
- 定制化项目
- 其他命令工具

# 使用方法

```bash 
  npm install -g zkcli

```
```bash
  Usage: zkcli [options] [command]


  Commands:

    create|c   创建一个项目
    clone|cl   克隆一个项目
    *          command is not found

  Options:

    -h, --help     output usage information
    -v --version   版本号
    -V, --version  output the version number

  Examples: 

    zkcli create x  x
    zkcli c x x 
    zkcli clone path
    zkcli cl path
```