
var gURL = "https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan"


function postRequest(){
  var vUkjentVerdi="TERMINBELOP";
  $.ajax({
    'url': 'https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan',
    'method':'POST',
    'dataType': 'json',
    processData: false,
    'contentType': 'application/json',
    'data': JSON.stringify({
        laanebelop:parseInt($('#laanebelop').val()),
        nominellRente:parseInt($('#nominellRente').val()),
        terminGebyr:parseInt($('#termingebyr').val()),
        utlopsDato:$('#utlopsDato').val(),
        saldoDato:$('#saldoDato').val(),
        datoForsteInnbetaling:$('#datoForsteInnbetaling').val(),
        ukjentVerdi: "TERMINBELOP"
    }),
    success: function(data, status, xhr){
      doSomethingWithTheData(data);
      return data;

      },
    error: function(xhr,status,error){
      console.log(xhr);
      console.log(status);
      console.log(error);
    }
    });
}

function doSomethingWithTheData(data){
  var vNedbetaling = data.nedbetalingsplan;
  console.log(vNedbetaling);
}

$('#submitButton').click(function(){
  postRequest();
});

$(function() {
  $( ".datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd'
  });
});
