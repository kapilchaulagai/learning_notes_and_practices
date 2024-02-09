// document.addEventListener("DOMContentLoaded", function() {
//     const button = document.getElementById("myButton") as HTMLButtonElement;

import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

//import { filter, map, of, tap } from "rxjs";

//     button.addEventListener("click", function() {
//         alert("Button clicked!");
//     });
// });

// of('Alice', 'Ben', 'Charlie').subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });

// const name$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next('Ben');
//   subscriber.next('Charlie');
//   subscriber.complete();
// });

// name$.subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });

// ourOwnOf('Alice', 'Ben', 'Charlie').subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });

// function ourOwnOf(...args: string[]): Observable<string>{
//   return new Observable<string>(subscriber => {
//     for( let i = 0; i < args.length; i++){
//       subscriber.next(args[i]);
//     }
//     subscriber.complete();
//   });
// }

///////////////////////////////////////////////////////////////
// //Using from([...])
// from(['Alice', 'Ben', 'Charlie']).subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });

// //Convert Promise into Observable
// const somePromise = new Promise((resolve, reject) => {
//   //resolve('Resolved');
//   reject('Rejected!')
// });

// const observableFromPromise$ = from(somePromise);

// observableFromPromise$.subscribe({
//   next: value => console.log(value),
//   error: err => console.log(`Error: `, err),
//   complete: () => console.log('Completed')
// });

/////////////////////////////////////////////////////////////////////
// console.log('App Started!');

// const timer$ = new Observable<number>(subscriber => {
//   const timeoutId = setTimeout(() => {
//     console.log('Timeout!');
//     subscriber.next(0)
//     subscriber.complete();
//   }, 2000);

//   return clearInterval(timeoutId);
// });

// // timer(2000).subscribe({
// //   next: val => console.log(val),
// //   complete: () => console.log('Completed!')
// // });

// const subscription = timer$.subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed!')
// });

// setTimeout(() => {
//   subscription.unsubscribe();
//   console.log('Unsubscribed!');
// }, 1000);

///////////////////////////////////////////////////////////////////////
// console.log('App Started!');

// const interval$ = new Observable<number>(subscriber => {
//   let counter = 0;

//   const intervalId = setInterval(() => {
//     console.log('Timeout!');
//     subscriber.next(counter++)
//     //subscriber.complete();
//   }, 1000);

//   return  () => clearInterval(intervalId);
// });

// // interval(1000).subscribe({
// //   next: val => console.log(val),
// //   complete: () => console.log('Completed!')
// // });

// const subscription = interval$.subscribe({
//   next: val => console.log(val),
//   complete: () => console.log('Completed!')
// });

// setTimeout(() => {
//   subscription.unsubscribe();
//   console.log('Unsubscribed!');
// }, 5000);

////////////////////////////////////////////////////////////////
// //Mike is from New Delhi and likes to eat pasta
// const randomName$ = ajax('https://random-data-api.com/api/name/random_name');

// const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');

// const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

// randomName$.subscribe(ajaxResponse => console.log(ajaxResponse.response));
// randomNation$.subscribe(ajaxResponse => console.log(ajaxResponse.response));
// randomFood$.subscribe(ajaxResponse => console.log(ajaxResponse.response));

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameAjax, nationAjax, foodAjax]) => console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`));

///////////////////////////////////////////////////////////////////////////////////////////////
// const a$ = new  Observable(subscriber => {
//   setTimeout(() => {
//     subscriber.next("A");
//     subscriber.complete()
//   }, 5000);

//   return () => {
//     console.log('A teardown');
//   }
// });

// const b$ = new Observable(subscriber => {
//   setTimeout(() => {
//     subscriber.error('Failure!');
//   }, 3000);

//   return () => {
//     console.log('B teardown');
//   }
// });

// forkJoin([a$, b$]).subscribe({
//   next: value => console.log(value),
//   error: err => console.log('Error: ', err)
// });

//////////////////////////////////////////////////////////////////////////////////////
// const temperatureInput = document.getElementById('temperature-input') as HTMLInputElement;
// const conversionDropdown = document.getElementById('conversion-dropdown') as HTMLSelectElement;
// const resultText = document.getElementById('result-text');

// const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
// const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');

// combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
//     ([temperatureInputEvent, conversionInputEvent]) => {
//         const temperature = Number((temperatureInputEvent.target as HTMLInputElement)['value']);
//         const conversionTo = (conversionInputEvent.target as HTMLSelectElement)['value'];
//         let result : Number = 0;
//         if(conversionTo === 'f-to-c'){
//             result = (temperature -32) * 5/9
//         }
//         else if(conversionTo === 'c-to-f'){
//             result = (temperature * 9/5) + 32;
//         }

//         if(resultText)
//             resultText.innerText  = String(result);
//     }
// );

////////////////////////////////////////////////////////////////////
// interface NewsItem{
//     category: 'Business' | 'Sports';
//     content: string;
// }

// const newsFeed$ = new Observable<NewsItem>(subscriber => {
//     setTimeout(() => subscriber.next({
//         category: 'Business', content: 'A'
//     }), 1000);

//     setTimeout(() => subscriber.next({
//         category: 'Sports', content: 'B'
//     }), 3000);

//     setTimeout(() => subscriber.next({
//         category: 'Business', content: 'C'
//     }), 4000);

//     setTimeout(() => subscriber.next({
//         category: 'Sports', content: 'D'
//     }), 6000);

//     setTimeout(() => subscriber.next({
//         category: 'Business', content: 'E'
//     }), 7000);
// });

// const sportsNewsFeed$ = newsFeed$.pipe(
//     filter((item:NewsItem) => item.category ==='Sports')
// );

// sportsNewsFeed$.subscribe(
//     item => console.log(item)
// );

///////////////////////////////////////////////////////////////////////////
// //Mike is from New Delhi and likes to eat pasta
// const randomFirstName$ = ajax<any>('https://random-data-api.com/api/name/random_name').pipe(
//     map(ajaxResponse => ajaxResponse.response.first_name)
// );

// const randomCapital$ = ajax<any>('https://random-data-api.com/api/nation/random_nation').pipe(
//     map(ajaxResponse => ajaxResponse.response.capital)
// );

// const randomDish$ = ajax<any>('https://random-data-api.com/api/food/random_food').pipe(
//     map(ajaxResponse => ajaxResponse.response.dish)
// );

// // randomFirstName$.subscribe(value => console.log(value));
// // randomCapital$.subscribe(value => console.log(value));
// // randomDish$.subscribe(value => console.log(value));

// forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
//   ([firstName, capital, dish]) => console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`));

//////////////////////////////////////////////////////////////////////////////////////////////
// of(1, 2, 3, 4)
//   .pipe(
//     filter((value) => value > 2),
//     tap({
//       //Anything performed inside tap doesn't change anything in notification and won't work until we subscribe it
//       next: (value) => console.log(`Value : ${value}`),
//     }),
//     map((value) => value * 2),
//   )
//   .subscribe((value) => console.log(value));

/////////////////////////////////////////////////////////////////////////////////////////////
// const sliderInput = document.querySelector("input#slider");

// if (sliderInput) {
//   fromEvent(sliderInput, "input")
//     .pipe(
//       debounceTime(2000),
//       map((event: Event) => (event.target as HTMLInputElement).value),
//     )
//     .subscribe((value) => {
//       console.log(value);
//     });
// }

// const failingHttpRequest$ = new Observable((subscriber) => {
//   setTimeout(() => subscriber.error(new Error("Timeout!!")), 3000);
// });

// console.log("App Started!");

// failingHttpRequest$.pipe(catchError(() => EMPTY)).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("Completed!"),
// });

////////////////////////////////////////////////////////////////////////////////////////////
// const source$ = new Observable((subscriber) => {
//   setTimeout(() => subscriber.next("A"), 2000);
//   setTimeout(() => subscriber.next("B"), 5000);
// });

// console.log("App has started!");
// source$
//   .pipe(concatMap((value) => of(1, 2)))
//   .subscribe((value) => console.log(value));

//////////////////////////////////////////////////////////////////////////////////
// const endpointInput: HTMLInputElement =
//   document.querySelector("input#endpoint")!;

// const fetchButton = document.querySelector("button#fetch");

// if (fetchButton) {
//   fromEvent(fetchButton, "click")
//     .pipe(
//       map(() => endpointInput.value),
//       concatMap((value) =>
//         ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
//           catchError((err) => of(`Could not fetch data: ${err}`)),
//         ),
//       ),
//     )
//     .subscribe({
//       next: (value) => console.log(value),
//       error: (err) => console.log("Error:", err),
//       complete: () => console.log("Completed!"),
//     });
// }

///////////////////////////////////////////////////////////////////////////////////////////
// const emitButton = document.querySelector("button#emit");
// const inputElement: HTMLInputElement = document.querySelector("#value-input")!;
// const subscribeButton = document.querySelector("button#subscribe");

// const value$ = new Subject<string>();

// // fromEvent(emitButton!, "click").subscribe(() =>
// //   value$.next(inputElement!.value),
// // );

// fromEvent(emitButton!, "click")
//   .pipe(map(() => inputElement.value))
//   .subscribe(value$);

// fromEvent(subscribeButton!, "click").subscribe(() => {
//   console.log("New Subscription!");
//   value$.subscribe((value) => console.log(value));
// });

////////////////////////////////////////////////////////////////////////////////////////////
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
