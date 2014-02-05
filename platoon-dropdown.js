/**
* Platoon Dropdown:
*  - adds a platoon dropdown menu
*
* @author dapil
* @version 2.0.0
* @url http://dapil.github.io/platoon-dropdown-bblog/master/platoon-dropdown.js
* @last-edit 6. 12. 2013 23:28
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
            "text.description" : "Here you can choose which platoons will be displayed. You can get the ID of a platoon from the URL of its page, for example: in http://battlelog.battlefield.com/bf3/en/platoon/2832655241424190855/, the ID is <strong>2832655241424190855</strong>.",
            "button.add" : "Add",
            "hint.name" : "Displayed name",
            "hint.id" : "ID of platoon",
         },
        "cs" : {
            "plugin.name" : "Vyjížděcí menu pro čety",
            "plugin.description" : "Spravovat zobrazené čety",
            "text.description" : "Zde můžete určit, které čety se budou zobrazovat. ID čety můžete získat z URL stránky čety, například pro http://battlelog.battlefield.com/bf3/cs/platoon/2832655241424190855/ je ID <strong>2832655241424190855</strong>.",
            "button.add" : "Přidat",
            "hint.name" : "Zobrazované jméno",
            "hint.id" : "ID čety",            
        },
    },
    
LoadPlatoonList : function(instance) {
  },  
  
PlatoonDropdownMenu : function(instance) {
    var platoondropdownmenucode = '<p>' + instance.t("text.description") + '</p>';
    var platoondropdownstoredplatoonsmenu = instance.storage("platoondropdownstoredplatoons");
    if(platoondropdownstoredplatoonsmenu == null || platoondropdownstoredplatoonsmenu=="")
    {}
    else
    {
      $.each(platoondropdownstoredplatoonsmenu, function(index,value) {
        var item = value.split("||||");
        platoondropdownmenucode += '<div class="radar" style="background-color: transparent !important; border-bottom: 0"><div class="source-url">' + item[0] + ' - ' + item[1] +'</div><span class="bblog-button tiny delete pd-delete" data-pdindex="'+index+'">' + BBLog.t("delete") + '</span></div>';        
      });
    }
    platoondropdownmenucode += '<div class="spacer"></div><input type="text" class="pd-name" placeholder="' + instance.t("hint.name") + '" style="width: 45%; margin-right: 10px"></input><input type="text" class="pd-id" placeholder="' + instance.t("hint.id") + '" style="width: 45%; margin-right: 10px"></input><span class="bblog-button tiny pd-add" style="vertical-align: middle">' + instance.t("button.add") + '</span>';
    BBLog.popup("platoon-dropdown", instance.t("plugin.description"), platoondropdownmenucode)
},
  
init : function(instance){
        if(BBLog.cache("mode") == "bf3"){
          instance.AddDropdown(instance);
        }
	      if(BBLog.cache("mode") == "bf4"){
          if(!$(".base-section-menu > li[data-page='platoons']").length) {
	  	        $(".base-section-menu").append('<li data-page="platoons"><a class="wfont" href="/bf3/'+BBLog.cache("battlelog.language")+'platoon/landing/">Platoons</a></li>');
          }
	      }
        },   

domchange : function(instance){
        if(BBLog.cache("mode") == "bf3"){
          instance.AddDropdown(instance);
        }
	      if(BBLog.cache("mode") == "bf4"){
          if(!$(".base-section-menu > li[data-page='platoons']").length) {
	  	        $(".base-section-menu").append('<li data-page="platoons"><a class="wfont" href="/bf3/'+BBLog.cache("battlelog.language")+'platoon/landing/">Platoons</a></li>');
          }
	      }
        },     
    
AddDropdown : function(instance){
    var platoondropdownstoredplatoonsdropdown = instance.storage("platoondropdownstoredplatoons");
    if(platoondropdownstoredplatoonsdropdown == null || platoondropdownstoredplatoonsdropdown=="")
    {}
    else
    {
          if (!$('.dropdown-content[data-for="platoons"]').length) {
            $(".base-section-menu li[data-page='platoons']").addClass("has-dropdown");
            $(".base-section-menu li[data-page='platoons']").attr('data-bind-toggle', 'dropdown');
            $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"></div>');
            $('.dropdown-content[data-for="platoons"]').append('<div class="row"></div>');
            $('.dropdown-content[data-for="platoons"] > .row').append('<nav class="span4 dropdown-menu"></nav>');
            $.each(platoondropdownstoredplatoonsdropdown, function(index, value) {
                  var item = value.split("||||");
  				        $('.dropdown-content[data-for="platoons"] > .row > nav').append('<a href="http://battlelog.battlefield.com/bf3/'+BBLog.cache("battlelog.language")+'platoon/'+item[1]+'/" data-pdindex="'+index+'"><i class="icon-white icon-friends2"></i><span>'+item[0]+'</span></a>');           
            });
            $(".dropdown-bar").append('</nav></div></div>');
          }
    }
		
    $(".pd-delete").click(function() {
	 var index = $(this).attr("data-pdindex");
         var platoondropdownstoredplatoonsdelete = instance.storage("platoondropdownstoredplatoons");
	 platoondropdownstoredplatoonsdelete.splice(index, 1);
         console.log(platoondropdownstoredplatoonsdelete);
	 instance.storage("platoondropdownstoredplatoons", platoondropdownstoredplatoonsdelete);
         $('.dropdown-content[data-for="platoons"] > .row > nav > a[data-pdindex="' + index + '"]').css("display", "none");
         instance.LoadPlatoonList(instance);
         if(platoondropdownstoredplatoonsdelete == null || platoondropdownstoredplatoonsdelete=="") 
         {
          $(".base-section-menu li[data-page='platoons']").removeClass("has-dropdown");
          $(".base-section-menu li[data-page='platoons']").removeAttr('data-bind-toggle'); 
          $('.dropdown-content[data-for="platoons"]').remove();        
         }
	});    
    $(".pd-add").click(function() {
         var pdname = $(".pd-name").val();
         var pdid = $(".pd-id").val();
         var newitem = pdname + '||||' + pdid;
         var platoondropdownstoredplatoonsadd = instance.storage("platoondropdownstoredplatoons");
         if(platoondropdownstoredplatoonsadd == null || platoondropdownstoredplatoonsadd=="") 
         {
          platoondropdownstoredplatoonsadd = [newitem];
         }
         else
         {
         console.log("added");
         platoondropdownstoredplatoonsadd.push(newitem);
         }
         instance.storage("platoondropdownstoredplatoons", platoondropdownstoredplatoonsadd);
         instance.LoadPlatoonList(instance);
         
		});     
},
});



