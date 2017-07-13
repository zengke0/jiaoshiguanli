// require配置文件地址
require.config({
    // 配置根目录
    baseUrl:'/view/public',
    paths:{
        // 配置文件目录
        'jquery':"assets/jquery/jquery.min",
        'cookie':'assets/jquery-cookie/jquery.cookie',
        'bootstrap':'assets/bootstrap/js/bootstrap.min',
        'nprogress':'assets/nprogress/nprogress',
        'template':'assets/artTemplate/template',
        'common':'js/dashboard/common',
        // 添加一个登录功能的login路径
        'login':'js/dashboard/login'
    },
    // 因为bootstrap本身不支持模块化，所以的添加依赖文件，使得bootstrap支持模块化
    shim:{
        'bootstrap':{
            deps:['jquery']
        }
    }
});
// 因为要判断用户是不是第一次登录页面，所以要先调用common.js模块判断
require(['common']);