var fs = require('fs');
var file = "../data4.json";
var namepool = ["John", "Bob", "Jan", "Bill", "Joe", "Betty", "Hope", "Jeniffer", "Karl", "Homer", "Slayer"];
var countrypool = ["USA", "China", "France", "Iran", "Mexico", "Canada", "India", "Ukraine", "Russia", "Zealand", "Poland"];
var townpool = ["Moskow", "Dubai", "Hong-kong", "Paris", "Minsk", "Vorkuta", "Washington", "York", "Magadan", "Mexico", "Bejing"];
var army_type = {"melee":"Атака", "range":"Стрелки", "cavalry":"Конница"};
var melee_type = ["eleph", "sword", "armor", "tank", "bomb", "club", "spear"];
var range_type = ["bow", "gun", "gun1", "arb", "arrow"];
var cavalry_type = ["horse", "wheel", "aleb", "horse2", "hsword"];
var buildings_type = {"altar":"Алтарь", "station":"Станция", "trench":"Ров"};
var loot_type = ["wood", "food", "iron"];
var city_color = ["beige", "blue", "green", "yellow", "pink"];
var race_type = ["white","asian","black","red"];
var flag_type = ["flag1","flag2","flag3","flag4","flag5","flag6","flag7","flag8"];

var def_town = 0;
var att_town = 5;
var have_destroyed = false;
var have_loot = false;
var army_size = 30;

var json = genJSON();
var str_json = JSON.stringify(json);
//console.log(json);
save(str_json);

function genJSON(){
    var obj = {};
    var time = new Date();
    var date = time.toLocaleDateString().split(',');
    obj.time = time.toLocaleTimeString() + date[1];
    obj.battle_def = true;
    obj.battle_att = false;
    obj.buildings = [];
    if(have_destroyed === true){
        for (var n in buildings_type){
            building = {};
            building.icon = n;
            building.type = buildings_type[n];
            building.damage = getRandom(10)+1;
            building.lvl = getRandom(10)+1;
            if (building.damage > building.lvl){

                building.damage = false;
            }
            obj.buildings.push(building);
        }
    }
    obj.loot = [];
    if (have_loot === true) {
        for (var n = 0; n < loot_type.length; n++) {
            obj.loot.push({type:loot_type[n], number:getRandom(1000)});
        }
    }
    obj.attackers = [];
    obj.defenders = [];
    for (a = 0; a < att_town; a++){
        var town = new GetTown(a);
        town.side_image = "img-att";
        obj.attackers.push(town);
    }
    for (d = 0; d < def_town; d++){
        var town = new GetTown(a+d);
        town.side_image = "img-def";
        obj.defenders.push(town);
    }
    obj.def_army = 0;
    for (var t in obj.defenders){
        obj.def_army += obj.defenders[t].was_all;
    }
    obj.att_army = 0;
    for (var t in obj.attackers){
        obj.att_army += obj.attackers[t].was_all;
    }
    //obj.where = obj.defenders[0];
    obj.where = new GetTown(1);
    obj.who = obj.attackers[0];
    obj.owner = obj.attackers[getRandom(obj.attackers.length)];
    return obj;
}

function GetTown(n){
    this.player = namepool[n];
    this.country = countrypool[n];
    this.townname = townpool[n];
    this.color = city_color[getRandom(city_color.length)];
    this.race = race_type[getRandom(race_type.length)];
    this.flag = flag_type[getRandom(flag_type.length)];
    this.war_bonus = getRandom(100).toString() + "%";
    this.army = {};
    this.army.melee = [];
    this.army.range = [];
    this.army.cavalry = [];
    for (var n =0; n < Math.floor(army_size/6); n++){
        var m = getRandom(1000);
        var t = {};
        t.icon = melee_type[getRandom(melee_type.length)];
        t.count = m;
        t.dead = p30(m);
        t.survive = m-p30(m);
        this.army.melee.push(t);
    }
    for (var n =0; n < Math.floor(army_size/6); n++){
        var m = getRandom(1000);
        var t = {};
        t.icon = range_type[getRandom(range_type.length)];
        t.count = m;
        t.dead = p30(m);
        t.survive = m-p30(m);
        this.army.range.push(t);
    }
    for (var n =0; n < Math.floor(army_size/6); n++){
        var m = getRandom(1000);
        var t = {};
        t.icon = cavalry_type[getRandom(cavalry_type.length)];
        t.count = m;
        t.dead = p30(m);
        t.survive = m-p30(m);
        this.army.cavalry.push(t);
    }
    this.was_all = getArmy(this.army, "count");
    this.dead_all = getArmy(this.army, "dead");
    this.survive_all = getArmy(this.army, "survive");
    this.army_name = army_type;
    function getArmy(army, kind){
        var sum = 0;
        for (var division in army){
            for (var troop in army[division]){
                sum += army[division][troop][kind];
            }
        }
        return sum;
    }
}

function p30(x){
    return Math.floor(x*30/100);
}

function getRandom(size){
  return Math.floor(Math.random()*size);
}

function save(str){
    fs.writeFile(file, str, function (err){
        if (err) throw err;
        console.log("Saved!!!");
    });
}