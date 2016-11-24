(function() {
    'use strict';
/* jshint ignore:start */

    angular
        .module('app.core')
        .factory('authtoken', authtoken);

    authtoken.$inject = ['$q', '$http', '$location',  '$window'];
    /* @ngInject */
    function authtoken($q, $http, $location, $window ) {
        
        var storage = $window.localStorage;
        var token = 'token';
        var cachedToken;
        var service = {
            setToken: setToken,
            getToken: getToken,
            removeToken: removeToken,
            removeAll: removeAll,
            isAuthenticated: isAuthenticated,
        };

        return service;

       
        function setToken(key, token) {
            cachedToken = token;
            storage.setItem(key, token);
        }

        function removeToken(key) {
            cachedToken = null;
            storage.removeItem(key);
        }

        function removeAll () {
            storage.clear();
        }

        function getToken(key) {
            cachedToken = storage.getItem(key);
            return cachedToken;
        }
    
        function isAuthenticated() {
            return !!this.getToken(Authorisation);
        }

        
    }
/* jshint ignore:end */
})();
