var ShopMgrCreateEditUI = (ShopMgrCreateEditUI == undefined ? {} : ShopMgrCreateEditUI);
$(function() {
    var listView = new ShopMgrCreateEditUI.ShopMgrCreateEditUIView();
    listView.init();
});

// ================================
//      View  - Base Class
// ================================

// Base View Class
ShopMgrCreateEditUI.View = function() {};
ShopMgrCreateEditUI.ListView = function() {};
// Render the view based on the given data.
ShopMgrCreateEditUI.View.prototype.render = function() {
    console.log("This function should never be called");
};

// filter the view based on the given keyword and data
ShopMgrCreateEditUI.View.prototype.filter = function() {
    // do nothing. leave blank intentionally.
};

// ================================
//      list View
// ================================
ShopMgrCreateEditUI.ShopMgrCreateEditUIView = function(manager, node) {
    this.manager = manager;
    this.element = node;

    this._hookupEventHandlers();

};
ShopMgrCreateEditUI.ShopMgrCreateEditUIView.prototype = new ShopMgrCreateEditUI.View();
ShopMgrCreateEditUI.ShopMgrCreateEditUIView.prototype.constructor = ShopMgrCreateEditUI.ListView;
ShopMgrCreateEditUI.ShopMgrCreateEditUIView.prototype.init = function() {
    var listview = this;
};

ShopMgrCreateEditUI.ShopMgrCreateEditUIView.prototype._hookupEventHandlers = function() {
    var listview = this;
    $('.upload-btn').on('click', function() {
        $('#upload-input').click();
        $('.progress-bar').text('0%');
        $('.progress-bar').width('0%');
    });

    $('#upload-input').on('change', function() {
        var files = $(this).get(0).files;
        if (files.length > 0) {
            // create a FormData object which will be sent as the data payload in the
            // AJAX request

            var formData = new FormData();
            // loop through all the selected files and add them to the formData object

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                // add the files to formData object for the data payload
                formData.append('uploads[]', file, file.name);
            }
            $.ajax({
                url: '/shop/upload',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    alert($("#upload-input").val());
                    console.log('upload successful!\n' + data);
                },

                xhr: function() {
                    // create an XMLHttpRequest
                    var xhr = new XMLHttpRequest();
                    // listen to the 'progress' event
                    xhr.upload.addEventListener('progress', function(evt) {
                        if (evt.lengthComputable) {
                            // calculate the percentage of upload completed
                            var percentComplete = evt.loaded / evt.total;
                            percentComplete = parseInt(percentComplete * 100);

                            // update the Bootstrap progress bar with the new percentage
                            $('.progress-bar').text(percentComplete + '%');
                            $('.progress-bar').width(percentComplete + '%');

                            // once the upload reaches 100%, set the progress bar text to done
                            if (percentComplete === 100) {
                                $('.progress-bar').html('完成');
                            }
                        }
                    }, false);
                    return xhr;
                }
            });
        }
    });

};