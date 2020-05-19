<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //Name der Tabelle
    protected $table = 'posts';
    //Primärer Schlüssel
    public $primaryKey = 'id';
    public $timestamps = true;
    public function user(){
        return $this->belongsTo('App\User');
    }
}
