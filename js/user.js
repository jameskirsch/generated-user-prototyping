'use strict';

$(document).ready(function () {
    var urlParams = queryParameters();
    console.log(urlParams);

    function BuildUser(data) {
        var user = {
            profilePicture: data.picture.large,
            firstName: data.name.first,
            lastName: data.name.last,
            email: data.email,
            userName: data.login.username,
            city: data.location.city,
            street: data.location.street,
            zip: data.location.postcode,
            state: data.location.state,
            phone: data.phone,
            gender: data.gender
        };

        return user;
    }

    $.ajax({
        dataType: "json",
        url: 'https://randomuser.me/api/?seed=' + urlParams.id,
        method: 'GET',
        async: true,
        success: function(data) {
            console.log(data);
            var user = new BuildUser(data.results[0]);
            console.log(user);
            document.querySelector('#profileImage').src = user.profilePicture;
            document.querySelector('#firstName').innerHTML = capitalizeFirstLetter(user.firstName);
            document.querySelector('#lastName').innerHTML = capitalizeFirstLetter(user.lastName);
            document.querySelector('#email').innerHTML = capitalizeFirstLetter(user.email);
            document.querySelector('#userName').innerHTML = user.userName;
            document.querySelector('#street').innerHTML = capitalizeFirstLetter(user.street);
            document.querySelector('#city').innerHTML = capitalizeFirstLetter(user.city);
            document.querySelector('#postcode').innerHTML = user.zip;
            document.querySelector('#state').innerHTML = user.state;
            document.querySelector('#phone').innerHTML = user.phone;
            document.querySelector('#gender').innerHTML = capitalizeFirstLetter(user.gender);
        },
        error: function(error) {
            console.log('An error occurred: ' + error.responseText);
            console.log('Status: ' + error.statusText + ' Status Code: ' + error.statusCode);
        }
    });
});


