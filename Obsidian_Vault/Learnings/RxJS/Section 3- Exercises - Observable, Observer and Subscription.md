#HomeRxJS : [[--Contents - RxJS--]]
20. **Module Introduction**
	- Practice makes perfect!
	- Subscription Lifecycle
	- Teardown Logic
21. **Subscription Lifecycle**
	![[Subscription Lifecycle.png]]
22. **Execution Timing - Empty Observable**
	Non-subscriber part of code inside the Observable gets executed without any delay along with the code flow.
	``` ts
	//Eg, index.ts
	import { Observable, Subscriber } from 'rxjs';
	const observable$ = new Observable(subscriber =>{
	console.log("Inside Observable!!");
	});
	console.log("Before");
	observable$.subscribe();
	console.log("After");
	```
	``` txt
	//Output:
	Before
	Inside Observable!!
	After
	```
23. **Synchronous Emission - Next Notification**
	Non-subscriber and the single subscriber.next()  part of code inside the Observable gets executed without any delay along with the code flow.
	``` ts
	import { Observable, Subscriber } from 'rxjs';
	const observable$ = new Observable(subscriber =>{
	  console.log("Inside Observable!!");
	    subscriber.next('Alice');
	    });
	    console.log("Before");
	    observable$.subscribe(value => console.log(value));
	    console.log("After");
	```
	``` txt
	//Output:
	Before
	Inside Observable!!
	Alice
	After
	```
24. **Asynchronous Emission - More Next Notifications**
	Non-subscriber and the subscriber.next()  part of code inside the Observable gets executed without any delay along with the code flow. But result of  the asynchronous part of the code will be achieved once it is available. Eg in the below code: Charlie
	``` ts
	import { Observable, Subscriber } from 'rxjs';
	const observable$ = new Observable(subscriber =>{
	  console.log("Inside Observable!!");
	    subscriber.next('Alice');
	    subscriber.next('Bob');
	      setTimeout(()=>{
	      subscriber.next('Charlie')}, 2000);
	    });
	    console.log("Before");
	    observable$.subscribe(value => console.log(value));
	    console.log("After");
	```
	``` txt
	//Output:
	Before
	Inside Observable!!
	Alice
	After
	Charlie
	```
25. **Teardown - Complete Notification**
	In this, after the subscriber finishes emitting all the values in next() notification it also emits the complete() notification after which Observable returns the Teardown immediately.
	``` ts
	//Eg, index.ts
	import { Observable, Subscriber } from 'rxjs';
	const observable$ = new Observable(subscriber =>{
		console.log("Inside Observable!!");
		subscriber.next('Alice');
		subscriber.next('Bob');
		setTimeout(()=>{
		    subscriber.next('Charlie');
		    subscriber.complete();
    }, 2000);
    return () => {
	    console.log('Teardown!!');
    }
    });
    
    console.log("Before");
    observable$.subscribe({
	    next : value => console.log(value),
	    complete: () => console.log('Completed!!')
    });
    console.log("After");
	```
	``` txt
	//Output:
	Before
	Inside Observable!!
	Alice
	Bob
	After
	Charlie
	Completed!!
	Teardown!!
	```
26. **Error Notification**
	In this, after the subscriber finishes emitting all the values in next() notification, it also emits the error notification after which Observable returns the Teardown immediately.
	``` ts
	//Eg, index.ts
	import { Observable, Subscriber } from 'rxjs';
	const observable$ = new Observable(subscriber =>{
		console.log("Inside Observable!!");
		subscriber.next('Alice');
		subscriber.next('Bob');
		setTimeout(()=>{
		    subscriber.next('Charlie');
		}, 2000);

		setTimeout(() => {
		subscriber.error(new Error('Failure!!'));
		}, 4000);
		
    return () => {
	    console.log('Teardown!!');
    }
    });
    
    console.log("Before");
    observable$.subscribe({
	    next : value => console.log(value),
	    error: err => console.log(err.message),
	    complete: () => console.log('Completed!!')
    });
    console.log("After");
	```
	``` txt
	//Output:
	Before
	Inside Observable!!
	Alice
	Bob
	After
	Charlie
	Failure!!
	Teardown!!
	```
27. **Full Observer**
	``` ts
	const observer = {
	next: item => console.log(item),
	error: error=> console.log(error),
	complete: () => console.log('Success)
	};
	```
28. **Order**
	![[Order of the Notifications.png]]
	Here, subscriber gets unsubscribed automatically and goes to Teardown state once subscriber catches any error.
``` ts
	//Eg, index.ts
	import { Observable, Subscriber } from 'rxjs';
	const observable$ = new Observable(subscriber =>{
	  console.log("Inside Observable!!");
	  subscriber.next('Alice');
	  subscriber.next('Bob');
	
	  setTimeout(() => {
	    subscriber.error(new Error('Failure!!'));
	  }, 2000);
	
	  setTimeout(()=>{
	    subscriber.next('Charlie');
	    subscriber.complete();
	  }, 4000);
	
	  return () => {
	    console.log('Teardown!!');
	  }
	});
	
	console.log("Before");
	observable$.subscribe({
	  next : value => console.log(value),
	  error: err => console.log(err.message),
	  complete: () => console.log('Completed!!')
	});
	console.log("After");
```
``` txt
	//Output:
	Before
	Inside Observable!!
	Alice
	Bob
	After
	Failure!!
	Teardown!!
```
29. **Cancellation - Unsubscribe**
	The most important thing here is, we need to clearInterval() to take it in to Teardown state even after unsubscribing the subscription.
	![[Cancellation-Unsubscribe.png]]
``` ts
	//Eg, index.ts
	import { Observable, Subscriber } from 'rxjs';
	const interval$ = new Observable<number>(subscriber => {
	  let counter = 1;
	  
	  const intervalId = setInterval( () => {
	    subscriber.next(counter++);
	  }, 2000);
	  
	  return () => {
	    console.log("Teardown!!");
	    clearInterval(intervalId); // cleanup on unsubscribe
	  };
	});
	
	const subscription = interval$.subscribe(value => console.log(value));
	setTimeout(() =>  {
	  console.log("Completed Unsubscribing!!");
	  subscription.unsubscribe()
	}, 7000); // Will stop after 7 seconds</s
```
``` txt
	//Output:
	1
	2
	3
	Completed Unsubscribing!!
	Teardown!!
```
30. **Module Summary**
	- Subscription Lifecycle
	- Teardown Logic
- ==**Quiz3: Subscription Lifecycle**==
	```
	Question 1:
	What are the ways in which a Subscription can end?
	Answer: Both answers are correct.
	(1. It can be ended by the Observable's
	logic by emitting an error or complete notification.
	2. It can be ended by our code by unsubscribing.)
	
	Question 2:
	What is the purpose of the Teardown logic?
	Answer: It can be used to perform a clean-up or cancellation if the
	Observable initialized some resources.

	Question 3:
	Let's assume that an Observable has some Teardown logic provided. When
	will it be executed?
	Answer: Whenever the Subscription ends. (1. Only when the Observable
	emits a complete or error
	notification.
	2. Only after we unsubscribe while the Subscription is still active.)
	```