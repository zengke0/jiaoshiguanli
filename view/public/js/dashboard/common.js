
// NProgress.start();

// NProgress.done();

// $('.navs ul').prev('a').on('click', function () {
// 	$(this).next().slideToggle();
// });
// 如果是第一次打开页面，是不会有权限看到其他页面，会进行登录验证的
// 所以如果是第一次登录会跳转到登录页面，如果当前是登录页面，就不会进行跳转


// 将上面文件改造成模块化 注意要引入的模块
define(['jquery', 'cookie', 'template'], function ($, cookie, template) {
	if (!$.cookie('PHPSESSID') && location.pathname != '/login') {
		location.href = 'login';
	}
	// 渲染模板，把定义好的头像模板渲染到头像模块中去
	// 把数据转变成对象
	// 因为登录页面不需要渲染，但登录页面也有common.js,所以要排除
	if (location.pathname != '/login' && location.pathname != "/dashboard/login" && location.pathname != "/view/dashboard/login") {
		var tcInfo = JSON.parse($.cookie("tcInfo"));
		var htmlStr = template("tp_aside_avatar", tcInfo);
		console.log(htmlStr);
		$('.aside>.profile').html(htmlStr);
	}

	// 退出功能

	// 退出功能的模块
	// 为退出按钮注册事件，点击返回到登录页面、
	$("#logoutBtn").on("click", function () {
		$.ajax({
			url: "/api/logout",
			type: "post",
			success: function (info) {
				if (info.code == 200) {
					alert("退出成功");
					location.href = '/login';
				}

			}
		})
	})
})

