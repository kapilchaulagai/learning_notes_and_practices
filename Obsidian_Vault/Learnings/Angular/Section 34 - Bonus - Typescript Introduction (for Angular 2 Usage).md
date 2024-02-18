#HomeAngular - [[--Contents - Angular--]]
490. **Module Introduction**
	- What is TypeScript? And Why Would We Use it?
	- Core Concepts & Types

491. **What & Why?**
	Declare Type

492. **Installing & Using TypeScript**
	- To import empty package.json only: Run `npm init -y`
	- To install typescript into this project: Run `npm install typescript`
	- To run the compiler via typescript: Run `npx tsc`
	- To run the compiler via typescript pointing to a file: Run `npx tsc script.ts`

493. **Base Types & Primitives**
	- Primitives: number, string, boolean, null, undefined and symbols
	- More Complex types: arrays, objects
	- Function types, parameters
``` ts
	//Example: script.ts
	//Primitives: number, string, boolean, null, undefined 
	//and symbols
	let age: number;
	age = 12;
	
	let userName: string;
	userName = "Kapil";
	
	let isLearner: boolean;
	isLearner = true;
	
	//null and undefined have little different use case
```

494. **Arrays & Object Types**
``` ts
	//Example: script.ts
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
```

495. **Type Inference**
``` ts
	//Type Inference
	//course variable below can't take number since the...  
	//..type inferred for the variable is string 

	let course = "React - The Complete Guide";
	
	course = 12341; //Error
	```

496. **Working with Union Types**
``` ts
	//Union Types using pipe (|)
	let course: string | number = "React - The Complete Guide";
	course = 12341;
```

497. **Assigning Type Aliases**
	- We can declare our own type.
``` ts
	//Example: script.ts
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
```

498. **Diving into Functions & Function Types**
``` ts
	//Example: script.ts
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
```

499. **Understanding Generics**
``` ts
	//Example: script.ts
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
```

500. **Classes & TypeScript**
``` ts
	//Example: script.ts
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
```

501. **Working with Interfaces**
``` ts
	//Example: script.ts
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
	  firstName: string;
	  age: number;
	  greet() {
	    console.log("Hello...!!");
	  }
	
	  add() {
	    console.log(5 + 4);
	  }
	}
```

502. **Configuring the TypeScript Compiler**
	- To generate TypeScript `tsConfig.json` file: Run `npx tsc --init`
	- Important option: ` "strict": true` that checks type very strictly

503. **Module Resources**
	Attached, you find the final code snapshot for the demo code shown in this module.
	You can also check out the official TypeScript documentation to
	learn more about TypeScript: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)