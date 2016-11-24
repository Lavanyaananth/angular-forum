(function() {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper','authtoken'];
    /* @ngInject */
    function appRun(routerHelper,authtoken) {
        routerHelper.configureStates(getStates(authtoken));
    }

    function getStates(authtoken) {
        return [{
            state: 'home',
            config: {
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                title: 'Home'
            }
        }];
    }
})();