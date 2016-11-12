var ShopMgrUI = (ShopMgrUI == undefined ? {} : ShopMgrUI);
$(function() {
    var listView = new ShopMgrUI.ShopMgrUIView();
    listView.init();
});

// ================================
//      View  - Base Class
// ================================

// Base View Class
ShopMgrUI.View = function() {};
ShopMgrUI.ListView = function() {};
// Render the view based on the given data.
ShopMgrUI.View.prototype.render = function() {
    console.log("This function should never be called");
};

// filter the view based on the given keyword and data
ShopMgrUI.View.prototype.filter = function() {
    // do nothing. leave blank intentionally.
};

// ================================
//      list View
// ================================
ShopMgrUI.ShopMgrUIView = function(manager, node) {
    this.manager = manager;
    this.element = node;
    this.shopObj = undefined;

    this._hookupEventHandlers();


};
ShopMgrUI.ShopMgrUIView.prototype = new ShopMgrUI.View();
ShopMgrUI.ShopMgrUIView.prototype.constructor = ShopMgrUI.ListView;
ShopMgrUI.ShopMgrUIView.prototype.init = function() {
    var listview = this;

    listview.initDialog();
};


ShopMgrUI.ShopMgrUIView.prototype.initDialog = function() {
    var listview = this;

    $("#dialog-form").bind("dialogcreate", function(e, ui) {
        ApplyButton(e);
    }).dialog({
        modal: true,
        autoOpen: false,
        resizable: false,
        width: 450,
        height: 200,
        title: "新建商店",
        buttons: {
            "提交": function() { listview.addEditNewShop(); },
            "取消": function() {
                $("#dialog-form").dialog("close");
            }
        },
        open: function(event, ui) {
            if (listview.shopObj) {
                var obj = JSON.parse(listview.shopObj);
                $("#shopname").val(obj.shopname);
            }
        },
        close: function() {
            $("#shopname").val("");
            listview.shopObj = undefined
        }
    });
};

ShopMgrUI.ShopMgrUIView.prototype._hookupEventHandlers = function() {
    var listview = this;

    $("#btnNewShop").button().on("click", function() {
        $("#dialog-form").dialog("open");
    });

    $(".shopedit").click(function() {
        listview.shopObj = $(this).attr("data-shopInfo");
        $("#dialog-form").dialog("open");
    });
};

ShopMgrUI.ShopMgrUIView.prototype.addEditNewShop = function() {
    var listview = this;

    if ($.trim($("#shopname").val()) == "") {
        alert("商店名称不能为空！");
        return false;
    }

    if (listview.shopObj) {
        var obj = JSON.parse(listview.shopObj);
        $.post("/shopmgr/" + obj.shopId + "/edit", { shopname: $.trim($("#shopname").val()) })
            .done(function(data) {
                $("#dialog-form").dialog("close");
                window.location.href = "/shopmgr/shoplist";
            }).fail(function() {
                alert("修改失败");
            });
    } else {
        $.post("/shopmgr/create", { shopname: $.trim($("#shopname").val()) })
            .done(function(data) {
                $("#dialog-form").dialog("close");
                window.location.href = "/shopmgr/shoplist";
            }).fail(function() {
                alert("添加失败");
            });
    }
};