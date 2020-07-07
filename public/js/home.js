
 

    var availableTags = [];


    $( "#myInput" ).on("keyup", function () {
          this.value = this.value.toLocaleUpperCase('tr-TR')
        if(2<$( "#myInput" ).val().length)
        {

          var input=  $( "#myInput").val();
          $.ajax({
          url: '/hastaFilter',
          method: 'post',
          data: { input: input }
          }).done(function(res) {
            hastalar=res.hastalar;
            for (let index = 0; index < hastalar.length; index++) {
              availableTags[index]=(hastalar[index].Id+' '+hastalar[index].Ad+' '+hastalar[index].Soyad);
            }

          });
        }
    })
    $( "#myInput" ).autocomplete({
      source: availableTags,
      minLength: 3,
      select: function (e, ui) {
        var hasta=ui.item.value;
        $( "#myInput").val(hasta);

        $('#hasta').append($( "#myInput"));
        $( "#hasta" ).submit();
  
      }



    });
    
  



  $( "#plus" ).click(function() {
      $( "#hastaEkle" ).submit();
  });

  $( "#kadınİzlem" ).click(function() {

    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("kadinizlem");
$('#izlemForm').append(input);
$('#izlemForm').submit();
      
  });
  $( "#bebekcocukizlem" ).click(function() {

    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("bebekcocukizlem");
$('#izlemForm').append(input);
$('#izlemForm').submit();
      
  });

  $( "#gebeizlem" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("gebeizlem");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });

  $( "#lohusaizlem" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("lohusaizlem");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });

  $( "#kanserizlem" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("kanserizlem");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });

  $( "#yetiskinizlem" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("yetiskinizlem");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });
  

  $( "#obeziteizlem" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("obeziteizlem");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });
  $( "#ozellikli" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("ozellikli");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });

  $( "#otizmizlem" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("otizmizlem");
    $('#izlemForm').append(input);
    $('#izlemForm').submit();
     
  });


  $( "#evdesaglik" ).click(function() {
    var input = $("<input>").attr("type", "hidden").attr("name", "izlemAdı").val("evdesaglik");
    $('#evdeSaglikForm').append(input);
    $('#evdeSaglikForm').submit();
     
  });