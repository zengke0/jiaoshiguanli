define(['jquery', 'utils', 'template','bootstrap'], function ($, utils, template,bt) {
    var id = utils.queryString().cs_id;
    // 发送ajax请求数据，渲染页面
    $.ajax({
        url: "/api/course/lesson",
        type: 'post',
        data: {
            cs_id: id
        },
        success: function (info) {
            // 渲染模板
            var htmlStr = template("cs_lesson_tpl", info.result);
            $(".steps").html(htmlStr);
        }
    });

    // 点击课时添加
    $(".steps").on("click", '#addLesson', function () {
        var id = utils.queryString().cs_id;
        // 发送ajax请求数据，渲染模板
        $.ajax({
            url: "/api/course/chapter/add",
            type: "post",
            data: {
                cs_id: id
            },
            success: function (info) {
                info.result.title = '添加课时';
                info.result.save = '添加';
                var htmlStr = template("cs_modal_tpl", info.result);
                $("#lesson").html(htmlStr);
            }
        })
        // 让模态框弹出来
        $("#lesson").modal();
    })
})