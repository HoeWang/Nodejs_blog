	
	// 1.加载框架
	const express = require('express');
	// 2.实例化路由对象
	const router = express.Router();
	// 3.定义中间件


	// 4.绑定路由  
	router.get('/index', (req, res) => {
		// 登录表单
		// console.log('/login/index');
		// res.send('/login/index');
		// 使用模板分配数据
		res.render('login/index');
	});

	// 处理表单   /login/index
	router.post('/index', (req, res) => {
		// 1. 接收数据(由于已经配置了 body-parser ，我们以后接收的数据都在 req.body 中)
		// console.log(req.body, req.body.user, req.body.pass);
		var user = req.body.user;
		var pass = req.body.pass;

		// 2. 查询数据库 判断是否存在数据库
		/*
		var sql = "select * from xxx where user = ${user}";		
		if (row > 1) {
			// OK
		}
		*/

		if (user == 'admin' && pass == '123') {
			// 将数据存在 session
			req.session.userInfo = { 'user': user, 'pass': pass};

			// 登录成功
			res.redirect('/login/ok');
		} else {
			// 登录失败 滚蛋
			res.send(' 登录失败 滚蛋');
		}



		// res.send('post login data');
	});


	// 跳转成功进入的页面
	router.get('/ok', (req, res) => {
		if (!req.session.userInfo) {

			res.redirect('/login/index');
		}
		// 查看 session 
		console.log(req.session);
		// 获取存在 session 的数据
		var userInfo = req.session.userInfo;
		var msg = '登录成功！你好:' + userInfo.user;
		res.send(msg);
	});

	

	// 5.返回路由对象
	module.exports = router;

