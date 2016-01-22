<?php

namespace App\Http\Controllers;

use DB;
use App\Scenario;
use App\Option;
use App\OptionPerson;
use App\Person;
use App\Http\Controllers\Controller;

class ChoiceController extends Controller
{
    /**
     * Load the Make-a-choice AngularJS SPA
     *
     * @return Response
     */
    public function index()
    {
        return view('choice');
    }

    /**
     * Get all the scenario data for the game to start
     *
     * @return JSON data
     */
    public function getStartupData() {
        $newOptions = $newPeople = array();
        $scenarios = Scenario::all();
        $options = Option::all();
        $people = OptionPerson::all();

        foreach ($scenarios as &$s) {
            foreach ($options as $o) {
                foreach ($people as $p) {
                    if ($p['option_id'] == $o['id']) {
                        $newPeople[] = array(
                            'person_id' => $p['person_id'],
                            'fatigue' => $p['fatigue'],
                            'motivation1' => $p['motivation1'],
                            'motivation2' => $p['motivation2'],
                            'option_id' => $p['option_id']
                        );
                    }
                }
                if ($o['scenario_id'] == $s['id']) {
                    $newOptions[] = array(
                        'name' => $o['name'],
                        'hint' => $o['hint'],
                        'description' => $o['description'],
                        'people' => $newPeople,
                    );
                }
                $newPeople = array();
            }
            $s['options'] = $newOptions;
            $newOptions = array();
        }

        return $scenarios;
    }

    /**
     * Get all the people data for the game to start
     *
     * @return JSON data
     */
    public function getPersonData() {
        $data = array();
        $people = Person::all();
        foreach ($people as $p) {
            $data[$p['id']] = $p;
        }
        return $data;
    }
}
