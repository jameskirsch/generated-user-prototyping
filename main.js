'use strict';

$(document).ready(function () {
    // Using an API that generates Random Users to populate Users Table
    $.ajax({
        url: 'https://randomuser.me/api/?results=50',
        method: 'GET',
        success: function(data) {
            console.log(data);

            data.results.forEach(user => {
                user.fullName = user.name.first + ' ' + user.name.last;
            });

            $('#users').dataTable({
                data: data.results,
                columns: [
                    { 'data' : 'fullName' },
                    { 'data' : 'location.city' },
                    { 'data' : 'location.state' },
                    { 'data' : 'location.postcode' },
                    { 'data' : 'email' }
                ]
            })
        },
        error: function(error) {
            console.log('An error occurred: ' + error.responseText);
            console.log('Status: ' + error.statusText + ' ' + error.statusCode);
        } 
    })
});