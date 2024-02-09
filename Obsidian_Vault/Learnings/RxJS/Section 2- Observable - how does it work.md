#HomeRxJS : [[--Contents - RxJS--]]
7. **Module Introduction**
	- Stream
	- Observable
	- Subscription
	- Observer
	- Marble Diagrams
	- Notification Types
	
8. **Array vs Stream**
	- What is a stream?
	- Array
	- Stream
	 ![[Array vs Stream.png]]
	 Eg: Mouse Position, Text Input, HTTP Request
	 
9. **Observable, Subscription, Observer - Key Elements**
	- Observable: (Notifications: next, error, complete)
	``` ts
	const observable$ = new Observable(subscriber => {
	subscriber.next('Alice');
	subscriber.next('Ben')});
	```
	- Observer: 
	``` ts
	const observer = {
	next: value => console.log(value)
	};
	```
	- Subscription:
	``` ts
	observable$.subscribe(observer);
	```
	
10. **Warm-up Observable - Observable, Observer, Subscription**
	![[Warmup Observable.png]]
	- new Observable -> Observer: next -> subscribe -> unsubscribe
	``` ts
	//Example
	const observable$ = new Observable(subscriber => {
	 console.log('Obesrvable Executed!!');
	    subscriber.next("Alice");	
	  setTimeout(() => subscriber.next("Ben"),3000)
	  setTimeout(() =>subscriber.next("Mac"), 4000);
	});
	
	const observer = {
	  next: (value:any) => console.log(value),
	};
	
	const subscription = observable$.subscribe(observer);
	setTimeout(() => {
	    console.log('Unsubscribed succecssfully!!');
	    subscription.unsubscribe()
	},3000);
	```
	
11.  **Warm-up Observable - Multiple Subscriptions**
``` ts
	//Example
	const observable$ = new Observable(subscriber => {
	console.log('Obesrvable Executed!!');
	    subscriber.next("Alice");	
	  setTimeout(() => subscriber.next("Ben"),3000)
	  setTimeout(() =>subscriber.next("Mac"), 4000);
	});
	
	const observer = {
	  next: (value:any) => console.log(value),
	};
	
	console.log('Subscription1 Started!!');
	observable$.subscribe((value:any) => console.log('Subscription1: '+value));
	setTimeout(() => {
	 console.log('Subscription2 Started!!');
	 observable$.subscribe((value:any) => console.log('Subscription2: '+value));
	 }, 1000);
```
- **Output:**
	``` txt
	Subscription1 Started!!
	Obesrvable Executed!!
	Subscription1: Alice
	Subscription2 Started!!
	Obesrvable Executed!!
	Subscription2: Alice
	Subscription1: Ben
	Subscription2: Ben
	Subscription1: Mac
	Subscription2: Mac
	```
	
- ==**Quiz1: Observable Basics**==
``` txt
Question 1:
Choose the correct sentence:
Answer: We need to subscribe to an Observable to run its logic.

Question 2:
When we subscribe a few times to the same Observable:
Answer: The logic of the Observable will be run independently for each new Subscription.

Question 3:
What happens each time you subscribe to an Observable?
Answer: Both answers are correct. 
(1. The Observable's logic is executed.
2. The provided Observer is wrapped into a Subscriber object and passed to the Observable's logic.)

Question 4:
When we have an Observable which never ends and keeps emitting the values, how can we make it stop?
Answer: We can unsubscribe.
```

12. **Marbles Introduction**
	Marbles
	
13. **Marbles - Next, Error, Complete**
	 ![[Marbles.png]]
	 
14. **Marbles - Notification Types Summary** 
	 ![[Notification Types.png]]
	 
 15. **Marbles - Incorrect Scenarios**
	![[Marbles Scenarios.png]]
	
16. **Marbles Appearance**
	---A---B--C-----D-----E------> time
	---5---8--5----- -1 ----7------>
	
17. **Marbles Game:**
	Game! What is the source?
	=> Timer/Interval counter
	Eg, --0--1--2--3--4--5--> time
	=> Mouse Move Event/ Text Input Event/ Click on a button
	Eg, --A-B------C-D-E---F-G-H--> time
	=> HTTP Request
	               |
	Eg, -------------- A --------------------------------> time
	               | 
	=> Failed HTTP Request
	Eg, ---------------X----------------------------------> time
	
18. **Marbles Docs**
	Browse: RxJS Marbles
	Browse: RxJS Documentation
	
- ==**Quiz 2: Marble Diagrams and Notification Types**==
	``` txt
	Question 1:
	What is the 'next' notification used for?
	Answer: emitting a value

	Question 2:
	How many values can an Observable emit during the Subscription's lifetime?
	Answer: both answers are correct (1.zero 2.one or more)

	Question 3:
	Is it possible to emit a value after an error
	Answer: No, the error notification signals an issue with the source and causes the
	Subscription to end.

	Question 4:
	What is the purpose of the complete notification?
	Answer: to signal that the Observable has no more data to emit

	Question 5:
	Choose which doesn't apply to both - the error and complete notifications:
	Answer: can carry a payload with it
	(Similarities in error and complete notifications: 
	Option1: can be emitted only once during the Subscription lifetime
	Option2: ends the subscription)
	```
19. Module Summary
	- Streams
	- Creating Observables
	- Subscribing
	- Observer
	- Observable Execution
	- Marble Diagrams
	- Notification Types
