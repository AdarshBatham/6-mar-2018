(function() {

    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$state', 'angularAuth0', '$timeout'];

    function authService($state, angularAuth0, $timeout) {


        // login method that calls the authorize method from angular-auth0
        // &
        // method to see the login page with different account
        function login() {
            angularAuth0.authorize();
        }



        // all below methods are used to handle authentication in the app.


        // looks for the result of authentication in the URL hash.
        function handleAuthentication() {
            // Then, the result is processed with the parseHash method from auth0.js
            angularAuth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    setSession(authResult);
                    $state.go('home');
                } else if (err) {
                    $timeout(function() {
                        $state.go('home');
                    });
                    console.log(err);
                    alert('Error: ' + err.error + '. Check the console for further details.');
                }
            });
        }


        // sets the user's Access Token and ID Token, and the Access Token'
        // s expiry time
        function setSession(authResult) {
            // Set the time that the access token will expire at
            let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
        }

        function logout() {
            // Remove tokens and expiry time from localStorage or browser's storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
            $state.go('home');
        }

        function isAuthenticated() {
            // Check whether the current time is past the 
            // access token's expiry time
            let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
        }

        return {
            login: login,
            handleAuthentication: handleAuthentication,
            logout: logout,
            isAuthenticated: isAuthenticated
        }
    }
})();