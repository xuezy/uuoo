exports.request = function(app,queryResponse){
//查询全部用户
  app.post('/applyAccount/user/query', function (request, response) {
   var resData = {
			success: true,
			data: queryResponse.userBasisShowData,
			// pageSize: 1,
			totalCount:1
		};
		response.send(resData);
  });
};