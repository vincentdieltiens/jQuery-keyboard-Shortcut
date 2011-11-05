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
                
                var cmd = String.fromCharCode(e.keyCode).toLowerCase();
                
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