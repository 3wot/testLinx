var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

router.post('/', function(req, res, next) {
	var name , email, message;
	if(req.body && req.body.name){
		name = req.body.name
	}
	if(req.body && req.body.email){
		email = req.body.email;
	}
	if(req.body && req.body.message){
		message = req.body.message;
	}
	var content = "用户名:" + name + " 用户Email:" + email + " 用户留言:" + message
	var pool = smtpPool({
		host: 'smtp.qiye.163.com',//"smtp.qq.com",
		secure: false, // use SSL
		port: 25,//465, // port for secure SMTP
		auth: {
			user:'thinglinx@sunwayland.com.cn',
			pass: 'thinglinx2345'
		},
		maxConnections: 5,
		maxMessages: 10
	});
	var transporter = nodeMailer.createTransport(pool);
	
	var mailOptions = {
		from: 'thinglinx@sunwayland.com.cn', // sender address
		to: 'thinglinx@sunwayland.com.cn', // list of receivers
		subject: '用户留言', // Subject line
		text: content // plaintext body
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			res.send(error);
			return console.log(error);
		}
		res.send( JSON.stringify({
			'err' : null,
			'ret' : "Send Mail Success"
		}));
	});
	
	
});

module.exports = router;