/*
//import { Circle } from "./circle";
//Basic types
//1 any
let isCheck: any = true;
isCheck = 'TRUE';
isCheck = 0;
isCheck = {id:1, name: 'Kapil'};
console.log(isCheck);

//2 boolean
let isDone: boolean = true;
console.log(isDone);

//Variables initialization and Declaration
let fruit = 'Apple';
fruit = 'Orange';
console.log(typeof fruit); //o/p: string

let veg: string = 'Potato';
console.log(veg);

let sample:string;
sample = 'Hello World';
console.log(sample);

//User Defined
const list: number[] = [1,23,45];
console.log(list);


//Tuple
let x: [number,string];
x = [0, 'Hello'];
console.log(x)

//Enums
enum ActionTypes{
    GET_PRODUCTS = '[GET PRODUCTS] LOADED',
    CREATE_PRODUCTS = '[CREATE PRODUCTS] CREATE',

}

const action = {
    payload:1,
    type :ActionTypes.GET_PRODUCTS ,
}

console.log(action);

//Unknown type
let notSure: unknown = 4;
notSure = "maybe a string instead";
//OK, definitely a boolean
notSure = false;
console.log(notSure);

//Method with no return type(void)
function test() : void{
    console.log('Test Function');
}
test();

//Null and Undefined (cannot be assigned values to undefined or null)
let value:any = undefined;
value = 5;
 console.log(value);

let result:any = null;
 result = {id:1, name:'Khan'};
 console.log(result);

//  function error(message: string): never{
//     throw new Error(message);
//  }
//  error('Something wemnt Wrong!!')


 let employee: object = {id:0, name:''};
 employee = {
    id :1,
    name: 'Kapil'
 }
 console.log(employee);


 /////////////////////////////////////////////////////////////////
 //Operators, Decisions and Loops
 //Arithmetic Operators
 let a =  10;
 let b = 3;
 let value3 = a + b;
 console.log(value3);
 console.log(a-b);
 console.log(a*b);
 console.log(a/b);
 console.log(a--);
 console.log(b++);

 //Relational Operator
 console.log(a < b);
 console.log(a > b);
 console.log(a == b);


 //Logical Operator
 let c= 5;
 let d = 10;
 console.log(a < b && c<d);
 console.log(a < b || c<d);
 console.log(!(a < b));


 //Decision Making
 let value4 = 4;
  if(value4 == 4) console.log('TRUTHY');
  else if(value4 == 5) console.log('WRONG');
  else console.log('FALSY');

switch(value4){
    case 4:
        console.log('TRUE4');
        break;
    case 5:
        console.log('FIVE');
        break;
    default:
        console.log('FALSE');
        break;
}

//Loops
let count = 10;
for(let i=0; i<count; i++){
    console.log(i+1);
}

let num:number = 5;
let factorial:number = 1;

while(num>=1){
    factorial = factorial *num;
    num--;
}
console.log(factorial);

//////////////////////////////////////////////
//Functions
function addNumbers(x:number=0,y:number):number{
return x+y;
}
console.log(addNumbers(undefined,6));
console.log(addNumbers(5,5));

function addMuliParamNumbers(instruction: string='Add All Numbers.',...nums:number[]){
console.log(instruction);
console.log(nums.reduce((prevEl,curEl)=>curEl+=prevEl));
}
addMuliParamNumbers(undefined,1,2,3,4,5);

//Optional Parameters at last
const addPerson = (person:string, age:number=25, study:string='cse')=> console.log(`Hello ${age}th boy ${person} from ${study}.`);
addPerson('Kapil');

//////////////////////////////////////////////////////////////////////////////////////////////
//Interfaces
interface Person{
    firstName:string;
    lastName?:string; //? denotes optional parameter
    email:string;
    age:number;
    sayHello():string;
}
const client: Person={
    firstName:'Kapil',
    email: 'kapil123@gmail.com',
    age:25,
    sayHello:()=> 'HI KAPIL'
}
console.log(client.sayHello());

//Union types in interface
interface Developer extends Person {
    skill:string|boolean|(()=>string);
}
const sayHi =():string => 'HI KAPIL';

const skilledEmployee:Developer = {
    firstName: 'Raja',
    lastName: 'Pandit',
    email: 'raja_pandit@gmal.com',
    age: 30,
    sayHello:()=> 'Hello Raja',
    skill: sayHi()
}
console.log(skilledEmployee);

///////////////////////////////////////////////////////
//Classes
class Car{
    //fields
    engine:string;

    //constructor
    constructor(engine:string){
        this.engine = engine;
    }

    //methods
    display():void{
        console.log('The engine type is '+this.engine);
    }
}
const bmw = new Car('BMW ENGINE 2.39#');
bmw.display();

// const circle = new Circle(123);
// circle.disp();
// console.log(Circle.value);
// circle.add(2,3);
// circle.add(9,3);

//Generics
function identity<T>(arg: T):T{
    return arg;
}
console.log(identity<string>('Hello World!'));
console.log(identity<boolean>(true));
console.log(identity<{id:number, name:string}>({id:101, name:'KAPIL'}));

interface ProductType{
    id:number,
    name:string
}
console.log(identity<ProductType>({id:101, name:'KAPIL'}));


//Generic Interface
interface GenericIdentity<T>{
    greet(msg: T):T
}

const obj:GenericIdentity<string> ={
    greet:(msg: string)=>`Hi ${msg}`
}
console.log(obj.greet('Kapil'));

// Generic class
class Animal<T> {
    breed: T;
    constructor(breed: T) {
        this.breed = breed;
    }
    getBreed(): T {
        return this.breed;
    }
}
const newAnimal = new Animal<string>('CAT');
const results = newAnimal.getBreed(); // Invoking the method to get the breed
console.log(results); // Output the breed


interface Lengthwise{
    length: number;
}
function loggingIdentity <T extends Lengthwise>(arg: T): T{
     console.log(arg.length);
    return arg;
}
const lengthwise: Lengthwise = {
    length:100
}
const resp = loggingIdentity<Lengthwise>(lengthwise);
console.log(resp); */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/*
//Decorators
function log(title: string){
    return function(target, key, descriptor){
        const original = descriptor.value;
        descriptor.value = function(...args:any[]){
            //Call the original method
            const result = original.apply(this, args);
    
            //Log the call, and the result
            console.log(`Title: ${title} for ${key} with args ${JSON.stringify(args)} returned ${JSON.stringify(result)}`)
    
            //Return the result
            return result;
        }
        return descriptor;
    }
}
class Calculator{
    //Using the decorator @log
    @log('Calculator')
    square(n:number){
        return n*n;
    }
}
const calculator = new Calculator();
//square with args [2] returned 4
calculator.square(2);
//square with args [3] returned 9
calculator.square(3);

//Property Decorator
function property(target: any, key: string) {
    let value = target[key];
    // Replacement getter
    const getter = function() {
      console.log(`Getter for ${key} returned ${value}`);
      return value;
    };
    // Replacement setter
    const setter = function(newVal) {
      console.log(`Set ${key} to ${newVal}`);
      value = newVal;
    };
    // Replace the property
    const isDeleted = delete this[key];
    if (isDeleted) {
      Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  }
  class Person {
    @property
    public firstName: string;
    å;
  }
  const person = new Person();
  // set the firstName
  person.firstName = 'Kapil';
  // call the getter
  console.log(person.firstName); */
//Parameter Decorator
function property(target, key) {
    let value = target[key];
    // Replacement getter
    const getter = function () {
        console.log(`Getter for ${key} returned ${value}`);
        return value;
    };
    // Replacement setter
    const setter = function (newVal) {
        console.log(`Set ${key} to ${newVal}`);
        value = newVal;
    };
    // Replace the property
    const isDeleted = delete this[key];
    if (isDeleted) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
}
function parameterDecorator(target, key, index) {
    console.log(`Key is ${key} and index is ${index}`);
}
class Person {
    calculateSalary(taxes, discount) {
        return this.salary * taxes;
    }
}
__decorate([
    property
], Person.prototype, "firstName", void 0);
__decorate([
    property
], Person.prototype, "salary", void 0);
__decorate([
    __param(0, parameterDecorator),
    __param(1, parameterDecorator)
], Person.prototype, "calculateSalary", null);
const person = new Person();
// set the firstName
person.firstName = 'Haider';
// call the getter
console.log(person.firstName);
