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
            ["button.title", 1, function(instance){instance.OpenMenu(instance);}],
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
		
		var storedLinks = instance.storage("BFGamesList"),
			lastName;
		if(storedLinks === null) {} else {
            $.each(storedLinks, function(key, value) {
				if(key%2 === 0) {
	                lastName = value;
                } else {
					codeHtml += '<div class="radar" data-id="'+key+'"><div class="source-url">'+lastName+' - '+value+'</div><span class="bblog-button tiny delete RemoveBFGamesListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>';
				}
            });
        }
				codeHtml += '<div class="spacer"></div><form method="post" action="" id="bfgameslist-additem-form"><input id="bfgameslist-firstbox" type="text" placeholder="';
		codeHtml += instance.t("textbox.name")+'" style="width:450px; float:left;">';
		codeHtml += '<input type="text" placeholder="'+instance.t("textbox.id")+'" style="margin-left:20px; width:484px; clear:both;" id="bfgameslist-secondbox"><br /><input type="submit" class="bblog-button tiny" id="bfgameslist-additem-button" style="width:auto;margin-top:5px;padding-left:10px;padding-right:10px;" value="'+instance.t("bfgameslist.settings.addItem")+'">';
		
		$(".bblog-options > .advanced").html(codeHtml).fadeIn('slow');

		$("#bfgameslist-additem-form").bind("submit", function(e) {
			e.preventDefault();
			
			var linkname = $("#bfgameslist-firstbox").attr("value"),
        	linklink = $("#bfgameslist-secondbox").attr("value");
			
			if(linkname != "") {
				if(linklink != "") {
					var storedLinks = instance.storage("BFGamesList");
					if(storedLinks === null) {
						storedLinks = new Array(linkname, linklink);
						instance.storage("BFGamesList", storedLinks);
					} else {
						storedLinks.push(linkname, linklink);
						instance.storage("BFGamesList", storedLinks);
					}
					var key = jQuery.inArray(linkname, storedLinks);
					
					$(".advanced > .spacer").before('<div class="radar" data-id="'+key+'"><div class="source-url">'+linkname+' - '+linklink+'</div><span class="bblog-button tiny delete RemoveBFGamesListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>');
					
					$("#bfgameslist-firstbox").attr("value", "");
					$("#bfgameslist-secondbox").attr("value", "");
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
    			var storedLinks = instance.storage("BFGamesList");
		
		if(storedLinks === null) {} else {
            $.each(storedLinks, function(key, value) {
				if(key%2 === 0) {
	                lastName = value;
                } else {
					if(!$(".base-header-section-nav > #entry-"+key).length) 
						$(".base-header-section-nav").append('<li id="entry-'+key+'" section="'+lastName+'"><a class="base-no-ajax" href="'+value+'" target="_blank">'+lastName+'</a></li>');
				}
            });
        }
		
    		$(".RemoveBFGamesListItem").bind("click", function() {
			var key = parseInt($(this).attr("data-id"));
			var storedLinks = instance.storage("BFGamesList");
			storedLinks.splice(key, 2);
			instance.storage("BFGamesList", storedLinks);
			
			$(".base-header-section-nav > #entry-"+(key+1)).css("display", "none");
			$(".radar[data-id="+key+"]").css("display", "none");
		});
    
     if (!$('.dropdown-content[data-for="platoons"]').length) {
      $(".base-section-menu li:nth-child(5)").addClass("has-dropdown");
      $(".base-section-menu li:nth-child(5)").attr('data-bind-toggle', 'dropdown');
      $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"><div class="row"><nav class="span4 dropdown-menu"><a href="/bf3/cs/forum/"><i class="icon-white icon-friends2"></i><span>Platoon 1</span></a><a id="bblog-open-forum-fav"><i class="icon-white icon-friends2"></i><span>Platoon 2</span></a></nav></div></div>');
     }
    },
    

});



