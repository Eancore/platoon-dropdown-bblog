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
    
    configFlags : [
//		["option.menu", 1],
//		["option.feed", 1],
//		["option.block", 1],
["button.title", 1, function(instance){
            instance.OpenMenu(instance);
        }],
	],

    translations : {
        "en" : {
            "button.title" : "Manage displayed platoons",
            "menu.description" : "Here you can choose, which platoons will be displayed.",
            "menu.addbutton" : "Add",
            "textbox.name" : "Displayed name",
            "textbox.id" : "ID of platoon",
         },
        "cs" : {
            "plugin.name" : "Vyjížděcí menu pro čety",
            "button.title" : "Spravovat zobrazené čety",
            "menu.description" : "Zde můžete určit, které čety se budou zobrazovat.",
            "menu.addbutton" : "Přidat",
        },
    },
    
    OpenMenu : function(instance) {
		var codeHtml = '<div class="section-title customfont">'+instance.t("plugin.name")+' - '+instance.t("button.title")+'</div><div class="section-description"><p>'+instance.t("menu.description")+'</p></div>';
		
		var storedPlatoons = instance.storage("PlatoonDropdown"),
			lastName;
      		if(storedPlatoons === null) {} else {
            $.each(storedPlatoons, function(key, value) {
				if(key%2 === 0) {
	                lastName = value;
                } else {
					codeHtml += '<div class="radar" data-id="'+key+'"><div class="source-url">'+lastName+' - '+value+'</div><span class="bblog-button tiny delete RemoveBFGamesListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>';
				}
            });
        }
		codeHtml += '<div class="spacer"></div><form method="post" action="" id="platoondropdown-addplatoon-form"><input id="platoondropdown-name" type="text" placeholder="';
		codeHtml += instance.t("textbox.name")+'" style="width:450px; float:left;">';
		codeHtml += '<input type="text" placeholder="'+instance.t("textbox.id")+'" style="margin-left:20px; width:484px; clear:both;" id="platoondropdown-id"><br /><input type="submit" class="bblog-button tiny" id="platoondropdown-addplatoon-button" style="width:auto;margin-top:5px;padding-left:10px;padding-right:10px;" value="'+instance.t("menu.addbutton")+'">';
		
		$(".bblog-options > .advanced").html(codeHtml).fadeIn('slow');
		
		$("#platoondropdown-addplatoon-button").bind("submit", function(e) {
			e.preventDefault();
			
			var linkname = $("#platoondropdown-name").attr("value"),
        	linklink = $("#platoondropdown-id").attr("value");
			
			if(linkname != "") {
				if(linklink != "") {
					var storedPlatoons = instance.storage("PlatoonDropdown");
					if(storedPlatoons === null) {
						storedPlatoons = new Array(linkname, linklink);
						instance.storage("PlatoonDropdown", storedPlatoons);
					} else {
						storedLinks.push(linkname, linklink);
						instance.storage("PlatoonDropdown", storedPlatoons);
					}
					var key = jQuery.inArray(linkname, storedPlatoons);
					
					$(".advanced > .spacer").before('<div class="radar" data-id="'+key+'"><div class="source-url">'+linkname+' - '+linklink+'</div><span class="bblog-button tiny delete RemoveBFGamesListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>');
					
					$("#platoondropdown-name").attr("value", "");
					$("#platoondropdown-id").attr("value", "");
				}
			}
		});
	},
  
    init : function(instance){
          instance.AddDropdown(instance);

    },   

    domchange : function(instance){
          instance.AddDropdown(instance);
    },
    
    AddDropdown : function(instance){
     if (!$('.dropdown-content[data-for="platoons"]').length) {
      $(".base-section-menu li:nth-child(5)").addClass("has-dropdown");
      $(".base-section-menu li:nth-child(5)").attr('data-bind-toggle', 'dropdown');
      $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"><div class="row"><nav class="span4 dropdown-menu"><a href="/bf3/cs/forum/"><i class="icon-white icon-friends2"></i><span>Platoon 1</span></a><a id="bblog-open-forum-fav"><i class="icon-white icon-friends2"></i><span>Platoon 2</span></a></nav></div></div>');
     }
    },
    

});



