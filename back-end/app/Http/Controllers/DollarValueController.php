<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dollar;

class DollarValueController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);

        if ($startDate && $endDate) {
            $dollarValues = Dollar::whereBetween('date', [$startDate, $endDate])->get();
        } else {
          
            $dollarValues = Dollar::all();
        }

        return response()->json($dollarValues);

    }

    public function store()
    {
        $dollarValues = $this->fetchDollarValue();

        if ($dollarValues) {
            $inserted = 0; 
            $skipped = 0; 
        
            foreach ($dollarValues as $value) {
                if (!Dollar::where('date', $value['date'])->exists()) {
                    Dollar::create($value);
                    $inserted++;
                } else {
                    $skipped++;
                }
            }
        
            $message = "Dollar values stored  successfully. Inserted: $inserted, Skipped: $skipped";
        } else {
            $message = 'Failed to fetch dollar values';
        }

        return response()->json(['message' => $message]);
    }

    public function update(Request $request, $id)
{
    $dollar = Dollar::find($id);
    
    if(!$dollar){
        $data = [
            'message' => 'Dollar not found!',
            'status' => 404
        ];
        return response()->json($data, 404);
    }

    if($request->has('date')){
        $dollar->date = $request->date;
    }

    if($request->has('value')){
        $dollar->value = $request->value;
    }

    $dollar->save();

    return response()->json($dollar);
}


public function destroyMultiple(Request $request)
{
    $request->validate([
        'ids' => 'required|array',
        'ids.*' => 'integer', 
    ]);

    $ids = $request->input('ids');

    Dollar::whereIn('id', $ids)->delete();

    $DollarGet = Dollar::all();

    return response()->json($DollarGet);
}



    private function fetchDollarValue()
    {
        $dollarValues = [];

        $response = file_get_contents('https://mindicador.cl/api/dolar/' . now()->format('Y'));
        $data = json_decode($response, true);
    
        if ($data && isset($data['serie'])) {
            foreach ($data['serie'] as $entry) {
                $dollarValues[] = [
                    'date' => substr($entry['fecha'], 0, 10), 
                    'value' => $entry['valor']
                ];
            }
        }
    
        $response_2023 = file_get_contents('https://mindicador.cl/api/dolar/2023');
        $data_2023 = json_decode($response_2023, true);
    
        if ($data_2023 && isset($data_2023['serie'])) {
            foreach ($data_2023['serie'] as $entry) {
                $dollarValues[] = [
                    'date' => substr($entry['fecha'], 0, 10), 
                    'value' => $entry['valor']
                ];
            }
        }
    
        usort($dollarValues, function($a, $b) {
            return strtotime($a['date']) - strtotime($b['date']);
        });

        return $dollarValues;
    }
}
