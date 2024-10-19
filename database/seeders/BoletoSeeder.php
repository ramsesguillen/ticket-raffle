<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BoletoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tickets = [];

        // Crear 1000 tickets
        for ($i = 1; $i <= 2500; $i++) {
            $tickets[] = [
                'uuid' => Str::uuid(),  // Genera un UUID
                'number' => $i,       // Número de 1 a 1000
                'status' => 'DISPONIBLE'
            ];
        }

        // Insertar los tickets en la base de datos
        DB::table('boletos')->insert($tickets);
    }
}
