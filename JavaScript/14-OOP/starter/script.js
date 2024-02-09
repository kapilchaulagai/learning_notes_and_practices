'use strict';
/*//Coding Challenges #1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  //Create functions:
  //accelerate and brake
};

const Car1 = new Car('BMW', 120);
const Car2 = new Car('Mercedes', 95);

//Car1.__proto__ === Car.prototype
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is now going at ${this.speed}km/h.`);
};

Car1.accelerate();
Car2.accelerate();

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is now slowing down to ${this.speed}km/h.`);
};

Car1.brake();
Car2.brake(); */

/*//Coding Challenges #2
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  //Create functions:
  //accelerate and brake
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is now going at ${this.speed}km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is now slowing down to ${this.speed}km/h.`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const Ford = new Car('Ford', 120);
console.log(Ford.speedUS);
Ford.accelerate();
console.log(Ford.speedUS);
Ford.speedUS = 50;
Ford.brake();
console.log(Ford.speedUS); */

/*//Coding Challenges #3
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
  //Create functions:
  //accelerate and brake
};

//Car1.__proto__ === Car.prototype
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is now going at ${this.speed}km/h.`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is now slowing down to ${this.speed}km/h.`);
};

const EV = function (make, speed, charge) {
  //Inheriting the Parent class properties
  Car.call(this, make, speed);
  this.charge = charge;
};

//Link the prototypes
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

//new child class specified method
EV.prototype.chargeBattery = function (chagrgeTo) {
  this.chargeTo = chargeTo;
};

//Parent class method override
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `This ${this.make} car is now going at ${this.speed}km/hr with the charge of ${this.charge}%.`
  );
};

const EVCar = new EV('Tesla', 120, 23);
EVCar.chargeBattery(90);
EVCar.accelerate();*/

/* //Inheritance Between "Classes" : ES6 Classes
//Create Parent class infos
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(`${2037 - this.birthYear} years old`);
  }

  introduce() {
    if (this.fullName.includes(' '))
      return console.log(
        `Hey! My name is ${this.fullName} and I'm ${
          2037 - this.birthYear
        } years old.`
      );
    else alert(`${this.fullName} is not a full name.`);
  }

  set fullName(fullName) {
    this._fullName = fullName;
  }
  get fullName() {
    return this._fullName;
  }
}

const jonas = new PersonCl('Nick Jonas', 1999);
jonas.introduce();

//Create child class info
class StudentCl extends PersonCl {
  //Always needs to happen first!
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  //override introduce() method
  introduce() {
    if (this.course)
      return console.log(
        `Hey! My name is ${this.fullName} and I study ${this.course}.`
      );
    else alert(`Course is empty!!`);
  }
}

const martha = new StudentCl('Martha Will', 2000, 'CSE');
console.log(martha);
martha.calcAge();
martha.introduce();*/

/*//Inheritance Between "Classes" : Object.create
const PersonProto = {
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
  calcAge() {
    console.log(`${this.firstName} is ${2037 - this.birthYear} years old.`);
  },
  introduce() {
    if (this.firstName)
      return console.log(
        `Hey! My name is ${this.firstName} and I am ${
          2037 - this.birthYear
        } years old.`
      );
    else alert(`FirstName is empty!!`);
  },
};
const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  if (this.course)
    return console.log(
      `Hey! My name is ${this.firstName} and I study ${this.course}.`
    );
  else alert(`Course is empty!!`);
};

console.log(PersonProto);
console.log(StudentProto);

const jay = Object.create(StudentProto);
jay.init('Jay', 2000, 'CSE');
jay.introduce();
jay.calcAge(); */

/*//Another Class Example
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks ${this.owner} for opening an account with us.`);
  }

  deposit(mov) {
    this.movements.push(mov);
  }
  withdraw(mov) {
    this.deposit(-mov);
  }

  //should not be accessible in real scenario
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) this.deposit(val);
    console.log('Loan Approved!!');
  }
}

const acc1 = new Account('Jonas', 'EUR', 2222);
//acc1.movements.push(200);
//acc1.movements.push(-150);

acc1.deposit(200);
acc1.withdraw(150);
acc1.requestLoan(1000);

//this.approveLoan(1200); shouldn't be accessible to outside when it's use is internal
console.log(acc1.movements);*/

//Coding Challenge #4
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  //Create functions:
  //accelerate and brake
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is now going at ${this.speed}km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is now slowing down to ${this.speed}km/h.`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  //Parent class method override
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `This ${this.make} car is now going at ${
        this.speed
      }km/hr with the charge of ${this.#charge}%.`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);

rivian.accelerate().accelerate().brake().chargeBattery(50).brake().accelerate();
