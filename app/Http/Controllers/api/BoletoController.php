<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BoletoController extends Controller
{
    public function show()
    {
        $boletos = DB::table('boletos')->limit(2000)->get([
            'uuid',
            'number',
            'status'
        ]);

        return response([
            'boletos' => $boletos
        ], 200);
    }
}
