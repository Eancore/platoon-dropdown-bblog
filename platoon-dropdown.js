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
		var codeHtmlPlatoonDropdown = '<div class="section-title customfont">'+instance.t("plugin.name")+' - '+instance.t("button.title")+'</div><div class="section-description"><p>'+instance.t("menu.description")+'</p></div>';
		
		var storedPlatoons = instance.storage("PlatoonDropdown"),
			lastNamePlatoonDropdown;
		if(storedPlatoons === null) {} else {
            $.each(storedPlatoons, function(key, value) {
				if(key%2 === 0) {
	                lastNamePlatoonDropdown = value;
                } else {
					codeHtmlPlatoonDropdown += '<div class="radar" data-id="'+key+'"><div class="source-url">'+lastNamePlatoonDropdown+' - '+value+'</div><span class="bblog-button tiny delete RemovePlatoonDropdownListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>';
				}
            });
        }
				codeHtmlPlatoonDropdown += '<div class="spacer"></div><form method="post" action="" id="platoondropdown-additem-form"><input id="platoondropdown-firstbox" type="text" placeholder="';
		codeHtmlPlatoonDropdown += instance.t("textbox.name")+'" style="width:450px; float:left;">';
		codeHtmlPlatoonDropdown += '<input type="text" placeholder="'+instance.t("textbox.id")+'" style="margin-left:20px; width:484px; clear:both;" id="platoondropdown-secondbox"><br /><input type="submit" class="bblog-button tiny" id="platoondropdown-additem-button" style="width:auto;margin-top:5px;padding-left:10px;padding-right:10px;" value="'+instance.t("menu.addbutton")+'">';
		
		$(".bblog-options > .advanced").html(codeHtmlPlatoonDropdown).fadeIn('slow');

		$("#platoondropdown-additem-form").bind("submit", function(e) {
			e.preventDefault();
			
			var linknameplatoondropdown = $("#platoondropdown-firstbox").attr("value"),
        	linklinkplatoondropdown = $("#platoondropdown-secondbox").attr("value");
			
			if(linknameplatoondropdown != "") {
				if(linklinkplatoondropdown != "") {
					var storedPlatoons = instance.storage("PlatoonDropdown");
					if(storedPlatoons === null) {
						storedPlatoons = new Array(linknameplatoondropdown, linklinkplatoondropdown);
						instance.storage("PlatoonDropdown", storedPlatoons);
					} else {
						storedPlatoons.push(linknameplatoondropdown, linklinkplatoondropdown);
						instance.storage("PlatoonDropdown", storedPlatoons);
					}
					var key = jQuery.inArray(linknameplatoondropdown, storedPlatoons);
					
					$(".advanced > .spacer").before('<div class="radar" data-id="'+key+'"><div class="source-url">'+linknameplatoondropdown+' - '+linklinkplatoondropdown+'</div><span class="bblog-button tiny delete RemovePlatoonDropdownListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>');
					
					$("#platoondropdown-firstbox").attr("value", "");
					$("#platoondropdown-secondbox").attr("value", "");
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
    			var storedPlatoons = instance.storage("PlatoonDropdown");
		
		if(storedPlatoons === null) 
         {
         }
    
    else {
          if (!$('.dropdown-content[data-for="platoons"]').length) {
          $(".base-section-menu li:nth-child(5)").addClass("has-dropdown");
          $(".base-section-menu li:nth-child(5)").attr('data-bind-toggle', 'dropdown');
          $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"></div>');
          $('.dropdown-content[data-for="platoons"]').append('<div class="row"></div>');
          $('.dropdown-content[data-for="platoons"] > .row').append('<nav class="span4 dropdown-menu"></nav>');
          $.each(storedPlatoons, function(key, value) {
				      if(key%2 === 0) 
                {
	              lastNamePlatoonDropdown = value;
                } 
              else
                {
				        $(".dropdown-content[data-for="platoons"] > .row > nav").append('<a href="'+value+'"><i class="icon-white icon-friends2"></i><span>'+lastNamePlatoonDropdown+'</span></a>');           
		        		}
          });
          $(".dropdown-bar").append('</nav></div></div>');
          }
        }
		
    	$(".RemovePlatoonDropdownListItem").bind("click", function() {
			   var key = parseInt($(this).attr("data-id"));
		     var storedPlatoons = instance.storage("PlatoonDropdown");
			   storedPlatoons.splice(key, 2);
		     instance.storage("PlatoonDropdown", storedPlatoons);
		     $(".radar[data-id="+key+"]").css("display", "none");
		  });
  
    
    },
    });



