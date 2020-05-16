<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/getpost', 'Controller@getPost');
Route::get('/getRestrictions', 'Controller@getRestrictions');
Route::get('/getfavs', 'Controller@getFavs');
Route::get('/getuser', 'Controller@getUser');
Route::get('/users','AuthController@show');
//Route::post('/getId', 'Controller@getId');

