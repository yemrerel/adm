$( "#tab1").click(function() {
    if($(this).hasClass("selected")){
    }
    else{
        $(".sekme").css("background-color","#b5d8e5");
        $(".sekme").removeClass("selected");
        $(this).css("background-color","white");
        $(this).addClass("selected");
        $(".kadınTab").css("display","none");
        $("#kadınSekme1").css("display","");
    }
});
$( "#tab2").click(function() {
    if($(this).hasClass("selected")){
       
    }
    else{
        $(".sekme").css("background-color","#b5d8e5");
        $(".sekme").removeClass("selected");
        $(this).css("background-color","white");
        $(this).addClass("selected");
        $(".kadınTab").css("display","none");
        $("#kadınSekme2").css("display","");
    }
});
$( "#tab3").click(function() {
    if($(this).hasClass("selected")){
    
    }
    else{
        $(".sekme").css("background-color","#b5d8e5");
        $(".sekme").removeClass("selected");
        $(this).css("background-color","white");
        $(this).addClass("selected");
        $(".kadınTab").css("display","none");
        $("#kadınSekme3").css("display","");
    }
});
$( "#tab4").click(function() {
    if($(this).hasClass("selected")){
      
    }
    else{
        $(".sekme").css("background-color","#b5d8e5");
        $(".sekme").removeClass("selected");
        $(this).css("background-color","white");
        $(this).addClass("selected");
        $(".kadınTab").css("display","none");
        $("#kadınSekme4").css("display","");
    }
});


    
    
    $(document).ready(function () {

    
    
        $("#tetkikAra").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#tetkikTablosu > tbody > tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });


    var tetkiklerCybe = new Array();
    var tetkiklerÜreme = new Array();
    var tetkiklerRisk = new Array();

    function arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele != value;
        });
     
     }



    $( "#cybeKaydet").click(function() {

        $('#tetkikTablosu > div>div>input').each(function() {
            if($(this).prop('checked') == true){
                tetkiklerCybe.push($(this).siblings("label").text());

            }
            if($(this).prop('checked') == false){
                arrayRemove(tetkiklerCybe,$(this).siblings("label").text());

            }
    
    
    
    
        });
    
        $( "#tetkiklerCybe" ).empty();

        jQuery.each( tetkiklerCybe, function( i, val ) {

            var string="<div class='row'>"+val+"</div>";

            $( "#tetkiklerCybe").append(string);
            tetkiklerCybe=[];





          });
    
    
    });
    

    $( "#ÜremeKaydet").click(function() {

        $('#ÜremeTablosu >  div>div>input').each(function() {
            if($(this).prop('checked') == true){
                tetkiklerÜreme.push($(this).siblings("label").text());

            }
            if($(this).prop('checked') == false){
                arrayRemove(tetkiklerÜreme,$(this).siblings("label").text());

            }
    
    
    
    
        });
    
        $( "#tetkiklerÜreme" ).empty();

        jQuery.each( tetkiklerÜreme, function( i, val ) {

            var string="<div class='row'>"+val+"</div>";

            $( "#tetkiklerÜreme").append(string);
            tetkiklerÜreme=[];





          });
    
    
    });
    $( "#RiskKaydet").click(function() {

        $('#RiskTablosu >  div>div>input').each(function() {
            if($(this).prop('checked') == true){
                tetkiklerRisk.push($(this).siblings("label").text());

            }
            if($(this).prop('checked') == false){
                arrayRemove(tetkiklerRisk,$(this).siblings("label").text());

            }
    
    
    
    
        });
    
        $( "#tetkiklerRisk" ).empty();

        jQuery.each( tetkiklerRisk, function( i, val ) {

            var string="<div class='row'>"+val+"</div>";

            $( "#tetkiklerRisk").append(string);
            tetkiklerRisk=[];





          });
    
    
    });

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 800) {
          $('#tetkiklerCybe').fadeIn();
        } else {
          $('#tetkiklerCybe').fadeOut();
        }
      });
      $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 800) {
          $('#tetkiklerÜreme').fadeIn();
        } else {
          $('#tetkiklerÜreme').fadeOut();
        }
      });
      $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 800) {
          $('#tetkiklerÜreme').fadeIn();
        } else {
          $('#tetkiklerÜreme').fadeOut();
        }
      });