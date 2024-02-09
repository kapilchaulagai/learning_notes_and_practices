'use strict';

/* const flight = 'LH235';
const jonas = {
  name: 'Jonas',
  passport: 234934832,
};

function plane(flightNum, passenger) {
  (flightNum = 'MH236'), (passenger.name = 'Mr.' + passenger.name);
  if (passenger.passport === 234934832) {
    alert('Check-in Permitted✅.');
  } else {
    alert('Wrong Passport!!🚫');
  }
}
plane(flight, jonas);
console.log(flight, jonas);
 */

/* const greet = greeting => name => {
  console.log(`${greeting} ${name}`);
};

const greetHey = greet('Hey');
greetHey('Kapil');
 */
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(135, 'Kapil');
lufthansa.book(532, 'Vaishakh');

// console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;
//Does not work
//book(423, 'Deepak');

//call is a method for function
book.call(eurowings, 423, 'Deepak');
console.log(eurowings);

book.call(lufthansa, 567, 'Punith');
//console.log(lufthansa);

//Apply method
const flightData = [643, 'Divya'];
book.call(eurowings, ...flightData);

book.apply(eurowings, flightData);
//console.log(eurowings);

//Bind Method
//traditional way: book.call(eurowings,325,'Hari');
const bookEu = book.bind(eurowings);
const bookLu = book.bind(lufthansa);
bookEu(237, 'Hari');
console.log(eurowings);

//With EventListeners
lufthansa.planes = 100;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); */

/* //Partial Application
const addTax = (rate, value) => value + rate * value;
console.log(addTax(0.23, 200));

//bind method assign addTax to another memory address
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(200));

//The Traditional way to do it
function addTaxes(rate) {
  return function (value) {
    return value + value * rate;
  };
}
//console.log(addTaxes(0.23)(200));
const afterVAT = addTaxes(0.23);
console.log(afterVAT(200));
 */

//Coding Challenge #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const answer = Number(
      prompt(
        `${this.question}\n ${this.options.join('\n')}\n(Write option number)`
      )
    );
    //Register answer
    typeof answer === 'number' && answer < this.answers.length
      ? this.answers[answer]++
      : alert('Invalid Choice!!');
    // if (answer >= 0 && answer < 4) {
    //   console.log(answer);
    //   for (let i = 0; i < poll.answers.length; i++) {
    //     answer === i ? poll.answers[i]++ : '';
    //   }
    // } else {
    //   alert('Invalid Choice!!');
    //   poll.registerNewAnswer();
    // }
    // console.log(poll.answers);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    type === 'array'
      ? console.log(this.answers)
      : type === 'string'
      ? console.log(`Poll results are ${this.answers.join(',')}`)
      : '';
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
