/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider','$injector'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider,$injector) {
        /* jshint validthis:true */
        var config = {
            docTitle: undefined,
            resolveAlways: {}
        };

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state', 'logger'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            ///////////////

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                } else {
                    $urlRouterProvider.otherwise(function($injector) {
                        var $state = $injector.get('$state');
                        $state.go('home');
                    });
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                                (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
                loader();
            }

            function getStates() {
                return $state.get();
            }


            function loader() {

              $rootScope.showLoader = function() {
                console.log("SHOW LOADER");
                $('#preloader').show();
              }

              $rootScope.hideLoader = function() {
                console.log("HIDE LOADER");
                $("#preloader").hide();
              }

              $rootScope
                .$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
                    if (toState.name == 'state.with.resolve') {
                         $rootScope.showLoader();
                    }
                })
              $rootScope
                .$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){
                        $rootScope.hideLoader();
                });
            }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = config.docTitle + ' - ' + (toState.title || '');
                        $rootScope.title = title; // data bind to <title>

                    }
                );
            }
        }
    }
})();
