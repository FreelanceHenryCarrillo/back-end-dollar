<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Dollar;

class FetchDollarValue extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:dollar-value';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch Data Dollar into to Database ';

    /**
     * Execute the console command.
     */
    public function handle()
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

        $this->info($message);
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
    
        return $dollarValues;
    }

}
