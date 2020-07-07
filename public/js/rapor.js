$(document).ready(function(){
 
 


    $( "#temizleSevketModal").click(function() {
    
       
        $("#sevketModal")
        .find("input,textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
    
    
    });
    
    var secilenTanılar=[];
    
    $( "#receteBtn").click(function() {
        $('#kisaAnamnezForm').attr('action', '/hasta/kisaAnamnez/recete');
        $('#kisaAnamnezForm').attr('method', 'get');
        secilenTanılar.forEach(element => {
            var string=element.kod+"?"+element.taniTuru+"?"+element.isim;
            var input = $("<input>").attr("type", "hidden").attr("name", "tanilar").val(string);
            $('#kisaAnamnezForm').append(input);
        });
    
        $('#kisaAnamnezForm').submit();
    });
    
    $( "#mynBitirBtn").click(function() {
        $('#mynBitirForm').submit();
    });
    
    
    
    $(document).on('click', ".taniRow", function(){
        //Your code
    
        if($(this).children(".cbx").children().css('background-color')=="rgb(255, 0, 0)"){//kırmızı mı
            $(this).children(".cbx").children().css('background-color','rgb(0, 255, 0)');//yeşil
            var kod= $(this).children(".cbx").children().attr("name").split("?")[0];;
            var isim= $(this).children(".cbx").children().attr("name").split("?")[1];;
    
           var html= '<div  class="row secilenTanilarTable ">';
           html+= '<div class="col-md-4 kod" style="background-color: white;text-align: center;padding: 10px;border-bottom: solid;">'+kod+'</div>'; 
           html+= '<div class="col-md-4 tür" style="background-color: white;text-align: center;padding: 10px;border-bottom: solid;">'+tanıTürü+'</div>';  
           html+= '<div class="col-md-4 isim" style="background-color: white;padding: 10px;text-align: center;border-bottom: solid;">'+isim+'</div> </div>';
          
            $("#secilenTanilarTable").append(html);
            var t={kod:kod,taniTuru:tanıTürü,isim:isim};
            secilenTanılar.push(t);
        }
        else{
            $(this).children(".cbx").children().css('background-color','red')
            var kod= $(this).children(".cbx").children().attr("name").split("?")[0];
            var str=":contains("+kod+")" ;
            $(".secilenTanilarTable").remove(str);
            secilenTanılar.forEach(element => {
                if(element.kod==kod){
                    secilenTanılar = jQuery.grep(secilenTanılar, function(value) {
                        return value != element;
                      });
    
                }
            });
    
        }
    });
        $("#taniAra").on("keyup", function () {
            var value = $(this).val().toLowerCase();

                $( ".taniRow" ).remove();
                $.get( "/tanFilter", { value:value} )
                    .done(function( tanılar ) {
                      
                                $.each(tanılar, function (index, value) {
                                    color="red"
                                    var found_names = $.grep(secilenTanılar, function(v) {
                                        return v.kod === value.KODU;
                                    });
                                    if (found_names.length==1){color="green"}
                                  var html= '<div class="row taniRow">';
                                  html+= '<div class="col-md-2 cbx" style="background-color: white;text-align: right;padding: 10px;border-bottom: solid;">'; 
                                  html+= '<div class="tik" style="background-color:'+color+';height: 25px;width: 25px;margin-left: 46%;" name="'+value.KODU+'?'+value.ADI+'"></div></div> ';  
                                  html+= ' <div class="col-md-4 kod" style="background-color: white;text-align: center;padding: 10px;border-right: solid;border-bottom: solid;">'+value.KODU+'</div>  ';
                                  html+= '<div class="col-md-6 isim" style="background-color: white;padding: 10px;text-align: center;border-bottom: solid;">'+value.ADI+'</div> </div>';
          
                                  $( ".headerDiv" ).after(html);         
                                });  
                });
    
        });
    
    
    
    var tanıTürü="Ön Tanı";
    $( "#anaTanı").click(function() {
        if($(this).hasClass("selected")){
        }
        else{
            $(".tanıTür").css("background-color","#b5d8e5");
            $(".tanıTür").removeClass("selected");
            $(this).css("background-color","white");
            $(this).addClass("selected");
            tanıTürü=$(this).text();
        }
    });
    $( "#ekTanı").click(function() {
        if($(this).hasClass("selected")){
           
        }
        else{
            $(".tanıTür").css("background-color","#b5d8e5");
            $(".tanıTür").removeClass("selected");
            $(this).css("background-color","white");
            $(this).addClass("selected");
            tanıTürü=$(this).text();
    
        }
    });
    $( "#ayırıcıTanı").click(function() {
        if($(this).hasClass("selected")){
        
        }
        else{
            $(".tanıTür").css("background-color","#b5d8e5");
            $(".tanıTür").removeClass("selected");
            $(this).css("background-color","white");
            $(this).addClass("selected");
            tanıTürü=$(this).text();
    
        }
    });
    $( "#onTanı").click(function() {
        if($(this).hasClass("selected")){
          
        }
        else{
            $(".tanıTür").css("background-color","#b5d8e5");
            $(".tanıTür").removeClass("selected");
            $(this).css("background-color","white");
            $(this).addClass("selected");
            tanıTürü=$(this).text();
    
        }
    });
    
    
    
    
    
    $("#datepicker").change(function() {
        if($(this).prop('checked')) {
            $(this).datepicker();
    
        } else {
            $(this).datepicker("hide");
        }
    });
    
    
    
    
    //_-----------------il seçince ilçeler gelsin
    
    
    $('#iller').on('change', function() {
        var ilkodu= this.value;
    
        $.ajax({
            url: '/ilceleriGetir',
            method: 'get',
            data: { ilkodu: ilkodu }
            }).done(function(res) {
                var ilceArray=res.ilceler;
                for (var i = 0; i <= ilceArray.length; i++) {
                    $('#ilceler').append('<option value="' + ilceArray[i].KODU + '">' + ilceArray[i].ADI + '</option>');
                }
        });
     
    });
    
    });