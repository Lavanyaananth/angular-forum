(function() {
    'use strict';

    angular
        .module('app.topicdetails')
        .controller('TopicDetailsController', TopicDetailsController);


    TopicDetailsController.$inject = ['logger', 'dataservice', '$state', 'LoaderService'];


    function TopicDetailsController(logger, dataservice, $state, LoaderService) {

        var vm = this;

        dataservice.getUserComments().then(function(data) {
            if (data) {
                vm.usercomments = data.data;
                console.log(data.data);
            }
        });
        vm.postComment = function() {
            vm.formdata.message = "created";
            dataservice.postComment(vm.formdata).then(function(data) {
                if (data) {
                    swal({
                        title: "Comment published",
                        text: "Comment has been published successfully",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#f16f30",
                        confirmButtonText: "Close",
                        closeOnConfirm: true
                    }, function() {
                        $state.go('topic-details');
                    });
                }
            });
        }; 
    }
})();
