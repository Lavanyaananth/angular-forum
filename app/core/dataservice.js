(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', 'logger',  'authtoken', '$timeout', '$rootScope', '$state'];

    /* @ngInject */
    function dataservice($http,  logger,  authtoken, $timeout, $rootScope, $state) {
        var api = "@@API_ENDPOINT";

        /* Provide API calls */
        var service = {
            postTopic: postTopic,
            getForumInfo: getForumInfo,
            getPopularTopic: getPopularTopic,
            getHighlightedTopic: getHighlightedTopic,
            getUserComments:getUserComments,
            postComment:postComment
        };

        return service;



        function getForumInfo(data) {
            return $http({
                method: 'GET',
                data: JSON.stringify(data),
                url: 'http://demo1928573.mockable.io/getforuminfo',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(getForumInfoComplete);

            function getForumInfoComplete(data) {
                console.log(data);
                return data;
            }

        }

        function getHighlightedTopic(data) {
            return $http({
                method: 'GET',
                data: JSON.stringify(data),
                url: 'http://demo1928573.mockable.io/highlightedtopic',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(getHighlightedTopicComplete);

            function getHighlightedTopicComplete(data) {
                console.log(data);
                return data;
            }

        }
        function getPopularTopic(data) {
            return $http({
                method: 'GET',
                data: JSON.stringify(data),
                url: 'http://demo1928573.mockable.io/populartopic',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(getPopularTopicComplete);

            function getPopularTopicComplete(data) {
                console.log(data);
                return data;
            }

        }
        function getUserComments(data) {
            return $http({
                method: 'GET',
                data: JSON.stringify(data),
                url: 'http://demo1928573.mockable.io/usercomments',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(getusercommentsComplete);

            function getusercommentsComplete(data) {
                console.log(data);
                return data;
            }

        }

        function postTopic(formdata) {

            return $http({
                method: 'POST',
                url: 'http://jsonplaceholder.typicode.com/posts',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                data: {
                    title: "Sample Forum",
                    desc: "hello world",
                    message: "lorem Ipsum"
                }
            }).then(postTopicComplete);

            function postTopicComplete(data) {
                console.log(data);
                return data;
            }
        }

        function postComment(formdata) {

            return $http({
                method: 'POST',
                url: 'http://jsonplaceholder.typicode.com/posts',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                data: {
                    desc: "Go for it",
                    message: "Created"
                }
            }).then(postCommentComplete);

            function postCommentComplete(data) {
                console.log(data);
                return data;
            }
        }

    }
})();
