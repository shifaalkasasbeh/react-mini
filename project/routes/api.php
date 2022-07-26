<?php

use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('items', [ItemController::class , 'show_api']);
Route::post('add_item' , [ItemController::class , 'add_item']);
Route::post('update_item/{id}' , [ItemController::class , 'update_item']);
Route::post('delete_item/{id}' , [ItemController::class , 'delete_item']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
