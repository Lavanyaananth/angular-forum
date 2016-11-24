(function() {
    'use strict';

    angular
        .module('app.newtopic')
        .controller('NewTopicController', NewTopicController);


    NewTopicController.$inject = ['logger', 'dataservice', '$state', '$stateParams', 'LoaderService'];


    function NewTopicController(logger, dataservice, $state, $stateParams, LoaderService) {

        var vm = this;

        vm.postTopic = function() {
          
            dataservice.postTopic(vm.formdata).then(function(data) {
                if (data) {
                    swal({
                        title: "Topic Created",
                        text: "Topic has been created successfully",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#f16f30",
                        confirmButtonText: "Close",
                        closeOnConfirm: true
                    }, function() {
                       $state.go('home');
                    });
                }
            });

        };

         dataservice.getHighlightedTopic().then(function(data) {
            if (data) {
                vm.highlights = data.data;
                console.log(data.data);
            }
        });

         
    }
})();
