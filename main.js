'use strict';

$(document).ready(function () {
    // Using an API that generates Random Users to populate Users Table and make Bar Chart
    // Based on registered users by date range
    $.ajax({
        url: 'https://randomuser.me/api/?results=50',
        method: 'GET',
        success: function(data) {

            var date = new Date();
            var registeredBeforeOrIn2010 = 0;
            var registeredAfter2010 = 0;
            var registeredIn2013 = 0;

            data.results.forEach(user => {
                var registered = new Date(user.registered);
                var yearRegistered = registered.getFullYear();

                user.registered = yearRegistered;

                if (yearRegistered === 2013) {
                    registeredIn2013 += 1;
                } else if (yearRegistered <= 2010) {
                    registeredBeforeOrIn2010 += 1;
                } else if (yearRegistered > 2010) {
                    registeredAfter2010 += 1;
                }
            });

            // The ordering here matters to match labels on bar chart
            var registrationCounts = [];
            registrationCounts.push(
                registeredBeforeOrIn2010,
                registeredAfter2010,
                registeredIn2013
            );
            var chartLabels = [
                'Before or In 2010',
                'After 2010',
                'In 2013'
            ];

            CreateChart(
                'bar-chart',
                'Registered Users',
                chartLabels,
                registrationCounts,
                'Registered Users by Date Range',
                'bar'
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

    function CreateChart(
        elementId, 
        xLabelTitle,
        xLabelSet,
        yValueSet,
        chartTitle,
        type
    ) {
        new Chart($('#' + elementId), {
            type: type,
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