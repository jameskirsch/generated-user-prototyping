'use strict';

$(document).ready(function () {
    var totalUsers = 12;

    function GetUsers() {
        var users = [];
        var deferred = [];

        // Seed Id needs to be associated to each user in the API, in order to retrieve that same user again
        // instead of associating the Seed Id with the entire collection.
        for (var i = 0; i < totalUsers; i++) {
            deferred.push($.ajax({
                dataType: "json",
                url: 'https://randomuser.me/api/?results=1',
                method: 'GET',
                async: false, // Cross-Origin Request Blocked in Edge and Firefox, will re-enable async when those issues are fixed
                success: function(data) {
                    var registered = new Date(data.results[0].registered.date);
                    var yearRegistered = registered.getFullYear();
                    var dataResult = data.results[0];

                    var user = {
                        seedId: data.info.seed,
                        firstName:  '<a href="' + 'details.html?id=' + data.info.seed + '">' + dataResult.name.first + '</a>',
                        lastName: dataResult.name.last,
                        email: dataResult.email,
                        city: dataResult.location.city,
                        state: dataResult.location.state,
                        zip: dataResult.location.postcode,
                        registered : yearRegistered,
                        gender: dataResult.gender
                    };
                    users.push(user);
                },
                error: function(error) {
                    console.log('An error occurred: ' + error.responseText);
                    console.log('Status: ' + error.statusText + ' Status Code: ' + error.statusCode);
                }
            }));
        };

        $.when.apply($, deferred).then(function() {
            BuildUserTable(users);
            BuildUserAnalytics(users);
        }).done(function() {
            console.log('Finished Processing Users');
        });
    };

    GetUsers();
});

