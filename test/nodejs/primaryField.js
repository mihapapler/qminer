/**
 * Copyright (c) 2015, Jozef Stefan Institute, Quintelligence d.o.o. and contributors
 * All rights reserved.
 * 
 * This source code is licensed under the FreeBSD license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
console.log(__filename)
var assert = require('../../src/nodejs/scripts/assert.js'); // additional JS implementations
var qm = require('qminer');

//describe('Primary field, old', function () {
//	it('should survive', function () {

qm.delLock();

var backward = require('../../src/nodejs/scripts/backward.js');
backward.addToProcess(process); // adds process.isArg function

console.log("PrimaryField", "Starting test of primary fields");


// only report failours
assert.silent = !process.isArg("-verbose");
// name of the debug process
assert.consoleTitle = "PrimaryField";

// data for randomly generating records
var strVals = [ "Ljubljana", "Maribor", "Koper", "Kranj", "Celje", "Novo Mesto" ];
var intVals = [ 123, -234, 345, -456, 567, -678, 789, -890, 901 ];
var uint64Vals = [ 12, 23, 34, 45, 56, 67, 78, 89, 90, 98, 87, 76, 65, 54, 43, 32, 21 ];
var fltVals = [ 1.23, 2.34, 3.45, 4.56, 5.67, 6.78, 7.89 ];
var tmVals = ["2013-01-02T12:23:34", "2013-01-04T12:23:34", "2013-01-09T12:23:34",
              "2013-03-02T12:23:34", "2013-03-03T12:23:34", "2013-03-09T12:23:34",
              "2013-05-02T12:23:34", "2013-05-06T12:23:34", "2013-05-07T12:23:34" ];

qm.config('qm.conf', true, 8080, 1024);
var base = qm.create('qm.conf', "", true); // 2nd arg: empty schema, 3rd arg: clear db folder = true

// create stores
base.createStore([
    {
        name: "primary_string",
        fields: [
            { name: "Str", type: "string", primary: true },
            { name: "Int", type: "int" },
            { name: "UInt64", type: "uint64" },
            { name: "Flt", type: "float" },
            { name: "Tm", type: "datetime" }
        ]
    },
    {
        name: "primary_int",
        fields: [
            { name: "Str", type: "string" },
            { name: "Int", type: "int", primary: true },
            { name: "UInt64", type: "uint64" },
            { name: "Flt", type: "float" },
            { name: "Tm", type: "datetime" }
        ]
    },
    {
        name: "primary_uint64",
        fields: [
            { name: "Str", type: "string" },
            { name: "Int", type: "int" },
            { name: "UInt64", type: "uint64", primary: true },
            { name: "Flt", type: "float" },
            { name: "Tm", type: "datetime" }
        ]
    },
    {
        name: "primary_float",
        fields: [
            { name: "Str", type: "string" },
            { name: "Int", type: "int" },
            { name: "UInt64", type: "uint64" },
            { name: "Flt", type: "float", primary: true },
            { name: "Tm", type: "datetime" }
        ]
    },
    {
        name: "primary_tm",
        fields: [
            { name: "Str", type: "string" },
            { name: "Int", type: "int" },
            { name: "UInt64", type: "uint64" },
            { name: "Flt", type: "float" },
            { name: "Tm", type: "datetime", primary: true }
        ]
    }
]);

// generate random records
function random(max) { 
    return Math.floor(max * Math.random());
}

for (var i = 0; i < 10000; i++) {
    //console.log("..." + i);
    var rec = {
        Str : strVals[random(strVals.length)],
        Int : intVals[random(intVals.length)],
        UInt64 : uint64Vals[random(uint64Vals.length)],
        Flt : fltVals[random(fltVals.length)],
        Tm : tmVals[random(tmVals.length)]
    };
    base.store("primary_string").add(rec);
    base.store("primary_int").add(rec);
    base.store("primary_uint64").add(rec);
    base.store("primary_float").add(rec);
    base.store("primary_tm").add(rec);
}

assert.equal(base.store("primary_string").length, strVals.length, "string");
assert.equal(base.store("primary_int").length, intVals.length, "int");
assert.equal(base.store("primary_uint64").length, uint64Vals.length, "uint64");
assert.equal(base.store("primary_float").length, fltVals.length, "float");
assert.equal(base.store("primary_tm").length, tmVals.length, "tm");

base.close();
//})});