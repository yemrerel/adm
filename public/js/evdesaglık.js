$( ".btnBasvuruListesi" ).click(function() {
  
   
    $('#BasvuruListesiForm').submit();
     
  });

  $( ".btnSonlandırma" ).click(function() {
  
   
    $('#HizmetSonlandırmaForm').submit();
     
  });



  $( ".btnHizmetİzlemleri" ).click(function() {
  
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("ESHizmetiIzlemleri");
    $('#EvdeSaglikHizmetiIzlemleriForm').append(input);
    $('#EvdeSaglikHizmetiIzlemleriForm').submit();
     
  });

  $( ".btnHastaNakil" ).click(function() {
  
   
    $('#HastaNakilForm').submit();
     
  });

  

  $( ".btnilkizlem" ).click(function() {
  
   
    $('#ilkİlzemForm').submit();
     
  });