-- 博客项目建表语句

-- kit_blog
	-- k_user 用户表
	-- k_article 文章


-- 创建数据库
	create database `kit_blog`;

-- 创建用户表
	create table if not exists `k_user`(
		-- 主键
		`id` int unsigned not null auto_increment ,
		-- 昵称
		`username` varchar(64) not null  comment '昵称',
		-- 登录密码
		`pass` varchar(255) not null comment '用户密码',
		-- 邮箱
		`email` varchar(64) not null default '' comment '邮箱',
		-- 手机
		`telphone` char(11) not null default '' comment '手机',
		-- 头像
		`icon` varchar(255) not null default 'default_icon.jpg' comment '头像地址',
		-- 性别
		`sex` enum('0', '1', '2') not null default '2' comment '性别',
		-- 微信二维码
		`qrcode` varchar(255) not null default 'deafult_qrcode.jpg' comment '微信二维码',
		-- 简介
		`introduce` text comment '个人简介',
		-- 注册时间
		`regtime` datetime not null default '1970-01-01 00:00:00',
		-- 定义主键
		primary key(`id`),
		-- 定义唯一索引
		unique un_username(`username`)

	)engine=innodb default charset=utf8;

-- 关联表 user -- article
	create table if not exists `k_user_relevance_article`(
		-- 主键
		`id` int unsigned not null auto_increment ,
		-- 用户ID
		`user_id` int unsigned not null comment '用户ID' ,
		-- 文章ID
		`article_id` int unsigned not null comment '文章ID' ,
		-- 定义主键
		primary key(`id`)
	)engine=innodb default charset=utf8;

	id, user_id, article_id
		100,      20
		100,      21
		100,      32

-- 创建文章表
	create table if not exists `k_article`(
		-- 主键
		`id` int unsigned not null auto_increment primary key,
		-- 类别
		`category_id` int unsigned not null comment '分类ID',
		-- 标题 title
		`title` varchar(64) not null comment '文章标题',
		-- 内容 content 
		`content` text not null comment '文章主体内容',
		-- 创作时间 create_time
		`create_time` datetime not null default '1970-01-01 00:00:00',
		-- 更新时间 update_time
		`update_time` datetime not null default '1970-01-01 00:00:00',
		-- 发布状态 publish
		`is_publish` tinyint not null default 0 comment '发布状态',
		-- 阅读量 read_count
		`read_count` int unsigned not null default 0 comment '阅读量',
		-- 喜欢
		`like_this` int unsigned not null default 0 comment '喜欢此文章的数量'

	)engine=innodb default charset=utf8;

-- 文章类别
	create table if not exists `k_category`(
		-- 主键
		`id` int unsigned not null auto_increment primary key,
		-- 父级ID
		`pid` int unsigned not null comment '父级ID',
		-- 类别名称
		`cate_name` varchar(64) not null comment '类别名称',
		-- 面包屑路径
		`path` varchar(128) not null default '' comment '面包屑路径'
	)engine=innodb default charset=utf8;


 和一期项目的商品评论


-- 评论表 review
	create table if not exists `k_review`(
		-- 主键
		`id` int unsigned not null auto_increment primary key,
		-- 父级ID
		`pid` int unsigned not null comment '父级ID',
		-- 评论者
		`user_id` int unsigned not null comment '评论者',
		-- 评论文章
		`article_id` int unsigned not null comment '评论文章',
		-- 评论内容
		`content` text comment '评论内容',
		-- 评论时间
		`addtime` datetime not null default '1970-01-01 00:00:00',
		-- 面包屑路径
		`path`  varchar(128) not null default '' comment '面包屑路径'
	)engine=innodb default charset=utf8;








-- 
-- 