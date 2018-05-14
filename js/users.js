'use strict';

function BuildUserTable(users) {
    // Saying 'data' is required for this
    $('#users').dataTable({
        data: users,
        columns: [
            { 'data' : 'firstName' },
            { 'data' : 'lastName' },
            { 'data' : 'city' },
            { 'data' : 'state' },
            { 'data' : 'zip' },
            { 'data' : 'email' },
            { 'data' : 'registered'}
        ]
    });
};