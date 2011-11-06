/*
* keyboardShortcut - Pretty powerful tooltips
*
* Version: nightly
* Copyright 2010-2011 Vincent Dieltiens - http://www.vincentdieltiens.be
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Sat Nov 5 20:39:38 2011 +0100
*/

(function($){
    
    $.fn.keyboardShortcut = function(options) {
        
        var options = $.extend({}, $.fn.keyboardShortcut.defaults, options);
        
        return this.each(function(){
           
           var $container = $(this);
           var keyboardShortcut = new KeyboardShortcut($container, options);
           $.data(this, 'keyboard_shortcut', keyboardShortcut);
           
        });
        
    };
    
    $.fn.keyboardShortcut.defaults = {
        /* bindings: {
         *      "ctrl+a": function() {},
         *      "a": function() {},
         *      "cmd+a"
         * },
         * ctrlSameCmd: false
         */
        bindings: {},
        except_in: "",
        ctrlSameCmd: false
    };
    
    function KeyboardShortcut($container, options)
    {
        this.$container = $container;
        this.options = options;
        this.bindings = $.extend({}, this.options.bindings);
        
        this._init_handlers();
        
        this.keyStrings = {
            3: 'cancel',
            6: 'help',
            8: 'backspace',
            9: 'tab',
            12: 'clear',
            13: 'return',
            14: 'enter',
            16: 'shift',
            17: 'ctrl',
            18: 'alt',
            19: 'pause',
            20: 'capslock',
            27: 'escape',
            32: 'space',
            33: 'pageup',
            34: 'pagedown',
            35: 'end',
            36: 'home',
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
            44: 'printscreen',
            45: 'insert',
            46: 'del',
            48: '0',
            49: '1',
            50: '2',
            51: '4',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            59: ';',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            96: 'pad0',
            97: 'pad1',
            98: 'pad2',
            99: 'pad3',
            100: 'pad4',
            101: 'pad5',
            102: 'pad6',
            103: 'pad7',
            104: 'pad8',
            105: 'pad9',
            106: '*',
            107: 'plus',
            109: 'sub',
            111: '/',
            188: ',',
            190: '.',
            191: '/',
            192: '`',
            219: '(',
            221: ')' 
        };
    };
    
    KeyboardShortcut.prototype = {
        _init_handlers: function() {
            this._update_bindings();
        },
        _update_bindings: function() {
            
            var self = this;
            this.$container.keydown(function(e) {
                
                if( $(e.target).is(self.options.except_in) ) {
                    return;
                }
                
                if( !self.has_key_string(e.keyCode) ) {
                    return;
                }
                
                
                console.log(e.keyCode+ '-'+ self.get_key_string(e.keyCode));
                var cmd = self.get_key_string(e.keyCode);
                
                if( e.shiftKey == true ) {
                    cmd = "shift+"+cmd;
                }
                
                if( e.altKey == true ) {
                    cmd = "alt+"+cmd;
                }
                
                if( e.metaKey == true ) {
                    cmd = "cmd+"+cmd;
                }
                
                if( e.ctrlKey == true ) {
                    cmd = "ctrl+"+cmd;
                }
                
                if( cmd in self.bindings ) {
                    var action = null;
                    if( typeof self.bindings[cmd] == 'function' ) {
                        action = self.bindings[cmd];
                    } else {
                        action = self.bindings[cmd].action;
                    }
                    action();
                }
            });
        },
        get_key_string: function(key) {
            if( key in this.keyStrings ) {
                return this.keyStrings[key];
            }
            return null;
        },
        has_key_string: function(key) {
            return key in this.keyStrings;
        },
        bind: function(cmd, f, auth) {
            if( typeof auth == 'undefined' ) {
                this.bindings[cmd] = f;
            } else {
                this.bindings[cmd] = {
                    action: f,
                    auth: auth
                };
            }
        },
        unbind: function(cmd) {
            delete this.bindings[cmd];
        }
    };
    
})(jQuery);