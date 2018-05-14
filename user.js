'use strict';

$(document).ready(function () {
    var urlParams = queryParameters();
    console.log(urlParams);

    function BuildUser(data) {
        var user = {
            profilePicture: data.picture.large,
            firstName: data.name.first,
            lastName: data.name.lastName
        };

        return user;
    }

    $.ajax({
        dataType: "json",
        url: 'https://randomuser.me/api/?seed=' + urlParams.id,
        method: 'GET',
        async: true,
        success: function(data) {
            var user = new BuildUser(data.results[0]);
            console.log(user);
            var element = document.getElementById('profileImage');
            element.src = user.profilePicture;
        },
        error: function(error) {
            console.log('An error occurred: ' + error.responseText);
            console.log('Status: ' + error.statusText + ' Status Code: ' + error.statusCode);
        }
    });

    
});


