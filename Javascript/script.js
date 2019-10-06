
var gURL = "https://visningsrom.stacc.com/dd_server_laaneberegning/rest/laaneberegning/v1/nedbetalingsplan"


function postRequest(){
  var vUkjentVerdi="TERMINBELOP";
  var vInnbetaling;
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

      },
    error: function(xhr,status,error){
      console.log(xhr);
      console.log(status);
      console.log(error);
    },
    complete:function(xhr){
      vInnbetaling = xhr.responseJSON.nedbetalingsplan.innbetalinger;
      downPaymentChart(vInnbetaling);
    }
    });
}


$('#submitButton').click(function(){
  postRequest();
});

function downPaymentChart(pInnbetaling){
  var vDato = [],
  vGebyr = [],
  vInnbetaling = [],
  vRenter = [],
  vRestgjeld = [],
  vTotal = [];

  pInnbetaling.forEach(function(item){
    vDato.push(item.dato);
    vGebyr.push(item.gebyr);
    vInnbetaling.push(item.innbetaling)
    vRenter.push(item.renter)
    vRestgjeld.push(item.restgjeld)
    vTotal.push(item.total);
  });

  var vMinValue, vMaxValue;
  var vDatoer = [],
  vFindMin = [];

  function dataConverter(pDataArray){
        var vTempArrayOfDates = [];

        pDataArray.forEach(function(pDate){
           var vTempDate = new Date(pDate);
           vTempDate = vTempDate.getUTCFullYear() + '-' + (vTempDate.getUTCMonth() + 1);
           if(vTempDate > 0){
               vFindMin.push(vTempDate);
           }
           var vToPush = [vTempDate];
           vTempArrayOfDates.push(vToPush);
        });
        vFindMin.sort();

        return vTempArrayOfDates;
    }
  vDatoer = dataConverter(vDato);
  vMaxValue = vFindMin[vDatoer.length-1];
  vMinValue = vFindMin[0];
  debugger;

  Highcharts.chart('chartPayment', {
    chart: {
      type:'line',
    },
    title: {
      text: 'Nedbetalingsplan',
    },
    subtitle:{

    },
    yAxis: {
      title:{
        text:'NOK',
      },
      valueDecimals: 2,
    },
    legend:{

    },
    tooltip: {
        valueDecimals: 0,
        valueSuffix: 'NOK'
    },
    xAxis:{
      categories:vDatoer,
      valueDecimals: 2,
      tickInterval:2,
    },
    plotOptions: {
    },
    series: [
      {
        name: 'Gebyr',
        data: vGebyr,
      },
      {
        name:'Innbetaling',
        data:vInnbetaling,
      },
      {
        name: 'Renter',
        data: vRenter,
      },
      {
        name:'Restgjeld',
        data:vRestgjeld,
      },
      {
        name:'Total',
        data:vTotal,
      }
    ],
  })
}
$(function() {
  $( ".datepicker" ).datepicker({
    dateFormat: 'yy-mm-dd',
    uiLibrary: 'bootstrap4'
  });
});
