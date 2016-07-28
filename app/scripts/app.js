/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

$(function() {
    'use strict';

    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = document.querySelector('#app');

    app.tapToGo = function(element) {
        console.log(element)
        app.route = 'comrades';
    };

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    });

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function() {
        console.log('Our app is ready to rock!');
        app.set('route', 'map');
        app.set('friends', [
            {
                name : 'Maxim Syrykh',
                phone : '+7 922 601 82 74',
                isUser : true
                // userpic : 'https://randomuser.me/api/portraits/med/men/52.jpg'
            },
            {
                name : 'Maxim Syrykh',
                phone : '+7 922 601 82 74',
                isUser : false
            },
            {
                name : 'Maxim Syrykh',
                phone : '+7 922 601 82 74',
                isUser : true
            },
            {
                name : 'Katya Semyonova',
                phone : '+7 919 385 96 70',
                isUser : false
            },
            {
                name : 'Virdzhinia Erikh',
                phone : '+7 965 506 31 52',
                // isUser : true
            },
            {
                name : 'Elvira Mamedova',
                phone : '+7 926 468 01 18',
                isUser : false
            },
            {
                name : 'Alexander Plesovskikh',
                phone : '+7 953 050 65 47',
                isUser : false
            },
            {
                name : 'Vasily Uchanev',
                phone : '+7 912 443 63 95',
                isUser : true
            },
            {
                name : 'Andrey Bystrushkin',
                phone : '+7 922 614 55 05',
                isUser : true
            }
        ])
    });
});
