<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OptionPerson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('option_person', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('option_id');
            $table->integer('person_id');
            $table->integer('fatigue');
            $table->integer('motivation1');
            $table->integer('motivation2');
            $table->foreign('person_id')->references('id')->on('person');
            $table->foreign('option_id')->references('id')->on('option');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('option_person');
    }
}
