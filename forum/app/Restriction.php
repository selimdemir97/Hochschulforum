<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restriction extends Model
{
    //Name der Tabelle
    protected $table = 'restriction';
    //Primärer Schlüssel
    public $primaryKey = 'id';
    public $timestamps = true;
    public function user(){
        return $this->belongsTo('App\User');
    }
    public function post(){
        return $this->belongsTo('App\Post');
    }
}