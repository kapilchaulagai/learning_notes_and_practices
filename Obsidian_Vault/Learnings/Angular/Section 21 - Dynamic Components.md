#HomeAngular - [[--Contents - Angular--]]
313. **Module Introduction**
	- Dynamic Components
	- It's not a in-built feature/component but we do add components programmatically.
	- Learn how to create, communicate and get rid of it.

314. **Adding an Alert Modal Component**
	- Let's create a component that we can use it dynamically.
	- Don't forget it to add in declarations of module file.
	- Example
``` ts
	//alert.component.ts
	import { Component, Input } from "@angular/core";
	
	@Component({
	    selector: 'app-alert',
	    templateUrl: './alert.component.html',
	    styleUrls:['./alert.component.css']
	})
	export class AlertComponent{
	    @Input() message:string;
	}
	
	//alert.component.html
	<div class="backdrop"></div>
	<div class="alert-box">
	    <p>{{message}}</p>
	    <div class="alert-box-actions">
	        <button class="btn btn-primary">Close</button>
	    </div>
	</div>
	
	//alert.component.css
	.backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 50;
	}
	
	.alert-box{
	    position: fixed;
	    top: 30vh;
	    left: 20vw;
	    width: 60vw;
	    padding: 16px;
	    z-index: 100;
	    background: white;
	    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	}
	
	.alert-box-actions{
	    text-align: right;
	}
```
``` html
	//auth.component.html
	...
	<!-- <div class="alert alert-danger" *ngIf="error">
      <p>{{ error }}</p>
	</div> -->
    <app-alert [message]="error" *ngIf="error"></app-alert>
	...
```

315. **Understanding the Different Approaches** ![[dynamic-components.png]]

316. **Using ngIf**
	- Example:
``` ts
	//alert.component.ts
	export class AlertComponent{
	    @Input() message:string;
	    @Output() close = new EventEmitter<void>();
	
	    onClose(){
	        this.close.emit();
	    }
	}
	
	//auth.component.ts
	...
	onHandleError(){
	    this.error = null;
	}
	...
```
``` HTML
	//alert.component.html
	<div class="backdrop" (click)="onClose()"></div>
	<div class="alert-box">
	    <p>{{message}}</p>
	    <div class="alert-box-actions">
	        <button class="btn btn-primary" (click)="onClose()">Close</button>
	    </div>
	</div>
	
	//auth.component.html
	...
	 <!-- <div class="alert alert-danger" *ngIf="error">
	      <p>{{ error }}</p>
	</div> -->
	<app-alert [message]="error" *ngIf="error" (close) = "onHandleError()"></app-alert>
	...
```

317. **Preparing Programmatic Creation**
	- Example:
``` html
	//auth.component.html
    <!-- <div class="alert alert-danger" *ngIf="error">
      <p>{{ error }}</p>
    </div> -->
    <!-- <app-alert [message]="error" *ngIf="error" (close) = "onHandleError()"></app-alert> -->
```
``` ts
	//auth.component.ts
	...
	constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}
	...
	onSubmit(authForm: NgForm){
	...
		authObs.subscribe(
	      (responseData) => {
	        console.log(responseData);
	        this.isLoading = false;
	        this.router.navigate(['/recipes']);
	      },
	      (errorMessage) => {
	        console.log(errorMessage);
	        this.error = errorMessage;
	        this.showErrorAlert(errorMessage);
	        this.isLoading = false;
	      }
	    );
	...
	}
	...
	private showErrorAlert(message: string){
	    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
	}
	...
	
	//placeholder.directive.ts
	//add class name in the declaration of the module similarly as the components
	import { Directive, ViewContainerRef } from "@angular/core";
	
	@Directive({
	    selector:'[appPlaceholder]'
	})
	export class PlaceholderDirective{
	    constructor(public viewContainerRef: ViewContainerRef){
	    }
	}
```

318. **Creating a Component Programmatically**
	- Example:
``` ts
	//auth.component.html
	<ng-template appPlaceholder></ng-template>
	...
	...
	
	//auth.component.ts
	...
	@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
	...
	private showErrorAlert(message: string){
	    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
	    const hostViewContainerRef = this.alertHost.viewContainerRef;
	    hostViewContainerRef.clear();
	    hostViewContainerRef.createComponent(alertCmpFactory);
	}
	...
```

319. **About entryComponents**
	- In the next lecture, I'll introduce you to `entryComponents`.
	- **Please note:** If you're using the most recent version of Angular (which a lot of projects aren't - so check your `package.json` file to find out), you can omit `entryComponents`. You **don't have to add it** as I do it in the next lecture.

320. **Understanding entryComponents**
	- **Note:** These changes may not require if you are not facing issues since you have latest angular version.
``` ts
	//app.module.ts
	@NgModule({
	...
	...
	// Placeholder Directive : Requires only in the old version of the angular
	entryComponents: [AlertComponent]
	})
```

321. **Data Binding & Event Binding**
	- Example:
``` ts
	//auth.component.ts
	...
	 private closeSub: Subscription;
	...
	private showErrorAlert(message: string){
	    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
	    const hostViewContainerRef = this.alertHost.viewContainerRef;
	    hostViewContainerRef.clear();
	    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
	    componentRef.instance.message = message;
	    componentRef.instance.close.subscribe(() => {
	      this.closeSub.unsubscribe();
	      hostViewContainerRef.clear();
	    });
	}
	
	ngOnDestroy(): void {
	    if(this.closeSub)
	      this.closeSub.unsubscribe();
	}
	...
```

322. **Wrap Up**
	- Covered all topics regarding dynamic components.

323. **Useful Resources & Links**
	- Useful Resources:
		- Official Docs: [https://angular.io/guide/dynamic-component-loader](https://angular.io/guide/dynamic-component-loader)