(function(window) {
    'use strict';
    
    var document = window.document,
        srcpath = 'http://stojkov.me/mk-keyboard/mkboard.min.html',
        k,
        s = [
            '#mkkb-wrapper {',
                'position: fixed;',
                'z-index:99999;',
                'width: 154px;',
                'height: 96px;',
                'right:0;',
                'top:0;',
                'transform-origin: 100% 0;',
                '-webkit-transform-origin: 100% 0;',
                'transition: transform .25s ease;',
                '-webkit-transition: -webkit-transform .25s ease;',
            '}',
            
            '#mkkb-wrapper.mkkb-hide {',
                'transform: scale(0);',
                '-webkit-transform: scale(0);',
            '}',
            
            '#mkkb-wrapper iframe {',
                'position:absolute;',
                'top:0;',
                'bottom:0;',
                'left:0;',
                'right:0;',
                'border:0;',
                'height:100%;',
                'width:100%;',
            '}'
        ], div, iframe;
    
    k = document.createElement('style');
	k.setAttribute('id', 'mkkb-loader-styles');
	k.appendChild( document.createTextNode( s.join('') ) );
	(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(k);
    
    
    div = document.createElement('div');
    div.setAttribute('id', 'mkkb-wrapper');
    
    iframe = document.createElement('iframe');
    iframe.setAttribute('src', srcpath);
    div.appendChild(iframe);
    (document.getElementsByTagName('BODY')[0]).appendChild(div);
    
    window.addEventListener('message', receiveMessage, false);
    
    function receiveMessage(e) {
        if(e.data == 'close') {
            document.getElementById('mkkb-wrapper').classList.add('mkkb-hide');
        }
    }
    
})(this);