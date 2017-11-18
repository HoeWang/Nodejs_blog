
	// 加载框架
	const express = require('express');
	// 实例化路由对象
	const router = express.Router();

	// 使用路由中间件
	router.use((req, res, next) => {

		console.log('所有请求都会经过我这里 user.js 模块');

		// 执行下一个函数
		next();
	});


	// 用户列表  localhost:8888/user/index
	router.get('/index', (req, res) => {

		// 使用模板并分配数据
		res.render('user/index', {
			name: 'Kit'
		});
		// res.send('user模块: /user/index');
	});

	// 用户删除 localhost:8888/user/del
	router.get('/del', (req, res) => {

		// 1. 定义路由
		// 2. 增删改查
		// 3. 数据处理
		// 4. 使用模板分配数据
		// 5. 在模板显示数据


		// res.send('用户删除: /user/del');
	});

	// localhost:8888/user/edit

	// 返回模块对象
	module.exports = router;


// 