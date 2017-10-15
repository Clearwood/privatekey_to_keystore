$(function() {
  $('#data').hide();
  $("#data").click(function() {
$("<a />", {
  "download": "keystore.json",
  "href" : "data:application/json," + encodeURIComponent(JSON.stringify($(this).data().obj))
}).appendTo("body")
.click(function() {
   $(this).remove()
})[0].click()
})
$('#submit_form').click(function(){
  if(($("#icon_new_password").val()!=""&&$("#icon_password_confirmation").val()!="")) {
      if(!$("#icon_new_password").hasClass( "invalid" )&&!$("#icon_password_confirmation").hasClass( "invalid" )) {
        var params = { keyBytes: 32, ivBytes: 16 };

// synchronous
var dk = keythereum.create(params);
        var password = $('#icon_new_password').val();
        var privateKey = $('#private_key').val();
        var keyObject = keythereum.dump(password, privateKey, dk.salt, dk.iv);
        $('#result').html(JSON.stringify(keyObject));
        $( "#data" ).attr( "data-obj", JSON.stringify(keyObject));
          $('#data').show();
        //console.log(keyObject);
      } else {
          Materialize.toast("Please make sure that nothing is underlined red, that means you have to change the input.", 2000, 'red');
      }
  } else{
      Materialize.toast("Please make the changes you want to make.", 2000, 'red');
  }
});

var password_fields = $("#change input:password");
password_fields.dblclick(function() {
  if($(this).attr('type')=='password'){
      $(this).attr('type', 'text');
  } else {
      $(this).attr('type', 'password');
  }
  var input_element = $(this);
  setTimeout(function() {
      if (window.getSelection) window.getSelection().removeAllRanges();
      else if (document.selection) document.selection.empty();
      setTimeout(function() {
          input_element.focus();
          var tmpStr = input_element.val();
          input_element.val('');
          input_element.val(tmpStr);
      },10);
  },20);

});
if(isMobile()){
 $("label[for='icon_new_password']").attr({"data-error": "8 letters, 1 num, 1 upper-, 1 lowercase we need.", "data-success": "That's amazing."});
     $("label[for='icon_password_confirmation']").attr({"data-success": "Just wonderful."});
 } else {
     $("label[for='icon_new_password']").attr({"data-error": "Please use at least eight characters, one number, one uppercase character and one in lowercase.", "data-success": "That password looks wonderful."});
     $("label[for='icon_password_confirmation']").attr({"data-success": "You still remember the password you just typed in. That's great!"});
 }
 $("#icon_new_password, #icon_password_confirmation").keyup(checkPasswordMatch);

});
function checkPasswordMatch() {
  var password = $("#icon_new_password").val();
  var confirmPassword = $("#icon_password_confirmation").val();

  if (password != confirmPassword) {
      $("#icon_password_confirmation").attr("class", "invalid");
      //$("label[for='icon_password_confirmation']").attr( "class", "active" );
      //that way one can match the
  } else if(confirmPassword==""){
      $("#icon_password_confirmation").removeClass();
  }
  else {
      $("#icon_password_confirmation").attr("class", "valid");
  }
}
function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}
