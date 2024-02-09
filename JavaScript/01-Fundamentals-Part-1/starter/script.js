/*
let js = "amazing";
if (js == "amazing") alert("JavaScript is Fun!!");
let $new = 123;
console.log(40 + 32 + 98 - 54);

let country = "INDIA";
let continent = "ASIA";
let population = 1_41_40_88_626;

console.log(country);
console.log(continent);
console.log(population);
*/
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);
console.log(typeof javascriptIsFun);

javascriptIsFun = "Yes!";
console.log(typeof javascriptIsFun);

let year;
console.log(year);

year = 1999;
console.log(year);

console.log(typeof null);
*/

/*
let markWeight = 78;
let markHeight = 1.69;
let markBmi = markWeight / markHeight ** 2;
console.log("Mark's BMI is:" + markBmi);

let johnWeight = 92;
let johnHeight = 1.95;
let johnBmi = johnWeight / (johnHeight * johnHeight);
console.log("John's BMI is:" + johnBmi);

if (markBmi > johnBmi)
    console.log(markBmi)
else
    console.log(johnBmi);

*/
/*
let firstName = "Kapil";
let lastName = "Chaulagai";

console.log(`My name is ${firstName} ${lastName}.`);

let name = firstName + ' ' + lastName;
console.log(name);

const age = 15;
const isOldEnough = age >= 18;

if (isOldEnough) {
    console.log(`${name} is ready for getting driving license since you're ${age} years old.`);
}
else {
    console.log(`Dear ${name}, you are too young to get driving license and you have to wait for ${18 - age} years.`);
}
*/
/*
let dolphinScores = [96, 108, 89];
let sumDolphin = 0;
let averageDolphin;
dolphinScores.forEach(element => {
    sumDolphin += element;
});
averageDolphin = sumDolphin / dolphinScores.length;
console.log(`Average Score for Dolphin Team:${averageDolphin}`);

let coalaScores = [88, 91, 110];
let sumCoala = 0;
let averageCoala;
coalaScores.forEach(element => {
    sumCoala += element;
});
averageCoala = sumCoala / coalaScores.length;
console.log(`Average Score for Coala Team:${averageCoala}`);

if (averageCoala == averageDolphin) {
    console.log("This is draw match.")
}
else if (averageCoala > averageDolphin) {
    console.log("Team Coala won the match.")
}
else {
    console.log("Team Dolphin won the match.");
}*/
/*
let dolphinScores = [97, 88, 101];
let sumDolphin = 0;
let averageDolphin;
dolphinScores.forEach(element => {
    sumDolphin += element;
});
averageDolphin = sumDolphin / dolphinScores.length;
console.log(`Average Score for Dolphin Team:${averageDolphin}`);

let coalaScores = [100, 95, 88];
let sumCoala = 0;
let averageCoala;
coalaScores.forEach(element => {
    sumCoala += element;
});
averageCoala = sumCoala / coalaScores.length;
console.log(`Average Score for Coala Team:${averageCoala}`);

if (averageCoala === averageDolphin || (averageCoala && averageDolphin) < 100) {
    console.log("No one won the match, This is a draw match.")
}
else if (averageCoala > averageDolphin && (averageCoala && averageDolphin) > 100) {
    console.log("Team Coala won the match.")
}
else if (averageCoala < averageDolphin && (averageCoala && averageDolphin) > 100) {
    console.log("Team Dolphin won the match.");
}
*/

// const age = 23;
// age >= 18 ? console.log("I will have drink🍷.") : console.log("I will have just water💧.");
/*
let tip, finalBill = 0;
let bill = [275, 40, 430];
bill = bill[0];
console.log(bill);

switch (bill) {
    case bill < 50:
        finalBill = bill;
        console.log(`No tip,The Final Bill Amount is: ${finalBill}`);
        break;

    case bill > 50 && bill <= 300:
        finalBill = bill + (bill * 0.15);
        console.log(`15% Tip added, The Final Bill Amount is: ${finalBill}`);
        break;
    case bill > 300:
        finalBill = bill + (bill * 0.20);
        console.log(`20% Tip added,The Final Bill Amount is: ${finalBill}`);
        break;
    default:
        console.log("Invalid Entry!!");
        break;
}
*/
/*
let bill = 40;
let tip = bill < 50 ? 0 : (bill >= 50 && bill <= 300 ? (bill * 0.15) : (bill * 0.20));
let finalBill = bill + tip;

console.log(bill, tip, finalBill);

let key = 100;
let name = "Hari";

key<=50? console.log(name) : '';
*/
/*
function age(birthYear){
    ageResult=2023-birthYear;
    return ageResult;
}
const ageIs = age(1999);
console.log(ageIs);

const ageNow = birthYear=> 2023-birthYear;
const  ageUpdate = ageNow(2000);
console.log(ageUpdate);
let firstName;
function yearsUntilRetirement(birthYear, firstName) {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    return `${firstName} is going to retire in ${retirement} years.`;
}
console.log(yearsUntilRetirement(1999, 'Jonas'));
console.log(yearsUntilRetirement(1986, 'John'));
*/

function cutFruitPieces(fruit){
    return fruit * 4;
}
function fruitPieces(apples,oranges){
    let applePieces = cutFruitPieces(apples);
    let orangePieces = cutFruitPieces(oranges);

    return(`Juice is of ${applePieces} apple pieces and ${orangePieces} orange pieces.`);
}
const juice = fruitPieces(2,3);
console.log(juice);