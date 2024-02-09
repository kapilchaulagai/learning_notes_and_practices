#HomeRxJS : [[--Contents - RxJS--]]
1. Course Introduction
	Getting Started
2. RxJS Overview(Ver. 7.0.0)
	RxJS: Reactive Extensions For JavaScript
3. Quick Start
	Observable: Consume Data and Handle Error
``` ts
//index.html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
<div class="container">
  <h2 class="my-4">Quick Start</h2>
</div>

//index.ts
import { name$, storeDataOnServer, storeDataOnServerError } from './external';
//name$.subscribe((value) => console.log(value));
storeDataOnServerError('Some Value').subscribe({
    next: value => console.log(value),
    error: err => console.log('Error when saving: ', err.message)
}
);

//external.ts
import { Observable, of } from "rxjs";
export const name$ = of('Alice', 'Ben', 'Charlie');
export function storeDataOnServer(data: string): Observable<string> {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.next(`Saved successfully: ${data}`);
      subscriber.complete();
    }, 5000);
  });
} 
export function storeDataOnServerError(data: string): Observable<string> {
  return new Observable(subscriber => {
    setTimeout(() => {
      subscriber.error(new Error('Failure!'));
    }, 5000);
  });
}

//package.json
{
    "name": "typescript-5i4anz",
    "version": "0.0.0",
    "private": true,
    "dependencies": {
      "rxjs": "7.0.0-rc.3"
    }
  }
```
4. Optional: Using your own IDE
5. Course Plan
	- Observables
	- Subscriptions
	- Observers
	- Creation Functions
	- Pipeable Operators
	- Subjects
1. Learning Tips 
	How to learn fastest?
	- Watch Carefully
	- Rewind/Pause
	- Code along
	- Experiment
	- Projects
	- Docs and Articles
	- Quizzes
	- Q&A