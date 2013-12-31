(function(window) {
	'use strict';
    
    var document = window.document,
        isShift = false,
        isCaps = false,
        keymap = {
			'upper': {
                192: "\u040d",
                226: "\u00c8"
            },
			'lower': {
                192: "\u045d",
                226: "\u00e8"
            }
		},
        
        DOMManager = function() {
            this.cache = {};
        }, 
         
        clip;
    
    DOMManager.prototype.getById = function(id) {
		return document.getElementById(id) || false;
	};
	
	DOMManager.prototype.getByClass = function(cls) {
		return document.getElementsByClassName(cls) || false;
    };
	
	DOMManager.prototype.addClass = function( id, value, byClass ) {
		var i, l, elems = [];
		
		if( byClass ) {
			elems = this.getByClass(id);
		} else {
			if( (elems = this.getById(id)) ) {
				elems = [ elems ];
			}
		}
	    
        for ( i = 0, l = elems.length; i < l; i++ ) {
            if( !elems[i].classList.contains( value ) ) {
                elems[i].classList.add( value );
            }
        }
	};
	
	DOMManager.prototype.removeClass = function( id, value, byClass ) {
		var i, l, elems = [];
		
		if( byClass ) {
			elems = this.getByClass(id);
		} else {
			if( (elems = this.getById(id)) ) {
				elems = [ elems ];
			}
		}
        for ( i = 0, l = elems.length; i < l; i++ ) {
            if( elems[i].classList.contains( value ) ) {
                elems[i].classList.remove( value );
            }
        }
	};
	
	DOMManager.prototype.setStyle = function( id, style, value ) {
		this.getById(id).style[style] = value;
	}
    
    DOMManager.prototype.hasClass = function( id, name ) {
		return this.getById(id).classList.contains( name );
	}
	
	var domMgr = new DOMManager();
    
    
    if( MKBoardHasFlash ) {
        clip = new ZeroClipboard([document.getElementById('k192'), document.getElementById('k226')]);
        
        clip.on('dataRequested', function(klient, args) {
            var key = this.getAttribute('id').replace("k", ''),
                el,
                ch = (isShift || isCaps) ? keymap.upper[ key ] : keymap.lower[ key ];
            
            klient.setText( ch );
            
            /**/
            [].forEach.call((domMgr.getById('mkkb-cnt')).querySelectorAll('.mkkb-show'), function(el) {
				el.classList.remove('mkkb-show');
			});
            
            if(key == 192) { // i
                el = (isShift || isCaps) ? 'mkkb-i-upper-selected-text' : 'mkkb-i-selected-text';
            } else {
                el = (isShift || isCaps) ? 'mkkb-e-upper-selected-text' : 'mkkb-e-selected-text';
            }
            
            if( isShift ) {
                domMgr.removeClass('mkkb-cnt', 'mkkb-shift');
                domMgr.removeClass('mkkb-shiftBtn', 'mkkb-clicked', 1);
                isShift = !1;
            }
            
            domMgr.getById(el).classList.add('mkkb-show');
            /**/
            
            if( isShift ) {
                domMgr.removeClass('mkkb-cnt', 'mkkb-shift');
                domMgr.removeClass('mkkb-shiftBtn', 'mkkb-clicked', 1);
                isShift = !1;
            }
            
        });
        
        
        // Handle Mouse Clicks:
        (domMgr.getById('mkkb-cnt')).addEventListener('click', function(e) {
            if ( e.target.nodeType === 1) { 
                
                [].forEach.call((domMgr.getById('mkkb-cnt')).querySelectorAll('.mkkb-show'), function(el) {
                    el.classList.remove('mkkb-show');
                });
                
                // Char Clicked:
                //if( (" " + e.target.className + " ").replace(/[\n\t\r]/g, " ").indexOf( " mkkb-char " ) > -1 ) {
                if(e.target.classList.contains('mkkb-char')) {
                    var el, idkey = e.target.getAttribute('id').replace('k', ''), ch = getChar(idkey);
                    
                    if(idkey == 192) { // i
                        el = (isShift || isCaps) ? 'mkkb-i-upper-selected-text' : 'mkkb-i-selected-text';
                    } else {
                        el = (isShift || isCaps) ? 'mkkb-e-upper-selected-text' : 'mkkb-e-selected-text';
                    }
                    
                    if( isShift ) {
                        domMgr.removeClass('mkkb-cnt', 'mkkb-shift');
                        domMgr.removeClass('mkkb-shiftBtn', 'mkkb-clicked', 1);
                        isShift = !1;
                    }
                    
                    domMgr.getById(el).classList.add('mkkb-show');
                
                //} else if( (" " + e.target.className + " ").replace(/[\n\t\r]/g, " ").indexOf( " mkkb-shiftBtn " ) > -1 ) { // Shift
                } else if(e.target.classList.contains('mkkb-shiftBtn')) {
                    if(isShift) {
                        isShift = !1;
                        domMgr.removeClass('mkkb-cnt', 'mkkb-shift');
                        domMgr.removeClass('mkkb-shiftBtn', 'mkkb-clicked', 1);
                    } else {
                        isShift = !0;
                        domMgr.addClass('mkkb-cnt', 'mkkb-shift');
                        domMgr.addClass('mkkb-shiftBtn', 'mkkb-clicked', 1);
                        
                        if( isCaps ) {
                            domMgr.removeClass('mkkb-cnt', 'mkkb-caps');
                            domMgr.removeClass('mkkb-caps', 'mkkb-clicked', 1);
                            isCaps = !1;
                        }
                    }
                
                //} else if( (" " + e.target.className + " ").replace(/[\n\t\r]/g, " ").indexOf( " mkkb-caps " ) > -1 ) { // Caps Lock
                } else if(e.target.classList.contains('mkkb-caps')) {
                    if(isCaps) {
                        isCaps = !1;
                        domMgr.removeClass('mkkb-cnt', 'mkkb-caps');
                        domMgr.removeClass('k20', 'mkkb-clicked');
                    } else {
                        isCaps = !0;
                        domMgr.addClass('mkkb-cnt', 'mkkb-caps');
                        domMgr.addClass('k20', 'mkkb-clicked');
                    }
                    
                    if( isShift ) {
                        domMgr.removeClass('mkkb-cnt', 'mkkb-shift');
                        domMgr.removeClass('mkkb-shiftBtn', 'mkkb-clicked', 1);
                        isShift = !1;
                    }
                }
            }
        });
        
        
    } else {
        domMgr.getById('mkkb-cnt').classList.add('noflash');
        
        (domMgr.getById('mkkb-no-flash-text')).classList.add('mkkb-show');
        
        domMgr.getById('mkkb-inputs').addEventListener("click", function(e) {
            var el;
            if(e.target.nodeName == 'INPUT') {
            
                [].forEach.call((domMgr.getById('mkkb-cnt')).querySelectorAll('.mkkb-show'), function(el) {
                    el.classList.remove('mkkb-show');
                });
                
                switch(e.target.getAttribute('data-value')) {
                    case 'è':
                        el = 'mkkb-e-copy-text';
                        break;
                    
                    case 'ѝ':
                         el = 'mkkb-i-copy-text';
                        break;
                    
                    case 'È':
                         el = 'mkkb-e-upper-copy-text';
                        break;
                    
                    case 'Ѝ':
                         el = 'mkkb-i-upper-copy-text';
                        break;
                    default:
                        break;
                }
                (domMgr.getById(el)).classList.add('mkkb-show');
                e.target.select();
            }
           
        });
        
        domMgr.getById('mkkb-inputs').addEventListener("keyup", function(e) {
            var val = e.target.getAttribute('data-value');
            
            if( e.target.value != val ) {
                e.target.value = val;
                e.target.select();
            }
        });
    }
	
    
    domMgr.getById('mkkb-close-btn').addEventListener('click', function() {
		window.parent.postMessage("close", "*");
	});

    function getChar(code) {
		if (isCaps || isShift) { // isCaps != isShift
			return keymap.upper[code] || '';
		} else {
			return keymap.lower[code] || '';
		}
	}
    
})(this);