// 创建课程模块
define(['jquery','form'],function($){
    // 点击创建课程按钮，发送ajax请求信息渲染到页面上
    // alert("123456");
    $(".createBtn").on("click",function(){
        // alert("127672");
        $("form").ajaxSubmit({
            url:"/api/course/create",
            type:"post",
            success:function(info){
                if(info.code==200){
                    alert("创建课程成功");
                    location.href='/course/basic?cs_id='+info.result.cs_id
                }
            }
        });
        // 阻止浏览器默认行为
        return false;
    })

    
})