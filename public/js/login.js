function toggleResetPswd(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle() // display:block or none
    $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e){
    e.preventDefault();
    $('#logreg-forms .form-signin').toggle(); // display:block or none
    $('#logreg-forms .form-signup').toggle(); // display:block or none
}

$(()=>{
    // Login Register Form
    $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
    $('#logreg-forms #cancel_reset').click(toggleResetPswd);
    $('#logreg-forms #btn-signup').click(toggleSignUp);
    $('#logreg-forms #cancel_signup').click(toggleSignUp);
})



$( "#logo" ).click(function() {
    window.location.replace("/home");
});


$( "#ayarlarBtn" ).click(function() {
    $( "#ayarlarForm").submit();

});

$( ".istekBtn" ).click(function() {
    $( "#istekForm").submit();

});

$( "#loginBtn" ).click(function() {
    $.ajax({
        type: "POST",
        url: '/login',
        data: $('#loginForm').serialize(), // serializes the form's elements.
        success: function(data)
        {
            if(data.result) window.location='/'
            else alert(data.msg)                              
        }
    });


    window.location.replace("/home");
});