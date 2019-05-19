window.addEvent('domready', function(){
    if ($('#id_body').length != 0) {
        var overlay = new Element('div',{'class': "select_window_overlay"});
        var wrapper = new Element('div',{'class': "select_wrapper"});
        overlay.inject(document.body);
        wrapper.inject(document.body);    
    }

    if ($('#id_body').length != 0) {
        new MooEditable('id_body');
    }
});
