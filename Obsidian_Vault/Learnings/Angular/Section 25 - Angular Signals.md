#HomeAngular - [[--Contents - Angular--]]
359. **Module Introduction**
	- A Different Way Of Detecting Changes
	- What & Why?
	- Creating & Using Signals
	- Updating Signal Values

360. **Signals: What & Why?**
	- Signal vs "Classic Change Detection" ![[signals.png]]

361. **Creating a New Signal**
362. **Updating a Signal Value**
363. **Reading & Outputting a Signal Value**
	- Example:
``` ts
	//signal.component.ts
	@Component({
	  selector: 'app-signals',
	  templateUrl: './signals.component.html',
	  standalone: true,
	  imports: [NgFor],
	})
	export class SignalsComponent {
	  actions: string[] = [];
	  counter = signal(0);
	
	  increment() {
	    this.counter.update((oldCounter) => oldCounter + 1);
	    this.actions.push('INCREMENT');
	  }
	
	  decrement() {
	    this.counter.update((oldCounter) => oldCounter - 1);
	    this.actions.push('DECREMENT');
	  }
	}
	
	//signal.component.html
	<h1>Signals (Signals Change Detection)</h1>
	
	<div id="counter">
	  <p id="counter-output">Counter: {{ counter() }}</p>
	  <div id="counter-btns">
	    <button (click)="decrement()">Decrement</button>
	    <button (click)="increment()">Increment</button>
	  </div>
	</div>
	
	<h2>Action Log</h2>
	<ol id="log">
	  <li *ngFor="let action of actions">{{ action }}</li>
	</ol>
```

364. **Signal Updating: Set(), update() & mutate()**
	- Example:
``` ts
	//signals.component.ts
	@Component({
	  selector: 'app-signals',
	  templateUrl: './signals.component.html',
	  standalone: true,
	  imports: [NgFor],
	})
	export class SignalsComponent {
	  //actions: string[] = [];
	  actions = signal<string[]>([]);
	  counter = signal(0);
	
	  increment() {
	    //this.counter.update((oldCounter) => oldCounter + 1);
	    this.counter.set(this.counter() + 1);
	    this.actions.update((oldActions) => [...oldActions, 'INCREMENT']); //Don't use push with update
	    //this.actions.push('INCREMENT');
	  }
	
	  decrement() {
	    //this.counter.update((oldCounter) => oldCounter - 1);
	    this.counter.set(this.counter() - 1);
	    this.actions.mutate((oldActions) => oldActions.push('DECREMENT'));
	    //this.actions.push('DECREMENT');
	  }
	}
	
	//signals.component.html
	<h1>Signals (Signals Change Detection)</h1>

	<div id="counter">
	  <p id="counter-output">Counter: {{ counter() }}</p>
	  <div id="counter-btns">
	    <button (click)="decrement()">Decrement</button>
	    <button (click)="increment()">Increment</button>
	  </div>
	</div>
	
	<h2>Action Log</h2>
	<ol id="log">
	  <li *ngFor="let action of actions()">{{ action }}</li>
	</ol>
```

365. **Important: Signals are NOT Finished Yet!**
	- New Features are coming up!! i.e, RFC.

366. **Signals: What's To Come?**
	- As mentioned, the "Angular Signals" feature is **not finished** yet!
	- Whilst the foundation (creating signals, reading signals, updating signals) is fully implemented - as a developer preview, though - some more advanced features are still **missing**.
	- **Signal-based components**, for example.
	- In the future, you'll be able to mark components as signal-based (presumably by adding the `signals: true` flag to `@Component`) to let Angular know that it should not use its regular change detection algorithm in such components.
	- And that's just one feature, of course. In signal-based components, you'll also be able to get rid of many decorators like `@Input()` or `@Output()` (and others). You would use special functions instead:
		 ``@Input() title: string;``
	- would become
		``title = input<string>();``
	- for example.
	- But, again, this part is still missing! It's likely to be added with Angular 17.
	- You can learn more about the complete planned (!) Signals API in the official RFCs: [https://github.com/angular/angular/discussions/49685](https://github.com/angular/angular/discussions/49685)
	- Please note that this RFC is split up into four "sub-RFCs" that dive deeper into specific aspects of Angular.
	- For example, [this sub-RFC](https://github.com/angular/angular/discussions/49682) takes a closer look at the signal-based components mentioned above.

367. **Computed Values & Effects**
	- Inside `computed()` function, we can compute the signal values.
	- And, Inside the `effect()` function, we can do the other changes in the UI or do some other activities on change of signal values.
	- Example:
``` ts
	//signals.component.ts
	@Component({
	  selector: 'app-signals',
	  templateUrl: './signals.component.html',
	  standalone: true,
	  imports: [NgFor],
	})
	export class SignalsComponent {
	  actions = signal<string[]>([]);
	  counter = signal(0);
	  doubleCounter = computed(() => this.counter() * 2);
	
	  constructor() {
	    effect(() => console.log(this.counter()));
	  }
	
	  increment() {
	    this.counter.set(this.counter() + 1);
	    this.actions.update((oldActions) => [...oldActions, 'INCREMENT']); //Don't use push with update
	  }
	
	  decrement() {
	    this.counter.set(this.counter() - 1);
	    this.actions.mutate((oldActions) => oldActions.push('DECREMENT'));
	  }
	}
```

368. **Module Summary**
	- There are a lot to come but we now know the basics of it at least.