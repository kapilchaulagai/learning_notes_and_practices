#HomeRxJS : [[--Contents - RxJS--]]
36. **Module Introduction**
	- Creation Functions (Creation Operator)
		- of
		- from
		- fromEvent
		- interval/timer
		- forkJoin
		- combineLatest
37. of - How Creation Functions work
	![[of-How Creation Functions work.png]]
	Coding examples below produces the same output:
	``` ts
	//Example 1: Using built-in of()
	import {Observable, of} from 'rxjs';
	of('Alice', 'Ben', 'Charlie').subscribe({
	  next: value => console.log(value),
	  complete: () => console.log('Completed')
	  });
	  
	//Example 2: Regular way of creating Observables
	const name$ = new Observable<string>(subscriber => {
		subscriber.next('Alice');
		subscriber.next('Ben');
		subscriber.next('Charlie');
		subscriber.complete();
	});
	
	name$.subscribe({
	  next: value => console.log(value),  complete: () =>
	  console.log('Completed')
	});

	//Example 3: Creating our own of()
	ourOwnOf('Alice', 'Ben', 'Charlie').subscribe({
	  next: value => console.log(value),
	  complete: () => console.log('Completed')
	});
	
	function ourOwnOf(...args: string[]): Observable<string>{
	  return new Observable<string>(subscriber => {
	      for( let i = 0; i < args.length; i++){
	            subscriber.next(args[i]);
	        }
	        subscriber.complete();
		});
	}
	```
	``` txt
	//Output:
	Alice
	Ben
	Charlie
	Completed
	```
38. **from**
	- from(`[A, B, C])
	- from(Promise)
	- from(...)
	``` ts
	//Example 1: Using from([...])
	import {Observable, from} from 'rxjs';
	from(['Alice', 'Ben', 'Charlie']).subscribe({
	  next: value => console.log(value),
	  complete: () => console.log('Completed')
	});
	```
	``` txt
	//Output:
	Alice
	Ben
	Charlie
	Completed
	```
	``` ts
	//Example 2: Convert Promise into Observable
	const somePromise = new Promise((resolve, reject) => {
		resolve('Resolved');
		  //reject('Rejected!')
	});
	
	const observableFromPromise$ = from(somePromise);
	
	observableFromPromise$.subscribe({
	  next: value => console.log(value),
	  //error: err => console.log(`Error: `, err),
	  complete: () => console.log('Completed')
	});
	```
	```
	//Output:
	// if Rejected()
	Rejected!

	// if Resolved()
	Resolved
	Completed
	```
- ==**Quiz 5: Creation Functions - of, from**==
``` txt
Question 1:
Choose which is true for Creation Functions:
Answer: They allow us to easily create new Observables without repeating
a lot of code.

Question 2:
If you'd create an Observable using `of('Alice', 'Ben', 'Charlie')` and then subscribe to it, how many notifications will be emitted immediately?
Answer: 4 notification(3 next and 1 complete)

Question 3:
What can be the source provided to the `from` function as an argument?
Answer: all answers are correct (an array, a Promise, an Observable)

Question 4:
Let's say we used the `from` function and provided a Promise to it, which got rejected. Then, if we'd subscribe to this Observable, what will our Subscription receive:
Answer: a single error notification with the rejection value as the payload

Question 5:
As in the previous question. We've passed a Promise to the `from` function, but this time the Promise was resolved with a value. If we make a Subscription what notifications will it receive?
Answer: 1 next notification with the resolution value and 1 complete notification
```
39. **fromEvent**
	- DOM EventTarget
	- Node.js EventEmitter
	- jQuery Events
	![[fromEvent.png]]
	In the below code, eventListener created inside the Observable will be listening the event even after unsubscribing the observable. So, to clear the event listener we need to do the removeListener explicitly which is not required when we use the fromEvent() logic.
	``` ts
	//Example:
	import { fromEvent, Observable } from "rxjs";
	const triggerButton = document.querySelector('button#trigger');
	// const subscription = fromEvent<MouseEvent
	//(triggerButton,click').subscribe(
	//   event => console.log(event.type, event.x, event.y)
	// );
	
	const triggerClick$ = new Observable<MouseEvent>(subscriber => {
	  const clickHandlerFn = event => {
	      console.log('Event callback executed');
	      subscriber.next(event);
		};
		triggerButton.addEventListener('click', clickHandlerFn);
		return () => {
	    triggerButton.removeEventListener('click', clickHandlerFn);
	    };
    });
    const subscription = triggerClick$.subscribe(
    event => console.log(event.type, event.x, event.y));
    
    setTimeout(() => {
	    console.log('Unsubscribe');
	    subscription.unsubscribe();
	}, 5000);
	```
	``` txt
	//Output
	//Click event workd until the teardown happens
	Event callback executed
	index.ts:18 click 180 108
	
	Event callback executed
	index.ts:18 click 180 108
	
	Unsubscribe
	```
40. **timer**
	When we use timer() we need not to take it in the teardown compulsorily but when we go with straightforward/regular way then it is required to clearInterval() to take it into the Teardown after unsubscribing.
	``` ts
	import {timer, Observable} from 'rxjs';
	console.log('App Started!');

	const timer$ = new Observable<number>(subscriber => {
	  const timeoutId = setTimeout(() => {
	    console.log('Timeout!');
	    subscriber.next(0)
	    subscriber.complete();
	  }, 2000);
	
	  return clearInterval(timeoutId);
	});
	
	// timer(2000).subscribe({
	//   next: val => console.log(val),
	//   complete: () => console.log('Completed!')  
	// });
	
	const subscription = timer$.subscribe({
	  next: val => console.log(val),
	  complete: () => console.log('Completed!')  
	});
	
	setTimeout(() => {
	  subscription.unsubscribe();
	  console.log('Unsubscribed!');
	}, 1000);
	```
	``` txt
	//Output
	App Started!
	Unsubscribed!
	```
41. **interval**
	``` ts
	import {interval, timer, Observable} from 'rxjs';
	console.log('App Started!');

	const interval$ = new Observable<number>(subscriber => {
	  let counter = 0;
	
	  const intervalId = setInterval(() => {
	    console.log('Timeout!');
	    subscriber.next(counter++)
	    //subscriber.complete();
	  }, 1000);
	
	  return  () => clearInterval(intervalId);
	});
	
	// interval(1000).subscribe({
	//   next: val => console.log(val),
	//   complete: () => console.log('Completed!')  
	// });
	
	const subscription = interval$.subscribe({
	  next: val => console.log(val),
	  complete: () => console.log('Completed!')  
	});
	
	setTimeout(() => {
	  subscription.unsubscribe();
	  console.log('Unsubscribed!');
	}, 5000);
	```
	```
	//Output:
	App Started!
	Timeout!
	0
	Timeout!
	1
	Timeout!
	2
	Timeout!
	3
	Unsubscribed!
	```
- ==**Quiz 6: Creation Functions - fromEvent, timer, interval**==
```
Question 1:
The Observables created using the fromEvent function are Hot. Why is it like this?
Answer: Because they connect to an already existing event source.

Question 2:
Should we unsubscribe to avoid memory leaks from the Observable created using the `timer(2000)` call after it emits a value?
Answer: No, at this point we're sure that the Observable has completed, so there's no need to unsubscribe.

Question 3:
Which are the possible ways of ending a Subscription made to an Observable created using the `interval(1000)` call?    
Answer: We can unsubscribe.
```
42. **Note about ajax() creation function**
	- In the following lecture about the `forkJoin` function we'll use the `ajax<T>(url: string)` function to create an Observable making an HTTP call.

	- More details about how to use it will be covered in the lesson, however please note that in the **most recent version of RxJS** you should provide the type of the response of the ajax call if you're using TypeScript.

	- In other words, **to avoid typing errors** in this coding section you should use:  `const randomName$ = ajax**<any>**('...');`
		instead of
		`const randomName$ = ajax('...');`
		which was used in the video and is no longer valid if you're using TypeScript. For regular JavaScript applications it's still valid.
43. **forkJoin - Handle multiple HTTP calls**
	![[forkJoin.png]]
	``` ts
	//Example: index.ts
	import {ajax} from 'rxjs/ajax';
	import {forkJoin} from 'rxjs';	
	//Eg, Mike is from New Delhi and likes to eat pasta
	
	const randomName$ = ajax('https://random-data-api.com/api/name/random_name');
	
	const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');
	
	const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');
	
	// randomName$.subscribe(ajaxResponse =>
	//console.log(ajaxResponse.response.first_name));
	
	// randomNation$.subscribe(ajaxResponse =>
	//console.log(ajaxResponse.response.capital));
	
	// randomFood$.subscribe(ajaxResponse =>
	//console.log(ajaxResponse.response.dish));
	
	  
	
	forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
	  ([nameAjax, nationAjax, foodAjax]) => 
	  console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`)
	);
	```
	```
	//Output:
	Mike is from New Delhi and likes to eat Sandwich.
	```
44. **forkJoin - Error Scenario**
	![[forkJoin - Error Scenario.png]]
	The Observable fails to produce any value for any input if any one of the Observables in the forkJoin() fails.
	``` ts
	//Example: index.ts
	import {forkJoin, Observable} from 'rxjs';

	const a$ = new  Observable(subscriber => {
	  setTimeout(() => {
	    subscriber.next("A");
	    subscriber.complete()
	  }, 5000);
	
	  return () => {
	    console.log('A teardown'); 
	  }
	});
	
	const b$ = new Observable(subscriber => {
	  setTimeout(() => {
	    subscriber.error('Failure!');
	  }, 3000);
	
	  return () => {
	    console.log('B teardown'); 
	  }
	});
	
	forkJoin([a$, b$]).subscribe({
	  next: value => console.log(value),
	  error: err => console.log('Error: ', err)
	});
	```
	```
	//Output:
	Error:  Failure!
	A teardown
	B teardown
	```
45. **combineLatest - Reacting to multiple input changes**
	CombineLatest wait for at least one value emits from all the Observables to produce the result.
	It emits the array with the latest values from all input Observables each time any of them emits something new.
	``` ts
	//index.html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Temperature Converter</title>
	    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	</head>
	<body>
	    <div class="container">
	        <div class="card my-4">
	            <div class="card-body">
	                <input id="temperature-input" class="form-control" placeholder="Temperature">
	                <br>
	                <select id="conversion-dropdown" class="form-control">
	                    <option value="">Choose conversion</option>
	                    <option value="f-to-c">°F -> °C</option>
	                    <option value="c-to-f">°C -> °F</option>
	                </select>
	                <br>
	                <p class="card-text" id="result-text">Please fill the above form</p>
	            </div>
	        </div>
	    </div>
	
	    <!-- Add your TypeScript script tag here -->
	    <script type="module" src="./index.ts"></script>
	</body>
	</html>

	//index.ts
	import {combineLatest, fromEvent} from 'rxjs';
	const temperatureInput = document.getElementById('temperature-input') as HTMLInputElement;
	const conversionDropdown = document.getElementById('conversion-dropdown') as HTMLSelectElement;
	const resultText = document.getElementById('result-text');
	
	
	const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
	const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');
	
	combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
	    ([temperatureInputEvent, conversionInputEvent]) => {
	        const temperature = Number((temperatureInputEvent.target as HTMLInputElement)['value']);
	        const conversionTo = (conversionInputEvent.target as HTMLSelectElement)['value'];
	        let result : Number = 0;
	        if(conversionTo === 'f-to-c'){
	            result = (temperature -32) * 5/9
	        }
	        else if(conversionTo === 'c-to-f'){
	            result = (temperature * 9/5) + 32;
	        }
	
	        if(resultText)
	            resultText.innerText  = String(result);
	    }
	);
```
``` json
	//package.json
	{
	  "name": "rxjs",
	  "version": "1.0.0",
	  "description": "",
	  "scripts": {
	    "start": "(npx parcel  ./index.html) & npx parcel watch ./index.html"
	  },
	  "author": "Kapil Chaualgai",
	  "license": "ISC",
	  "dependencies": {
	    "prettier": "^3.2.5",
	    "rxjs": "^7.8.1",
	    "typescript": "^5.3.3"
	  },
	  "devDependencies": {
	    "parcel": "^2.11.0"
	  }
	}
	
	//tsconfig.json
	{
	  "compilerOptions": {
	    /* Language and Environment */
	    "target": "es2016",                                  /* Set the JavaScript language 
	    /* Modules */
	    "module": "commonjs",                                /* Specify what module code is generated. */
	    "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
	    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
	    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
	    /* Type Checking */
	    "strict": true,                                      /* Enable all strict type-checking options. */
	    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
	  }
	}
	```
	``` txt
	//Output: In the UI that converts degree F to degree C or vice versa for given input temperature
	```
- ==**Quiz 7: Creation Functions - forkJoin, combineLatest**==
``` txt
Question 1:
Which is correct for both forkJoin and combineLatest?
Answer: They accept an array of Observables as input.

Question 2:
What would an Observable created using `forkJoin([of('ABC'), timer(1000)])` emit once we subscribe to it?
Answer: It'd emit an array with the value 'ABC' and the value 0, one second after subscribing.

Question 3:
What would an Observable created using `forkJoin([of('ABC'), interval(1000)])` emit once we subscribe to it?
Answer: It won't emit anything as the second provided Observable never completes.

Question 4:
What would an Observable created using `combineLatest([of('ABC'), interval(1000)])` emit once we subscribe to it?
Answer: It'd emit an array with the value 'ABC' and the value of the interval counter every second.
```
46. **Module Summary**
	- Instead of Regular Observable, use:
		of('Alice', 'Ben', 'Charlie')
		from(`['Alice', 'Ben', 'Charlie']`)
	- Promise -> Observable
	- Event -> Observable
	- interval/timer
	- forkJoin
	- combineLatest