// 讲师列表的模块
// 发送ajax请求讲师列表的数据回来渲染
define(['jquery', 'template', 'bootstrap'], function ($, template, bt) {
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
            url: "/api/teacher/view",
            type: 'get',
            data: { tc_id: id },
            success: function (info) {
                // console.log(info);
                if (info.code == 200) {
                    // 渲染模板
                    var htmlStr = template('tc_info_tpl', info.result);
                    $("#teacherModal tbody").html(htmlStr);
                    // 弹出查看框
                    $("#teacherModal").modal();
                }
            }
        })
    });

    // 注销和启用功能
    $("#tc_list_tBody").on("click", '.btnHandle', function () {
        var id = $(this).parent().attr("data-id");
        var status = $(this).attr("data-status");
        var _this = $(this);
        $.ajax({
            url: '/api/teacher/handle',
            type: "post",
            data: {
                tc_id: id,
                tc_status: status
            },
            success: function (info) {
                // 把页面上的状态和服务器更新一下
                _this.attr("data-status",info.result.tc_status);
                if (info.code == 200) {
                    alert('修改成功');
                    // 如果当前是1的时候，是注销功能，显示的是启用
                    if (info.result.tc_status == 1) {
                        _this.text("启 用");
                    }else{
                        _this.text("注 销");
                    }
                }

            }
        })
    })
})