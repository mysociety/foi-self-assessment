var storeAnswers = function storeAnswers() {
  $('form input[type="radio"]:checked').each(function() {
    sessionStorage.setItem(this.name, this.value);
  });
}

$(function(){
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.w = 330;
  RadarChart.defaultConfig.h = 330;
  RadarChart.defaultConfig.levels = 3;
  RadarChart.defaultConfig.maxValue = 5;

  var data = [
    {
      axes: [
        { axis: "people", value: 2 },
        { axis: "process", value: 2 },
        { axis: "technology", value: 4 }
      ],
    }
  ];

  RadarChart.draw(".results-radar-chart", data);

  $(".submit-page").click(storeAnswers);
});
