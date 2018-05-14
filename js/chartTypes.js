'use strict';

function CreatePieChart(Id, dataValues, dataLabels, title) {
    new Chart($('#' + Id), {
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

function CreateBarChart(Id, xLabelTitle, xLabelSet, yValueSet, chartTitle) {
    new Chart($('#' + Id), {
        type: 'bar',
        data: {
            labels: xLabelSet,
            datasets: [{
                label: xLabelTitle,
                data: yValueSet,
                backgroundColor: ["#00A591", "#EC9787", "#6F9FD8"]
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
}