exports.request = function (app, queryResponse) {
  //登录
  app.post('/dzkb/user/login', function (request, response) {
    var sendData = {
      // email: '357789504@qq.com',//邮箱作为对用户的唯一标识
      // powerList: [
      //   'orderPass' //添加看板权限
      // ],
      // isAdmin: true,
      data: {
        roleId: '1', //角色id
        userId: '1' //角色id
        // name: '申佳',//用户姓名
        // email: '357789504@qq.com',//邮箱
        // password: '123456',//用户帐号
        // creatime: '2017-06-07',//创建时间
        // roleId: '1'//角色id
      },
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    };
    // if (request.body.roleId === '1') {
    //   sendData.isAdmin = true;
    //   // sendData.powerList = ['orderPass'];
    // } else {
    //   sendData.isAdmin = false;
    //   // sendData.powerList = [];
    // }
    response.send(sendData);
  });

  //用户注册
  app.post('/dzkb/user/regist', function (request, response) {
    response.send({
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    });
  });

  //获取手机code
  app.get('/applyAccount/user/getPhoneCode', function (request, response) {
    response.send({
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    });
  });

  //获取验证码后端传图片
  // app.post('/applyAccount/user/getCodeImage',function(request,response){});

  app.get('/dzkb/user/logout', function (req, res) {
    res.send({
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    });
  });

  app.post('/dzkb/user/resetPassword', function (request, response) {
    response.send({
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    });
  });

  //修改账号
  app.post('/dzkb/user/edit', function (request, response) {
    response.send({
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    });
  });

  //修改密码
  app.post('/dzkb/user/updatePassword', function (request, response) {
    response.send({
      state: '10000', //10000表示成功，10001表示失败，10002表示其他原因
      message: '成功' //返回错误信息
    });
  });


};
