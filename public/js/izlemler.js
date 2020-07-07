$(document).ready(function () {

    
    
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#hastaTable").children(".hastaRow").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});





    $( ".hastaRow").click(function() {
        var input = $("<input>").attr("type", "hidden").attr("name", "hasta").val($( this).children(".tc").text());
        $('#izlemlerForm').append(input);
        $('#izlemlerForm').submit();
    });






  
      