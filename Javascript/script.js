
var gURL = "https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan"


$('#form').submit(function(event){
  event.preventDefault();
  var vUkjentVerdi="TERMINBELOP";
  $.post(gURL,
    JSON.stringify({
        laanebelop:parseInt($('#laanebelop').val()),
        nominellRente:parseInt($('#nominellRente').val()),
        terminGebyr:parseInt($('#termingebyr').val()),
        utlopsDato:$('#utlopsDato').val(),
        saldoDato:$('#saldoDato').val(),
        datoForsteInnbetaling:$('datoForsteInnbetaling'),
        ukjentVerdi: vUkjentVerdi
    }),
  function(data, status){
    alert("Data: " + data[0] + "\nStatus: " + status);
    console.log(data);
    alert(status);
    debugger;
  });
});

$( function() {
  $( ".datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd'
  });
} );

$('.datepicker').datepicker({

});
