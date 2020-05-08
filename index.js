import { fifaData } from './fifa.js';
console.log(fifaData);


// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */
const a2014=fifaData.filter(o => (o.Year==2014 && o.Stage=="Final"));
console.log("");
console.log("task 1 - Home Team name for 2014 World cup final.");
const Data2014=a2014[0];
console.log("Home Team Name: " + Data2014["Home Team Name"] );
console.log("Away Team Name: " + Data2014["Away Team Name"] );
console.log("Home Team Goals: " + Data2014["Home Team Goals"] );
console.log("Away Team Goals: " + Data2014["Away Team Goals"] );

let winner=""
if( Data2014["Home Team Goals"] > Data2014["Away Team Goals"]  ){
    winner=Data2014["Home Team Name"];
}else{
    winner=Data2014["Away Team Name"];
}
console.log("Winner of 2014 World cup final is " + winner);

// Calc_winner //

function calc_winner(e,index,array){
    let winner="";
    let winnerInitials="";
    if (parseInt(e["Away Team Goals"]) > parseInt(e["Home Team Goals"])){
        winner = e["Away Team Name"];
        winnerInitials=e["Away Team Initials"];
    }else if(parseInt(e["Away Team Goals"]) < parseInt(e["Home Team Goals"])){
        winner = e["Home Team Name"];
        winnerInitials=e["Home Team Initials"];
    }else{  //score is tie, show winning conditions.
        winner=e["Win conditions"];
        winnerInitials=e["Win conditions"].substring(0,3).toUpperCase();
    } 
    array[index].winnerTeamName=winner;
    array[index].winnerTeamInitial=winnerInitials;
    return;
    //return [winner, winnerInitials];   
}

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
    /* code here */
    let with_finals=data.filter(o => (o.Stage=="Final"));
    with_finals.forEach(calc_winner);
    return with_finals;
};
console.log("");
console.log("Task 2");
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(CB_func) {
    /* code here */    
    const with_finals=CB_func(fifaData);
    const years=with_finals.map(o =>(o.Year));
    return years;
};
console.log("");
console.log("Task 3");
console.log(getYears( getFinals));


/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(CB_func) {
    /* code here */
    const with_finals=CB_func(fifaData);
    let aWinners=with_finals.map(o=>o.winnerTeamName);
    return aWinners;
};
console.log("");
console.log("Task 5");
console.log(getWinners(getFinals));
//getWinners();

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */
function getWinnersByYear(CB_getWinners, CB_get_years) {
    const aYears=CB_get_years(getFinals);
    const aWinners=CB_getWinners(getFinals);
    let retStr=""
    for (let i=0; i<aYears.length; i++){
        retStr= retStr + "In "+aYears[i]+", "+aWinners[i]+" won the world cup! \n";
    }
    return retStr;
};
console.log("");
console.log("Task 6");
console.log(getWinnersByYear(getWinners,getYears));

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
//console.log(getFinals(fifaData));    
    /* code here */
    const with_finals=getFinals(data);
    const aWins = with_finals.filter(o=>(o.winnerTeamInitial==initials));
    const aWinsCount = aWins.map(o=>(1))   
    const totalCount = aWinsCount.reduce( (acc, cv)=>(acc + cv),0);
    console.log(aWinsCount);
    return totalCount;
    //console.log(with_finals);
};
console.log("");
console.log("Task 7");
let ini="ITA";
let win=getCountryWins(fifaData,ini);
console.log(ini+" Total Wins is "+win);

/* Task 8: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    /* code here */

    // for check only
    //data=getFinals(data);
    //data = data.filter(o=>o["winnerTeamInitial"]=="BRA");
    //console.log(data);
    // end check
    const aWayTeamTotalGoals =data.reduce ( (acc, o) => acc + parseInt(o["Away Team Goals"]), 0 ); 
    const homeTeamTotalGoals =data.reduce ( (acc, o) => acc + parseInt(o["Home Team Goals"]), 0 ); 
    let AVGGoals = (aWayTeamTotalGoals + homeTeamTotalGoals)/data.length;
    //console.log(AVGGoals);
    return AVGGoals;
};
console.log("");
console.log("Task 8");
console.log(getAverageGoals(fifaData));


/// STRETCH  //

/* STRETCH 1: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
    /* code here */

};

getGoals();


/* STRETCH 2: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
