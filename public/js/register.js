    // var flag = true;

    // function searchSrc(a) {
    //     var src = $(a).attr("src");
    //     if (src.indexOf('un') == -1) {
    //         $(a).attr("src", "/img/uncheck.png");
    //         $(a).prev("input[type=checkbox]").removeAttr("checked")
    //     } else {
    //         $(a).attr("src", "/img/check.png");
    //         $(a).prev("input[type=checkbox]").attr("checked", "checked")
    //     }

    // }

    // function tip(txt) {
    //     $("#tip").show();
    //     $("#tip").text(txt);
    //     setTimeout(function() {
    //         $("#tip").hide();
    //     }, 1500)
    // }
    $(function() {

        $(":input").attr("disabled", "disabled");
        $("#slider").slider({
            change: refreshSwatch
        });
        // $(".con_footer .check .check_2").click(function() {
        //     searchSrc(this);
        //     if (flag) {
        //         $(".show-ipt").show();
        //         flag = false;
        //     } else {
        //         $(".show-ipt").hide();
        //         flag = true;
        //     }
        // });
        // $(".con_footer .check .check_1").click(function() {
        //     searchSrc(this);
        // });
        // $form = $('form');
        // var $btnSecCode = $('.seccode');
        // var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // var phone = $('#mobile');

        // $btnSecCode.on('click', function() {
        //     var $this = $(this);
        //     if (phone.val() != "") {
        //         //正则验证手机号码
        //         if (!reg.test(phone.val())) {
        //             tip('手机号输入不正确');
        //             return false;
        //         }
        //         if ($this.hasClass('disabled')) return false;
        //         //向后台发送验证码请求
        //         $.ajax({
        //             type: "POST", //用POST方式传输
        //             url: '/user/checkmobile', //验证手机号码和作用域
        //             data: {
        //                 mobile: phone.val(),
        //                 _k: $("input[name=_k]").val(),
        //                 _c: $("input[name=_c]").val()
        //             },
        //             success: function(data) {
        //                 data = $.parseJSON(data);
        //                 if (data.errno === 0) {
        //                     btndisabled($this);
        //                     //验证后确认发送验证码
        //                     $.ajax({
        //                         url: '/user/smscode',
        //                         type: 'POST',
        //                         data: {
        //                             mobile: $('input[name=mobile]').val(),
        //                             _k: $('input[name=_k]').val(),
        //                             _c: $('input[name=_c]').val()
        //                         },
        //                         success: function(data_) {
        //                             data_ = $.parseJSON(data_);
        //                             if (data_.errno === 0) {
        //                                 tip('激活码下发成功，请注意查收', 1);
        //                             } else {
        //                                 tip(data_.errmsg);
        //                             }
        //                         },
        //                         error: function() {
        //                             tip('网络错误，请稍后再试！');
        //                         }
        //                     });
        //                 } else {
        //                     tip(data.errmsg);
        //                 }
        //             },
        //             error: function() {
        //                 tip('网络错误，请稍后再试！');
        //             }
        //         });

        //     } else {
        //         tip("手机号码不能为空！");
        //         return false;
        //     }
        // });

        // var btndisabled = function($btn) {
        //     var _b = $btn[0];
        //     $btn.addClass('disabled djs');
        //     $btn.html('120秒后重新获取');
        //     _b.disabled = true;
        //     _b.s = 120;
        //     _b.timer = setInterval(function() {
        //         if (_b.s === 0) {
        //             $btn.html('获取短信验证码');
        //             $btn.removeClass('disabled djs');
        //             clearInterval(_b.timer);
        //             _b.timer = null;
        //             _b.disabled = false;
        //         } else {
        //             var _s = _b.s - 1;
        //             _b.s = _s;
        //             $btn.html(_s + '秒后重新获取');
        //         }
        //     }, 1000)
        // };

        // $('.submit').on('click', function() {
        //         $form.trigger('submit');
        //     return false;
        // });


        // $form.validate({
        //     submitHandler: function() {
        //         var userInfo = $form.serialize();
        //         $.ajax({
        //             url: '/user/wxselfmediaapi',
        //             type: 'POST',
        //             data: userInfo,
        //             success: function(data) {
        //                 data = $.parseJSON(data);
        //                 if (data.errno === 0) {
        //                     tip('注册成功,正在跳转。。。', 1);
        //                     window.location.href = '/';
        //                 } else {
        //                     tip(data.errmsg);
        //                 }
        //             },
        //             error: function() {
        //                 tip('网络错误，请稍后再试！');
        //             }
        //         });
        //     },
        //     errorPlacement: function(errmsg, element) {
        //         var name = $(element).attr('name');
        //         if (name === "mobile" && !$btnSecCode.hasClass('djs')) {
        //             $('.seccode').addClass('disabled');
        //         }
        //         $(element).parents('.ipt-group').find('.help_inline').removeClass('ok').addClass('err').html(errmsg.html());
        //     },
        //     success: function(label, element) {
        //         var name = $(element).attr('name');
        //         if (name === "mobile" && !$btnSecCode.hasClass('djs')) {
        //             $('.seccode').removeClass('disabled');
        //         }
        //         $(element).parents('.ipt-group').find('.help_inline').removeClass('err').addClass('ok').html('√');
        //     }
        // });







        // $('.login').on('click', function() {
        //     //$.popbox('login');
        //     //return false;
        // })


    });

    function refreshSwatch() {
        var $SliderValue = $('#slider').slider("value");
        if ($SliderValue == 100) {
            $('#slider').slider("value", 99);
            $(":input").removeAttr("disabled");
            $("#slider").unbind();
            $("#slider p").text("请填写注册信息");
            $("#slider").css({ background: "#0184cf" });
            $("#slider p").css({ color: "#FFFFFF" });
            $("#slider input").val("_ulock");
            $(".ipt_code").css("width", "144px")
            $("#scode").show();
        }
    }

    //<!-- 微信号注册 -->
    // $(document).ready(function() {
    //     $("#ags").click(function() {

    //         $("#wx_register").slideToggle();
    //         $("#wx_registerx").slideToggle();

    //         if ($("#ags")[0].checked == true) {
    //             $("#sub").val("1");
    //         } else {
    //             $("#sub").val("2");
    //         }

    //     });
    // });

    // //<!--表单验证-->
    // $(function() {
    //     $(".phone_num").focus(function() {

    //     }).blur(phoneValidator);
    //     $(".user_pwd").focus(function() {

    //     }).blur(pwdValidator);
    // })

    // function phoneValidator() {
    //     // 获取电话号
    //     var value = $(".phone_num").val();
    //     // 获取用于显示提示信息的元素
    //     var phone_msg = $("#phone_msg");
    //     // 验证逻辑
    //     if (value == "" || value == null) {
    //         phone_msg.text("手机号不能为空");
    //         phone_msg.attr("class", "error");
    //         return false;
    //     } else if (value.length != 11) {
    //         phone_msg.text("手机号的长度不正确");
    //         phone_msg.attr("class", "error");
    //         return false;
    //     } else if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
    //         phone_msg.text("手机号的格式不正确");
    //         phone_msg.attr("class", "error");
    //         return false;
    //     }
    //     // 验证通过修改正确样式
    //     if (!phone_msg.hasClass("hide")) {
    //         phone_msg.text("");
    //         phone_msg.attr("class", "hide");
    //     }
    //     return true;
    // }

    // function pwdValidator() {
    //     var value = $(".user_pwd").val();
    //     var pwd_msg = $("#pwd_msg");
    //     if (value == "" || value == null) {
    //         pwd_msg.text("密码不能为空");
    //         pwd_msg.attr("class", "error");
    //         return false;
    //     } else if (value.length < 6 || value.length > 20) {
    //         pwd_msg.text("密码的长度不正确");
    //         pwd_msg.attr("class", "error");
    //         return false;
    //     }
    //     //        else if(!/^[a-zA-Z0-9]{6,20}$/.test(value)){
    //     //            pwd_msg.text("密码输入不正确");
    //     //            pwd_msg.attr("class","error");
    //     //            return false;
    //     //        }
    //     if (!pwd_msg.hasClass("hide")) {
    //         pwd_msg.text("");
    //         pwd_msg.attr("class", "hide");
    //     }
    //     return true;
    // }