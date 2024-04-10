#HomeAngular - [[--Contents - Angular--]]
173. **Module Introduction**
	- What is an Observable?![[observable.png]]

174. **Install RxJS**
	- In order to follow along smoothly with the course examples, make sure you install RxJS v6 by running
		`npm install --save rxjs@6`
	- In addition, also install the rxjs-compat package:
		`npm install --save rxjs-compat`

175. **Analyzing Angular Observables**
	- Understanding the project.

176. **Getting Closer to the Core of Observables**
	- Example:
``` ts
	//home.component.ts
	export class HomeComponent implements OnInit {
	  private firstObsSubscription: Subscription;
	
	  constructor() {}
	
	  ngOnInit() {
	    this.firstObsSubscription = interval(1000).subscribe((count) => {
	      console.log(count);
	    });
	  }
	
	  ngOnDestroy(): void {
	    this.firstObsSubscription.unsubscribe();
	  }
	}
```

177. **Building a Custom Observable**
	- Example:
``` ts
	//home.component.ts
	export class HomeComponent implements OnInit {
	  private firstObsSubscription: Subscription;
	
	  constructor() {}
	
	  ngOnInit() {
	    // this.firstObsSubscription = interval(1000).subscribe((count) => {
	    //   console.log(count);
	    // });
	    const customIntervalObservable = Observable.create((observer) => {
	      let count = 0;
	      setInterval(() => {
	        observer.next(count);
	        count++;
	      }, 1000);
	    });
	
	    this.firstObsSubscription = customIntervalObservable.subscribe((data) => {
	      console.log(data);
	    });
	  }
	
	  ngOnDestroy(): void {
	    this.firstObsSubscription.unsubscribe();
	  }
	}
```

178. **Errors & Completion**
	- Observable unsubscribes itself on throwing error.
	- Cancel on error doesn't complete the observable but it does stop the subscription.
``` ts
	//home.component.ts
	export class HomeComponent implements OnInit {
	  private firstObsSubscription: Subscription;
	
	  constructor() {}
	
	  ngOnInit() {
	    // this.firstObsSubscription = interval(1000).subscribe((count) => {
	    //   console.log(count);
	    // });
	    const customIntervalObservable = Observable.create((observer) => {
	      let count = 0;
	      setInterval(() => {
	        observer.next(count);
	        if (count === 2) observer.complete();
	        if (count > 3) {
	          observer.error(new Error('Count is greater than 3!'));
	        }
	        count++;
	      }, 1000);
	    });
	
	    this.firstObsSubscription = customIntervalObservable.subscribe(
	      (data) => {
	        console.log(data);
	      },
	      (error) => {
	        console.log(error);
	        alert(error.message);
	      },
	      () => console.log('Completed!')
	    );
	  }
	
	  ngOnDestroy(): void {
	    this.firstObsSubscription.unsubscribe();
	  }
	}
```

179. **Observables & You!**
	- We really use very very less custom Observables but is required to know how it works behind the scene.

180. **Understanding Operators**
	- Example: ![[observable-operators.png]]
``` ts
	//home.component.ts
	...
	ngOnInit() {
	    // this.firstObsSubscription = interval(1000).subscribe((count) => {
	    //   console.log(count);
	    // });
	    const customIntervalObservable = Observable.create((observer) => {
	      let count = 0;
	      setInterval(() => {
	        observer.next(count);
	        if (count === 5) observer.complete();
	        if (count > 3) {
	          observer.error(new Error('Count is greater than 3!'));
	        }
	        count++;
	      }, 1000);
	    });
	
	    this.firstObsSubscription = customIntervalObservable
	      .pipe(
	        filter((data: number) => {
	          return data > 0;
	        }),
	        map((data: number) => {
	          return 'Round: ' + (data + 1);
	        })
	      )
	      .subscribe(
	        (data) => {
	          console.log(data);
	        },
	        (error) => {
	          console.log(error);
	          alert(error.message);
	        },
	        () => console.log('Completed!')
	      );
	  }
	
	  ngOnDestroy(): void {
	    this.firstObsSubscription.unsubscribe();
	  }
	...
```

181. **Subjects**
	- Subjects is similar to Observable in many aspects but here we can call `.next()` from anywhere which is active whereas Observable is passive.
	- Don't forget to unsubscribe the subscription made with Subject().
	- Subject is used for cross-component communication where it won't be suitable for replacing the scenarios like handled by `@Output()`.
	- Example: ![[observable-subject.png]]
``` ts
	//user.service.ts
	@Injectable({ providedIn: 'root' })
	export class UserService {
	  //activatedEmitter = new EventEmitter<boolean>();
	  activatedEmitter = new Subject<boolean>();
	}
	
	//user.component.ts
	...
	onActivate() {
	    this.userService.activatedEmitter.next(true);
	}
	...
	
	//user.component.html
	<p>
	  User with <strong>ID {{ id }}</strong> was loaded
	</p>
	<button class="btn btn-primary" (click)="onActivate()">Activate</button>
	
	//app.component.ts
	export class AppComponent implements OnInit, OnDestroy {
	  userActivated = false;
	  private activatedSub: Subscription;
	
	  constructor(private userService: UserService) {}
	
	  ngOnInit() {
	    this.activatedSub = this.userService.activatedEmitter.subscribe(
	      (didActivate) => {
	        this.userActivated = didActivate;
	      }
	    );
	  }
	
	  ngOnDestroy(): void {
	    // Clean up when the component is destroyed
	    this.activatedSub.unsubscribe();
	  }
	}
	
	//app.component.html
	...
	  <P *ngIf="userActivated">Activated!</P>
	...
```

182. **Wrap Up**
	-  Covered almost all topics important in the Observables  by RxJS.
183. **Useful Resources & Links**
	- Useful Resources:
		- Official Docs: [https://rxjs-dev.firebaseapp.com/](https://rxjs-dev.firebaseapp.com/)
		- RxJS Series: [https://academind.com/learn/javascript/understanding-rxjs/](https://academind.com/learn/javascript/understanding-rxjs/)
		- Updating to RxJS 6: [https://academind.com/learn/javascript/rxjs-6-what-changed/](https://academind.com/learn/javascript/rxjs-6-what-changed/)