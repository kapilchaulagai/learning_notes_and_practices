function add(a: number, b: number): number {
  return a + b;
}
{
  const result: number = add(2, 5);
  console.log(result);
}

//Primitives: number, string, boolean, null, undefined and symbols
let age: number;
age = 12;

let userName: string;
userName = "Kapil";

let isLearner: boolean;
isLearner = true;

//null and undefined have little different use case

//More Complex types: arrays, objects
let hobbies: string[];
hobbies = ["swimming", "watching movies", "reading books"];

//let person: object;

//specific type of object
let person: {
  name: string;
  myAge: number;
};
person = {
  name: "Kapil",
  myAge: 25,
};

//array of some specific type of object
let people: {
  name: string;
  myAge: number;
}[];

people = [
  {
    name: "Vaishu",
    myAge: 26,
  },
  {
    name: "Kapil",
    myAge: 25,
  },
];

//Union Types using pipe (|)
let course: string | number = "React - The Complete Guide";
course = 12341;

//Type Aliases
type Person = {
  name: string;
  myAge: number;
};

let boy: Person;
person = {
  name: "Kapil",
  myAge: 25,
};

let boys: Person[];
boys = [
  {
    name: "Vaishu",
    myAge: 26,
  },
  {
    name: "Kapil",
    myAge: 25,
  },
];

//Function & Types
//infers a number funtion type
function addition(a: number, b: number) {
  return a + b;
}

//infers a void funtion type
function printLogValue(value: any) {
  console.log(value);
}

//explicitly provide type
function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

//Understanding Generics
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); //[-1, 1, 2, 3]
const stringArray = insertAtBeginning(["A", "B", "C"], "D"); //['D','A','B','C']

//updatedArray[0].split('');  //Error because we are trying to call split on a number
stringArray[0].split(""); //Okay because we have explicitly said that the array contains strings

//Class & TypeScript
class Student {
  //   firstName: string;
  //   lastName: string;
  //   age: number;
  //   private courses: string[];

  //Shorthand
  constructor(
    public firstName: string,
    public astName: string,
    public age: number,
    private courses: string[],
  ) {
    // this.firstName = first;
    // this.lastName = last;
    // this.age = age;
    // this.courses = courses;
  }

  enroll(courseName: string) {
    this.courses.push(courseName);
  }

  listCourses() {
    this.courses.slice();
  }
}

const student = new Student("Kapil", "Chaulagai", 24, ["TS", "JS", "NG"]);
student.enroll("React");
student.listCourses();

//Interfaces
//Classes that implement interface are forced to keep with that structure
//Also we can add our new  properties and methods as well
interface Human {
  firstName: string;
  age: number;

  greet: () => void;
}

let kapil: Human;

kapil = {
  firstName: "Kapil",
  age: 24,

  greet() {
    console.log(`Hello! My name is ${this.firstName}.`);
  },
};

class Learner implements Human {
  firstName = "Kapil";
  age = 24;
  greet() {
    console.log("Hello...!!");
  }

  add() {
    console.log(5 + 4);
  }
}
