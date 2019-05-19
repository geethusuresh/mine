  //validation for file upload

    (function ($, $win) {
      'use strict';

      $( document ).ready(function() {

        $('.screenshot_image_upload').bind('change', function() {
          //this.files[0].size gets the size of your file.
          var ext = $('.screenshot_image_upload').val().split('.').pop().toLowerCase();
          //get upload file type
          var notAllowedFiles = ["exe", "rar", "dll","mp3"];
          var validFileStatus = 0;
          if(this.files[0].size>10000000){

            $(".error_message_for_upload").html('upload error try again,  Check your file size (maximum 10mb is allotted)')
            $('.screenshot_image_upload').val("")
            validFileStatus = 1;
          }

          if(notAllowedFiles.indexOf(ext)!=-1){
            $(".error_message_for_upload").html('upload error try again,  Check your file size (exe,rar,dll types are not allowed)')
            $('.screenshot_image_upload').val("")
            validFileStatus = 1;
          }
          if(validFileStatus!=1){
              $(".error_message_for_upload").empty()
          }
        });

      });

    }(jQuery, jQuery(window)));
