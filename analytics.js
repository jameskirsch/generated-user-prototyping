'use strict';

function BuildDataAnalytics(users) {
    var registeredBeforeOrIn2008 = 0;
    var registeredAfter2008 = 0;
    var registeredIn2010 = 0;
    var genderIsMale = 0;
    var genderIsFemale = 0;

    for (var user of users) {
        if (user.registered === 2010) {
            registeredIn2010 += 1;
        } else if (user.registered <= 2008) {
            registeredBeforeOrIn2008 += 1;
        } else if (user.registered > 2008) {
            registeredAfter2008 += 1;
        }
        if (user.gender === 'male') {
            genderIsMale += 1;
        } else {
            genderIsFemale += 1;
        }
    }

    // The ordering here matters to match labels on bar chart
    var registrationCounts = [registeredBeforeOrIn2008, registeredAfter2008, registeredIn2010];
    var chartLabels = ['Before or In 2008', 'After 2008', 'In 2010'];

    CreateBarChart('bar-chart', 'Registered Users', chartLabels,
        registrationCounts, 'Registered Users by Date Range', 'bar'
    );

    var pieChartData = [genderIsMale, genderIsFemale];
    var pieChartLabels = ['Male', 'Female'];

    CreatePieChart('pie-chart', pieChartData, pieChartLabels, 'Users by Gender');
};
