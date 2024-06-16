<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DollarValueController;

Route::get('/dollar-values', [DollarValueController::class , 'index']);

Route::post('/dollar-values', [DollarValueController::class , 'store']);

Route::patch('/dollar-values/{id}', [DollarValueController::class , 'update']);

Route::post('/dollar-values/delete', [DollarValueController::class , 'destroyMultiple']);
