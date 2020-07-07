$( document ).ready(function() {



    $( "#newRow" ).hide();  
    $( "#kronikKaydetButon" ).hide();      
$( "#kronikEkleButon" ).click(function() {
    
   
    if($('#newRow').css('display') == 'none')
    {
        $( "#newRow" ).show();
        $( "#kronikKaydetButon" ).show();      

    }
    else{
        $( "#newRow" ).hide();
        $( "#kronikKaydetButon" ).hide();      

    }


});

$( "#kronikKaydetButon" ).click(function() {
    if(($("#tanıKodInput").val()  && $("#icdInput").val()  && $("#durumInput").val())===undefined){

    }
    else{

         var newRow = "<tr><td>"+$("#tanıKodInput").val()+"</td><td>"+$("#icdInput").val()+"</td><td>"+$("#durumInput").val()+"</td></tr>";
         $( "#newRow" ).after(newRow);
         $( "#newRow" ).hide();


    }
    $( "#kronikKaydetButon" ).hide();      

});



$( "#kısaAnamnezCorner" ).click(function() {  


    $('#kısaAnamnezForm').append($("#hastaTCDiv"));
    $('#kısaAnamnezForm').submit();
});





$( "#raporCorner" ).click(function() {  
    $('#raporForm').submit();
});




$( "#temizleSevketModal").click(function() {

   
    $("#sevketModal")
    .find("input,textarea,select")
    .val('')
    .end()
    .find("input[type=checkbox], input[type=radio]")
    .prop("checked", "")
    .end();


});



$( "#istemCorner" ).click(function() {  
    $('#istemForm').submit();
});
$( "#detaylıCorner" ).click(function() {  
    $('#detayliForm').submit();
});












});