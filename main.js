'use strict';

$(document).ready(function () {
    // Using an API that generates Random Users to populate Users Table and make Bar Chart
    // Based on registered users by date range
    $.ajax({
        url: 'https://randomuser.me/api/?results=50&noinfo',
        method: 'GET',
        success: function(data) {
            console.log(data);
            var date = new Date();
            var registeredBeforeOrIn2008 = 0;
            var registeredAfter2008 = 0;
            var registeredIn2010 = 0;
            var genderIsMale = 0;
            var genderIsFemale = 0;

            data.results.forEach(user => {
                var registered = new Date(user.registered);
                var yearRegistered = registered.getFullYear();
                user.registered = yearRegistered;

                if (yearRegistered === 2010) {
                    registeredIn2010 += 1;
                } else if (yearRegistered <= 2008) {
                    registeredBeforeOrIn2008 += 1;
                } else if (yearRegistered > 2008) {
                    registeredAfter2008 += 1;
                }

                if (user.gender === 'male') {
                    genderIsMale += 1;
                } else {
                    genderIsFemale += 1;
                }
            });

            // The ordering here matters to match labels on bar chart
            var registrationCounts = [];
            registrationCounts.push(
                registeredBeforeOrIn2008,
                (registeredAfter2008),
                registeredIn2010
            );
            var chartLabels = [
                'Before or In 2008',
                'After 2008',
                'In 2010'
            ];

            CreateBarChart(
                'bar-chart',
                'Registered Users',
                chartLabels,
                registrationCounts,
                'Registered Users by Date Range',
                'bar'
            );

            var pieChartData = [genderIsMale, genderIsFemale];
            var pieChartLabels = ['Male', 'Female'];

            CreatePieChart(
                'pie-chart',
                pieChartData,
                pieChartLabels,
                'Users by Gender'
            );

            // Saying 'data' is required for this
            $('#users').dataTable({
                data: data.results,
                columns: [
                    { 'data' : 'name.first' },
                    { 'data' : 'name.last' },
                    { 'data' : 'location.city' },
                    { 'data' : 'location.state' },
                    { 'data' : 'location.postcode' },
                    { 'data' : 'email' },
                    { 'data' : 'registered'}
                ]
            })
        },
        error: function(error) {
            console.log('An error occurred: ' + error.responseText);
            console.log('Status: ' + error.statusText + ' Status Code: ' + error.statusCode);
        }
    });

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
                    display: true,
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
                    backgroundColor: ["#00A591", "#EC9787","#6F9FD8"],
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
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    }
});