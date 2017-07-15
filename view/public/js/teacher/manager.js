define(["jquery", 'template', 'form', 'datepicker', "datepickerzh"], function ($, template, form, dt, dtzh) {
    var search = location.search;
    // 截取字符串
    search = search.slice(1);
    // 分割字符串
    var searchArr = search.split("&");
    // console.log(searchArr);
    var obj = {};
    // 遍历数组
    for (var i = 0; i < searchArr.length; i++) {
        // 分割字符串
        var temp = searchArr[i].split("=");
        // console.log(temp);
        // 存入对象中
        obj[temp[0]] = temp[1];
    };
    var id = obj.tc_id;
    if (id) {
        // 发送ajax请求
        $.ajax({
            url: "/api/teacher/edit",
            type: 'get',
            data: { tc_id: obj.tc_id },
            success: function (info) {
                info.result.title = "讲师编辑";
                info.result.saveBtn = "保 存"
                if (info.code == 200) {
                    // 渲染模板
                    var htmlStr = template('tc_manager_tpl', info.result);
                    $(".teacher").html(htmlStr);

                    // 加载日期插件
                    $("input[name=tc_join_date]").datepicker({
                        format: "yyyy-mm-dd",
                        language: "zh-CN"
                    })
                }
            }
        });

        // 当点击保存按钮时，保存内容
        $(".teacher").on("click", '.saveBtn', function () {
            // alert("23482");
            $("form").ajaxSubmit({
                url: "/api/teacher/update",
                type: "post",
                success: function (info) {
                    // alert("12345");
                    if (info.code == 200) {
                        alert("保存成功");
                        // alert(id);
                        location.href = "/teacher/list";
                    }
                }
            });
            return false;
        });
    } else {
        //添加的功能  进到添加把manager模板渲染到添加的面板中
        var htmlStr = template("tc_manager_tpl", {
            title: "讲师添加",
            saveBtn: "添 加",
            tc_gender: 0
        });
        $(".teacher").html(htmlStr);

        // 加载日期插件
        $("input[name=tc_join_date]").datepicker({
            format: "yyyy-mm-dd",
            language: "zh-CN"
        });

        // 当点击添加按钮的时候，为讲师列表添加一条信息
        $(".teacher").on("click", ".saveBtn", function () {
            $("form").ajaxSubmit({
                url: "/api/teacher/add",
                type: "post",
                success: function (info) {
                    // console.log(info);
                    if (info.code == 200) {
                        alert("添加讲师成功");
                        location.href = "/teacher/list";
                    }
                }
            });
            return false;
        })
    }
})