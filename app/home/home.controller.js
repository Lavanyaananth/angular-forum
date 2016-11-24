(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);


    HomeController.$inject = ['logger', 'dataservice', '$state', '$stateParams', 'LoaderService'];


    function HomeController(logger, dataservice, $state, $stateParams, LoaderService) {

        var vm = this;
        dataservice.getForumInfo().then(function(data) {
            if (data) {
                vm.foruminfo = data.data;
                console.log(data.data);
            }
        });
         dataservice.getPopularTopic().then(function(data) {
            if (data) {
                vm.topicinfo = data.data;
                console.log(data.data);
            }
        });
    }
})();
