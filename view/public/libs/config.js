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
        'login':'js/dashboard/login',
        'form':'assets/jquery-form/jquery.form',
        'datepicker':"assets/bootstrap-datepicker/js/bootstrap-datepicker",
        'datepickerzh':"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
        'uploadify':'assets/uploadify/jquery.uploadify',
        'region':"assets/jquery-region/jquery.region",
        'ckeditor':"assets/ckeditor/ckeditor",
        'utils':'js/utils/utils',
        'jcrop':'assets/jquery-jcrop/js/jcrop',
        'echarts':'assets/echarts/echarts.min'
    },
    // 因为bootstrap本身不支持模块化，所以得添加依赖文件，使得bootstrap支持模块化
    shim:{
        'bootstrap':{
            deps:['jquery']  //不支持模块化有依赖加依赖变成模块化
        },
        'datepickerzh':{
            deps:['jquery']
        },
        'uploadify':{
            deps:["jquery"]
        },
        'ckeditor':{
            exports:"CKEDITOR"  //非模块文件改成模块文件 这个字符串的值一定要和函数名或者变量名一致
        },
        'jcrop':{
            deps:['jquery']
        },
        'echarts':{
            deps:['jquery']
        }
    }
});
// 因为要判断用户是不是第一次登录页面，所以要先调用common.js模块判断
require(['common']);