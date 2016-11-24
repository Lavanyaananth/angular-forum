(function() {
    'use strict';

    angular
        .module('app.newtopic')
        .run(appRun);

    appRun.$inject = ['routerHelper','authtoken'];
    /* @ngInject */
    function appRun(routerHelper,authtoken) {
        routerHelper.configureStates(getStates(authtoken));
    }

    function getStates(authtoken) {
        return [{
            state: 'newtopic',
            config: {
                url: '/newtopic',
                templateUrl: 'app/newtopic/newtopic.html',
                controller: 'NewTopicController',
                controllerAs: 'vm',
                title: 'Post New Topic'
            }
        }];
    }
})();