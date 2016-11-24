(function() {
    'use strict';

    angular.module('app.layout')
        .directive('mainnav', mainnav);
    mainnav.$inject = ['logger', '$timeout', '$state',];

    function mainnav(logger, $timeout, $state) {
        return {
            restrict: 'EA',
            link: function(scope, elem, attrs) {

            },
            templateUrl: 'app/layout/mainnav.html'
        };
    }
})();
