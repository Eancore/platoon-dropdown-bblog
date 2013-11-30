/**
* Platoon Dropdown:
*  - adds a platoon dropdown menu
*
* @author dapil + saving system from this plugin: http://getbblog.com/board/topic/1897/1/BFGamesList
* @version 1.0.1
* @url https://raw.github.com/dapil/platoon-dropdown-bblog/master/platoon-dropdown.js
* @last-edit 27. 9. 2013 23:19
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
            "menu.description" : "Here you can choose, which platoons will be displayed. You can get the ID of a platoon from the URL of its page, for example: in http://battlelog.battlefield.com/bf3/cs/platoon/2832655241424190855/, the ID is <strong>2832655241424190855</strong>.",
            "menu.addbutton" : "Add",
            "textbox.name" : "Displayed name",
            "textbox.id" : "ID of platoon",
         },
        "cs" : {
            "plugin.name" : "Vyjížděcí menu pro čety",
            "button.title" : "Spravovat zobrazené čety",
            "menu.description" : "Zde můžete určit, které čety se budou zobrazovat. ID čety můžete získat z URL stránky čety, například pro http://battlelog.battlefield.com/bf3/cs/platoon/2832655241424190855/ je ID <strong>2832655241424190855</strong>.",
            "menu.addbutton" : "Přidat",
            "textbox.name" : "Zobrazované jméno",
            "textbox.id" : "ID čety",            
        },
    },
    
    OpenMenu : function(instance) {
		var codeHtmlPlatoonDropdown = '<div class="section-title customfont">'+instance.t("plugin.name")+' - '+instance.t("button.title")+'</div><div class="section-description"><p>'+instance.t("menu.description")+'</p></div>';
		
		var storedPlatoons = instance.storage("PlatoonDropdown"),
			lastNamePlatoonDropdown;
		if(storedPlatoons === null || storedPlatoons=="") {} else {
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
			
			if(linknameplatoondropdown != "" && linklinkplatoondropdown != "") 
      {
					var storedPlatoons = instance.storage("PlatoonDropdown");
					if(storedPlatoons=="")
          {
          $(".base-section-menu li:nth-child(5)").addClass("has-dropdown");
          $(".base-section-menu li:nth-child(5)").attr('data-bind-toggle', 'dropdown');
          $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"></div>');
          $('.dropdown-content[data-for="platoons"]').append('<div class="row"></div>');
          $('.dropdown-content[data-for="platoons"] > .row').append('<nav class="span4 dropdown-menu"></nav>');          
          }
          if(storedPlatoons === null) {
          $(".base-section-menu li:nth-child(5)").addClass("has-dropdown");
          $(".base-section-menu li:nth-child(5)").attr('data-bind-toggle', 'dropdown');
          $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"></div>');
          $('.dropdown-content[data-for="platoons"]').append('<div class="row"></div>');
          $('.dropdown-content[data-for="platoons"] > .row').append('<nav class="span4 dropdown-menu"></nav>');
						storedPlatoons = new Array(linknameplatoondropdown, linklinkplatoondropdown);
						instance.storage("PlatoonDropdown", storedPlatoons);
					} else {
						storedPlatoons.push(linknameplatoondropdown, linklinkplatoondropdown);
						instance.storage("PlatoonDropdown", storedPlatoons);
					}
					var key = jQuery.inArray(linknameplatoondropdown, storedPlatoons) + 1;
          $('.dropdown-content[data-for="platoons"] > .row > nav').append('<a href="http://battlelog.battlefield.com/bf3/'+BBLog.cache("battlelog.language")+'platoon/'+linklinkplatoondropdown+'/" data-id="'+key+'"><i class="icon-white icon-friends2"></i><span>'+linknameplatoondropdown+'</span></a>');
					
					$(".advanced > .spacer").before('<div class="radar" data-id="'+key+'"><div class="source-url">'+linknameplatoondropdown+' - '+linklinkplatoondropdown+'</div><span class="bblog-button tiny delete RemovePlatoonDropdownListItem" data-id="'+key+'">'+BBLog.t("delete")+'</span></div>');
					
					$("#platoondropdown-firstbox").attr("value", "");
					$("#platoondropdown-secondbox").attr("value", "");
			}
		});
	},
  
    init : function(instance){
          if(BBLog.cache("mode") == "bf3"){
	  	instance.AddDropdown(instance);
	  }
	  if(BBLog.cache("mode") == "bf4"){
	  	
	  }
    },   

    domchange : function(instance){
          if(BBLog.cache("mode") == "bf3"){
	  	instance.AddDropdown(instance);
	  }
	  if(BBLog.cache("mode") == "bf4"){
	  	
	  }
    },
    
    AddDropdown : function(instance){
    $('.section-config > span[data-key="platoon-dropdown.button.title"]').remove();
    			var storedPlatoons = instance.storage("PlatoonDropdown");
		
		if(storedPlatoons === null || storedPlatoons=="") 
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
				        $('.dropdown-content[data-for="platoons"] > .row > nav').append('<a href="http://battlelog.battlefield.com/bf3/'+BBLog.cache("battlelog.language")+'platoon/'+value+'/" data-id="'+key+'"><i class="icon-white icon-friends2"></i><span>'+lastNamePlatoonDropdown+'</span></a>');           
		        		}
          });
          $(".dropdown-bar").append('</nav></div></div>');
          }
        }
		
    	$(".RemovePlatoonDropdownListItem").bind("click", function() {
			   var key = parseInt($(this).attr("data-id"));
		     var storedPlatoons = instance.storage("PlatoonDropdown");
			   storedPlatoons.splice(key-1, 2);
		     instance.storage("PlatoonDropdown", storedPlatoons);
		     $(".radar[data-id="+key+"]").css("display", "none");
         if(storedPlatoons === null || storedPlatoons=="") 
         {
          $(".base-section-menu li:nth-child(5)").removeClass("has-dropdown");
          $(".base-section-menu li:nth-child(5)").removeAttr('data-bind-toggle'); 
          $('.dropdown-content[data-for="platoons"]').remove();        
         }
		  });
  
    
    },
    });



