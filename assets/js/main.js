var storeAnswers = function storeAnswers() {
  $('form input[type="radio"]:checked').each(function() {
    sessionStorage.setItem(this.name, this.value);
  });
}

var submitQuestionForm = function submitQuestionForm(evt) {
  evt.preventDefault();

  if (!$(this).checkValidity || $(this).checkValidity()) {
    storeAnswers();
    window.location.href = $(this).attr("action");
  }
}

var renderAnswers = function renderAnswers() {
  $('[data-question]').each(function() {
    let key = this.dataset.question;
    let data = sessionStorage.getItem(key);
    this.textContent = data;
  });
}

var clearAnswers = function clearAnswers() {
  sessionStorage.clear();
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

  $('.question-form').submit(submitQuestionForm);
  $(".results-page").ready(renderAnswers);
  $(".retake-test").click(clearAnswers);
});
