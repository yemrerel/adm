$("#detaylarPaneli").toggle();
$("#ailehekimbilgileriPaneli").toggle();
$("#adresTelefonPaneli").toggle();

$("#detaylar").click(function(){
    $("#detaylarPaneli").toggle();
    $("#detaylar").children(".fa").toggleClass('fa-plus fa-minus');


});

$("#ailehekimbilgileri").click(function(){
    $("#ailehekimbilgileriPaneli").toggle();
    $("#ailehekimbilgileri").children(".fa").toggleClass('fa-plus fa-minus');


});
     
$("#adresTelefon").click(function(){
    $("#adresTelefonPaneli").toggle();
    $("#adresTelefon").children(".fa").toggleClass('fa-plus fa-minus');


});

$('.datepicker').datepicker();


$( "input[type='radio'][name='cinsiyet']" ).change(function() {

    if($( "input:checked" ).val()=='erkek'){
        $("#gebe").parent().hide();
        $("#lohusa").parent().hide();
    
    }
    if($( "input:checked" ).val()=='kadın'){
        $("#gebe").parent().show();
        $("#lohusa").parent().show();
    
    }

});

$("input:checkbox[name='gebLoh'][value='gebe']").click(function(){
   
    if($("input:checkbox[name='gebLoh'][value='lohusa']").is(':checked')){
        
        $("input:checkbox[name='gebLoh'][value='lohusa']").prop("checked",false);
    }

    
});
$("input:checkbox[name='gebLoh'][value='lohusa']").click(function(){
   
    if($("input:checkbox[name='gebLoh'][value='gebe']").is(':checked')){
        
        $("input:checkbox[name='gebLoh'][value='gebe']").prop("checked",false);
    }

    
});