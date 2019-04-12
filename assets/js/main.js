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

// Get all answer key/value pairs starting with the given prefix
//
// Example:
//
//     getAnswerGroup('people');
var getAnswerGroup = function getAnswerGroup(prefix) {
  let pattern = "^" + prefix + "-";
  let regexp = new RegExp(pattern);

  return Object.keys(sessionStorage)
           .filter(key => regexp.test(key))
           .reduce((obj, k) => {
             return { ...obj, [k]: sessionStorage.getItem(k)}}, {});
}

// Calculate 1-5 score for a given prefix
//
// Example:
//
//     calculateScore('people');
var calculateScore = function calculateScore(prefix) {
  let group = getAnswerGroup(prefix);

  let minScore = 0;
  let maxScore = Object.keys(group).length * 3;
  let totalScore = Object.values(group).reduce(
    function(t, s) { return parseInt(t) + parseInt(s); }
  );
  let percentage = (totalScore / maxScore) * 100;
  let finalScore = (percentage * 5) / 100;

  return Math.round(finalScore);
}

// Calculate 1-5 score for all question groups
var calculateScores = function calculateScores() {
  return {
    people: calculateScore('people'),
    process: calculateScore('process'),
    technology: calculateScore('technology')
  }
}

var buildRadarChartData = function buildRadarChartData(scores) {
  return [
    {
      axes: [
        { axis: "people", value: scores.people },
        { axis: "process", value: scores.process },
        { axis: "technology", value: scores.technology }
      ],
    }
  ];
}

var renderRadarChart = function renderRadarChart() {
  let scores = calculateScores();
  var data = buildRadarChartData(scores);
  RadarChart.draw(".results-radar-chart", data);
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

var configureRadarChartDefaults = function configureRadarChartDefaults() {
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.w = 330;
  RadarChart.defaultConfig.h = 330;
  RadarChart.defaultConfig.levels = 3;
  RadarChart.defaultConfig.maxValue = 5;
}

$(function(){
  configureRadarChartDefaults();
  $('.question-form').submit(submitQuestionForm);
  $(".results-page").ready(renderRadarChart);
  $(".results-page").ready(renderAnswers);
  $(".retake-test").click(clearAnswers);
});
