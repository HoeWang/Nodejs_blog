	
	// 1.加载框架
	const express = require('express');
	const mysql = require('mysql');
	const ejs = require('ejs');
	// 2.实例化路由对象
	const router = express.Router();



	// 3.定义中间件
	router.use((req,res,next)=>{
		link = mysql.createConnection({
			host:'localhost',
			port:'3306',
			user:'root',
			password:'',
			database:'kit_blog',
			multipleStatements: true//开启这个可以同时执行多条查询语句

		});

		
		next();
	});
	var link = "";
	// var types = {};
	// var articles = {};
	

	// 4.绑定路由  文章列表  localhost:8888/article/index
	router.get('/index', (req, res) => {
		console.log('/article/index');
		
		link.connect();
		var sql = "select cate_name from k_category;select * from k_article where category_id = 0;select * from k_article where category_id = 1;select * from k_article where category_id = 2;select * from k_article where category_id = 3;select * from k_article where category_id = 4;";
		
		link.query(sql,(error,result)=>{
			try {
			// 如果错误就抛出错误
			if (error) {
				throw error;
			}
			
			console.log('受影响行：', result);

		} catch(catchError) {
			console.log('错误号:', catchError.errno);
			console.log('错误信息:', catchError.sqlMessage);
			console.log('错误的SQL语句:', catchError.sql);
		}
			link.end();
			

			//这里写第二层的sql查询用来查询文章
			res.render('article/index',{type:result[0],
				article:[result[1],result[2],result[3],result[4],result[5]]
				
							});		
		});
		// console.log(types);	
	});

	// router.get('/index', (req, res) => {
	// 	console.log('/article/index');
		
	// 	link.connect();
	// 	var sql = "select * from k_article";
	// 	link.query(sql,(error,result)=>{
	// 		try {
	// 		// 如果错误就抛出错误
	// 		if (error) {
	// 			throw error;
	// 		}
			
	// 		console.log('受影响行：', result);

	// 	} catch(catchError) {
	// 		console.log('错误号:', catchError.errno);
	// 		console.log('错误信息:', catchError.sqlMessage);
	// 		console.log('错误的SQL语句:', catchError.sql);
	// 	}
	// 		link.end();
	// 		articles = result;

	// 		//这里写第二层的sql查询用来查询文章
	// 		res.render('article/index',{article:articles
	// 						});		
	// 	});
	// 	// console.log(types);	
	// });
	
	


	router.get('/add', (req, res) => {
		console.log('/article/add');
		
		link.connect();
		var sql = "select cate_name from k_category"
		link.query(sql,(error,result)=>{
			try {
			// 如果错误就抛出错误
			if (error) {
				throw error;
			}
			
			console.log('受影响行：', result);

		} catch(catchError) {
			console.log('错误号:', catchError.errno);
			console.log('错误信息:', catchError.sqlMessage);
			console.log('错误的SQL语句:', catchError.sql);
		}
			link.end();
			res.render('article/add',{type:result});
		});
		
	});


	router.post('/add',(req,res)=>{
		var title = req.body.title;
		var content = req.body.content;
		var category_id = req.body.category_id;
		console.log(title+content+category_id);
		var sql = "insert into `k_article` (`category_id`,`content`,`title`) values(?,?,?)";
		var list = [category_id,content,title];
		link.connect();
		link.query(sql,list,(error,result)=>{
			try {
			// 如果错误就抛出错误
			if (error) {
				throw error;
			}
			
			console.log('受影响行：', result.affectedRows);
			if(result.affectedRows > 0){
				// var msg = '发布成功';
				// res.send(msg);
				res.redirect('/article/index');
			}

		} catch(catchError) {
			console.log('错误号:', catchError.errno);
			console.log('错误信息:', catchError.sqlMessage);
			console.log('错误的SQL语句:', catchError.sql);
		}
			link.end();
		});


	});
	// 5.返回路由对象
	module.exports = router;

