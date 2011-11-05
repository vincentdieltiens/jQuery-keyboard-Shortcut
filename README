Description
===========
This jQuery plugin makes easy to use keyboard shortcut in a web page.

Options
=======

The plugin accepts 3 options :

* "bindings" (mandatory) : an object with commands as keys and functions or objects as values :

    {
      "alt+a": function() { ... },
      "alt+b": { action: function() { ... }, auth: function() { return true } }
    }
 
* "except_in" (optional) : an string with the selectors of the tags for which the shortcut are not active. 
* "ctrlSameCmd" (optional) : unused right now

How to use
============
    $('#container').keyboardShortcut({
      bindings: {
        "a": function() {
          alert("a pressed !");
        },
        "cmd+a": function() {
          alert("cmd + a pressed");
        },
        "ctrl+a": function() {
          alert("ctrl + a pressed");
        },
        "ctrl+alt+a": function() {
          alert("ctrl + alt + a pressed");
        }
      },
      except_in: "input"
    });

In this example, we bind 4 shortcuts (on "a", "cmd+a" (in for Mac Os x), "ctrl+a", "ctrl+alt+a") but these one are not active in input fields.