(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('LoaderService', loaderService);

    loaderService.$inject = [];

    /* @ngInject */
    function loaderService() {

        var loader = {
            show: show,
            hide: hide
        };

        return loader;

        function show() {
          $("#preloader").fadeIn();
        }

        function hide() {
          $("#preloader").fadeOut();
        }
    }
})();
