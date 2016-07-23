angular
		.module('app.controllers', [])

		.controller('homeCtrl', function($scope) {

		})

		.controller(
				'postagensRecentesCtrl',
				function($scope, $http, $sce, $ionicScrollDelegate) {
					console.log("carregamento incial");
					$scope.recent_posts = [];
					$scope.offset = 0;
					$scope.count_total = 1;
					$http
							.get(
									"http://192.168.15.5/wordpress43/?json=get_posts")
							.then(
									function(retdata) {

										$scope.recent_posts = retdata.data.posts;
										$scope.count_total = retdata.data.count_total;
										$scope.recent_posts
												.forEach(function(element,
														index, array) {

													element.excerpt = element.excerpt
															.substr(0, 100);
													element.excerpt = element.excerpt
															+ " Ler +";
													element.excerpt = $sce
															.trustAsHtml(element.excerpt);
												});

										console.log(retdata);

									}, function(err) {
										console.log(err);
									});

					$scope.searchTextChanged = function() {
						$ionicScrollDelegate.$getByHandle('mainScroll')
								.scrollTop(true);
					};
					$scope.doRefresh = function() {
						console.log("fiz refresh");
						$http
								.get(
										"http://192.168.15.5/wordpress43/?json=get_posts")
								.then(
										function(retdata) {

											$scope.recent_posts = retdata.data.posts;
											$scope.count_total = retdata.data.count_total;
											$scope.recent_posts
													.forEach(function(element,
															index, array) {

														element.excerpt = element.excerpt
																.substr(0, 100);
														element.excerpt = element.excerpt
																+ " Ler +";
														element.excerpt = $sce
																.trustAsHtml(element.excerpt);
													});

											$scope
													.$broadcast('scroll.refreshComplete');

										}, function(err) {
											console.log(err);
										});
					};

					$scope.timer = new Date().getTime();
					$scope.lastTimer = new Date().getTime();

					$scope.loadMorePosts = function() {						
						$scope.timer = new Date().getTime();
						console.log("aqui");
						if (new Date($scope.timer - $scope.lastTimer) > 5000) {
							console.log("aqui0");
							$scope.lastTimer = new Date().getTime();
							$http
									.get(
											"http://192.168.15.5/wordpress43/?json=get_posts&offset="
													+ $scope.offset)
									.then(
											function(retdata) {

												var newPosts = retdata.data.posts;
												$scope.count_total = retdata.data.count_total;
												console.log($scope.count_total);
												newPosts
														.forEach(function(
																element, index,
																array) {

															element.excerpt = element.excerpt
																	.substr(0,
																			100);
															element.excerpt = element.excerpt
																	+ " Ler +";
															element.excerpt = $sce
																	.trustAsHtml(element.excerpt);
														});

												$scope.recent_posts.push.apply(
														$scope.recent_posts,
														newPosts);
												$scope.offset += 10;

												$scope
														.$broadcast('scroll.infiniteScrollComplete');

											}, function(err) {
												console.log(err);
											});
						}
					};
					
					$scope.canLoadMore = function() {

						return true;
					}

				})
		.controller(
				'categoriasCtrl',
				function($scope, $http, $sce) {

					$scope.categories = [];
					$http
							.get(
									"http://192.168.15.5/wordpress43/?json=get_category_index")
							.then(
									function(retdata) {
										// sucess
										$scope.categories = retdata.data.categories;
										$scope.categories
												.forEach(function(element,
														index, array) {
													element.title = $sce
															.trustAsHtml(element.title);
												});
										console.log(retdata);

									}, function(error) {
										// erro
										console.log(error);
									});

				})
		.controller(
				'postDetailCtrl',
				function($scope, $http, $sce,$stateParams) {
					
					$http
					.get(
							"http://192.168.15.5/wordpress43/?json=get_post&id=" + $stateParams.postId)
					.then(
							function(retdata) {
								// sucess
								$scope.post_title = retdata.data.post.title;
								$scope.post_category = retdata.data.post.categories[0].title ? retdata.data.post.categories[0].title: "Sem Categoria";
								
								$scope.post_content =$sce.trustAsHtml(retdata.data.post.content);
								$scope.post_date = retdata.data.post.date;
								$scope.post_url = retdata.data.post.url;
								$scope.post_views =0; //retdata.data.post.custom_fields.post_view_count[0];
								$scope.post_commentCount = retdata.data.post.comment_count;
								$scope.post_image = retdata.data.post.thumbnail_images.full.url;
								$scope.post_authorImage = "http://lorempixel.com/64/64/";
								$scope.post_authorName = retdata.data.post.author.first_name+" "+retdata.data.post.author.last_name;
								if($scope.post_authorName.trim()==""){
									$scope.post_authorName = "Desconhecido";
								}
								
								console.log(retdata);

							}, function(error) {
								// erro
								console.log(error);
							});
					
					
				})
		.controller(
				'catCtrl',
				function($scope, $http, $sce,$stateParams) {
					
					$scope.doRefresh = function()
					{
					$http
					.get(
							"http://192.168.15.5/wordpress43/?json=get_category_posts&id=" + $stateParams.catId)
					.then(
							function(retdata) {

								$scope.category_posts = retdata.data.posts;
								$scope.count_total = retdata.data.count_total;
								$scope.category_posts
										.forEach(function(element,
												index, array) {

											element.excerpt = element.excerpt
													.substr(0, 100);
											element.excerpt = element.excerpt
													+ " Ler +";
											element.excerpt = $sce
													.trustAsHtml(element.excerpt);
										});
								$scope.category_title = retdata.data.category.title;
								$scope.$broadcast('scroll.refreshComplete');
								console.log(retdata);

							}, function(err) {
								console.log(err);
							});
				}
					$scope.doRefresh();
					
				})
				
				