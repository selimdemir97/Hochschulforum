<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Post;
use App\User;
use App\Comment;
use App\Favorites;
use App\Restriction;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function getPost(){
        $posts = Post::orderBy('created_at','desc')->get();
        return response()->json($posts,201);
    }
    public function getFavs(){
        $posts = Favorites::orderBy('created_at','asc')->get();
        return response()->json($posts,201);
    }
    public function getUser(){
        $user = User::all();
        return response()->json($user,201);
    }
    public function getRestrictions(){
        $rest=Restriction::all();
        return response()->json($rest,201);
    }

}
