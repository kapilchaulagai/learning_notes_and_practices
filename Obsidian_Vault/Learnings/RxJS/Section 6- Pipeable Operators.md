#HomeRxJS : [[--Contents - RxJS--]]
47. **Module Introduction**
	Pipeable operators
	What are they for?
	How they work?
	- filter
	- map
	- tap
	- debounceTime
	- catchError
	- concat/switch/mergeMap
	
48. **Operator Stack**
	![[Operator Stacking.png]]
	
49. **Importing Operators**
	- In the videos in this section, the Pipeable Operators are imported from `"rxjs/operators"`, for example: `import { filter } from "rxjs/operators";`
	- Starting from **RxJS v7.2.0** you can import the operators directly from the top level (from `"rxjs"`), for example: `import { filter } from "rxjs";`
	- Thanks to this, you can keep all your RxJS-related imports together: `import { filter, Observable, Subscription } from "rxjs";`
	- The original way of importing operators still works, but will be deprecated in the future.
	
50. **filter**
	![[filter.png]]
	filter inside pipe returns a new Observable based on the filter provided but won't impact on the original Observable.
	``` ts
	//Eg, index.ts
	import {filter} from 'rxjs/operators';
	import {Observable} from 'rxjs';

	interface NewsItem{
	    category: 'Business' | 'Sports';
	    content: string;
	}
	
	const newsFeed$ = new Observable<NewsItem>(subscriber => {
	    setTimeout(() => subscriber.next({
	        category: 'Business', content: 'A'
	    }), 1000);
	
	    setTimeout(() => subscriber.next({
	        category: 'Sports', content: 'B'
	    }), 3000);
	
	    setTimeout(() => subscriber.next({
	        category: 'Business', content: 'C'
	    }), 4000);
	
	    setTimeout(() => subscriber.next({
	        category: 'Sports', content: 'D'
	    }), 6000);
	
	    setTimeout(() => subscriber.next({
	        category: 'Business', content: 'E'
	    }), 7000);
	});
	
	const sportsNewsFeed$ = newsFeed$.pipe(
	    filter((item:NewsItem) => item.category ==='Sports')
	);
	
	sportsNewsFeed$.subscribe(
	    item => console.log(item)   
	);
	```
	``` txt
	//Output:
	{ category: 'Sports', content: 'B' }
	{ category: 'Sports', content: 'D' }
	```

51. **map**
	![[map.png]]
	``` ts
	import {map} from 'rxjs/operators';
	import {forkJoin, } from 'rxjs';
	import {ajax} from 'rxjs/ajax';

	const randomFirstName$ = ajax<any>('https://random-data-api.com/api/name/random_name').pipe(
	    map(ajaxResponse => ajaxResponse.response.first_name)
	);
	
	const randomCapital$ = ajax<any>('https://random-data-api.com/api/nation/random_nation').pipe(
	    map(ajaxResponse => ajaxResponse.response.capital)
	);
	
	const randomDish$ = ajax<any>('https://random-data-api.com/api/food/random_food').pipe(
	    map(ajaxResponse => ajaxResponse.response.dish)
	);
	
	// randomFirstName$.subscribe(value => console.log(value));
	// randomCapital$.subscribe(value => console.log(value));
	// randomDish$.subscribe(value => console.log(value));
	
	forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
	  ([firstName, capital, dish]) => console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`));
	```
	``` txt
	//Output:
	Dwayne is from Jakarta and likes to eat Vegetable Soup.
	```
	
52. **tap**
	In RxJS, `tap` is an operator used to perform side effects with observable sequences, without modifying the elements emitted by the observable. It allows you to perform actions such as logging, modifying external state, or triggering other side effects based on the emissions of the observable.
	![[tap.png]]
	``` ts
	import { filter, map, of, tap } from "rxjs";

	of(1, 2, 3, 4)
	  .pipe(
	    filter((value) => value > 2),
	    tap({
	      //Anything performed inside tap doesn't change anything in notification and won't work until we subscribe it
	      next: (value) => console.log(`Value : ${value}`),
	    }),
	    map((value) => value * 2),
	  )
	  .subscribe((value) => console.log(value));
	```
	``` txt
	//Output:
	Value : 3
	6
	Value : 4
	8
	```
	
53. **Learn More: tap**
	If you want to learn more about the `tap()` operator, including the changes introduced in **RxJS 7.3.0**, please check this article:
	[Medium: Information is King — tap() — how to console.log in RxJS](https://medium.com/@jaywoz/information-is-king-tap-how-to-console-log-in-rxjs-7fc09db0ad5a)
	
54. **debounceTime**
	`debounceTime` in RxJS is a function that delays the emissions from a source Observable until a specified time has passed without any new emissions. It's commonly used to handle scenarios such as user input where you want to wait for a pause in activity before taking action. When an item is emitted, `debounceTime` starts a timer, and if another item is emitted within the specified time interval, the timer resets. Once the timer expires with no new emissions, the last emitted item is forwarded to the output Observable. This helps in reducing unnecessary processing or handling of rapid and potentially redundant events.
	![[debounceTime.png]]
	``` html
	//index.html
	<!doctype html>
	<html lang="en">
	  <head>
	    <meta charset="UTF-8" />
	    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	    <title>Temperature Converter</title>
	    <link
	      rel="stylesheet"
	      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
	  </head>
	  <body>
	    <div class="container">
	      <div class="my-4 form-inline d-flex justify-content-center">
	        <div>
	          <input
	            id="slider"
	            class="form-control"
	            type="range"
	            min="0"
	            max="100" />
	        </div>
	      </div>
	      <div class="card my-4">
	        <div class="card-body">
	          <input
	            id="temperature-input"
	            class="form-control"
	            placeholder="Temperature" />
	          <br />
	          <select id="conversion-dropdown" class="form-control">
	            <option value="">Choose conversion</option>
	            <option value="f-to-c">°F -> °C</option>
	            <option value="c-to-f">°C -> °F</option>
	          </select>
	          <br />
	          <p class="card-text" id="result-text">Please fill the above form</p>
	        </div>
	      </div>
	    </div>
	
	    <!-- Add your TypeScript script tag here -->
	    <script type="module" src="./index.ts"></script>
	  </body>
	</html>
	```
	``` ts
	//index.ts
	import { fromEvent } from "rxjs";
	import { map } from "rxjs/operators";
	
	const sliderInput = document.querySelector("input#slider");
	
	if (sliderInput) {
	  fromEvent(sliderInput, "input")
	    .pipe(
	      debounceTime(2000),
	      map((event: Event) => (event.target as HTMLInputElement).value),
	    )
	    .subscribe((value) => {
	      console.log(value);
	    });
	}
	```
	``` txt
	//Output: Returns latest value after settling down the event for given interval( in milliseconds)
	100
	```
55. **catchError**
	`   catchError` in RxJS intercepts errors emitted by an Observable stream, enabling graceful error handling without terminating the stream. It allows you to recover from errors by returning a new Observable or rethrowing a different error. This operator is essential for maintaining the continuity of Observable chains, preventing errors from propagating to subscribers. With `catchError`, you can implement robust error handling strategies within reactive programming workflows.
	![[catchError.png]]
	``` ts
	//Example: index.ts
	import { of, Observable } from "rxjs";
	import { catchError } from "rxjs/operators";
	
	const failingHttpRequest$ = new Observable((subscriber) => {
	  setTimeout(() => subscriber.error(new Error("Timeout!!")), 3000);
	});
	
	console.log("App Started!");
	
	failingHttpRequest$
	  .pipe(catchError((err) => of("Fallback value!!")))
	  .subscribe((value) => console.log(value));
	```
	``` txt
	//Output:
	App Started!
	Fallback value!!
	```
	- EMPTY:
		![[catchError(EMPTY).png]]
		``` ts
		//Example: index.ts
		import { of, Observable } from "rxjs";
		import { catchError } from "rxjs/operators";
	
		const failingHttpRequest$ = new Observable((subscriber) => {
		  setTimeout(() => subscriber.error(new Error("Timeout!!")), 3000);
		});
		
		console.log("App Started!");
		
		failingHttpRequest$.pipe(catchError(() => EMPTY)).subscribe({
		  next: (value) => console.log(value),
		  complete: () => console.log("Completed!"),
		});
		```
		``` txt
		//Output:
		App Started!
		Completed!
		```
- ==**Quiz 8: Pipeable Operators**==
	``` txt
	Question 1:
	How many operators can you apply using the pipe method on the Observable?
	Answer: any number
	
	Question 2:
	Which is correct?
	Answer: Applying a Pipeable Operator creates a new Observable with some additional logic.
	
	Question 3:
	Which can be accomplished by using the Pipeable Operators?
	- mapping the values of next notifications
	- debouncing the values in time
	- providing a fallback Observable in case of an error
     Answer: all of the above
     
     Question 4:
     How does the `tap` operator transform the notifications?
     Answer: It doesn't transform notifications of any type.
     
     Question 5:
     If we use a catchError operator applied like this: catchError(() =>
     fallbackObservable$), when will it subscribe to the
     fallbackObservable$?
     Answer: 
	```
56. **Flattening Operators**
	RxJS flattening operators (`mergeMap`, `switchMap`, `concatMap`, `exhaustMap`) transform emitted items into Observables, managing asynchronous operations concurrently or sequentially. They handle scenarios involving nested Observables, like HTTP requests or user input, by flattening the resulting Observables into a single stream. Operators vary in how they handle new emissions during ongoing operations, providing flexibility based on concurrency needs and emission handling preferences.
	- concatMap
	- switchMap
	- mergeMap
	- exhaustMap
	![[flattening operators.png]]
57. **Flattening Operators - Static Example**
	![[flattening concatMap.png]]
	``` ts
	//Example: index.ts
	import { of, Observable } from "rxjs";
	import { concatMap } from "rxjs/operators";
	
	const source$ = new Observable((subscriber) => {
	  setTimeout(() => subscriber.next("A"), 2000);
	  setTimeout(() => subscriber.next("B"), 5000);
	});
	
	console.log("App has started!");
	source$
	  .pipe(concatMap((value) => of(1, 2)))
	  .subscribe((value) => console.log(value));
```
	``` txt
	//Output:
	1
	2
	1
	2
	```

58. **Flattening Operators - Dynamic HTTP Request**
	![[flattening dynamic http.png]]
	``` html
	//Add inside <body></body> tag in: index.html
	<div class="d-flex">
        <input id="endpoint" class="form-control" type="text" />
        <button id="fetch" class="btn btn-primary mx-1">Fetch</button>
      </div>
	```
	``` ts
	//Example: index.ts
	import { fromEvent } from "rxjs";
	import { concatMap, map } from "rxjs/operators";
	import { ajax } from "rxjs/ajax";

	const endpointInput: HTMLInputElement =
	  document.querySelector("input#endpoint")!;
	
	const fetchButton = document.querySelector("button#fetch");
	
	if (fetchButton) {
	  fromEvent(fetchButton, "click")
	    .pipe(
	      map(() => endpointInput.value),
	      concatMap((value) =>
	        ajax(`https://random-data-api.com/api/${value}/random_${value}`),
	      ),
	    )
	    .subscribe((value) => console.log(value));
	}
	```
	``` txt
	//Output:
	//when input is name it produces json response from the api random_name
	{...}
	
	//when input is nation it produces json response from the api random_nation
	{...}
	
	//when input is food it produces json response from the api random_food
	{...}
	```

59. **Flattening Operators - Error Handling - First Solution**
	In this error handling technique, even though we handle error the outer Observable is also going to complete state and going to Teardown state because of which it is not working in next attempt of subscribing Observable.

	So, the proper solution will be given in the follow us lecture.
	![[flatteningMap concatMap-catchError.png]]
	``` html
	//Add inside <body></body> tag in: index.html
	<div class="d-flex">
        <input id="endpoint" class="form-control" type="text" />
        <button id="fetch" class="btn btn-primary mx-1">Fetch</button>
      </div>
	```
	``` ts
	//Example: index.ts
	import { EMPTY, fromEvent } from "rxjs";
	import { catchError, concatMap, map } from "rxjs/operators";
	import { ajax } from "rxjs/ajax";
	
	const endpointInput: HTMLInputElement =
	  document.querySelector("input#endpoint")!;
	
	const fetchButton = document.querySelector("button#fetch");
	
	if (fetchButton) {
	  fromEvent(fetchButton, "click")
	    .pipe(
	      map(() => endpointInput.value),
	      concatMap((value) =>
	        ajax(`https://random-data-api.com/api/${value}/random_${value}`),
	      ),
	      catchError(() => EMPTY),
	    )
	    .subscribe({
	      next: (value) => console.log(value),
	      error: (err) => console.log("Error:", err),
	      complete: () => console.log("Completed!"),
	    });
	}
	```
	```
	//Output:
	//if non-existing api_url is give and got an error
	Completed!
	```
	
60. **Flattening Operators - Error Handling - Second Solution**
	In this solution, error is handled and even though error has been caught the subscription works for the Observable further without any impact.
	![[Flattening concatMap-catchError -2.png]]
	``` html
	//Add inside <body></body> tag in: index.html
	<div class="d-flex">
        <input id="endpoint" class="form-control" type="text" />
        <button id="fetch" class="btn btn-primary mx-1">Fetch</button>
      </div>
	```
	``` ts
	//Example: index.ts
	import { of, fromEvent } from "rxjs";
	import { catchError, concatMap, map } from "rxjs/operators";
	import { ajax } from "rxjs/ajax";
	
	const endpointInput: HTMLInputElement =
	  document.querySelector("input#endpoint")!;
	
	const fetchButton = document.querySelector("button#fetch");
	
	if (fetchButton) {
	  fromEvent(fetchButton, "click")
	    .pipe(
	      map(() => endpointInput.value),
	      concatMap((value) =>
	        ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
	          catchError((err) => of(`Could not fetch data: ${err}`)),
	        ),
	      ),
	    )
	    .subscribe({
	      next: (value) => console.log(value),
	      error: (err) => console.log("Error:", err),
	      complete: () => console.log("Completed!"),
	    });
	}
	```
61. **Flattening Operators - Concurrency - concatMap**
	Everything we've seen far is same for every flattening operators except concurrency.
	
	concatMap responds the subscription values one after another in the queue and it makes sure that first value has been emitted before emitting second.
	![[concatMap-concurrency.png]]
62. **Flattening Operators - switchMap**
	**switchMap** is an RxJS operator that transforms each item emitted by a source Observable into a new Observable. It then subscribes to the latest inner Observable and emits its values, cancelling any previous inner Observables. This operator is useful for scenarios like handling user input or HTTP requests, where only the result of the latest operation is needed, discarding previous operations.
	![[flattening-switchMap.png]]
63. **Flattening Operators mergeMap**
	`mergeMap` is an RxJS operator that transforms each item emitted by a source Observable into a new Observable. It subscribes to all inner Observables concurrently, merging their emissions into a single Observable stream. This operator is suitable for scenarios where concurrent processing of multiple asynchronous tasks is required, such as making multiple HTTP requests simultaneously.
	![[flattening-mergeMap.png]]

64. **Flattening Operators -Side by Side Comparison**
	![[flattening-operators - comparinson.png]]
- ==**Quiz 9: Pipeable Operators - Flattening Operators**==
	``` txt
	Question 1:
	Which can be achieved by using a Flattening Operator
	such as concat/switch/mergeMap?
	Answer: All of the above.
	(1. Storing some data on a server, each time the user
	changes some setting. 
	2. Fetching autocomplete ideas based on the user's
	search input query.
	3. Mapping each emitted value to a new Observable.)
	
	Question 2:
	How does a Flattening Operator such as
	concat/switch/mergeMap work?
	Answer: It maps each value into a new Observable, 
	creates a Subscription to this Observables and then
	passes the values emitted by it to the output.
	
	Question 3:
	Which notifications coming from the Inner Observable
	does a Flattening Operator pass to the output?
	Answer: next and error notifications
	
	Question 4:
	What will happen if the Inner Observable passed to a
	concat/switch/mergeMap operator emits an error?
	Answer: This error will be passed to the output and the
	Outer Subscription will error as well.
	
	Question 5:
	Which is true for the concatMap operator?
	Answer: It waits until the Subscription handling the
	previous value completes before starting a new one.
	
	Question 6:
	Which is true for the switchMap operator?
	It cancels the previous Inner Subscription and starts a
	new one right away.
	
	Question 7:
	Which is true for the mergeMap operator?
	Answer: It concurrently handles all the values.
	```
65. **Module Summary**
	- Transforming
	- Filtering
	- Mapping
	- Debugging
	- Improve Performance
	- Error Handling
	- Flattening Operators
	- Operator Stacking
