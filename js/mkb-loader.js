(function(window) {
    'use strict';
    
    var document = window.document,
        //srcpath = 'https://stojkov.me/mk-keyboard/mkboard.min.html',
        srcpath = 'mkboard.html',
        k,
        s = [
            '#mkkbwr {',
                'position: fixed !important;',
                'z-index:99999;',
                'width: 190px;',
                'height: 75px;',
                'left: 100%;',
                'margin-left: -200px;',
                'top:10px;',
                'transform-origin: 100% 0;',
                '-webkit-transform-origin: 100% 0;',
                /*'transition: transform .2s ease-out;',
                '-webkit-transition: -webkit-transform .2s ease-out;',*/
            '}',
            
            '#mkkbwr.is-dragging {',
                'opacity:.5;',
                'transition: none;',
                '-webkit-transition: none;',
            '}',
            
            '#mkkbwr.mkkb-hide {',
                'transform: scale(0);',
                '-webkit-transform: scale(0);',
                'transition: transform .2s ease-in;',
                '-webkit-transition: -webkit-transform .2s ease-in;',
            '}',
            
            '#mkkb-dh {',
                'position:absolute;',
                'top:-5px;',
                'left:0;',
                'border:0;',
                'height:10px;',
                'cursor: move;',
                'width:100%;',
            '}',
            
            '#mkkbwr iframe {',
                'position:absolute;',
                'top:0;',
                'bottom:0;',
                'transform: translateZ(0);',
                '-webkit-transform: translateZ(0);',
                'left:0;',
                'right:0;',
                'border:0;',
                'height:100%;',
                'width:100%;',
                'border-radius: 5px;',
                'border: 1px solid #bbb;',
                'box-shadow: 0 3px 0px rgba(0, 0, 0, 0.15), 0 1px 10px rgba(0, 0, 0, 0.25);',
            '}'
        ], div, iframe, h, sc;
    
    k = document.createElement('style');
	k.setAttribute('id', 'mkkb-loader-styles');
	k.appendChild( document.createTextNode( s.join('') ) );
	(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(k);
    
    
    div = document.createElement('div');
    div.setAttribute('id', 'mkkbwr');
    
    iframe = document.createElement('iframe');
    iframe.setAttribute('src', srcpath);
    div.appendChild(iframe);
    
    h = document.createElement('div');
    h.setAttribute('id', 'mkkb-dh');
    div.appendChild(h);
    
    (document.getElementsByTagName('BODY')[0]).appendChild(div);
    
    window.addEventListener('message', receiveMessage, false);
    
    function receiveMessage(e) {
        if(e.data == 'close') {
            document.getElementById('mkkbwr').classList.add('mkkb-hide');
        }
    }
    
    if(typeof window.Draggabilly != 'function') {
        window.Draggabilly = function() {};
        (function () { var s = document.createElement('script'); s.async = true;s.src = 'js/draggabilly.pkgd.min.js';(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);}());
    }
    
    setTimeout(function() {new Draggabilly( div, {
        handle: '#mkkb-dh'
       
    });}, 1000)
    
})(this);