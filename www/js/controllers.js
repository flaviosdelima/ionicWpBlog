angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {

})
   
.controller('postagensRecentesCtrl', function($scope,$http,$sce) {
    
    $scope.recent_posts = [];    
    $http.get("http://192.168.15.5/wordpress43/?json=get_posts").then(function(retdata){
        
        $scope.recent_posts =retdata.data.posts;  
        
        $scope.recent_posts.forEach(function(element,index,array){
                
                element.excerpt = element.excerpt.substr(0,100);
                element.excerpt = element.excerpt +" Ler +";
                element.excerpt = $sce.trustAsHtml(element.excerpt);
            });
        
        console.log(retdata);
        
        },function(err){
            console.log(err);
            });

})
   
.controller('categoriasCtrl', function($scope,$http,$sce) {
    
    $scope.categories = [];
    $http.get("http://192.168.15.5/wordpress43/?json=get_category_index").then(function(retdata){
        //sucess
        $scope.categories = retdata.data.categories;
        $scope.categories.forEach(function(element,index,array){
                element.title = $sce.trustAsHtml(element.title);
            });
        console.log(retdata);
        
        }, function(error){
            //erro
            console.log(error);
            });

})
    
