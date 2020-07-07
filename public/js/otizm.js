
$( function() {
    $( "#datepicker" ).datepicker({
      onSelect: function(value, date) { 
             $("#tarih").text(value);
       } ,
      showOn: "button",
      buttonImage: "/public/img/calendar.svg",
      buttonImageOnly: true,
      buttonText: "Select date",
      dateFormat: 'yy-mm-dd'
  
      
  
    });
    
  
  
  } );