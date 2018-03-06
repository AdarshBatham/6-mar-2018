(function() {

    'use strict';

    angular
        .module('app')
        .run(run);

    run.$inject = ['authService'];

    function run(authService) {
        // Handle the authentication
        // result in the hash

        // or

        // Call the handleAuthentication method in your 
        // app 's run block. The method processess the authentication hash while your app loads.
        authService.handleAuthentication();
    }

})();