#HomeAngular - [[--Contents - Angular--]]
369. **Module Introduction**
	- A More Complex State Management System
	- What is NgRx? And How Does It Work?
	- Basics: State, Reducers & Selectors
	- Working with NgRx Effects

370. **What is NgRx?** ![[ngrx.png]]
	![[state.png]]
	![[state-mgmt-sol.png]]

371. **Understanding NgRx & Its Building Blocks** ![[understanding-ngrx.png]]

372. **Project Setup & Installing NgRx**
	- To install NgRx: Run `ng add @ngrx/store`.
	- After the installation, there is a change in file shown below:
	- Example:
``` ts
	//main.ts (standalone)
	import { AppComponent } from './app/app.component';
	import { provideStore } from '@ngrx/store';
	
	bootstrapApplication(AppComponent, {
	    providers: [provideStore()]
	});
	
	//app.module.ts (non-standalone i.e, NgModule({}))
	@NgModule({
	  declarations: [
	    AppComponent,
	    CounterOutputComponent,
	    CounterControlsComponent,
	  ],
	  imports: [BrowserModule, StoreModule.forRoot({}, {})],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

373. **Adding a First Reducer & Store Setup**
	- Example:
``` ts
	//counter.reducer.ts
	import { createReducer } from "@ngrx/store";
	
	const initialState = 0; //it can be any type of data
	
	export const counterReducer = createReducer(initialState);
	
	//app.module.ts (NgModule({}))
	@NgModule({
	  declarations: [
	    AppComponent,
	    CounterOutputComponent,
	    CounterControlsComponent,
	  ],
	  imports: [BrowserModule, StoreModule.forRoot({
	    counter: counterReducer
	  })],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule { }

	//main.ts (standalone)
	bootstrapApplication(AppComponent, {
	    providers: [provideStore({
	        counter: counterReducer
	    })]
	});
```

374. **An Alternative Way Of Creating Reducers**
	- Example:
``` ts
	//counter.reducer.ts (Both NgModule({}) and Standalone)
	//Alternate way of creating reducer
	export function counterReducer(state: number = initialState){
	    return initialState;
	}
```

375. **Reading Data From The Store**
	- Example:
``` ts
	//counter-output.component.html (Both Module & Standalone)
	<p class="counter">{{ count$ | async }}</p>
	<p class="counter">Double: </p>
	
	//counter-output.component.ts (standalone)
	@Component({
	  selector: 'app-counter-output',
	  templateUrl: './counter-output.component.html',
	  styleUrls: ['./counter-output.component.css'],
	  standalone: true,
	  imports: [AsyncPipe]
	})
	export class CounterOutputComponent {
	  count$: Observable<number>;
	
	  constructor(private store: Store<{counter: number}>) {
	    this.count$ = store.select('counter');
	   }
	}
	
	//counter-output.component.ts (Module)
	@Component({
	  selector: 'app-counter-output',
	  templateUrl: './counter-output.component.html',
	  styleUrls: ['./counter-output.component.css'],
	})
	export class CounterOutputComponent {
	  count$: Observable<number>;
	
	  constructor(private store: Store<{counter: number}>) {
	    this.count$ = store.select('counter');
	   }
	}
```

376. **Introducing Actions & State Changing Reducers**
	- Example:
``` ts
	//counter.actions.ts (Both Module and Standalone)
	import { createAction } from "@ngrx/store";
	
	export const increment = createAction(
	    '[Counter] Increment'    
	)
	
	//counter.reducer.ts (Both Module and Standalone)
	import { createReducer, on } from "@ngrx/store";
	import { increment } from "./counter.actions";
	
	const initialState = 0; //it can be any type of data
	
	export const counterReducer = createReducer(
	    initialState,
	    on(increment, (state) => state + 1),
	);
```

377. **Dispatching Actions**
	- Let's delete the `counter.service.ts` file since we don't need it anymore.
	- Example:
``` ts
	//counter-controls.component.ts (Both Module and Standalone)
	export class CounterControlsComponent {
	  constructor(private store: Store) {}
	
	  increment() {
	    this.store.dispatch(increment())
	  }
	
	  decrement() {
	  }
	}
```

378. **Attaching Data To Actions**
	- Example:
``` ts
	//counter.actions.ts (Both Module and Standalone)
	import { createAction, props } from "@ngrx/store";
	
	export const increment = createAction(
	    '[Counter] Increment',
	    props<{value: number}>()
	)
	
	//counter-controls.component.ts (Both Module and Standalone)
	export class CounterControlsComponent {
	  constructor(private store: Store) { }
	
	  increment() {
	    this.store.dispatch(increment({ value: 2 }))
	  }
	
	  decrement() {
	  }
	}
	
	//counter.reducer.ts (Both Module and Standalone)
	const initialState = 0; //it can be any type of data
	
	export const counterReducer = createReducer(
	    initialState,
	    on(increment, (state, action) => state + action.value),
	);
```

379. **Handling Actions Without createReducer**

380. **An Alternative Way Of Defining Actions**
	- Example:
``` ts
	//counter.actions.ts (Both Module and Standalone)
	import { Action } from "@ngrx/store";
	
	// export const increment = createAction(
	//     '[Counter] Increment',
	//     props<{value: number}>()
	// )
	export const INCREMENT = '[Counter] Increment';
	export class IncrementAction implements Action {
	    readonly type = INCREMENT;
	    
	    constructor(public value: number){}
	}
	
	export type CounterActions = IncrementAction;
	
	//counter.reducer.ts (Both Module and Standalone)
	import { Action } from "@ngrx/store";
	import { CounterActions, INCREMENT, IncrementAction } from "./counter.actions";
	
	const initialState = 0; //it can be any type of data
	// export const counterReducer = createReducer(
	//     initialState,
	//     on(increment, (state, action) => state + action.value),
	// );
	
	export function counterReducer(state = initialState, action: CounterActions | Action){
	    if(action.type === INCREMENT){
	        return state + (action as IncrementAction).value;
	    }
	    return state;
	}
	
	//counter-controls.component.ts (Both Module and Standalone)
	export class CounterControlsComponent {
	  constructor(private store: Store) {}
	
	  increment() {
	    //this.store.dispatch(increment({value: 2}))
	    this.store.dispatch(new IncrementAction(2))
	  }
	
	  decrement() {
	  }
	}
```

381. **Time to Practice: A Second Action**
	- Example:
``` ts
	//counter.actions.ts (Both Module and Standalone)
	export const increment = createAction(
	    '[Counter] Increment',
	    props<{value: number}>()
	)
	export const decrement = createAction(
	    '[Counter] Decrement',
	    props<{value: number}>()
	)
	
	//counter.reducer.ts (Both Module and Standalone)
	const initialState = 0; //it can be any type of data
	export const counterReducer = createReducer(
	    initialState,
	    on(increment, (state, action) => state + action.value),
	    on(decrement, (state, action) => state - action.value)
	);
	
	//counter-controls.component.ts (Both Module and Standalone)
	export class CounterControlsComponent {
	  constructor(private store: Store) {}
	
	  increment() {
	    this.store.dispatch(increment({value: 2}))
	  }
	
	  decrement() {
	    this.store.dispatch(decrement({value: 2}))
	  }
	}
```

382. **Exploring Selectors**
	- Example:
``` ts
	//counter.selector.ts (Both Module and Standalone)
	import { createSelector } from "@ngrx/store";
	
	export const selectCount = (state: { counter: number }) => state.counter;
	export const selectDoubleCount = createSelector(selectCount, (state) => state * 2);
	
	//counter-output.component.ts (Both Module and Standalone)
	export class CounterOutputComponent {
	  count$: Observable<number>;
	  doubleCount$: Observable<number>;
	
	  constructor(private store: Store<{counter: number}>) {
	    this.count$ = store.select(selectCount);
	    this.doubleCount$ = store.select(selectDoubleCount);
	   }
	}
	
	//counter-output.component.html (Both Module and Standalone)
	<p class="counter">Single: {{ count$ | async}}</p>
	<p class="counter">Double: {{doubleCount$ | async}}</p>
```

383. **Introducing Effects**
	- What's a "Side Effect"? ![[effects.png]]

384. **Installing the Effects Package**
	- To install the package: Run `ng add @ngrx/effects`.
	- Example:
``` ts
	//app.module.ts (NgModule)
	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { AppComponent } from './app.component';
	import { CounterOutputComponent } from './counter-output/counter-output.component';
	import { CounterControlsComponent } from './counter-controls/counter-controls.component';
	import { StoreModule } from '@ngrx/store';
	import { counterReducer } from './store/counter.reducer';
	import { EffectsModule } from '@ngrx/effects';
	
	@NgModule({
	  declarations: [
	    AppComponent,
	    CounterOutputComponent,
	    CounterControlsComponent,
	  ],
	  imports: [BrowserModule, StoreModule.forRoot({
	    counter: counterReducer
	  }), EffectsModule.forRoot([])],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//main.ts (Standalone)
	import { bootstrapApplication } from '@angular/platform-browser';
	import { AppComponent } from './app/app.component';
	import { provideStore } from '@ngrx/store';
	import { counterReducer } from './app/store/counter.reducer';
	import { provideEffects } from '@ngrx/effects';
	
	bootstrapApplication(AppComponent, {
	    providers: [provideStore({
	        counter: counterReducer
	    }), provideEffects()]
	});
```

385. **Defining a First Effect**
	- Example:
``` ts
	//counter.effect.ts (Both NgModule and Standalone)
	import { Actions, createEffect, ofType } from "@ngrx/effects";
	import { decrement, increment } from "./counter.actions";
	import { tap } from "rxjs";
	
	export class CounterEffects {
	    constructor(private actions$: Actions) { }
	
	    saveCount = createEffect(() => this.actions$.pipe(
	        ofType(increment, decrement),
	        tap(action => {
	            console.log('effect', action);
	            localStorage.setItem('count', action.value.toString());
	        })
	    ),
	        { dispatch: false });
	}
```

386. **The Old @Effect Decorator & Registering Effects**
	- Let's not write the Old `@Effect` way of creating effects.
	- And let's make an addition of `@Injectable()`.
	- Example:
``` ts
	//counter.effect.ts (Both NgModule and Standalone)
	@Injectable()
	export class CounterEffects {
	    constructor(private actions$: Actions) { }
	
	    saveCount = createEffect(() => this.actions$.pipe(
	        ofType(increment, decrement),
	        tap(action => {
	            console.log('effect', action);
	            localStorage.setItem('count', action.value.toString());
	        })
	    ),
	        { dispatch: false });
	}
	
	//app.module.ts (NgModule)
	@NgModule({
	  declarations: [
	    AppComponent,
	    CounterOutputComponent,
	    CounterControlsComponent,
	  ],
	  imports: [BrowserModule, StoreModule.forRoot({
	    counter: counterReducer
	  }), EffectsModule.forRoot([CounterEffects])],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//main.ts (Standalone)
	bootstrapApplication(AppComponent, {
	    providers: [provideStore({
	        counter: counterReducer
	    }), provideEffects([CounterEffects])]
	});
```

387. **Using Store Data In Effects**
	- `ofType()` essentially ensures that the observable pipeline processes only actions of the specified type, filtering out others. This is particularly useful in scenarios where you want to handle certain actions with specific side effects.
	- `withLatestFrom()` is another method commonly used in RxJS when working with observables. It's used to combine the latest values from one observable with the latest values from another observable. This is particularly useful when you want to perform an operation based on the latest values of multiple observables.
	- Need to check the use of `{ dispatch: false }` whenever we create an effect.
	- `{ dispatch: false }` indicates that this effect does not dispatch any new actions.
	- Example:
``` ts
	//counter.effects.ts (Both NgModule and Standalone)
	@Injectable()
	export class CounterEffects {
	    constructor(private actions$: Actions, private store: Store<{ counter: number }>) { }
	
	    saveCount = createEffect(() => this.actions$.pipe(
	        ofType(increment, decrement),
	        withLatestFrom(this.store.select(selectCount)),
	        tap(([action, counter]) => {
	            console.log('effect', action);
	            localStorage.setItem('count', counter.toString());
	        })
	    ),
	        { dispatch: false });
	}
```

388. **Adding a Second Effect**
	- Example:
``` ts
	//counter.actions.ts (Both NgModule and Standalone)
	export const init = createAction(
	    '[Counter] Init'
	);
	
	export const set = createAction(
	    '[Counter] Set',
	    props<{ value: number }>(),
	)
	
	export const increment = createAction(
	    '[Counter] Increment',
	    props<{value: number}>()
	)
	export const decrement = createAction(
	    '[Counter] Decrement',
	    props<{value: number}>()
	)
	
	//counter.reducer.ts (Both NgModule and Standalone)
	const initialState = 0; //it can be any type of data
	export const counterReducer = createReducer(
	    initialState,
	    on(increment, (state, action) => state + action.value),
	    on(decrement, (state, action) => state - action.value),
	    on(set, (state, action) => action.value)
	);
	
	//counter.effect.ts (Both NgModule and Standalone)
	@Injectable()
	export class CounterEffects {
	    loadCount = createEffect(() => this.actions$.pipe(
	        ofType(init),
	        switchMap(() => {
	            const storedCounter = localStorage.getItem('count');
	            if(storedCounter)
	                return of(set({value: +storedCounter}));
	            return of(set({value: 0}));
	        })
	    ));
	
	    constructor(private actions$: Actions, private store: Store<{ counter: number }>) { }
	    
	    saveCount = createEffect(() => this.actions$.pipe(
	        ofType(increment, decrement),
	        withLatestFrom(this.store.select(selectCount)),
	        tap(([action, counter]) => {
	            console.log('effect', action);
	            localStorage.setItem('count', counter.toString());
	        })
	    ),
	        { dispatch: false });
	}
	
	//app.component.ts (Both NgModule and Standalone)
	export class AppComponent implements OnInit{
	  ngOnInit(): void {
	    this.store.dispatch(init());
	  }
	
	  constructor(private store: Store){
	  }
	}
```

389. **Summary**
	- Covered basic intro on ngrx actions, effects, reducer and selectors.
	- This rest of this section was recorded with an older version of NgRx. But you can still use the shown code.
	- Attached to the lectures, you find updated project snapshots.

390. **About the Remaining Section**
	- As mentioned in the previous lecture, the remaining section is all about adding NgRx to the "Recipes" project. You **can skip** all remaining lectures (and mark them as completed manually, if you need that certificate of completion) if you're not interested in them.
	- It was recorded with an **older version of NgRx** but the syntax shown in the videos **still works** with recent versions of Angular & NgRx _(and is likely to still be encountered in some of the real-world projects you might be working on after taking this course)_.
	- **Some things to keep in mind:**
		**1)** We'll install NgRx via `npm install --save @ngrx/store` => You could use `ng add @ngrx/store` instead (as shown in the previous lectures)
		**2)** We'll use the **"old" actions, reducers & effects syntax** (i.e., without `createAction()`, `createReducer()` and `createEffect()`) 
		=> With the exception of the old effects syntax (which uses `@Effect()`, which is not supported anymore), you **can stick to that syntax**. Alternatively, you can switch to the approach you learned about in the previous lectures.
		As mentioned, you'll find **multiple code snapshot attachments** on various lectures - snapshots with the "old" and "new" syntax. This should make following along easy & straightforward.
		In addition, you find the **finished project snapshot** (using `createReducer()`, `createAction()` etc.) attached to this lecture already!

391. **Recipe Project Starting Code**
	- Attached, you find the **updated starting code** for the "Recipes" project we'll work on throughout the remaining the section.
	- It's the project we've built throughout this course, updated to a recent version of Angular.
	- Most importantly, it does not use `entryComponents` and uses the latest route lazy loading syntax.

392. **Getting Started with Reducers**
	- Example:
``` ts
	//shopping-list.reducer.ts
	import { createReducer, on } from "@ngrx/store";
	import { Ingredient } from "../shared/ingredient.model";
	
	const initialState = {
	    ingredients: [
	        new Ingredient('Apples', 5),
	        new Ingredient('Tomatoes', 10),
	      ]
	}; //it can be any type of data
	export const counterReducer = createReducer(
	    initialState,
	);
```

393. **Adding Logic to the Reducer**
394. **Understanding & Adding Actions**
	- Example:
``` ts
	//shopping-list.actions.ts
	import { createAction, props } from "@ngrx/store";
	import { Ingredient } from "../shared/ingredient.model";
	
	export const addIngredient = createAction(
	    '[Shopping-List] AddIngredient',
	    props<{ ingredient: Ingredient }>(),
	)
	
	//shopping-list.reducer.ts
	const initialState = {
	    ingredients: [
	        new Ingredient('Apples', 5),
	        new Ingredient('Tomatoes', 10),
	    ]
	}; //it can be any type of data
	export const shoppingListReducer = createReducer(
	    initialState,
	    on(addIngredient, (state, action) => {
	        return {
	            ...state,
	            ingredients: [...state.ingredients, action.ingredient]
	        };
	    })
	);	 
```

395. **Setting Up the NgRx Store**
	- Example:
``` ts
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	  ],
	  imports: [
	    BrowserModule,
	    HttpClientModule,
	    AppRoutingModule,
	    SharedModule,
	    CoreModule,
	    StoreModule.forRoot({ shoppingList: shoppingListReducer }),
	  ],
	  bootstrap: [AppComponent],
	  providers: [LoggingService]
	})
	export class AppModule { }
```

396. **Selecting State**
	- Example:
``` ts
	//shopping-list.component.ts
	export class ShoppingListComponent implements OnInit, OnDestroy {
	  ingredients: Observable<{ingredients: Ingredient[]}>;
	
	  constructor(
	    private slService: ShoppingListService,
	    private loggingService: LoggingService,
	    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
	  ) { }
	
	  ngOnInit(): void {
	    this.ingredients = this.store.select('shoppingList');
	    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
	  }
	
	  onEditItem(index: number) {
	    this.slService.startedEditing.next(index);
	  }
	
	  ngOnDestroy(): void {
	  }
	}
	
	//shopping-list.component.html
	<div class="row">
	  <div class="col-xs-10">
	    <app-shopping-edit></app-shopping-edit>
	    <hr />
	    <ul class="list-group">
	      <a
	        class="list-group-item"
	        style="cursor: pointer"
	        *ngFor="let ingredient of (ingredients | async).ingredients; let i = index"
	        (click)="onEditItem(i)"
      >	
	        {{ ingredient.name }} ({{ ingredient.amount }})
	      </a>
	    </ul>
	  </div>
	</div>
```

397. **Dispatching Actions**
	- Example:
``` ts
	//shopping-edit.component.ts
	...
	constructor(
	    private slService: ShoppingListService,
	    private store: Store<{ ingredients: Ingredient[] }>
	) { }
	...
	onSubmitItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    if (this.editMode) {
	      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
	      this.editMode = false;
	    } else {
	      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
	    }
	    form.reset();
	}
	...
```

398. **Multiple Actions**
	- Example:
``` ts
	//shopping-list.actions.ts
	export const addIngredient = createAction(
	    '[Shopping-List] AddIngredient',
	    props<{ ingredient: Ingredient }>(),
	)
	
	export const addIngredients = createAction(
	    '[Shopping-List] AddIngredients',
	    props<{ ingredients: Ingredient[] }>(),
	)
	
	//shopping-list.reducer.ts
	const initialState = {
	    ingredients: [
	        new Ingredient('Apples', 3),
	        new Ingredient('Tomatoes', 7),
	    ]
	}; //it can be any type of data
	export const shoppingListReducer = createReducer(
	    initialState,
	    on(addIngredient, (state, action) => {
	        return {
	            ...state,
	            ingredients: [...state.ingredients, action.ingredient]
	        };
	    }),
	    on(addIngredients, (state, action) => {
	        return {
	            ...state,
	            ingredients: [...state.ingredients, ...action.ingredients]
	        };
	    })
	);
	
	//recipe.service.ts
	...
	constructor(
	    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
	) { }
	...
	addIngredientsToShoppingList(ingredients: Ingredient[]) {
	    this.store.dispatch(addIngredients({ ingredients: ingredients }));
	}
	...
```

399. **Preparing Update & Delete Actions**
	- Example:
``` ts
	//shopping-list.actions.ts
	...
	export const updateIngredient = createAction(
	    '[Shopping-List] UpdateIngredient',
	    props<{ index: number, newIngredient: Ingredient }>(),
	)
	
	export const deleteIngredient = createAction(
	    '[Shopping-List] DeleteIngredient',
	    props<{ index: number }>(),
	)
```

400. **Updating & Deleting Ingredients**
	- Example:
``` ts
	//shopping-list.reducer.ts
	const initialState = {
	    ingredients: [
	        new Ingredient('Apples', 3),
	        new Ingredient('Tomatoes', 7),
	    ]
	}; //it can be any type of data
	export const shoppingListReducer = createReducer(
	    initialState,
	    on(addIngredient, (state, action) => {
	        return {
	            ...state,
	            ingredients: [...state.ingredients, action.ingredient]
	        };
	    }),
	    on(addIngredients, (state, action) => {
	        return {
	            ...state,
	            ingredients: [...state.ingredients, ...action.ingredients]
	        };
	    }),
	    on(deleteIngredient, (state, action) => {
	        return {
	            ...state, ingredients: state.ingredients.filter((ing, ingIndex) => {
	                return ingIndex !== action.index;
	            })
	        }
	    }),
	    on(updateIngredient, (state, action) => {
	        const ingredient = state.ingredients[action.index];
	        const updatedIngredient = {
	            ...ingredient,
	            ...action.newIngredient
	        };
	        const updatedIngredients = [...state.ingredients];
	        updatedIngredients[action.index] = updatedIngredient;
	
	        return {
	            ...state,
	            ingredients: updatedIngredients
	        }
	    })
	);
	
	//shopping-edit.component.ts
	...
	onSubmitItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    if (this.editMode) {
	      //this.slService.updateIngredient(this.editedItemIndex, newIngredient);
	      this.store.dispatch(updateIngredient(
	        { index: this.editedItemIndex, newIngredient: newIngredient }
	      ))
	      this.editMode = false;
	    } else {
	      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
	    }
	    form.reset();
	  }
	  ...
	  onDelete() {
    //this.slService.deleteIngredient(this.editedItemIndex);
	this.store.dispatch(deleteIngredient({ index: this.editedItemIndex }))
	    this.onClear();
	}
	...
```

401. **Expanding the State**
	- Example:
``` ts
	//shopping-list.reducer.ts
	...
	export interface AppState {
	    shoppingList: State;
	}
	
	export interface State {
	    ingredients: Ingredient[];
	    editedIngredient: Ingredient;
	    editedIngredientIndex: number;
	}
	
	const initialState = {
	    ingredients: [
	        new Ingredient('Apples', 3),
	        new Ingredient('Tomatoes', 7),
	    ],
	    editedIngredient: null,
	    editedIngredientIndex: -1
	};
	...
	
	//shopping-list.component.ts
	...
	import { AppState } from './shopping-list.reducer';
	...
	constructor(
	    private slService: ShoppingListService,
	    private loggingService: LoggingService,
	    private store: Store<AppState>
	) { }
	...
	
	//shopping-edit.component.ts
	...
	constructor(
	    private slService: ShoppingListService,
	    private store: Store<AppState>
	) { }
	...
	
	//recipe.service.ts
	...
	constructor(
	    private store: Store<AppState>
	) { }
	..
```

402. **Managing More State via NgRx**
	- Example:
``` ts
	//shopping-list.actions.ts
	...
	export const startEdit = createAction(
	    '[Shopping-List] StartEdit',
	    props<{ index: number }>(),
	)
	
	export const stopEdit = createAction(
	    '[Shopping-List] StopEdit'
	)
	...
	
	//shopping-list.reducer.ts
	...
	export const shoppingListReducer = createReducer(
	    initialState,
	   ...
	   ...
	    on(startEdit, (state, action) => {
	        return {
	            ...state,
	            editedIngredientIndex: action.index,
	            editedIngredient: state.ingredients[action.index]
	        }
	    }),
	    on(stopEdit, (state, action) => {
	        return {
	            ...state,
	            editedIngredientIndex: -1,
	            editedIngredient: null
	        };
	    }),
	);
	...
	
	//shopping-list.component.ts
	...
	constructor(
	    //private slService: ShoppingListService,
	    private loggingService: LoggingService,
	    private store: Store<AppState>
	) { }
	...
	onEditItem(index: number) {
	    //this.slService.startedEditing.next(index);
	    this.store.dispatch(startEdit({ index: index }))
	}
	...
	
	//shopping-edit.component.ts
	export class ShoppingEditComponent implements OnInit, OnDestroy {
	  @ViewChild('f') slForm: NgForm;
	  subscription: Subscription;
	  editMode = false;
	  editedItemIndex: number;
	  editedItem: Ingredient;
	
	  constructor(private store: Store<AppState>) { }
	
	  ngOnInit(): void {
	    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
	      if (stateData.editedIngredientIndex > -1) {
	        this.editMode = true;
	        this.editedItem = stateData.editedIngredient;
	        this.editedItemIndex = stateData.editedIngredientIndex;
	        this.slForm.setValue({
	          name: this.editedItem.name,
	          amount: this.editedItem.amount,
	        });
	      } else this.editMode = false;
	    })
	  }
	
	  onSubmitItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    if (this.editMode) {
	      this.store.dispatch(updateIngredient(
	        { index: this.editedItemIndex, newIngredient: newIngredient }
	      ))
	      this.editMode = false;
	    } else {
	      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
	    }
	    form.reset();
	  }
	
	  onClear() {
	    this.slForm.reset();
	    this.editMode = false;
	    this.store.dispatch(stopEdit())
	  }
	
	  onDelete() {
	    this.store.dispatch(deleteIngredient({ index: this.editedItemIndex }))
	    this.onClear();
	  }
	
	  ngOnDestroy(): void {
	    this.subscription.unsubscribe();
	    this.store.dispatch(stopEdit())
	  }
	}
```

403. **Removing Redundant Component State Management**
	- Example;
``` ts
	//shoppin-list.actions.ts
	...
	export const updateIngredient = createAction(
	    '[Shopping-List] UpdateIngredient',
	    props<{ newIngredient: Ingredient }>(),
	)
	
	export const deleteIngredient = createAction(
	    '[Shopping-List] DeleteIngredient',
	)
	...
	
	//shopping-list.reducer.ts
	...
	export const shoppingListReducer = createReducer(
	    initialState,
	   ...
	   ...
	   on(deleteIngredient, (state, action) => {
	        return {
	            ...state, ingredients: state.ingredients.filter((ing, ingIndex) => {
	                return ingIndex !== state.editedIngredientIndex;
	            }),
	            editedIngredient: null,
	            editedIngredientIndex: -1,
	        }
	    }),
	    on(updateIngredient, (state, action) => {
	        const ingredient = state.ingredients[state.editedIngredientIndex];
	        const updatedIngredient = {
	            ...ingredient,
	            ...action.newIngredient
	        };
	        const updatedIngredients = [...state.ingredients];
	        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
	
	        return {
	            ...state,
	            ingredients: updatedIngredients,
	            editedIngredient: null,
	            editedIngredientIndex: -1,
	        }
	    }),
	);
	...
	
	//shopping-edit.component.ts
	...
	onSubmitItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    if (this.editMode) {
	      this.store.dispatch(updateIngredient(
	        { newIngredient: newIngredient }
	      ))
	      this.editMode = false;
	    } else {
	      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
	    }
	    form.reset();
	}
	...
	onDelete() {
	    this.store.dispatch(deleteIngredient())
	    this.onClear();
	}
	...
```

404. **First Summary & Clean Up**
	- Remove `ShoppingListService` and remove the imports wherever it was injected.

405. **One Root State**
	- 