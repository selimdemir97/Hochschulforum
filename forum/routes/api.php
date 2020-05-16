<?php

Route::group([

    'middleware' => 'api',


], function ($router) {
    
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('signup', 'AuthController@signup');
    Route::post('getId', 'AuthController@getId');
    Route::post('/getComments','AuthController@getComments');
    Route::post('/getPostfC','AuthController@getPostfC');
    Route::post('/createPost','AuthController@createPost');
    Route::post('/deletePost','AuthController@deletePost');
    Route::post('/updatePost','AuthController@updatePost');
    Route::post('/updateUser','AuthController@updateUser');
    Route::post('/updatePassword','AuthController@updatePassword');
    Route::post('/creatComment','AuthController@creatComment');
    Route::post('/deleteComment','AuthController@deleteComment');
    Route::post('/updateComment','AuthController@updateComment');
    Route::post('/checklikes','AuthController@checklikes');
    Route::post('/checkdislikes','AuthController@checkdislikes');
    Route::post('/likePost','AuthController@likePost');
    Route::post('/dislikePost','AuthController@dislikePost');
    Route::post('/favorite','AuthController@favorite');
    Route::post('/deleteFav','AuthController@deleteFav');
    Route::post('/wallpost','AuthController@wallpost');
    Route::post('/getWall','AuthController@getWall');
    Route::post('/deleteWall','AuthController@deleteWall');
    Route::post('/getLikes', 'AuthController@getLikes');
    Route::post('/getDislikes', 'AuthController@getDislikes');
    Route::post('/getPostcount', 'AuthController@getPostcount');
    Route::post('/createRestriction', 'AuthController@createRestriction');
    Route::post('/findRestriction', 'AuthController@findRestriction');
    Route::post('/getUserRatings', 'AuthController@getUserRatings');
    
});