var UI = new Class({
    Implements: [Events, Options],
    Binds: ['loader','ready'],
    initialize: function() {
        window.addEvent("load", this.loader);
        window.addEvent("domready", this.ready);
        window.addEvent("scroll", this.scroll);
    },

    loader: function(){
        // var btn = $('check_btn');
        //     btn.addEvent('click',function() {
        //         alert('hai');
        //     });

    
        var myMultiSelect = new MultiSelect('.MultiSelect');

 // create mooploader object
        var mooploadHandler = new Moopload({
            url: 'upload_log.html',
            onRequest: function(){
                console.log('start');
            },
            onComplete: function(response){
                console.log(response);
                console.log('completed');
            },
            onProgress: function(e) {
                if (e.lengthComputable) {
                     var percentComplete = e.loaded / e.total;
                     console.log('percent completed: ' + percentComplete.toString());
                 } else {
                    // Unable to compute progress information since the total size is unknown
                 }
            }
        });

    }  

}); 
        
//         $$('.up_image').each(function(im_file, index){
//             var upload = new UploadManager(im_file, {
//                 frm: 'upload_form'
//             });
//         });

//         if($(document.body).hasClass('home')) {
//             var article = $$('.box');
//             var view_more = $('see_more_article');
//             view_more.addEvent('click',function() {
//                 article.addClass('show');
//                 view_more.addClass('disable');
//             });
//         }
        
//         if ($(document.body).hasClass('job_application_details')) {
//             var myAccordion = new Fx.Accordion($$('a.show_cover_letter'), $$('p.cover_letter'), {
//                 display: -1,
//                 alwaysHide: true
//             });
//             $$('.show_cover_letter').each(function(el) {
//                 el.addEvent('click', function(ev) {  
//                     $$('.show_cover_letter.hide').each(function(l) {
//                         if (l != el) l.removeClass('hide');
//                     });
//                      el.toggleClass('hide');
//                 });
//             });
//         }

//         if ($(document.body).hasClass('career_center_home') || $(document.body).hasClass('job_search_home')) {
//             this.careerCenter();
//         }

//         if ($(document.body).hasClass('button_event')) {
//             var job_status = $$('.job_app');
//             var radio = new RadioButtonHandler(job_status.getElement('label'),'radio');
//             var add_to_cart = $('id_add_to_cart');
//         }

//         if ($(document.body).hasClass('button_event')) {
//             this.jobStatus();
//             var self= this;
//             $$('.radio_btn').addEvent('click',function() { 
//                 self.jobStatus();
//             });
//         }

//         // dir($('profileImage'))
//         if ($(document.body).hasClass('edit') || ($(document.body).hasClass('cart'))) {
//             valid = true;
//             var job_status = $$('.clear_field')
//             var radio = new RadioButtonHandler(job_status.getElement('label','checkbox'));
//             var is_chl_certified = $('id_chl_certified');
//             var is_training_center_certified = $('id_training_center_certified');
//             var start_now_link = $('link');

//             // event propagation stoping for link
//             if (start_now_link != null) {
//                 start_now_link.addEvent('click', function(el) {
//                     console.log('hai');
//                     el.stopPropagation();
//                 });
//             }

//             if (is_chl_certified && is_chl_certified.checked) {
//                 $('chl_certified_key').toggle();
//             }

//             if (is_training_center_certified && is_training_center_certified.checked) {
//                 $('training_center_certified').toggle();
//             }

//             if (is_chl_certified) {
//                 is_chl_certified.addEvent('change', function() {
//                     $('chl_certified_key').toggle();
//                 });
//             }

//             if (is_training_center_certified) {
//                 is_training_center_certified.addEvent('change', function() {
//                     $('training_center_certified').toggle();
//                 });
//             }

//             if ($(document.body).hasClass('dashbord') && $(document.body).hasClass('company_edit')) {
//                 validationDataContainer = $('validationData');
//                 validationData = {
//                     'PROFILE_IMAGE_HEIGHT': parseInt(validationDataContainer.get('data-PROFILE_IMAGE_HEIGHT')),
//                     'PROFILE_IMAGE_WIDTH':  parseInt(validationDataContainer.get('data-PROFILE_IMAGE_WIDTH')),
//                     'HEADER_IMAGE_WIDTH':  parseInt(validationDataContainer.get('data-HEADER_IMAGE_WIDTH')),
//                     'HEADER_IMAGE_HEIGHT':  parseInt(validationDataContainer.get('data-HEADER_IMAGE_HEIGHT')),
//                     'PROFILE_SECTION_WIDTH':  parseInt(validationDataContainer.get('data-PROFILE_SECTION_WIDTH')),
//                     'PROFILE_SECTION_HEIGHT':  parseInt(validationDataContainer.get('data-PROFILE_SECTION_HEIGHT')),
//                 }
//             }
//         } 

//          var isMobile = {
//             Android: function() {
//                 return navigator.userAgent.match(/Android/i);
//             },
//             BlackBerry: function() {
//                 return navigator.userAgent.match(/BlackBerry/i);
//             },
//             iOS: function() {
//                 return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//             },
//             Opera: function() {
//                 return navigator.userAgent.match(/Opera Mini/i);
//             },
//             Windows: function() {
//                 return navigator.userAgent.match(/IEMobile/i);
//             },
//             any: function() {
//                 return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//             }
//         };

//         var toolsMenu = new ToolsMenu();
//         $$('.slideshow').each(function(el) {
//             var scrollEffects = new scrollEffect(el, {
//                 'slider': '.slider',
//                 'activePointer': true,
//                 'autoSlide': true
//             }); 
//         });
//         ModelWindow = new SimpleModalWindow();

//         if ($('id_video_container')) {
//             var video = new Video();
//         }
//         if ($$('.comment_container')[0]) {
//             var comment = new CommentHandler();
//         }
//         if ($$('.advertisement')) {
//             this.adHover();
//         }
//         if($$('.place_holder').length) {
//             $$('.place_holder').each(function(el){
//                 new OverText(el);
//             }, this);
//         }
        
//         new XtLightbox('.media .rich_text .section .content_block a', {
//             adaptors: ['Vimeo', 'YouTube'],
//             rendererOptions: {
//                 positionText: ''
//             }
//         });
//         OverText.update();
//         this.sectionSeparator();
//         if ($(document.body).hasClass('article')) {  
//             var header = $('header').getCoordinates().height;
//             var footer = $('footer').getCoordinates().height;
//             var el = $$('.addthis_floating_style')[0];
//             window.addEvent('scroll', function() {
//                 var x = window.getScrollSize().y;
//                 var y = window.getScroll().y;
//                 var eleHeight = el.getCoordinates().height;
//                 if (y < header) {
//                     el.setStyle('top',header+50);
//                 }
//                 else if (x-y < (footer+ eleHeight)) {
//                     z = window.getSize().y;
//                     el.setStyle('top',z-(footer+ eleHeight +100));
//                 } else {
//                     el.setStyle('top',100);
//                 }
//             });
//             window.fireEvent('scroll');
//             el.removeClass('hidden');
//         }
//         // this.alignSpinner();
//         if ($(document.body).hasClass('contact_us')) {
//             this.contactUs();
//         }

//         if ($(document.body).hasClass('find_events') && !$(document.body).hasClass('user_events')) {
//             var self = this;
//             var path = '/careercenter/events/';
//             var eventSearchData = $('eventSearchData');
//             var totaleventCount = parseInt(eventSearchData.get('data-total_events')); 
//             var wrapper = $$('.event_update')[0];
//             var eventPerPage = parseInt(eventSearchData.get('data-events_per_page'));
//             var keyword = $('id_keyword').value;
//             var offset = parseInt($('id_offset').value);
//             if (!offset) offset = 0;

//             var sl = new ScrollLoader ({
//                 onScroll: function() {
//                     var scroll = this;
//                     if (totaleventCount > offset ) {
//                         var load = $$('.loader_job');
//                         load.addClass('active');
//                         offset = offset + eventPerPage;
//                         this.detach();
//                         new Request.HTML({
//                             url: path,
//                             onSuccess: function(responseTree, responseElements) {
//                                 for (var i=0; i<responseTree.length;i++) {
//                                     if (typeOf(responseTree[i]) == 'element') {
//                                         responseTree[i].inject(wrapper);
//                                     }
//                                 }
//                                 if (responseElements.getElements('.login_wrapper').length>0) new SimpleModalWindow();
//                                 scroll.attach();
//                                 load.removeClass('active');
//                             }
//                        }).get({'keyword':keyword,'offset':offset }) 
//                     } 
                                  
//                 }
//             });  
//         }
        

//         if ($(document.body).hasClass('find_mentor')) {
//             var self = this;
//             var path = '/careercenter/mentors/';
//             var mentorSearchData = $('mentorSearchData');
//             var totalmentorCount = mentorSearchData.get('data-total_mentors'); 
//             var wrapper = $$('.event_update')[0];
//             var mentorPerPage = parseInt(mentorSearchData.get('data-mentors_per_page'));
//             var keyword = $('id_keyword').value;
//             var offset = parseInt($('id_offset').value);
//             if (!offset) offset = 0;

//             var sl = new ScrollLoader ({
//                 onScroll: function() {
//                     var scroll = this;
//                     if (totalmentorCount > offset ) {
//                         var load = $$('.loader_job');
//                         load.addClass('active');
//                         offset = offset + mentorPerPage;
//                         this.detach();
//                         new Request.HTML({
//                             url: path,
//                             onSuccess: function(responseTree, responseElements) {
//                                 // console.log(responseTree, responseElements);
//                                 if (responseElements.length > 0) {
//                                     for (var i=0; i<responseTree.length; i++) {
//                                         if (typeOf(responseTree[i]) == 'element') {
//                                             responseTree[i].inject(wrapper);
//                                         }
//                                     }

//                                     new Tips(responseElements.getElements('.tool-tip'), {'className': 'tool-tip'});
//                                     if (responseElements.getElements('.login_wrapper').length>0) new SimpleModalWindow();
//                                         scroll.attach();
//                                 }
//                                 load.removeClass('active');
                               
//                             }
//                        }).get({'keyword':keyword,'offset':offset }) 
//                     }                       
//                 }
//             });  
//         }


//         if ($(document.body).hasClass('category')) {
//             if (isMobile.any()) {
//                 var self = this;
//                 var path = '/load_more_articles/';
//                 var wrapper = $$('.main_content')[0];
//                 var overlay = $$('.popup_overlay')[0];
//                 var category = wrapper.get('category');
//                 path = path+category+"/";
//                 var index = wrapper.getElements('a').length;
//                 var increment = 4;
//                 var view_more = $('category_more_article');
//                 view_more.addEvent('click', function() {
//                     new Request.HTML({
//                         method:'get',
//                         url: path+index+'/'+(index+increment)+'/',
//                         onComplete: function(data) { 
//                             if (data.length) {
//                                 var total_article = data.length;
//                                 for (var i=0; i<data.length;i++) {
//                                     if (typeOf(data[i]) == 'element') {
//                                         data[i].inject(wrapper);
//                                     }
//                                 }
//                                 self.sectionSeparator();
//                                 index+=increment;
//                             }
//                             else {
//                                 $('category_more_article').addClass('disable');
//                             }    
//                         }
                        
//                     }).send();
//                 });
//             }
//             else {
//                 var self = this;
//                 var path = '/load_more_articles/';
//                 var wrapper = $$('.main_content')[0];
//                 var category = wrapper.get('category');
//                 path = path+category+"/";
//                 var index = wrapper.getElements('a').length;
//                 var increment = 2;
//                 var sl = new ScrollLoader({
//                     onScroll: function(){
//                         this.detach(); // While waiting, we detach the listener so the event does not fire accidentally
//                         var scroll = this; // Save a reference
//                         new Request.HTML({
//                             url: path+index+'/'+(index+increment)+'/',
//                             onSuccess: function(data){
//                                 if (data.length) {
//                                     for (var i=0; i<data.length;i++) {
//                                         if (typeOf(data[i]) == 'element') {
//                                             data[i].inject(wrapper);
//                                         }
//                                     }
//                                     self.sectionSeparator();
//                                     index+=increment;
//                                     scroll.attach(); // Attach the event again so the event fires when you hit the bottom again
//                                 }
//                             }
//                         }).get();
//                     }
//                 });
//             }
//         }

//         if ($(document.body).hasClass('article')) {
//             this.translate();
//         }

//         if ($(document.body).hasClass('job_search_home')) {
//             var self = this;
//             var path = '/careercenter/jobs/?';
//             var wrapper = $$('.job_disc_wrapper')[0]; 

//             /* get search form values when page loads*/
//             var jobSearchForm = $('jobSearchForm');

//             var showExtraJobs = jobSearchForm.getElement('#id_show_extra_jobs').value;
//             var keyword = jobSearchForm.getElement('#id_search_what').value;
//             var location = jobSearchForm.getElement('#id_search_where').value;

//             /*get search data */
//             var searchData = $('searchData');
//             var hhlJobsOffset = searchData.get('data-hhl_jobs_offset');
//             var indeedJobsOffset = searchData.get('data-indeed_jobs_offset');
//             var totalHHLjobs = parseInt(searchData.get('data-total_hhl_jobs'));
//             var totalIndeedjobs = parseInt(searchData.get('data-total_indeed_jobs'));
//             var jobsPerPage = parseInt(searchData.get('data-jobs_per_page'));
//             /* making request url */
//             var request_params = {
//                 'keyword': keyword,
//                 'location': location,
//                 'hhl_offset': hhlJobsOffset,
//                 'indeed_offset': indeedJobsOffset,
//             }

//             var uri = new URI(path);
//             uri.setData(request_params);


//             var totalJobs = totalHHLjobs + totalIndeedjobs;
//             var increment = jobsPerPage;
//             var sl = new ScrollLoader({
//                 onScroll: function(){
//                     if( (totalJobs > jobsPerPage) && ( hhlJobsOffset != '-1' || indeedJobsOffset != '-1')) {
//                         var scroll = this; // Save a reference
//                         var load = $$('.loader_job');
//                         load.addClass('active');
//                         this.detach(); // While waiting, we detach the listener so the event does not fire accidentally
//                         new Request.HTML({
//                             url: uri.toString(),
//                             onSuccess: function(data){
//                                 indeedJobsOffset = data[3].getAttribute('data-indeed_jobs_offset');
//                                 indeedJobsOffset = parseInt(indeedJobsOffset);
//                                 uri.setData('indeed_offset', indeedJobsOffset);

//                                 hhlJobsOffset = data[3].getAttribute('data-hhl_jobs_offset');
//                                 hhlJobsOffset = parseInt(hhlJobsOffset);
//                                 uri.setData('hhl_offset', hhlJobsOffset);

//                                 if (data.length) {
//                                     for (var i=0; i<data.length;i++) {
//                                         if (typeOf(data[i]) == 'element') {
//                                             data[i].inject(wrapper);
//                                         }
//                                     }
//                                     self.sectionSeparator();
//                                     // index+=increment;
//                                     scroll.attach(); // Attach the event again so the event fires when you hit the bottom again
//                                 }

//                                 if (hhlJobsOffset == -1 && indeedJobsOffset == -1 ) {
//                                     if (loaderDiv = $$('.loader_job')[0]) {
//                                         // loaderDiv.set('html', '');
//                                         loaderDiv.setStyle('display', 'none');
//                                         // loaderDiv.setStyle('display', 'block');
//                                     }
//                                 }
//                             }
//                         }).get();
//                     } 
//                 }
//             });
//         }
//         var resumeFileInput = $('id_resume');
//         if (resumeFileInput) {
//             fileName_id_resume  = resumeFileInput.getNext('#fileName_id_resume');
//             resumeFileInput.addEvent('change', function(){
//                 fullpath = this.value;
//                 filename = fullpath.replace(/^.*[\\\/]/, '');
//                 fileName_id_resume.set('text', filename);
//             });
//         } 

//         /* Convert description fields to RTE */
//         var textAreas = $$('.rte');
//         if (textAreas[0] != undefined) {
//             /* set rte options */
//             var options = { 'cleanup': true,
//                             'xhtml': false,
//                             'actions': 'insertunorderedlist insertorderedlist indent outdent hyperlink | createlink unlink | undo redo | toggleview' }
//             textAreas.each(function(textArea){
//                 textArea.mooEditable(options);
//             });
//         }

//         /*follow and unfollow */
//         if (followList = ($('followList'))) {
//             var readyToRequest = true;

//             /* load spinner images before click */

//             var loadingSpinner;
//             var imagePrefetcher = new Element('span', {'class': 'image-prefetcher'});
//             followList.grab(imagePrefetcher, 'top');
//             var followloadingSpinner = new Element('span', {'class': 'loading-spinner pink-bg-loading-spinner'});
//             imagePrefetcher.grab(followloadingSpinner);
//             var unfollowloadingSpinner = new Element('span', {'class': 'loading-spinner grey-bg-loading-spinner'});
//             imagePrefetcher.grab(unfollowloadingSpinner);

//             /*end  load spinner images before click */

//             followList.addEvent('click:relay(.ajaxFollowOrUnfollow)',  function () {
//                 var self = this;
//                 var buttonText = self.innerText || self.textContent;
//                 buttonText = buttonText.toLowerCase();

//                 if (readyToRequest == true) {
//                     readyToRequest = false;
//                     request_url = this.getAttribute('data-follow_or_unfollow_url');

//                     // selecting spinner.
//                     if ( buttonText == "follow" ) {
//                         loadingSpinner = followloadingSpinner;
//                     }
//                     else {
//                         loadingSpinner = unfollowloadingSpinner;
//                     }

//                     loadingSpinner.inject(this, 'top');
//                     var FollowOrUnFollowRequest = new Request({
//                         url: request_url,
//                         method: 'post',
//                         onSuccess: function(response){
//                                 response = JSON.parse(response);
//                                 if (response.status == true) {
//                                     messageButton = self.parentElement.getElement('.messageButton');
//                                     followCountWrapper = self.parentElement.parentElement.getElements('.follow');
//                                     if ( buttonText == "follow") {
//                                         self.removeClass('pink_color');
//                                         self.addClass('gray_color');
//                                         if (messageButton) {
//                                             messageButton.removeClass('gray_color');
//                                             messageButton.addClass('green_color');
//                                             if ( tiptext = $$('.tip-text')[0])  {
//                                                 tiptext.destroy();
//                                             }
//                                             self.parentElement.getElements('.tool-tip').destroy();
//                                             messageButton.inject(self.parentElement);
//                                         }
//                                     } else {
//                                         self.removeClass('gray_color');
//                                         self.addClass('pink_color');
//                                         if (messageButton) {
//                                             messageButton.removeClass('green_color');
//                                             messageButton.addClass('gray_color');
//                                             tooltip = new Element('span', {'class': 'tool-tip', 'rel': 'You must follow a mentor to send a message'});
//                                             tooltip.wraps(messageButton);
//                                             tips.attach([tooltip]);
//                                         }
//                                     }
//                                     if (messageButton) {
//                                         messageButton.set('href', response.url_message);
//                                     }
//                                     if (wrapper = followCountWrapper[0]) {
//                                         if(followingWrapper = wrapper.getElements('.followers .count')[0]) {
//                                             followingWrapper.set('text', response.followers_count);
//                                         }
//                                         if(textNode = wrapper.getElements('.followers .title')[0]) {
//                                             pluralize = 's'
//                                             if (response.followers_count == 1)
//                                                 pluralize = ''
//                                             textNode.set('text', 'Follower'+pluralize);
//                                         }
//                                     }
//                                     self.setAttribute('data-follow_or_unfollow_url',response.url),
//                                     self.set('text', response.button_message);
//                                     loadingSpinner.dispose();
//                                     readyToRequest = true;
//                                 } 
//                                 else {
//                                     loadingSpinner.dispose();
//                                     readyToRequest = true;
//                                 }
//                         readyToRequest = true;
//                         },
//                         onFailure: function(){
//                         }
//                     });
//                     setTimeout(function(){
//                         FollowOrUnFollowRequest.send();
//                     }, 1000);

//                 } 
//             });
//         } /* end follow and unfollow */


//         /* RSVP */
//         if ((eventList = $('rsvpList'))) {

//             /* prefetch spinner image */
//             var imagePrefetcher = new Element('span', {'class': 'image-prefetcher'});
//             eventList.grab(imagePrefetcher, 'top');
//             var rsvpSpinner = new Element('span', {'class': 'loading-spinner green-bg-loading-spinner'});
//             imagePrefetcher.grab(rsvpSpinner);

//             var readyToRequest = true;
//             eventList.addEvent('click:relay(.sendRSVP)' ,function (){
//                 var self = this;
//                 if (readyToRequest == true) {
//                     readyToRequest = false;
//                     rsvpSpinner.inject(self, 'top');
//                     RSVPRequest = new Request({
//                         url: self.getAttribute('data-rsvp-url'),
//                         method: 'post',
//                         onSuccess: function(response) {
//                             self.removeClass('sendRSVP');
//                             self.addClass('disabled');
//                             self.removeEvents('click');
//                             rsvp_count = parseInt(self.getAttribute('data-rsvp-count'));
//                             if (!isNaN(rsvp_count)) {
//                                 self.getElementById('rsvpCount').set('text', ++rsvp_count);
//                             }
//                             rsvpSpinner.dispose();
//                             readyToRequest = true;
//                         },
//                         onFailure: function(response){
//                             // console.log(response);
//                         }
//                     });
//                 }
//                 setTimeout(function(){
//                     RSVPRequest.send();
//                 }, 1000);
//             });
//         }/* end RSVP */


//         /* intilializing tooltips */
//         var tips = new Tips($$('.tool-tip'), {'className': 'tool-tip'});
//     },

//     jobStatus: function() {
//         if (($('id_job_type_1').checked == true) || ($('id_job_type_3').checked == true)) {
//            $('id_job_percentage').addClass('active');
//         }
//         else {
//             $('id_job_percentage').removeClass('active');
//         }
//     },

//     careerCenter: function() {
//         var enter_job = $('id_search_what');
//         var enter_location = $('id_search_where');

//         if (enter_job.value) {
//              $('keyword_search').addClass('disable');
//         }
//         if (enter_location.value) {
//              $('location_search').addClass('disable');
//         }

//         $$('.holder_head').addEvent('click', function() {
//             var element_id = $(this).get('id');
//             if (element_id == 'keyword_search') {
//                 enter_job.focus();
//                 $('keyword_search').addClass('disable');
//             }
//             else {
//                 enter_location.focus();
//                 $('location_search').addClass('disable');
//             }
//         });
//         enter_job.addEvent('blur', function () {
//             var item = $('id_search_what').value;
//             if (!item) {
//                 $('keyword_search').removeClass('disable');
//             }
//             else {
//                 $('keyword_search').addClass('disable');;
//             }
//         });
//         enter_location.addEvent('blur', function () {
//             $('location_search').removeClass('disable');
//             var item = $('id_search_where').value;
//             if (!item) {
//                 $('location_search').removeClass('disable');
//             }
//             else {
//                 $('location_search').addClass('disable');;
//             }
//         });
//         enter_job.addEvent('focus', function() {
//             $('keyword_search').addClass('disable');
//         });
//         enter_location.addEvent('focus', function() {
//             $('location_search').addClass('disable');
//         });

//     },

//     setCheckbox : function() {
//         var check = $('id_private');
//         var marklab = $$('.keep_private');
//         marklab.addEvent('click', function() {    
//            if(check.checked) {
//               marklab.addClass('active');
//            }
//            else {
//              marklab.removeClass('active');
//            }
//         });
//     },

//     translate: function() {
//         var self = this;
//         var popup = $$('.popup_translator')[0];
//         var overlay = $$('.popup_overlay')[0];
//         if (popup) {
//             var english = popup.getElement('.button_translate.eng');
//             var close = popup.getElement('#close_button');
//             var spanish = popup.getElement('.button_translate.esp');
//             var trans_english = $$('.trans_english');
//             var trans_spanish = $$('.trans_spanish');
//             close.addEvent('click', function(ev) {
//                 popup.setStyle('display', 'none');
//                 overlay.setStyle('display', 'none');
//             });
//             english.addEvent('click', function(ev) {
//                 ev.stop();
//                 close.fireEvent('click');
//             });
//             spanish.addEvent('click', function(ev) {
//                 ev.stop();
//                 trans_english.addClass('hidden');
//                 trans_spanish.removeClass('hidden');
//                 self.adjustHeight();
//                 close.fireEvent('click');
//             });
//         }
//     },

//     contactUs: function() {
//         var self = this;
//         var wrapper = $$('.campaign_wrapper')[0];
//         var title = wrapper.getElement('.title');
//         var dropdown = wrapper.getElement('.dropdown');
//         var details = wrapper.getElement('.details');
//         var campaigns = dropdown.getElements('a');
//         var field = $('id_campaign');
//         this.processCaptcha();
//         title.addEvent('click', function() {
//             if (dropdown.getChildren().length) {
//                 dropdown.toggleClass('hidden');
//             }
//         });
//         if (title.hasClass('default')) {
//             field.value = title.get('html');
//             title.removeClass('default');
//         }
//         campaigns.each(function(el) {
//             el.addEvent('click', function(ev) {
//                 ev.stop();
//                 var data = el.getParent().getElement('.detail');
//                 details.set('html',data.get('html'));
//                 title.set('html',el.get('html'));
//                 field.value = el.get('html');
//                 campaigns.each(function(i) {i.removeClass('active');});
//                 el.addClass('active');
//                 dropdown.addClass('hidden');
//                 self.sectionSeparator();
//             });
//         });
//         window.addEvent('click', function(ev) {
//             var parents = ev.target.getParents();
//             if (!parents.contains(wrapper)) {
//                 dropdown.addClass('hidden');
//             }
//         });
//     },

//     adHover: function() {
//         var ads = $$('.advertisement');
//         ads.each(function(ad) {
//             var container = ad.getElement('.container');
//             var overlay = ad.getElement('.overlay');
//             var imgSize = ad.getElement('img').getSize();
//             overlay.setStyles({'height':imgSize.y,'width':imgSize.x});
//         });
//     },

//     jobStatuschange: function() {
//         var status_button = $('.job_state');
//         status_button.addEvent('click', function() {
//            status_button.addClass('active');
//         });
//     },

//     ready: function() {
//         var body_content = $('content-wrapper');
//         var close_form = $('close_button');
//         var icon_mob = $('mobile_nav_icon');
//         var overlay = $$('.menu_overlay');
//         var nav_menu = $$('.menu');
//         var search =$$('.search_form');
//         icon_mob.addEvent('click', function() {
//             if((icon_mob).hasClass('close')) {
//                 icon_mob.removeClass('close'); 
//                 overlay.removeClass('active');
//                 search.removeClass('active');
//                 nav_menu.removeClass('active');
//                 body_content.removeClass('hide');
//             }
//             else {
//                 icon_mob.addClass('close');
//                 overlay.addClass('active');
//                 search.addClass('active');
//                 nav_menu.addClass('active');
//                 body_content.addClass('hide');
//             }    
//         });

//          if ($(document.body).hasClass('job_details')) {
//             this.setCheckbox();
            
//          }

//         if($$('.user_name')[0]) {
//             var ul = new UserLogin();
//         }

//         if ($(document.body).hasClass('company_jobs')) {
//            this.jobStatuschange();
//         }

//         if (document.body.hasClass('home')) {
//             new InstagramWidget();
//         }
//         if($('id_email')) new ProcessConfForm();
//         if ($$('.signup_wrapper').length>0) new FormHandler($$('.signup_wrapper')[0]);
//         if ($$('.login_wrapper').length>0) new FormHandler($$('.login_wrapper')[0]);





//         /*tool-tip for disabled button */
//         disabledButtons = $$('.disabled');
//         if (disabledButtons[0] != undefined) {
//             new Tips($$('.tool-tip'), {'className': 'tool-tip'});
//         }



//         if(profileSectionForms = $('profileSectionForms')) {
//             if (addsectionBtn = $('addSection')) {

//                 function createProfileSection () {
//                     total_forms = $('id_profile_section-TOTAL_FORMS');
//                     newFormIndex = parseInt(total_forms.get('value'));
//                     total_forms.set('value', newFormIndex+1);             
//                     profile_section_image_width = profileSectionForms.get('data-profile_section_image_width');
//                     profile_section_image_height =  profileSectionForms.get('data-profile_section_image_height');
                    
//                     /*  Creating new profile section elements*/
//                     section_header = new Element('div', {'class': 'section_header'});
//                     clear_field2 = new Element('div', {'class': 'clear_field'});
//                     label = new Element('label', {'class': 'color_clear', 'for': 'id_profile_section-'+newFormIndex+'-remove_section', 'text': 'Remove Section'});
//                     remove_section = new Element('input', {'name': 'profile_section-'+newFormIndex+'-remove_section', 'style': 'display:none;', 'id': 'id_profile_section-'+newFormIndex+'-remove_section' , 'type':'checkbox'});
//                     remove_section.inject(clear_field2);
//                     label.inject(clear_field2);
//                     clear_field2.inject(section_header);
//                     id = new Element('input', {'name': 'profile_section-'+newFormIndex+'-id', 'value': '', 'id': 'id_profile_section-'+newFormIndex+'-id' , 'type':'hidden'})
//                     is_title_editable = new Element('input', {'name': 'profile_section-'+newFormIndex+'-is_title_editable', 'value': 'True', 'placeholder': '', 'id': 'id_profile_section-'+newFormIndex+'-is_title_editable' , 'type':'hidden'})               
//                     title = new Element('input', {'name': 'profile_section-'+newFormIndex+'-title', 'value': '', 'placeholder': '', 'id': 'id_profile_section-'+newFormIndex+'-title' , 'type':'text'})
//                     h3 = new Element('h3');
//                     title.inject(h3);
//                     var profile_section_image_input = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image', 'value': 'True', 'id': 'id_profile_section-'+newFormIndex+'-image' , 'type':'file', 'class': 'profile-section-image-input'});             
//                     id.inject(section_header);
//                     is_title_editable.inject(section_header);
//                     h3.inject(section_header);
//                     profile_section_image_input.inject(section_header);
//                     description = new Element('div', {'class': 'half_width_text margin_right'});
//                     field = new Element('div', {'class': 'field'});
//                     textarea = new Element('textarea', {'name': 'profile_section-'+newFormIndex+'-description', 'value': '', 'placeholder': '', 'id': 'id_profile_section-'+newFormIndex+'-description' });
//                     textarea.inject(field);
//                     field.inject(description);
//                     profile_image = new Element('div', {'class': 'half_width_upload'});
//                     upload_image_video = new Element('div', {'class': 'upload_image_video'});
//                     upload_image_video.inject(profile_image);

//                     //code need to improve
//                     div_element = new Element('div');
//                     div_element.inject(upload_image_video);
//                     browse_div = new Element('div', {'class': 'browse_div'});
//                     browse_div.inject(div_element);
//                     browse_fields = new Element('div', {'class': 'browse_fields'});
//                     browse_fields.inject(browse_div);
//                     up_image = new Element('input', { 'type':'file', 'name': 'profile_section-'+newFormIndex+'-image','class': 'up_image', 'value': '', 'id': 'id_profile_section-'+newFormIndex+'-image'})
//                     up_image.inject(browse_fields);
//                     croped_image = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image', 'value': '', 'class': 'croped_image_file', 'id': 'hidden_profile_section-'+newFormIndex+'-image' , 'type':'hidden'})
//                     croped_image.inject(browse_fields);
//                     browse_button = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image', 'value': 'Browse', 'class': 'browse_button' , 'type':'button'})
//                     browse_button.inject(browse_fields);
//                     width = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image_width', 'value': profile_section_image_width, 'type':'hidden'})
//                     width.inject(browse_fields);
//                     height = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image_height', 'value': profile_section_image_height, 'type':'hidden'})
//                     height.inject(browse_fields);
//                     resizable = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image_resizable', 'value': 'True', 'type':'hidden'})
//                     resizable.inject(browse_fields);
//                     upload_to = new Element('input', {'name': 'profile_section-'+newFormIndex+'-image_upload_to', 'value': 'uploads/profile_section/', 'type':'hidden'})
//                     upload_to.inject(browse_fields);

//                     var img = new Element('img', {'src': '/devstatic/graphics/common/image_avatar.jpg?version=e80a59ecd0dfde8cfb5ed9768320d718ab12d2aa','class': 'custom_field_img'});
//                     img.inject(browse_div);
//                     label = new Element('label', {'class': 'profile_section_image', 'for': 'id_profile_section-'+newFormIndex+'-image', 'text': 'Upload Image'});
//                     label.inject(upload_image_video);
//                     messageSpan = new Element('span', {'class': 'error', 'id': 'profileSectionImageMsg'});
//                     upload_image_video.grab(messageSpan);
//                     clear_field = new Element('div', {'class': 'clear_field'});
//                     label = new Element('label', {'class': 'color_clear', 'for': 'id_profile_section-'+newFormIndex+'-clear_button', 'text': 'Clear'});
//                     label.inject(clear_field);
//                     checkbox = new Element('input', {'name': 'profile_section-'+newFormIndex+'-clear_button', 'id': 'id_profile_section-'+newFormIndex+'-clear_button' , 'type':'checkbox'});
//                     checkbox.inject(clear_field);
//                     clear_field.inject(upload_image_video);
//                     form_row = new Element('div', {'class': 'form_row'});
//                     section_header.inject(form_row);
//                     description.inject(form_row);
//                     profile_image.inject(form_row);      
//                     clear_fields = form_row.getElements('.clear_field');
//                     new RadioButtonHandler(clear_fields.getElement('label','checkbox'));
//                     form_row.inject(profileSectionForms); 
//                     /*** end ----- bind new elements with preview image and validation **/
//                     new UploadManager(profile_section_image_input , {frm: 'upload_form'});
//                 }   
//                 // Creating new profile section
//                 addsectionBtn.addEvent('click', function(){
//                     new createProfileSection();
//                 });
//             }  
//         }

//         if(v=$('changeVideoLabel')) {
//             v.addEvent('click', function() {
//                 $('videoWrapperId').toggle();
//             });
//         }

//     },


//     sectionSeparator: function() {
//         if ($$('.left_section').length>0) {
//             var left_sec_height = $$('.left_section')[0].getSize().y;
//             if (!this.initial_right_sec_height)
//                 this.initial_right_sec_height = $$('.right_section')[0].getSize().y;
//             if (left_sec_height>this.initial_right_sec_height) {
//                 $$('.right_section')[0].setStyle('height', left_sec_height);
//             }
//         }
//     },

//     adjustHeight: function() {
//         if ($$('.left_section').length>0) {
//             var left_sec_height = $$('.left_section')[0].getSize().y;
//             var right_sec_height = $$('.right_section')[0].getSize().y;
//             if (left_sec_height < right_sec_height) {
//                 $$('.right_section')[0].setStyle('height', Math.max(left_sec_height,this.initial_right_sec_height));
//             } else {
//                 $$('.right_section')[0].setStyle('height', left_sec_height);
//             }
//         }
//     },

//     processCaptcha: function() {
//         var field = $('recaptcha_response_field');
//         var captcha = $('div_id_captcha');
//         var error_msg = $$('.captcha_error')[0];
//         field.addEvent('keydown', function() {
//             error_msg.addClass('invisible');
//         });
//         if (captcha.hasClass('error')) {
//             error_msg.removeClass('invisible');
//         }
//     }
// });

// var InstagramWidget = new Class({
//     Implements: [Options],
//     options: {
//         'update_frequency': 60*60*1000,
//     },
//     initialize: function() {
//         this.requestPhotos = new Request.HTML({url: '/instagram/', update: $$('.side_widget .insta_widget_wrapper')[0]});
//         this.requestPhotos.addEvent('success', function() {
//             new SlideShow($$('.side_widget .insta_widget_wrapper ul')[0], {
//                 autoplay: true,
//                 delay: 5000,
//                 transition: 'crossFade'
//             });
//         })
//         this.sendRequest();
//         this.sendRequest.periodical(this.options.update_frequency, this);
//     },
//     sendRequest: function() {
//         this.requestPhotos.get();
//     }
// });

new UI();

// function previewImage(input, img) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function (e) {
//             img.set('src', e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//         return true;
//     }
//     return false;
// }

// function validateImageSize(img, width, height, error_msg_container, msg, innerHTML) {
// function validateImageSize(options) {
//     var fileInput = options['fileInput'];
//     var img = options['img'];
//     var valid = ((img.naturalHeight == options['height']) && (img.naturalWidth == options['width']))
//     var msg = options['message'] == undefined  ? 'Invalid image size '+img.naturalWidth+'*'+img.naturalHeight+' pixels ' : options['message'];
//     var error_msg_container = options['messageContainer'];
//     var innerHTML = options['innerHTML'] == undefined ? '' : options['innerHTML'];

//     if ( error_msg_container != undefined) {
//         if (valid) {
//             error_msg_container.set('text', '');
//         } else {
//             error_msg_container.set('text', msg);
//         }
//     }
//     return valid
// }


