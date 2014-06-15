/**
* Platoon Dropdown:
*  - adds a platoon dropdown menu
*
* @author dapil
* @version 2.1.1
* @url http://dapil.github.io/platoon-dropdown-bblog/platoon-dropdown.js
* @last-edit 7. 6. 2014 9:09
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
            "text.description" : "Here you can choose which platoons will be displayed. You can get the Platoon ID from the URL of its page, for example: in http://battlelog.battlefield.com/bf3/en/platoon/2832655241424190855/, the ID is <strong>2832655241424190855</strong>.",
            "button.add" : "Add",
            "hint.name" : "Displayed name",
            "hint.id" : "Platoon ID",
         },
        "cs" : {
            "plugin.description" : "Spravovat zobrazené čety",
            "text.description" : "Zde můžete určit, které čety se budou zobrazovat. ID čety můžete získat z URL stránky čety, například pro http://battlelog.battlefield.com/bf3/cs/platoon/2832655241424190855/ je ID <strong>2832655241424190855</strong>.",
            "button.add" : "Přidat",
            "hint.name" : "Zobrazované jméno",
            "hint.id" : "ID čety",            
        },
        "fr" : {
            "plugin.description" : "GESTION DES SECTIONS",
            "text.description" : "Vous pouvez choisir quelle section sera affiché en prenant l'ID de la section suivant l'exemple ci-dessous: http://battlelog.battlefield.com/bf3/en/platoon/2832655241424190855/ ID SECTION : 2832655241424190855.",
            "button.add" : "AJOUTER LA SECTION",
            "hint.name" : "AFFICHER LE NOM DE LA SECTION",
            "hint.id" : "ID DE LA SECTION",
        },
        "pt" : {
            "plugin.description" : "Gerenciar Tropas exibidas",
            "text.description" : "Aqui você pode escolher quais tropas serão exibidas. Você pode obter o ID de uma tropa na URL da seguinte página, por exemplo: http://battlelog.battlefield.com/bf3/en/platoon/2832655241424190855/, o ID é <strong>2832655241424190855</strong>.",
            "button.add" : "Adicionar",
            "hint.name" : "Nome Exibido",
            "hint.id" : "ID da Tropa",
         },
         "de" : {
            "plugin.description" : "Verwalte angezeigte Platoons",
            "text.description" : "In diesem Dialog kannst du ausw&auml;hlen welche Platoons angezeigt werden sollen. Die ID des gew&uuml;nschten Platoons kannst du der Seiten-URL entnehmen. Beispiel: URL = http://battlelog.battlefield.com/bf4/platoons/view/4726603585846748181/, Platoon-ID = <strong>4726603585846748181</strong>.",
            "button.add" : "Hinzuf&uuml;gen",
            "hint.name" : "Anzeigename",
            "hint.id" : "Platoon-ID",
         },
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
    platoondropdownmenucode += '<div class="spacer"></div><input type="text" class="pd-name" placeholder="' + instance.t("hint.name") + '" style="width: 40%; margin-right: 10px"></input><input type="text" class="pd-id" placeholder="' + instance.t("hint.id") + '" style="width: 40%; margin-right: 10px"></input><span class="bblog-button tiny pd-add" style="vertical-align: middle">' + instance.t("button.add") + '</span>';
    BBLog.popup("platoon-dropdown", instance.t("plugin.description"), platoondropdownmenucode)
},
  
init : function(instance){
        if(BBLog.cache("mode") == "bf3" || BBLog.cache("mode") == "bf4"){
          instance.AddDropdown(instance);
        }
       },   

domchange : function(instance){
        if(BBLog.cache("mode") == "bf3" || BBLog.cache("mode") == "bf4"){
          instance.AddDropdown(instance);
        }
       },   
    
    
AddDropdown : function(instance){
    var platoondropdownstoredplatoonsdropdown = instance.storage("platoondropdownstoredplatoons");
    if(platoondropdownstoredplatoonsdropdown != null || platoondropdownstoredplatoonsdropdown != "")
    {
          if (!$('.dropdown-content[data-for="platoons"]').length) {
            $(".base-section-menu li[data-page='platoons']").addClass("has-dropdown");
            $(".base-section-menu li[data-page='platoons']").attr('data-bind-toggle', 'dropdown');
            $(".dropdown-bar").append('<div class="dropdown-content" data-for="platoons"></div>');
            $('.dropdown-content[data-for="platoons"]').append('<div class="row"></div>');
            $('.dropdown-content[data-for="platoons"] > .row').append('<nav class="span4 dropdown-menu"></nav>');
            $.each(platoondropdownstoredplatoonsdropdown, function(index, value) {
                  var item = value.split("||||");
                  if(BBLog.cache("mode") == "bf3")
                  {
                  	$('.dropdown-content[data-for="platoons"] > .row > nav').append('<a href="http://battlelog.battlefield.com/bf3/'+BBLog.cache("battlelog.language")+'platoon/'+item[1]+'/" data-pdindex="'+index+'"><i class="icon-white icon-friends2"></i><span>'+item[0]+'</span></a>');           
		  }
                  if(BBLog.cache("mode") == "bf4")
                  {
                  	$('.dropdown-content[data-for="platoons"] > .row > nav').append('<a href="http://battlelog.battlefield.com/bf4/'+BBLog.cache("battlelog.language")+'platoons/view/'+item[1]+'/" data-pdindex="'+index+'"><i class="icon-white icon-friends2"></i><span>'+item[0]+'</span></a>');           
		  }

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
         platoondropdownstoredplatoonsadd.push(newitem);
         }
         instance.storage("platoondropdownstoredplatoons", platoondropdownstoredplatoonsadd);
         instance.LoadPlatoonList(instance);
         
	 });     
},
});



