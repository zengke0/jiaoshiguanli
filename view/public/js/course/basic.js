// 基本信息模块
define(['utils', 'jquery', 'template', 'ckeditor', 'form'], function (utils, $, template, CKEDITOR, form) {
    // 根据数据传回来的id进行页面的渲染
    // 获取当前id
    var id = utils.queryString().cs_id;
    // 发送ajax请求
    $.ajax({
        url: '/api/course/basic',
        type: 'get',
        data: {
            cs_id: id
        },
        success: function (info) {
            if (info.code == 200) {
                var htmlStr = template('cs_basic_tpl', info.result);
                $('.steps').html(htmlStr);

                //添加富文本编辑器
                CKEDITOR.replace('cs_brief');
            }
        }
    });//ajax


    // 给保存按钮注册事件
    $('.steps').on('click', '.saveBtn', function () {
        // alert(123);
        $("#cs_brief").val(CKEDITOR.instances.cs_brief.getData());
        $('form').ajaxSubmit({
            url: '/api/course/update/basic',
            type: 'post',
            success: function (info) {
                if (info.code == 200) {
                    alert('保存成功，即将跳转到图片中心...');
                    location.href = '/course/pic?cs_id=' + info.result.cs_id;
                }
            }
        })
        return false; //阻止默认的刷新行为
    })
})