<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;
use App\Wall;
use App\Favorites;
use App\Comment;
use App\Restriction;
use App\Rating;
use App\Post;
use App\Http\Requests\SignUpRequest;
use Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['show','getUserRatings','findRestriction','createRestriction','getDislikes','getLikes',
        'deleteWall','getWall','wallpost','deleteFav','login','signup','me','getId','getComments',
        'getPostfC','createPost','deletePost','updatePost','updateUser','updatePassword','creatComment',
        'deleteComment','updateComment','checkdislikes','checklikes','likePost','dislikePost','favorite','getPostcount']]);
    }
    public function findRestriction(Request $request){
        $rest=Restriction::where('post_id',$request->input('post_id'))
        ->where('user_id',$request->input('id'))->first();
        if(empty($rest)){
            return 1;
        }else{
            return 0;
        }
    }
    public function getWall(Request $request){ 
        $wall=Wall::where('user_id',$request->all())->get();
        return response()->json($wall,201);
    }

    public function getLikes(Request $request){
        $rate=Rating::where('user_id',$request->all())
        ->where('liked',true)->get();
        return response()->json(sizeof($rate),201);
    }
    public function getPostcount(Request $request){
        $count=Post::where('user_id',$request->all())->get();
        return response()->json(sizeof($count),201);
    }
    public function getDislikes(Request $request){
        $rate=Rating::where('user_id',$request->all())
        ->where('disliked',true)->get();
        return response()->json(sizeof($rate),201);
    }

    public function createRestriction(Request $request){
        $rate=new Restriction();
        $rate->user_id=$request->input('user_id');
        $rate->post_id=$request->input('post_id');
        $rate->save();
        return response()->json($rate,201);
    }

    public function wallpost(Request $request){
        $wall = new Wall();
        $wall->body = $request->input('body');
        $wall->p_user_id=$request->input('p_user_id');
        $wall->user_id=$request->input('user_id');
        $wall->save();
        return response()->json($wall,201);
    }
    public function deleteWall(Request $request){
        $wall=Wall::where('user_id',$request->input('user_id'))
        ->where('p_user_id',$request->input('p_user_id'))->first();
        $wall->forceDelete();
        return response()->json($wall,201);
    }


    public function deleteFav(Request $request){
        $fav=Favorites::where('user_id',$request->input('user_id'))
        ->where('post_id',$request->input('post_id'))->first();
        $fav->forceDelete();
        return response()->json($fav,201);
    }

    public function getId(Request $request){
        $user = User::where('id',$request->all())->first();
        return response()->json($user,201);
    }
    public function favorite(Request $request){
       $favorite = Favorites::where('user_id',$request->input('user_id'))
       ->where('post_id','=',$request->input('post_id'))->first();

       if(empty($favorite)){

           $favorite = new Favorites();
           $favorite->user_id=$request->input('user_id');
           $favorite->post_id=$request->input('post_id');
           $favorite->save();
           return response()->json($favorite,201);

       }

    }
    public function likePost(Request $request){
        $rating = Rating::where('user_id',$request->input('user_id'))
        ->where('post_id','=',$request->input('post_id'))
        ->where('disliked','=',true)->first();
        if(empty($rating)){
            
            $post = Post::where('id',$request->input('post_id'))->first();
            $post->increment('likes');
            $rating=new Rating();
            $rating->user_id=$request->input('user_id');
            $rating->post_id=$request->input('post_id');
            $rating->liked=true;
            $rating->disliked=false;
            $rating->save();
            return response()->json($rating,201);
        }else{
           
            $post = Post::where('id',$request->input('post_id'))->first();
            $post->increment('likes');
            $post->decrement('dislikes');
            $rating->liked=true;
            $rating->disliked=false;
            $rating->save();
            return response()->json($rating,201);
        }
    }

    public function dislikePost(Request $request){
        $rating = Rating::where('user_id',$request->input('user_id'))
        ->where('post_id','=',$request->input('post_id'))
        ->where('liked','=',true)->first();
        if(empty($rating)){
            $post = Post::where('id',$request->input('post_id'))->first();
            $post->increment('dislikes');
            $rating=new Rating();
            $rating->user_id=$request->input('user_id');
            $rating->post_id=$request->input('post_id');
            $rating->liked=false;
            $rating->disliked=true;
            $rating->save();
            return response()->json($rating,201);
        }else{
            $post = Post::where('id',$request->input('post_id'))->first();
            $post->decrement('likes');
            $post->increment('dislikes');
            $rating->liked=false;
            $rating->disliked=true;
            $rating->save();
            return response()->json($rating,201);
        }
    }

    public function getUserRatings(Request $request){
        $ratings=Rating::where('user_id',$request->input('id'))->get();
        return response()->json($ratings,201);
    }

    public function checkdislikes(Request $request){
        $rating = Rating::where('user_id',$request->input('user_id'))
        ->where('post_id','=',$request->input('post_id'))
        ->where('disliked','=',true)->get();
        if($rating->isEmpty()){
            return 0;
        }else{
            return 1;
        }
    }
    public function checklikes(Request $request){
        $rating = Rating::where('user_id',$request->input('user_id'))
        ->where('post_id',$request->input('post_id'))
        ->where('liked',true)->get();
        if($rating->isEmpty()){
            return 0;
        }else{
            return 1;
        }
    }

    public function updatePost(Request $request){
        $post = Post::where('id',$request->input('id'))->first();
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->save();
        return response()->json($post,201);
    }

    public function updateComment(Request $request){
        $comment = Comment::where('id',$request->input('id'))->first();
        $comment->body = $request->input('body');
        $comment->save();
        return response()->json($comment,201);
    }

    public function updateUser(Request $request){
        $user =User::where('email',$request->input('email_old'))->first();
        if($request->input('email') != ""){
            if(sizeof(User::where('email','=',$request->input('email'))->get()) > 0){
                return response()->json("Email exisitert bereits.",201);
            }else{
                if(password_verify($request->input('password'),$user->password)){
                    $user->email = $request->input('email');
                    $user->save();
                }else{
                    return response()->json("Passwort falsch.",201);
                }
            }
        }
        if($request->input('name') != ""){
            if(password_verify($request->input('password'),$user->password)){
                $user->name = $request->input('name');
                $user->save();
                return response()->json("1",201);
            }else{
                return response()->json("Passwort falsch.",201);
            }
        }
        
        return response()->json("Bitte geben Sie was ein.",201);
    }

    public function updatePassword(Request $request){//Diese Funktion funktioniert nicht
        $user = User::where('email',$request->input('email'))->first();
        if(password_verify($request->input('password'),$user->password)){
            if($request->input('password_new')==$request->input('password_new_confirmation')){
                $validator = Validator::make($request->all(), [
                    'password_new' => 'required|min:8'
                ]);
                if ($validator->fails()) {
                    return "passwort muss mindestens 8 Zeichen lang sein.";
                }else{
                    $user->password=Hash::make($request->input('password_new_confirmation'));
                    $user->save();
                    return "Passwort geändert!";
                }
                
            }else{
                return "Passwörter stimmen nicht überein.";
            }
        }else{
            return "Altes Passwort falsch.";
        }
    }

    public function deletePost(Request $request){
        $post = Post::where('id',$request->all())->first();
        $rests = Restriction::where('post_id',$request->all())->get();
        foreach($rests as $rest){
            $rest->forceDelete();
        }
        $post->forceDelete();
        return response()->json($post,201);
    }

    public function deleteComment(Request $request){
        $comment = Comment::where('id',$request->all())->first();
        $comment->forceDelete();
        return response()->json($comment,201);
    }
    public function creatComment(Request $request){
        $comment = new Comment();
        $comment->body = $request->input('body');
        $comment->user_id=$request->input('user_id');
        $comment->post_id=$request->input('post_id');
        $comment->save();
        return response()->json($comment,201);
    }

    public function createPost(Request $request){
        if(strlen($request->input('title'))>0&&strlen($request->input('body'))>0){
            $post = new Post();
            $post->title = $request->input('title');
            $post->body = $request->input('body');
            $post->user_id=$request->input('user_id');
            $post->save();
            return response()->json($post,201);
        }
        return response()->json(['error' => 'Bitte Titel und Text eingeben'], 401);
    }

    public function getComments(Request $request){
        $comments = Comment::where('post_id',$request->all())->get();
        return response()->json($comments,201);
    }
    public function getPostfC(Request $request){
        $post = Post::where('id',$request->all())->first();
        return response()->json($post,201);
    }

    public function signup(SignUpRequest $request){
        $user = User::create($request->all());
        return $this->login($request);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = $this->guard()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }

        return response()->json(['error' => 'Password oder Email stimmen nicht überein'], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)//Diese Methode lädt die userdaten für den eingeloggten user (alt)
    {
        $user = User::where('email',$request->input('email'))->first();
        return response()->json($user,201);
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
            'user'=> auth()->user()->name,
        ]);
    }
    public function show(Request $request)//Diese Methode lädt die userdaten für den eingeloggten user (neu)
    {
        return response()->json($this->guard()->user(), 200);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }

}