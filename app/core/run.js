(function() {
    'use strict';

    var core = angular.module('app.core');

    core.run(run);
    run.$inject = ['$rootScope', '$state', 'authtoken', '$timeout'];

    /* @ngInject */
    function run($rootScope, $state, authtoken, $timeout) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                
                if (!authtoken.getToken('token')) {
                    event.preventDefault();

                    // following $timeout is emulating a backend $http.get('/auth/') request
                    $timeout(function() {
                        $state.go(toState.name, toParams, {
                            notify: false
                        }).then(function() {
                            $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
                        });
                    }, 100);
                }

            }
        );
    }
})();