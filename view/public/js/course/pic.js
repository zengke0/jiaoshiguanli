// 课程图片模块
define(['jquery', 'utils', 'template', 'uploadify','jcrop'], function ($, utils, template, uploadify) {
    var id = utils.queryString().cs_id;
    var jcrop_obj = null;
    $.ajax({
        url: "/api/course/picture",
        type: 'get',
        data: {
            cs_id: id
        },
        success: function (info) {
            if (info.code == 200) {
                // alert("提交成功");
                var htmlStr = template("cs_pic_tpl", info.result);
                $(".steps").html(htmlStr);

                // 上传图片插件

                $("#upload").uploadify({
                    swf: "/view/public/assets/uploadify/uploadify.swf",
                    uploader: '/api/uploader/cover',
                    buttonText: '请选择图片',
                    width: 85,
                    height: 'auto',
                    buttonClass: 'btn btn-success btn-sm',
                    formData: { cs_id: id },
                    fileObjName: "cs_cover_original",
                    itemTemplate: '<span></span>',
                    onUploadSuccess: function (file, data, response) {
                        // 如果上传成功，就把图片显示到页面上
                        // console.log(data);
                        $(".preview img").attr('src', JSON.parse(data).result.path);
                        $("#cropBtn").prop("disabled",false);
                    }
                })
            }
        }
    })


    // 单击裁切时调用jcrop方法
    $(".steps").on("click", '#cropBtn', function () {
        console.log("12345");
        if ($(this).attr("data-status") != "save") {
            // 如果是第一次点击就把按钮修改为保存
            $(this).attr("data-status", 'save').text('保 存');
            $('.preview img').Jcrop({
                aspectRatio: 2,
                setSelect: [20, 20, 300, 150]
            },function(){
                // 设置缩列图的信息
                jcrop_obj=this;
                jcrop_obj.initComponent('Thumbnailer', { width: 240, height: 120 });
                $('.thumb').append($(".jcrop-thumb"));
            })
        }else {

        }
    })
})