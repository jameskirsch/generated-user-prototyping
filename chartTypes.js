'use strict';

function CreatePieChart(
    elementId,
    dataValues,
    dataLabels,
    title
) {
    var myPieChart = new Chart($('#' + elementId),{
        type: 'pie',
        data: {
            datasets: [{
                data: dataValues,
                backgroundColor: ["#4F84C4", "#F6D155"]
            }],
            labels: dataLabels
        },
        options: {
            title: {
                text: title,
                display: true
            }
        }
    });
}

function CreateBarChart(
    elementId,
    xLabelTitle,
    xLabelSet,
    yValueSet,
    chartTitle
) {
    new Chart($('#' + elementId), {
        type: 'bar',
        data: {
            labels: xLabelSet,
            datasets: [{
                label: xLabelTitle,
                data: yValueSet,
                backgroundColor: ["#00A591", "#EC9787","#6F9FD8"]
            }]
        },
        options: {
            barThickness: {
                number: 2
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                text: chartTitle
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};