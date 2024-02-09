#HomeRxJS : [[--Contents - RxJS--]]
66. **Module Introduction**
	- Subject
	- BehaviorSubject
	`Subject` is a type in RxJS that acts as both an Observable and an Observer, allowing values to be multicasted to multiple Observers. It serves as a bridge connecting hot and cold Observables, emitting values to subscribers regardless of when they subscribe. `Subject` is commonly used for event handling, data sharing, and creating observable sequences with shared subscriptions.

67. **Multicasting**
	Multicasting with `Subject` in RxJS involves emitting values from a single source to multiple subscribers, ensuring all subscribers receive the same values. This efficient communication mechanism avoids redundant computation or data fetching by sharing a single execution path.

68. **Subject vs Observable vs Observer**
	![[subject vs observable vs observer.png]]

69. **Subject in Action**
	![[subject-in-action.png]]
	``` html
	//Example: index.html
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
	    div class="container">
	    <h2 class="my-3">Subject</h2>
	    
	    <div class="my-4 form-inline">
	      <div class="d-flex">
	        <input id="value-input" class="form-control" type="text" />
	        <button id="emit" class="btn btn-secondary mx-1">
	          Emit
	      </button>
	    </div>
	  </div>
	  
	  <button id="subscribe" class="btn btn-primary">
	    Subscribe
	  </button>
	</div>
	
	<script type="module" src="./index.ts"></script>
	</body>
	</html>
	```
	``` ts
	//Example: index.ts
	import { fromEvent, Subject } from "rxjs";
	import { map } from "rxjs/operators";
	
	const emitButton = document.querySelector("button#emit");
	const inputElement: HTMLInputElement = document.querySelector("#value-input")!;
	const subscribeButton = document.querySelector("button#subscribe");
	
	const value$ = new Subject<string>();
	
	// fromEvent(emitButton!, "click").subscribe(() =>
	//   value$.next(inputElement!.value),
	// );
	
	fromEvent(emitButton!, "click")
	  .pipe(map(() => inputElement.value))
	  .subscribe(value$);
	
	fromEvent(subscribeButton!, "click").subscribe(() => {
	  console.log("New Subscription!");
	  value$.subscribe((value) => console.log(value));
	});
```
	```
	//Output:
	//Once Subscribe button is hit then only other
	//subscription associated with the subject will work
	
	New Subscription!
	typed
	```
70. **BehaviorSubject - Concept**
	`BehaviorSubject` is a type of Subject in RxJS that retains the latest value emitted to subscribers and emits it immediately upon subscription. It's useful for scenarios where subscribers need immediate access to the most recent value, such as managing application state or providing initial values for UI components

71. **BehaviorSubject - In Action**
	![[behavior-subject.png]]
	``` html
	//Example: index.html
	//Add this part in the html file inside the 
	//<body></body> tag
	<nav class="navbar navbar-dark bg-dark">
	      <span class="navbar-brand">Logged in: <span id="logged-in"></span></span>
	    </nav>
	
	    <div class="container">
	      <div class="my-4 form-inline">
	        <button id="login" class="btn btn-primary mr-1">Login</button>
	        <button id="logout" class="btn btn-primary">Logout</button>
	      </div>
	
	      <button id="print-state" class="btn btn-secondary">Print state</button>
	    </div>
	```
	``` ts
	//index.ts
	import { BehaviorSubject, fromEvent, Subject } from "rxjs";
	import { withLatestFrom } from "rxjs/operators";
	const loggedInSpan: HTMLElement = document.querySelector("span#logged-in")!;
	const loginButton: HTMLElement = document.querySelector("button#login")!;
	const logoutButton: HTMLElement = document.querySelector("button#logout")!;
	const printStateButton: HTMLElement =
	  document.querySelector("button#print-state")!;
	
	// const isLoggedIn$ = new Subject<boolean>();
	const isLoggedIn$ = new BehaviorSubject<boolean>(false);
	
	fromEvent(loginButton, "click").subscribe(() => isLoggedIn$.next(true));
	fromEvent(logoutButton, "click").subscribe(() => isLoggedIn$.next(false));
	
	//Navigation bar
	isLoggedIn$.subscribe(
	  (isLoggedIn) => (loggedInSpan.innerText = isLoggedIn.toString()),
	);
	
	//Buttons
	isLoggedIn$.subscribe((isLoggedIn) => {
	  logoutButton.style.display = isLoggedIn ? "block" : "none";
	  loginButton.style.display = !isLoggedIn ? "block" : "none";
	});
	
	fromEvent(printStateButton, "click")
	  .pipe(withLatestFrom(isLoggedIn$))
	  .subscribe(([event, isLoggedIn]) =>
	    console.log("User is logged in: ", isLoggedIn),
	  );
	```
	``` txt
	//Output: isLoggedIn value changes on button click event
	//And prints the respective values on click of print 
	//button
	
	User is logged in:  false
	User is logged in:  true
	```

72. **Module Summary**
	- Subject
	- BehaviorSubject

- ==**Quiz 10: Subjects**==
``` txt
Question 1:
Which is true for a Subject?
Answer: All of the above.
(1.It allows us to call the `next` method on it to emit a value to all active subscriptions.
2.It can be passed as an Observer to the `subscribe` method.
3. We can subscribe to it the same way we can to regular Observables.
4. We can mix it together with other Observables when using combineLatest.)

Question 2:
Which would be a better choice if you'd like to be able to store some value and react to its changes?
Answer: BehaviorSubject

Question 3:
Which would be a better choice to emit events which would trigger a refresh of the data?
Answer: Subject

Question 4:
Which is true for a BehaviorSubject?
Answer: You ALWAYS need to provide some initial value when creating a new BehaviorSubject.
    
- If you don't provide the initial value and subscribe to it, the BehaviorSubject will not emit the initial next notification.
```