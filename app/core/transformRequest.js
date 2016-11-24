(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('transformRequestAsFormPost', transformRequestAsFormPost);

    transformRequestAsFormPost.$inject = [];
    /* @ngInject */
    function transformRequestAsFormPost() {

        function transformRequest(data, getHeaders) {

            var headers = getHeaders();

            return (serializeData(data));

        }

        return (transformRequest);

        function serializeData(data) {

            if (!angular.isObject(data)) {

                return ((data == null) ? '' : data.toString());

            }

            var buffer = [];

            for (var name in data) {

                if (!data.hasOwnProperty(name)) {

                    continue;

                }

                var value = data[ name ];

                buffer.push(
                    encodeURIComponent(name) +
                    '=' +
                    encodeURIComponent((value == null) ? '' : value)
                );

            }

            var source = buffer
                .join('&')
                .replace(/%20/g, '+')
            ;

            return (source);

        }

    }
})();
