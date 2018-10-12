var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').createServer(app);
app.set('port', process.env.PORT || 19001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
http.listen(app.get('port'), function() {
	console.log('API服务器已启动，开始监听端口' + app.get('port'));
});

// app.post('/om/resource/show/basisShowQuery',function(req,res){
// 	console.log('...');
// 	// var perData = devidePage(req.body,queryResponse.BasisShowData);
// 	setTimeout(function() {
// 		var resData  = {
// 			success:true,
// 			data: {
// 				page:{totalCount:11},
// 			}
// 		};
// 		res.send(resData);
// 	},1000);
// });

//工单申请
// var res_apply = require('../response/res_apply');
// var api_apply = require('./api_apply');
// api_apply.request(app, res_apply);
//登录login
// var api_login = require('./api_login');
// api_login.request(app, res_apply);

// var res_zsj = require('../response/res_zsj');
// var api_zsj = require('./api_zsj');
// api_zsj.request(app, res_zsj);

// var res_cz = require('../response/res_cz');
// var api_cz = require('./api_cz');
// api_cz.request(app, res_cz);

// var res_lm = require('../response/res_lm');
// var api_lm = require('./api_lm');
// api_lm.request(app, res_lm);



