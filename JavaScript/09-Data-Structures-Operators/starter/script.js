/* 'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
 */
/* const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
}; */

/* //Create one player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;

console.log(players1);
console.log(players2);

//GK and FieldPlayers for team1
const [team1Gk, ...team1FieldPlayers] = players1;
console.log(team1Gk);
console.log(team1FieldPlayers);

//GK and FieldPlayers for team2
const [team2Gk, ...team2FieldPlayers] = players2;
console.log(team2Gk);
console.log(team2FieldPlayers);

// All Players
const [...allPlayers] = [...players1, ...players2];
console.log(allPlayers);

//adding substitutes
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
const { team1, draw = game.odds.x, team2 } = game.odds;
console.log(team1, draw, team2);

//Function that receives arbitrary number of players
function printGoals(...players) {
  console.log(`${players.length} goals has been scored.`);
}
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//team with lower odd will be more likely to win
team1 < team2 &&
  console.log(`Team1 is more likely to win and has ${team1} odd score.`);
team1 > team2 &&
  console.log(`Team2 is more likely to win and has ${team2} odd score.`); */

/* // 1. Loop over the game.scored array and print each player name to the console,
//along with the goal number (Example: "Goal 1: Lewandowski")
const players = Object.entries(game.scored);
for (const [key, value] of players) {
  console.log(`Goal ${Number(key) + 1} : ${value}`);
}

//calculate average odd
const oddsValue = Object.entries(game.odds);
let average = 0;
function calcAverage() {
  for (const [key, value] of oddsValue) {
    average += value;
  }
  return average / oddsValue.length;
}
console.log(`Odd Average: ${calcAverage()}`);

//List out the Odds for respective team
console.log(...oddsValue);

for (let [key, value] of oddsValue) {
  key === 'team1'
    ? console.log(`Odd of victory ${game.team1} : ${value}`)
    : key === 'team2'
    ? console.log(`Odd of victory ${game.team2} : ${value}`)
    : console.log(`Odd of ${(key = 'draw')}: ${value}`);
}

//challenge #4
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
 */

/* let gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🟨 Yellow card'],
  [69, '🟥 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🟨 Yellow card'],
]);

//Create an array 'events' of the different game events that happened (no duplicates)
const events = [...new Set(gameEvents.values())];
console.log(...events);

//Remove yellow card at 64
gameEvents.delete(64);
/* gameEvents = new Map(events);
gameEvents.delete(64);
events = [...gameEvents];
for (const [i, event] of events) {
  console.log(i, event);
} 
console.log(events);
//Compute and log the following string to the console: "An event happened,
//on average, every 9 minutes" (keep in mind that a game has 90 minutes)
function calcAverage() {
  let eventsAt = [];
  let average = 0;
  for (let [key, value] of events) {
    eventsAt.push(key);
  }
  for (let i = 0; i < eventsAt.length - 1; i++) {
    average = average + (eventsAt[i + 1] - eventsAt[i]);
  }
  average /= events.length;
  // console.log(`An event happened, on average, every ${average} minutes`);
}
calcAverage();

//Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half
//or second half (after 45 min) of the game, like this: [FIRST HALF] 17: ⚽ GOAL
for (let [key, value] of events) {
  // key < 45
  // ? console.log(`[FIRST HALF] ${key} : ${value}`)
  // : console.log(`[SECOND HALF] ${key} : ${value}`);
} */
/* 
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for (let [i, row] of rows.entries()) {
    let [first, second] = row.toLowerCase().trim().split('_');
    second = second[0].toUpperCase() + second.slice(1);
    const output = first.concat(second);
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
 */
///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const flightsManage = flights.split('+');
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flightsManage) {
  const [type, from, to, time] = flight.split(';');
  let output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`;
  console.log(output.padStart(50));
}
