// 登录功能的模块
define(['jquery', 'cookie'], function ($, cookie) {
    $("#formSubmit").submit(function () {
        // 获取数据 将数据序列化成对象 用serializeArray()方法
        var data = $(this).serializeArray();
        // 发送ajax请求
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: data,
            success: function (info) {
                if (info.code == 200) {
                    // 当登陆成功后，用cookie的方式把输入的用户名和头像信息保存起来 信息在result中
                    // cookie保存的是字符串 所以要把json格式的信息转变为字符串
                    // 保存后，把信息重新渲染到头像模块 ，修改头像和用户名
                    $.cookie("tcInfo", JSON.stringify(info.result));
                    alert("登录成功");
                    window.location.href = 'index';
                    // console.log(info.result);
                }
            },
            error: function (errinfo) {
                alert('输入的用户名或者有错误');
            }
        })
        return false;
    });

    // 退出功能的模块
    // 为退出按钮注册事件，点击返回到登录页面、
    $("#logoutBtn").on("click", function () {
        alert("123");
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