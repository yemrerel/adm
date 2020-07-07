$( "#yeniIzlemBtn" ).click(function() {

   
    $('#yeniIzlemForm').submit();
  
  });


var sekme="İzlem Bilgileri";
$( "#izlembilgileriSekme").click(function() {
if($(this).hasClass("selected")){
}
else{
    $(".sekme").css("background-color","#b5d8e5");
    $(".sekme").removeClass("selected");
    $(this).css("background-color","white");
    $(this).addClass("selected");
    sekme=$(this).text();
    $(".bebekTab").css("display","none");
    $("#bebekSekme1").css("display","");
}

});
$( "#psikoSekme").click(function() {
if($(this).hasClass("selected")){
   
}
else{
    $(".sekme").css("background-color","#b5d8e5");
    $(".sekme").removeClass("selected");
    $(this).css("background-color","white");
    $(this).addClass("selected");
    sekme=$(this).text();
    $(".bebekTab").css("display","none");
    $("#bebekSekme2").css("display","");
}
});
$( "#taramaSekme").click(function() {
if($(this).hasClass("selected")){

}
else{
    $(".sekme").css("background-color","#b5d8e5");
    $(".sekme").removeClass("selected");
    $(this).css("background-color","white");
    $(this).addClass("selected");
    sekme=$(this).text();
    $(".bebekTab").css("display","none");
    $("#bebekSekme3").css("display","");
}
});

//---------------------------------BKI-----------------------------------------------------------------------
$(".bki").on("keyup", function () {
var kilo = $("#kilo").val();
var boy = $("#boy").val();

 if(kilo > 0 && boy > 0)
{
  var sonuc = kilo/(boy/100*boy/100);
  $("#bkiSonuc").val(sonuc);
  if(sonuc < 18.5){
       $("#bkiDurum").val("Zayıf");
  }
  if(sonuc > 18.5 && sonuc < 25){
       $("#bkiDurum").val("Sağlıklı");
  }
  if(sonuc > 25){
        $("#bkiDurum").val("Şişman");
  }
 }


});





if($("#islemGrubu").val()=="BeyinGelisimiRiskler"){
    kod=$("#islemGrubu").val();
    containName='#'+kod+'Table'
    $(containName).css('display','')
    $("#islemAdi").html($("#islemGrubu").val());
    
}

$("#islemGrubu").on("change", function () {
  
    kod=$("#islemGrubu").val();
    containName='#'+kod+'Table'
    $(".grupElement").css('display','none')
    $(containName).css('display','')
    $("#islemAdi").html($("#islemGrubu").val());
});

