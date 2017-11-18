/*
	npm -y init 

	必备模块:
		mysql
		express
		ejs

		express-session
		body-parser
		multer

	分模块结构搭建



	安装 sublime 的插件:
		ctrl + p 
		install 回车
		输入  autofilename


*/
	// 加载框架模块
	const express = require('express');
	// 加载模板文件
	const ejs = require('ejs');
	// 加载数据库操作
	const mysql = require('mysql');
	// 加载session会话控制模块
	const session = require('express-session'); 
	// 加载请求解析模块
	const bodyParser = require('body-parser');
	// 实例化应用
	var app = express();


	// 创建 application/x-www-form-urlencoded 的解析 
	// 当 extended 设置为 false , express 会使用 querystring 解析URL编码的数据
	app.use(bodyParser.urlencoded( { extended: false} ));
	// 创建 application/json 解析
	app.use(bodyParser.json() );



	// 使用中间件初始化 session
	app.use(session( {
		// cookie 的名字
		'name': 'ssid',
		// 定义一个签名，防止别人篡改
		'secret': 'woshishabi',
		// 强制保存 session ，就算没有变化
		'resave': true,
		// 强制将未初始化的session存储
		'saveuninitialized': true,

		// 'store': Memcache 

	} ));





	// 替换斜线
	var dirName = __dirname.replace(/\\/g, '/');
	// 配置模板目录
	app.set('views', dirName + '/views');
	// 绑定模板引擎，设置后缀
	app.engine('html', ejs.__express);
	// 注册模板引擎
	app.set('view engine', 'html');
	// 使用静态资源
	app.use(express.static(dirName + '/public'));



	// 加载用户模块
	var userRouter = require('./router/user.js');
	// 挂载模块
	app.use('/user', userRouter);
	// 加载文章模块
	var articleRouter = require('./router/article.js');
	// 挂载模块
	app.use('/article', articleRouter);
	// 加载登录模块
	var loginModel = require('./router/login.js');
	// 挂载模块
	app.use('/login', loginModel);

	// 定义根路由
	app.get('/', (req, res) => {
		res.render('<h1>Welcome Blog</h1>');
	});

	




	// 监听
	app.listen(8888, 'localhost', () => {
		console.log('http://localhost:8888');
	});


// 