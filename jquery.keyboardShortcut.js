/*
* keyboardShortcut - Pretty powerful tooltips
* https://github.com/vincentdieltiens/jQuery-keyboard-Shortcut
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

(function($) {
    
    $.keyboardShortcut = function(options) {
        $('body').keyboardShortcut(options);
        return $('body').data('keyboard_shortcut');
    }
    
    $.fn.keyboardShortcut = function(options) {
        
        var options = $.extend({}, $.fn.keyboardShortcut.defaults, options);
        options.before = (typeof options.before == 'function') ? options.before : null;
        options.after = (typeof options.after == 'function') ? options.after : null;
        
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
         *      "cmd+a",
         * },
         * ctrlSameCmd: false
         */
        bindings: {},
        except_in: "",
        ctrlSameCmd: false,
        before: null,
        after: null
    };
    
    function KeyboardShortcut($container, options)
    {
        this.$container = $container;
        this.options = options;
        
        var self = this;
        this.bindings = {};
        $.each(this.options.bindings, function(command, o) {
            self.bind(command, o);
        });
        
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
            51: '3',
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
                
                var key = self.get_key_string(e.keyCode);
                var cmd = key;
                
                if( e.shiftKey == true && key != 'shift' ) {
                    cmd = "shift+"+cmd;
                }
                
                if( e.altKey == true && key != 'alt'  ) {
                    cmd = "alt+"+cmd;
                }
                
                if( e.metaKey == true && key != 'cmd'  ) {
                    cmd = "cmd+"+cmd;
                }
                
                if( e.ctrlKey == true && key != 'ctrl' ) {
                    cmd = "ctrl+"+cmd;
                }
                
                if( cmd in self.bindings ) {
                    
                    if( self.options.before != null ) {
                        self.options.before(cmd, cmd.f, cmd.name)
                    }
                    
                    var execute = true;
                    if( self.bindings[cmd].auth != null ) {
                        execute = self.bindings[cmd].auth(cmd, cmd.f, cmd.name);
                    }
                    
                    if( execute ) {
                        self.bindings[cmd].f();
                    }
                    
                    if( self.options.after != null ) {
                        self.options.after(cmd, cmd.f, cmd.name)
                    }
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
        bind: function(cmd, o) {
            if( typeof o == 'function' ) {
                this.bindings[cmd] = {
                    f: o,
                    name: null,
                    auth: null,
                }
            } else {
                this.bindings[cmd] = {
                    f: o.f,
                    name: (typeof o.name == 'string') ? o.name : null,
                    auth: (typeof o.auth == 'function') ? o.auth : null
                }
            }
        },
        unbind: function(cmd) {
            delete this.bindings[cmd];
        },
        get_command_name: function(cmd) {
            return this.bindings[cmd].name
        },
        get_command: function(name) {
            var command = null;
            $.each(this.bindings, function(cmd, o){
               if( o.name == name ) {
                   command = cmd;
               } 
            });
            return command.replace(/\+/g, ' + ');
        }
    };
    
})(jQuery);