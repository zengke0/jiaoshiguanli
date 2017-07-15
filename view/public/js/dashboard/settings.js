// 个人中心功能模块
define(["jquery", 'template', "ckeditor", 'datepicker', 'datepickerzh', 'uploadify', 'region','form'], function ($, template, CKEDITOR) {
    // 发送ajax请求
    $.ajax({
        url: "/api/teacher/profile",
        type: 'get',
        success: function (info) {
            if (info.code == 200) {
                // 渲染模板
                var htmlStr = template("profile_tpl", info.result);
                $(".settings").html(htmlStr);

                // 上传图片插件
                $("#upfile").uploadify({
                    // 启用falsh文件
                    "swf": "/view/public/assets/uploadify/uploadify.swf",
                    "uploader": "/api/uploader/avatar",
                    "buttonText": '',
                    "width": 120,
                    "height": 120,
                    "fileObjName": "tc_avatar",
                    "onUploadSuccess": function (file, data, response) {
                        $("#avatar_preview").attr('src', JSON.parse(data.result.path));
                    }
                })

                // 日期插件
                $("input[name=tc_birthday],input[name=tc_join_date]").datepicker({
                    format: "yyyy-mm-dd",
                    luaguage: "zh-CN"
                })

                // 省市区三级联动
                $("#region").region({
                    url: "/view/public/assets/jquery-region/region.json"
                })


                // 富文本编辑器
                CKEDITOR.replace("introduce", {
                    toolbarGroups: [
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'links' },
                        { name: 'document', groups: ['mode', 'document', 'doctools'] },
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] }
                    ]
                })
            }

        }
    });

    // 点击保存按钮，保存数据
    $(".settings").on("click",".saveBtn",function(){
        // 提交表单前先更新一下富文本内容
        $("#introduce").val(CKEDITOR.instances.introduce.getData());
        // 提交表单内容
        $("form").ajaxSubmit({
            url:"/api/teacher/modify",
            type:"post",
            success:function(info){
                if(info.code==200){
                    alert("保存成功");
                    location.href="/settings"
                }
            }
        });
        // 阻止默认刷新
        return false;
    })
})