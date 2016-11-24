(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);
    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Forum Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Forum'
    };

    core.value('config', config);

    core.config(configure);
    configure.$inject = ['$logProvider', '$locationProvider', '$httpProvider', 'exceptionHandlerProvider','routerHelperProvider'];

    /* @ngInject */
    function configure($logProvider, $locationProvider, $httpProvider, exceptionHandlerProvider,routerHelperProvider) {


        $httpProvider.defaults.useXDomain = true;

        //Remove the header containing XMLHttpRequest used to identify ajax call
        //that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({
            docTitle: config.appTitle + ' '
        });
        
    }
})();