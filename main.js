'use strict';

$(document).ready(function () {
    var totalUsers = 10;

    function GetUsers() {
        var users = [];
        // Needed because a Seed Id needs to be associated to each user in the API, in order to retrieve that same user again
        // Instead of associating the Seed Id with the entire collection. Eventually to be made Async
        for (var i = 0; i < totalUsers; i++) {
            $.ajax({
                dataType: "json",
                url: 'https://randomuser.me/api/?results=1',
                method: 'GET',
                async: false, // An improvement can be made here to make this non blocking for performance
                success: function(data) {
                    var registered = new Date(data.results[0].registered);
                    var yearRegistered = registered.getFullYear();

                    var user = {
                        seedId: data.info.seed,
                        firstName:  '<a href="' + 'details.html?id=' + data.info.seed + '">' + data.results[0].name.first + '</a>',
                        lastName: data.results[0].name.last,
                        email: data.results[0].email,
                        city: data.results[0].location.city,
                        state: data.results[0].location.state,
                        zip: data.results[0].location.postcode,
                        registered : yearRegistered,
                        gender: data.results[0].gender
                    };
                    users.push(user);
                },
                error: function(error) {
                    console.log('An error occurred: ' + error.responseText);
                    console.log('Status: ' + error.statusText + ' Status Code: ' + error.statusCode);
                }
            });
        };
        return users;
    };

    var users = GetUsers();
    BuildUserTable(users);
    BuildDataAnalytics(users);
});