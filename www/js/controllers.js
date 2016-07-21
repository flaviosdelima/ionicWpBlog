angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('postagensRecentesCtrl', function($scope) {

})
   
.controller('categoriasCtrl', function($scope,$http) {
    
    $scope.categories = [];
    $http.get("http://192.168.15.5/wordpress43/?json=get_category_index").then(function(retdata){
        //sucess
        $scope.categories = retdata.data.categories;
        console.log(retdata);
        
        }, function(error){
            //erro
            console.log(error);
            });

})
    
