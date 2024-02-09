#HomeRxJS : [[--Contents - RxJS--]]
31. **Module Introduction**
	- Hot & Cold: 
	- Cold: For each new subscription  the Observable produces the new set of values which are called Cold Observables.
	- Hot: Events
32. **Cold Observable**
	![[Cold Observable.png]]
	- Cold - HTTP Request:
	Each subscription produces value independently from other subscription.
	![[Cold Observable-HTTP.png]]
	Browse: Random Data API
	``` ts
	import { ajax } from "rxjs/ajax";
	const ajax$ = ajax<any>(
	'https://random-dataapi.com/api/name/random_name');
	
	ajax$.subscribe(data => console.log('Sub 1:', data.response.first_name));
	
	ajax$.subscribe(data => console.log('Sub 2:', data.response.first_name));
	ajax$.subscribe(data => console.log('Sub 3:', data.response.first_name));
	```
	``` txt
	//Output:
	Sub1: Mabel
	Sub2: Earleena
	Sub3: Corrina
	```
33. **Hot Observable**
	All subscriptions share the same source.
	![[Hot Observable.png]]
	``` ts
	//Eg, index.ts
	import { Observable } from "rxjs";
	const helloButton = document.querySelector('button#hello');
	const helloClick$ = new Observable<MouseEvent>(subscriber => {
		helloButton.addEventListener('click', (event: MouseEvent) => {
			subscriber.next(event);
			});
		});
	
	helloClick$.subscribe(event => console.log('Sub 1:', event.type, 
		event.x,event.y));
	
	setTimeout(() => {
		console.log('Subscription 2 starts');
	helloClick$.subscribe(event => console.log('Sub 2:', event.type, 
		event.x, event.y));
	}, 5000);
	```
	``` txt
	//Output:
	Subscription 2 starts
	//On every click
	Sub 1: click 180 112
	Sub 2: click 180 112
	```
34. **Hot vs Cold**
	- **Cold**: Produces the data inside and New Subscriber - new Data
	- **Hot**: Multicasts the data from a common source and All subscribers - common data
	- Cold : Eg, Set of values, HTTP Request, Timer/Interval
	- Hot : Eg, DOM Events, State, Subjects
35. **Module Summary**
	- Cold Observables
	- Hot Observables
- ==**Quiz 4: Hot vs Cold**==
	```
	Question 1:
	Each time we subscribe, the Observable generates and emits the same set
	of values instantly and then completes. Which behavior is it?
	Answer: Cold
	
	Question 2:
	We have an Observable which emits an event each time the user resizes the
	browser's window. Which Observable type is it?
	Answer: Hot
	
	Question 3:
	We have an Observable which sends an HTTP request to an external server
	each time we subscribe to it. Which is it?
	Answer: Cold Observable
	
	Question 4:
	An Observable:
	Answer: can change its behavior, for example it can be Cold at first and
	then become Hot
	```