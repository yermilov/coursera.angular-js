'use strict';

angular .module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {     
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading...";
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = { mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            $scope.channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            $scope.invalidChannelSelection = false;
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            $scope.sendFeedback = function() {
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                } else {
                    feedbackFactory.getFeedback().save($scope.feedback);

                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.showDish = false;
            $scope.message = "Loading...";
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                .$promise.then(
                    function(response){
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {  
                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);
                $scope.dish.comments.push($scope.comment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.comment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            $scope.showLeaders = false;
            $scope.message = "Loading ...";
            $scope.leaders = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            $scope.showDish = false;
            $scope.dishMessage = "Loading...";
            $scope.topdish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.topdish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.dishMessage = "Error: " + response.status + " " + response.statusText;
                    }
                );

            $scope.showPromotion = false;
            $scope.promotionMessage = "Loading...";
            $scope.promotion = menuFactory.getPromotions().get({id:0})
                .$promise.then(
                    function(response) {
                        $scope.promotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
                    }
                );

            $scope.showExec = false;
            $scope.execMessage = "Loading...";
            $scope.exec = corporateFactory.getLeaders().get({id:3})
                .$promise.then(
                    function(response) {
                        $scope.exec = response;
                        $scope.showExec = true;
                    },
                    function(response) {
                        $scope.execMessage = "Error: " + response.status + " " + response.statusText;
                    }
                );    
        }])
;
