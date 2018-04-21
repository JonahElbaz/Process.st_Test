angular.module('uploaderApp', ['ngRoute', 'blueimp.fileupload'])

    .component("wistiaUploader", {
        templateUrl: "uploader-template.html",
        controller: "UploadController"

    })
.controller("UploadController", function UploadController($scope) {
    // File Uploader Plugin Options
    //Create embedded wistia player after  successful upload.
    $scope.options = {
        url: 'https://upload.wistia.com/?access_token=c2775a1a4db062877e43864813bf0c59c1903d603c075229b02117c830493ccd',
        success: function (response) {
            if (response.status === "queued") {
                if ($scope.successfulFiles.indexOf(response.name) < 0) {
                    $scope.successfulFiles.push(response.name);
                }
                $(document).ready(function () {
                    $('body').append('<div>' + response.name + '</div>' +
                        '<div class="wistia_responsive_padding" style="padding:66.67% 0 0 0;position:relative;" id="embeddedWistiaPlayer">' +
                        '<div class="wistia_responsive_wrapper" style="height:50%;left:0;position:absolute;top:0;width:50%;">' +
                        '<div class="wistia_embed wistia_async_' + response.hashed_id + ' videoFoam=true" style="height:50%;position:relative;width:50%">' +
                        '<div class="wistia_swatch" style="height:100%;left:0;opacity:0;overflow:hidden;position:absolute;top:0;transition:opacity 200ms;width:50%;">' +
                        '<img src="https://fast.wistia.com/embed/medias/' + response.hashed_id + '/swatch" style="filter:blur(5px);height:50%;object-fit:contain;width:50%;" alt="" onload="this.parentNode.style.opacity=1;" />' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<br/>');
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (errorThrown.toString() === "Forbidden") {
                $('div').append('<span id="errorSpan">You have been refused the upload. Please Make sure you have enough space on your Wisia account</span>');
                console.log(errorThrown); //too be returned
            }
        }
    };

    $scope.successfulFiles = [];
});