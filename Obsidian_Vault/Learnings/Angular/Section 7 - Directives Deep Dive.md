#HomeAngular - [[--Contents - Angular--]]
93. **Module Introduction**
	- Understanding Directives
	- Attribute vs Structural
		- Attribute Directives
		- Structural Directives
		![[directives.png]]

94. **ngFor and ngIf Recap**
	- Example:
	``` ts
	//app.component.ts
	export class AppComponent {
	  oddNumbers = [1, 3, 5];
	  evenNumbers = [2, 4];
	  onlyOdd = false;
	}
	
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12">
	      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">
	        Only show odd numbers
	      </button>
	      <br /><br />
	      <ul class="list-group">
	        <div *ngIf="onlyOdd">
	          <li class="list-group-item" *ngFor="let odd of oddNumbers">
	            {{ odd }}
	          </li>
	        </div>
	        <div *ngIf="!onlyOdd">
	          <li class="list-group-item" *ngFor="let even of evenNumbers">
	            {{ even }}
	          </li>
	        </div>
	      </ul>
	    </div>
	  </div>
	</div>
	```

95. **ngClass and ngStyle Recap**
	- Example:
	``` ts
	//app.component.css
	.container {
	  margin-top: 30px;
	}
	
	.odd{color: red;}
	.even{color: green;}
	
	//app.component.html
	<ul class="list-group">
        <div *ngIf="onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{ odd: odd % 2 !== 0 }"
            [ngStyle]="{
              backgroundColor:
                odd % 2 !== 0 ? 'rgb(219, 156, 156)' : 'transparent'
            }"
            *ngFor="let odd of oddNumbers"
          >
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{ even: even % 2 === 0 }"
            [ngStyle]="{
              backgroundColor:
                even % 2 === 0 ? 'rgb(161, 199, 161)' : 'transparent'
            }"
            *ngFor="let even of evenNumbers"
          >
            {{ even }}
          </li>
        </div>
    </ul>
	```

96. **Creating a Basic Attribute Directive**
	- Here, basically we are creating our own directives setting a selector inside square bracket '[]' so that we can use them in the  html element without any bracket.
	- Example:
	``` ts
	//basic-highlight.directive.ts
		import { Directive, ElementRef, OnInit } from '@angular/core';
	
	@Directive({
	  selector: '[appBasicHighlight]',
	})
	export class BasicHighlightDirective implements OnInit {
	  constructor(private elementRef: ElementRef) {}
	
	  ngOnInit(): void {
	    this.elementRef.nativeElement.style.backgroundColor = 'green';
	  }
	}
	
	//app.module.ts
	@NgModule({
	  declarations: [AppComponent, BasicHighlightDirective],
	  imports: [BrowserModule, FormsModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.html
	...
	      <p appBasicHighlight>Style me with basic directive!</p>
	...
	```

97. **Using the Renderer to build a Better Attribute Directive****
	- Create Directive using CLI: Run `ng g d better-highlight`.
	- Using renderer is a better approach for accessing the DOM because angular is not limited to only running in the browsers. For eg, it also works with the service-workers and these are environments where you might not have access to the DOM.
	- Example:
	``` ts
	//better-highlight.directive.ts
		import { Directive, OnInit, Renderer2, ElementRef } from '@angular/core';
	
	@Directive({
	  selector: '[appBetterHighlight]',
	})
	export class BetterHighlightDirective implements OnInit {
	  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
	
	  ngOnInit(): void {
	    this.renderer.setStyle(
	      this.elRef.nativeElement,
	      'background-color',
	      'blue'
	    );
	  }
	}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    BasicHighlightDirective,
	    BetterHighlightDirective,
	  ],
	  imports: [BrowserModule, FormsModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.html
	<p appBetterHighlight>Style me with a better directive!</p>
	```

98. **More about the Renderer**
	- In the last lecture, we used the Angular Renderer class to change the style of a HTML element. As explained in that lecture, you should use the Renderer for any DOM manipulations.
	- Of course, you can do more than simply change the styling of an element via setStyle(). Learn more about the available Renderer methods [here](https://angular.io/api/core/Renderer2).

99. **Using HostListener to Listen to Host Events**
	- In Angular, @HostListener is a decorator used to listen for events that occur in the host element of a directive or component. It allows you to define event handlers directly in your component or directive class.
	- Example:
	```ts
	//better-highlight.directive.ts
	export class BetterHighlightDirective implements OnInit {
	  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
	
	  ngOnInit(): void {
	    // this.renderer.setStyle(
	    //   this.elRef.nativeElement,
	    //   'background-color',
	    //   'blue'
	    // );
	  }
	
	  @HostListener('mouseenter') mouseover(eventData: Event) {
	    this.renderer.setStyle(
	      this.elRef.nativeElement,
	      'background-color',
	      'blue'
	    );
	  }
	  @HostListener('mouseleave') mouseleave(eventData: Event) {
	    this.renderer.setStyle(
	      this.elRef.nativeElement,
	      'background-color',
	      'transparent'
	    );
	  }
	}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    BasicHighlightDirective,
	    BetterHighlightDirective,
	  ],
	  imports: [BrowserModule, FormsModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.html
	<p appBetterHighlight>Style me with a better directive!</p>
	```

100. **Using HostBinding to Bind to Host Properties**
	- Decorator that marks a DOM property or an element class, style or attribute as a host-binding property and supplies configuration metadata. Angular automatically checks host bindings during change detection, and if a binding changes it updates the host element of the directive.
	- `hostPropertyName?`: The DOM property that is bound to a data property. This field also accepts:
		- classes, prefixed by `class.`
		- styles, prefixed by `style.`
		- attributes, prefixed by `attr.`
	- Example:
		``` ts
		//better-highlight.directive.ts
		import {
		  Directive,
		  OnInit,
		  HostListener,
		  HostBinding,
		} from '@angular/core';
		
		@Directive({
		  selector: '[appBetterHighlight]',
		})
		export class BetterHighlightDirective implements OnInit {
		  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
		
		  constructor() {}
		
		  ngOnInit(): void {}
		
		  @HostListener('mouseenter') mouseover() {
		    this.backgroundColor = 'blue';
		  }
		  @HostListener('mouseleave') mouseleave() {
		    this.backgroundColor = 'transparent';
		  }
		}
		
		//app.component.html
	<p appBetterHighlight>Style me with a better directive!</p>
		```

101. **Binding to Directive Properties**
	- So here, we dynamically set the directives values from the parent component html.
	- We also learnt binding with the directive selector itself as a property.
	- Example:
``` ts
	//better-highlight.directive.ts
	@Directive({
	  selector: '[appBetterHighlight]',
	})
	export class BetterHighlightDirective implements OnInit {
	  @Input() defaultColor: string = 'transparent';
	
	  //Binding directive itself
	  @Input('appBetterHighlight') highlightColor: string = 'blue';
	
	  @HostBinding('style.backgroundColor') backgroundColor: string;
	
	  constructor() {}
	
	  ngOnInit(): void {
	    this.backgroundColor = this.defaultColor;
	  }
	
	  @HostListener('mouseenter') mouseover() {
	    this.backgroundColor = this.highlightColor;
	  }
	  @HostListener('mouseleave') mouseleave() {
	    this.backgroundColor = this.defaultColor;
	  }
	}
	
	//app.component.html
	<p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">
        Style me with a better directive!
      </p>
```

102. **What happens behind the Scenes on Structural Directives**
	- Example:
		``` ts
		//Using *ngIf = ""
		<div *ngIf="!onlyOdd">
	          <li
	            class="list-group-item"
	            [ngClass]="{ even: even % 2 === 0 }"
	            [ngStyle]="{
	              backgroundColor:
	                even % 2 === 0 ? 'rgb(161, 199, 161)' : 'transparent'
	            }"
	            *ngFor="let even of evenNumbers"
          >	
	            {{ even }}
	          </li>
	    </div>
	    
		//Using <ng-template [ngIf] = ""></ng-template>
		<ng-template [ngIf]="!onlyOdd">
	          <div>
	            <li
	              class="list-group-item"
	              [ngClass]="{ even: even % 2 === 0 }"
	              [ngStyle]="{
	                backgroundColor:
	                  even % 2 === 0 ? 'rgb(161, 199, 161)' : 'transparent'
	              }"
	              *ngFor="let even of evenNumbers"
            >	
	              {{ even }}
	            </li>
	          </div>
	    </ng-template>
		```

103. **Building a Structural Directive**
	- Example:
		``` ts
		//unless.directive.ts
		import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
		
		@Directive({
		  selector: '[appUnless]',
		})
		export class UnlessDirective {
		  @Input() set appUnless(condition: boolean) {
		    if (!condition) {
		      this.vcRef.createEmbeddedView(this.templateRef);
		    } else {
		      this.vcRef.clear();
		    }
		  }
		  constructor(
		    private templateRef: TemplateRef<any>,
		    private vcRef: ViewContainerRef
		  ) {}
		}
		
		//app.component.html
		<div *appUnless="onlyOdd">
          <li
            class="list-group-item"
            [ngClass]="{ even: even % 2 === 0 }"
            [ngStyle]="{
              backgroundColor:
                even % 2 === 0 ? 'rgb(161, 199, 161)' : 'transparent'
            }"
            *ngFor="let even of evenNumbers"
          >
            {{ even }}
          </li>
        </div>
		```

104. **Understanding ngSwitch**
	- Example:
		``` ts
		//app.component.ts
		 value = 0;
		
		//app.component.html
		<div [ngSwitch]="value">
	        <p *ngSwitchCase="5">Value is 5.</p>
	        <p *ngSwitchCase="10">Value is 10.</p>
	        <p *ngSwitchCase="100">Value is 100.</p>
	        <p *ngSwitchDefault>Value is default.</p>
	    </div>
		```