/**
* Platoon Dropdown:
*  - adds a platoon dropdown menu
*
* @author dapil
* @version 1.0
* @url https://raw.github.com/dapil/platoon-dropdown-bblog/master/platoon-dropdown.js
* @last-edit 4. 2. 2013 6:16
*/

BBLog.handle("add.plugin", {
    id : "platoon-dropdown",
    name : "Platoon Dropdown",
    
//    configFlags : [
//		["option.menu", 1],
//		["option.feed", 1],
//		["option.block", 1],
//	],

//    translations : {
//        "en" : {
//            "foo" : "bar",
//        },
//        "cs" : {
//            "foo" : "bar",
//        },

    },
    
    init : function(instance){
          instance.AddDropdown(instance);

    },   

    domchange : function(instance){
          instance.AddDropdown(instance);
    },
    
    AddDropdown : function(instance){
      $("li[data-page="platoons"]").addClass("has-dropdown");
      $("li[data-page="platoons"]").attr('data-bind-toggle', 'dropdown');
      $(.dropdown-bar).append('<div class="dropdown-content" data-for="platoons"><div class="row"><nav class="span4 dropdown-menu"><a href="/bf3/cs/forum/"><i class="icon-white icon-friends2"></i><span>Platoon 1</span></a><a id="bblog-open-forum-fav"><i class="icon-white icon-friends2"></i><span>Platoon 2</span></a></nav></div></div>');
    },
    

});



