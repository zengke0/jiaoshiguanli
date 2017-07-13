// 讲师列表的模块
// 发送ajax请求讲师列表的数据回来渲染
define(['jquery', 'template','bootstrap'], function ($, template,bt) {
    $.ajax({
        url: '/api/teacher',
        type: 'get',
        success: function (info) {
            // console.log(info)
            if (info.code == 200) {
                // 渲染模板
                var htmlStr = template('tc_list_tpl', info);
                $('#tc_list_tBody').html(htmlStr);
            }

        }
    });

    // 查看讲师详情的模块
    // 为查看按钮注册事件，但查看按钮是动态生成，所以得用事件委托进行注册事件才会有效果
    $("#tc_list_tBody").on("click", "#check_info", function () {
        // alert('12345');
        // 获取讲师的id
        var id = $(this).parent().attr('data-id');
        // console.log(id);
        $.ajax({
            url:"/api/teacher/view",
            type:'get',
            data:{tc_id:id},
            success:function(info){
                // console.log(info);
                if(info.code == 200){
                    // 渲染模板
                    var htmlStr = template('tc_info_tpl',info.result);
                    $("#teacherModal tbody").html(htmlStr);
                    // 弹出查看框
                    $("#teacherModal").modal();
                }
            }
        })
    })
})