/*
function calcAverage(score1, score2, score3) {
    const average = (score1+score2+score3)/3;
    return average;
}
const teamDolphin = calcAverage(85,54,41);
const teamCoala = calcAverage(23,34,27);
console.log(teamDolphin,teamCoala);

function checkWinner(teamDolphin, teamCoala){
    if(teamCoala===teamDolphin){
        return(console.log(`Match is draw with score for Team Dolphin ${teamDolphin} average points and for Team Coala ${teamCoala} average points.`))
    }
    else if(teamDolphin>=(2*teamCoala)){
        return(console.log(`Team Dolphin has clearly won the game by scoring ${teamDolphin} average points against Team Coala scored ${teamCoala} average.`));
    }
    else if(teamCoala>=(2*teamDolphin))
    {
        return(console.log(`Team Coala has clearly won the game by scoring ${teamCoala} average points against Team Dolphin scored ${teamDolphin} average.`));
    }
    else{
        return(console.log(`No one won the match and score for Team Dolphin is ${teamDolphin} average points and for Team Coala is ${teamCoala} average points.`))
    }
}

const winner = checkWinner(teamDolphin, teamCoala);
console.log(winner);
*/
/*
let calcTip = function(bill) {
   return bill<50?0:bill>=50&&bill<=300?bill*0.15:bill*0.20;
};

let bills = [125,404,44];
let tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log(tips);

let totals = [tips[0]+bills[0],tips[1]+bills[1],tips[2]+bills[2]];
console.log(totals);

console.log(bills,tips,totals);
*/
/*
const Kapil = {
    firstName: "Kapil",
    lastName: "Chaulagai",
    birthYear: 1996,
    age: 24,
    profession: "teacher",
    friends: ["Vaishakh", "Faisal", "Anilkumar"],

    calcAge: function(){
        this.age = 2022-this.birthYear;
        return this.age;
    }
};

console.log(Kapil.calcAge());
Kapil.location="Nepal";
Kapil['gmail']="kapilchaulagai123@gmail.com";
Kapil['bestfriend'] = Kapil.friends[0];
const interestedIn = prompt("What do you want to know about me? Choose among firstName, lastName, birthYear, age, profession, friends, location, gmail and bestfriend.");
if(interestedIn){
    console.log(Kapil[interestedIn]);
}
else{
    console.log("Wrong Choice! Choose among firstName, lastName, age, profession, friends.")
}

const driversLicense= function(){
    if(Kapil.age>=18){
        return `has a Driver's License.`;
    }
    else{
        return `is too young to get a Driver's License.`;
    }
}

console.log(`${Kapil.firstName} is a ${Kapil.age} years old ${Kapil.profession}, and ${Kapil.firstName} ${driversLicense()}`);
*/
/*
const Mark = {
    fullName: "Mark Miller",
    massInKg: 78,
    heightInM: 1.69,
    calcBmi: function(){
        return this.massInKg/this.heightInM**2;
    }
}
const markBmi= Mark.calcBmi();
const John = {
    fullName: "John Smith",
    massInKg: 92,
    heightInM: 1.95,
    calcBmi: function(){
        return this.massInKg/this.heightInM**2;
    }
}
const johnBmi = John.calcBmi();

console.log(markBmi,johnBmi);

const BMI = markBmi>johnBmi?`${Mark.fullName}'s BMI (${markBmi}) is higher than ${John.fullName}'s BMI (${johnBmi}).`
:(markBmi<johnBmi?`${John.fullName}'s BMI (${johnBmi}) is higher than ${Mark.fullName}'s BMI (${markBmi}).`
:`Both ${John.fullName} and ${Mark.fullName} have equal BMI (${johnBmi}).`);

console.log(BMI);
*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calculateTips() {
  for (i = 0; i <= bills.length - 1; i++) {
    const calcTip = function () {
      return bills[i] <= 50
        ? 0
        : bills[i] >= 50 && bills[i] <= 300
        ? 0.15 * bills[i]
        : 0.2 * bills[i];
    };
    tips.push(calcTip());
  }
  console.log(`Tips values: ${tips} `);
}
calculateTips();

function calculateBill() {
  let j = 0;
  while (j < bills.length) {
    const calcTotal = function () {
      return bills[j] + tips[j];
    };
    totals.push(calcTotal());
    j++;
  }
  console.log(`Total Bill values: ${totals} `);
}
calculateBill();

function calcAverage() {
  let sum = 0;
  for (let i = 0; i < totals.length; i++) {
    sum += totals[i];
  }
  return sum / totals.length;
}
const average = calcAverage();
console.log(`Average total bill amount is : ${average}.`);
