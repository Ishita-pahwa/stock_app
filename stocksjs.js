google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);
var arr=[];
                                                                                                                                                  
window.setInterval(function(){if(arr.length!=0)ajaxfunc(arr);},5000);

function func()
{
	
	arr.push(document.getElementById("sp").value);
	var ul = document.getElementById("list");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(document.getElementById("sp").value));
  ul.appendChild(li);
  ajaxfunc(arr);
}

function ajaxfunc(arr) 
{
	
$.ajax({
            url: 'http://finance.google.com/finance/info?client=ig&q='+arr,
            dataType: 'jsonp',	
            success: function(json){                          
                drawBasic(json);   
			
            },
			error: function(){
				alert("Stock name not found");
				arr.pop();
			} 
        });
	
}

function drawBasic(json) {
	  var datan=[['Stocks','Stock Prices']];
	  if(json!=null)
	  {
	  $.each(json, function(key, value){
	datan.push([value.t,parseInt(value.l)]);	
            });
	  
      var data = google.visualization.arrayToDataTable(datan);

      var options = {
        title: 'Stock Prices',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Stocks',
          minValue: 0
        },
        vAxis: {
          title: 'Total Stocks Prices'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }
}