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
            ["plugin.description", 1, function(instance){instance.PlatoonDropdownMenu(instance);}],
    ],

    translations : {
        "en" : {
            "plugin.description" : "Manage displayed platoons",
            "text.description" : "Here you can choose, which platoons will be displayed. You can get the ID of a platoon from the URL of its page, for example: in http://battlelog.battlefield.com/bf3/cs/platoon/2832655241424190855/, the ID is <strong>2832655241424190855</strong>.",
            "menu.addbutton" : "Add",
            "textbox.name" : "Displayed name",
            "textbox.id" : "ID of platoon",
         },
        "cs" : {
            "plugin.name" : "Vyjížděcí menu pro čety",
            "plugin.description" : "Spravovat zobrazené čety",
            "text.description" : "Zde můžete určit, které čety se budou zobrazovat. ID čety můžete získat z URL stránky čety, například pro http://battlelog.battlefield.com/bf3/cs/platoon/2832655241424190855/ je ID <strong>2832655241424190855</strong>.",
            "menu.addbutton" : "Přidat",
            "textbox.name" : "Zobrazované jméno",
            "textbox.id" : "ID čety",            
        },
    },
    
PlatoonDropdownMenu : function(instance) {
    var platoondropdownmenucode = '<div class="section-title customfont">' + instance.t("plugin.name") + ' - ' + instance.t("plugin.description") + '</div><div class="section-description"><p>' + instance.t("text.description") + '</p></div>';
    var platoondropdownstoredplatoons = instance.storage("platoondropdownstoredplatoons");
    if(platoondropdownstoredplatoons == null || platoondropdownstoredplatoons=="")
    {}
    else
    {
      $.each(platoondropdownstoredplatoons, function(index,value) {
        var item = value.split("||||");
        platoondropdownmenucode += '<div class="radar"><div class="source-url">' + item[0] + ' - ' + item[1] +'</div><span class="bblog-button tiny delete pd-delete" data-pdindex="'+index+'">' + BBLog.t("delete") + '</span></div>';        
      });
    }
    platoondropdownmenucode += '<div class="spacer"></div><input type="text" class="pd-name" style="width: 45%; margin-right: 10px"></input><input type="text" class="pd-id" style="width: 45%; margin-right: 10px"></input><span class="bblog-button tiny pd-add" style="vertical-align: middle">' + BBLog.t("add") + '</span>';
    $(".bblog-options > .advanced").html(platoondropdownmenucode).fadeIn('slow');
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
    var platoondropdownstoredplatoons = instance.storage("platoondropdownstoredplatoons");
    if(platoondropdownstoredplatoons == null || platoondropdownstoredplatoons=="")
    {}
    else
    {
          if (!$('.dropdown-content[data-for="platoons"]').length) {
            $(".base-section-menu li[data-page='platoons']").addClass("has-dropdown");
            $(".base-section-menu li[data-page='platoons']").attr('data-bind-toggle', 'dropdown');
            $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"></div>');
            $('.dropdown-content[data-for="platoons"]').append('<div class="row"></div>');
            $('.dropdown-content[data-for="platoons"] > .row').append('<nav class="span4 dropdown-menu"></nav>');
            $.each(platoondropdownstoredplatoons, function(index, value) {
                  var item = value.split("||||");
  				        $('.dropdown-content[data-for="platoons"] > .row > nav').append('<a href="http://battlelog.battlefield.com/bf3/'+BBLog.cache("battlelog.language")+'platoon/'+item[1]+'/" data-pdindex="'+index+'"><i class="icon-white icon-friends2"></i><span>'+item[0]+'</span></a>');           
            });
            $(".dropdown-bar").append('</nav></div></div>');
          }
    }
		
    $(".pd-delete").click(function() {
			   var index = $(this).attr("data-pdindex");
         console.log(index);
		     var platoondropdownstoredplatoons = instance.storage("platoondropdownstoredplatoons");
			   platoondropdownstoredplatoons = platoondropdownstoredplatoons.splice(index, 1);
         console.log(platoondropdownstoredplatoons);
		     instance.storage("platoondropdownstoredplatoons", platoondropdownstoredplatoons);
		     $(".pd-delete[data-pdindex="+index+"]").parent().css("display", "none");
         $('.dropdown-content[data-for="platoons"] > .row > nav > a[data-pdindex="' + index + '"]').css("display", "none");
         if(platoondropdownstoredplatoons == null || platoondropdownstoredplatoons=="") 
         {
          $(".base-section-menu li[data-page='platoons']").removeClass("has-dropdown");
          $(".base-section-menu li[data-page='platoons']").removeAttr('data-bind-toggle'); 
          $('.dropdown-content[data-for="platoons"]').remove();        
         }
		});    
    $(".pd-add").click(function() {
         var pdname = $(".pd-name").val();
         console.log(pdname);
         var pdid = $(".pd-id").val();
         var newitem = pdname + '||||' + pdid;
         console.log(newitem);
         var platoondropdownstoredplatoons = instance.storage("platoondropdownstoredplatoons");
         if(platoondropdownstoredplatoons == null || platoondropdownstoredplatoons=="") 
         {
          platoondropdownstoredplatoons = [newitem];
         }
         else
         {
         platoondropdownstoredplatoons.push(newitem);
         }
         instance.storage("platoondropdownstoredplatoons", platoondropdownstoredplatoons);
         $(".pd-name").val("");
         $(".pd-id").val("");
         
		});     
},
});



