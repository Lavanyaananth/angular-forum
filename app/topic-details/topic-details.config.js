(function() {
    'use strict';

    angular
        .module('app.topicdetails')
        .run(appRun);

    appRun.$inject = ['routerHelper','authtoken'];
    /* @ngInject */
    function appRun(routerHelper,authtoken) {
        routerHelper.configureStates(getStates(authtoken));
    }

    function getStates(authtoken) {
        return [{
            state: 'topic-details',
            config: {
                url: '/topic-details',
                templateUrl: 'app/topic-details/topic-details.html',
                controller: 'TopicDetailsController',
                controllerAs: 'vm',
                title: 'Topic Details'
            }
        }];
    }
})();