#HomeAngular - [[--Contents - Angular--]]
66. **Module Introduction**
	- Understanding Components & Databinding

67. **Splitting Apps into Components**
	- Just splitted the codes but not the properties.
	- Still app is failing.

68. **Property & Event Binding Overview**
	- These are the different ways we can do that:
	  ![[property-event-binding.png]]

69. **Binding to Custom Properties**
	- Check how `[element]` has been binded and Check how `@Input()` decorator has been used.
	- Example:
	``` ts
	//app.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css'],
	})
	export class AppComponent {
	  serverElements = [
	    { type: 'server', name: 'TestServer', content: 'Just a test!' },
	  ];
	}
	
	//app.component.html
	<div class="container">
	  <div class="row"></div>
	  <app-cockpit></app-cockpit>
	  <hr />
	  <div class="row">
	    <div class="col-xs-12">
	      <app-server-element
	        *ngFor="let serverElement of serverElements"
	        [element]="serverElement"
      >	</app-server-element>
	    </div>
	  </div>
	</div>
	
	//server-element.component.ts
	import { Component, Input, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-server-element',
	  templateUrl: './server-element.component.html',
	  styleUrl: './server-element.component.css',
	})
	export class ServerElementComponent implements OnInit {
	  @Input() element: { type: string; name: string; content: string };
	
	  constructor() {}
	
	  ngOnInit(): void {}
	}
	
	//server-element.component.html
	<div class="panel panel-default">
	  <div class="panel-heading">{{ element.name }}</div>
	  <div class="panel-body">
	    <p>
	      <strong *ngIf="element.type === 'server'" style="color: red">{{
	        element.content
	      }}</strong>
	      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
	    </p>
	  </div>
	</div>
	```

70. **Assigning an Alias to Custom Properties**
	- Only change in the above lecture code for assigning alias is shown in below example:
	``` TS
	//server-element.component.ts
	  @Input('srvElement') element: { type: string; name: string; content: string };
	
	//app.component.html
	<app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"
      ></app-server-element>
	```

71. **Binding to Custom Events**
	- Created event using Event Emitter.
	- Check the event binded on AppComponent html
	- Example: 
	``` ts
	//app.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css'],
	})
	export class AppComponent {
	  serverElements = [
	    { type: 'server', name: 'TestServer', content: 'Just a test!' },
	  ];
	
	  onServerAdded(serverData: { serverName: string; serverContent: string }) {
	    this.serverElements.push({
	      type: 'server',
	      name: serverData.serverName,
	      content: serverData.serverContent,
	    });
	  }
	
	  onBlueprintAdded(serverData: { serverName: string; serverContent: string }) {
	    this.serverElements.push({
	      type: 'blueprint',
	      name: serverData.serverName,
	      content: serverData.serverContent,
	    });
	  }
	}
	
	//app.component.html
	<div class="container">
	  <div class="row"></div>
	  <app-cockpit
	    (serverCreated)="onServerAdded($event)"
	    (blueprintCreated)="onBlueprintAdded($event)"
  >	</app-cockpit>
	  <hr />
	  <div class="row">
	    <div class="col-xs-12">
	      <app-server-element
	        *ngFor="let serverElement of serverElements"
	        [srvElement]="serverElement"
      >	</app-server-element>
	    </div>
	  </div>
	</div>
	
	//cockpit.component.ts
	import { Component, EventEmitter, Output } from '@angular/core';
	
	@Component({
	  selector: 'app-cockpit',
	  templateUrl: './cockpit.component.html',
	  styleUrl: './cockpit.component.css',
	})
	export class CockpitComponent {
	  @Output() serverCreated = new EventEmitter<{
	    serverName: string;
	    serverContent: string;
	  }>();
	  @Output() bluePrintCreated = new EventEmitter<{
	    serverName: string;
	    serverContent: string;
	  }>();
	  newServerName = '';
	  newServerContent = '';
	
	  onAddServer() {
	    this.serverCreated.emit({
	      serverName: this.newServerName,
	      serverContent: this.newServerContent,
	    });
	  }
	
	  onAddBlueprint() {
	    this.serverCreated.emit({
	      serverName: this.newServerName,
	      serverContent: this.newServerContent,
	    });
	  }
	}
	
	//cockpit.component.html
	<div class="col-xs-12">
	  <p>Add new Servers or blueprints!</p>
	  <label>Server Name</label>
	  <input type="text" class="form-control" [(ngModel)]="newServerName" />
	  <label>Server Content</label>
	  <input type="text" class="form-control" [(ngModel)]="newServerContent" />
	  <br />
	  <button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
	  <button class="btn btn-primary" (click)="onAddBlueprint()">
	    Add Server Blueprint
	  </button>
	</div>
	```

72. **Assigning an Alias to Custom Event**
	- Only change in the above lecture code for assigning alias is shown in below example:
	``` ts
	//cockpit.component.ts
	 @Output('srvCreated') serverCreated = new EventEmitter<{
	    serverName: string;
	    serverContent: string;
	  }>();
	  @Output('bpCreated') bluePrintCreated = new EventEmitter<{
	    serverName: string;
	    serverContent: string;
	  }>();
	
	//app.component.html
	<app-cockpit
	    (srvCreated)="onServerAdded($event)"
	    (bpCreated)="onBlueprintAdded($event)"
  >	</app-cockpit>
	```

73. **Custom Property & Custom Event Binding Summary**
	- When the components are in greater distant then it might not be better option for code readability and will look complex.

74. **Understanding View Encapsulation**
	- We  can apply CSS to specific component so that it is applicable to only the corresponding component. It is known as style encapsulation.
	- Example:
	``` ts
	//server-element.component.html
	<div class="panel panel-default">
	  <div class="panel-heading">{{ element.name }}</div>
	  <div class="panel-body">
	    <p>
	      <strong *ngIf="element.type === 'server'" style="color: red">{{
	        element.content
	      }}</strong>
	      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
	    </p>
	  </div>
	</div>
	
	//server-element.component.css
	p {
	    color: blue;
	  }
	```

75. **More on View Encapsulation**
	``` ts
	//server-element.component.ts
		import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
	
	@Component({
	  selector: 'app-server-element',
	  templateUrl: './server-element.component.html',
	  styleUrl: './server-element.component.css',
	  encapsulation: ViewEncapsulation.Emulated, //None, Native
	})
	export class ServerElementComponent implements OnInit {
	  @Input('srvElement') element: { type: string; name: string; content: string };
	
	  constructor() {}
	
	  ngOnInit(): void {}
	}
	```
	Here's a brief summary of the differences:
	- **Emulated**: Styles are scoped to the component using unique attributes. Default behavior, widely supported, and provides good encapsulation without relying on Shadow DOM.
	- **None**: Styles are not encapsulated, affecting the entire application. Useful for defining global styles or when you need to style elements outside of the component's template.
	- **Shadow DOM (Native)**: Styles are encapsulated using the browser's native Shadow DOM. Provides encapsulation similar to Emulated mode but relies on native browser support for Shadow DOM.

76. **Using Local References in Templates**
	- This type of Local References are used only inside the template (not throughout the component but only inside the html template).
	- They are written as; `#serverNameElement`.
	- Example:
	``` ts
	//cockpit.component.html
	<div class="col-xs-12">
	  <p>Add new Servers or blueprints!</p>
	  <label>Server Name</label>
	  <!-- <input type="text" class="form-control" [(ngModel)]="newServerName" /> -->
	  <input type="text" class="form-control" #serverNameInput />
	  <label>Server Content</label>
	  <input type="text" class="form-control" [(ngModel)]="newServerContent" />
	  <br />
	  <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">
	    Add Server
	  </button>
	  <button class="btn btn-primary" (click)="onAddBlueprint(serverNameInput)">
	    Add Server Blueprint
	  </button>
	</div>
	
	//cockpit.component.ts
	 //newServerName = '';
	  newServerContent = '';
	
	  onAddServer(nameInput: HTMLInputElement) {
	    this.serverCreated.emit({
	      // serverName: this.newServerName,
	      serverName: nameInput.value,
	      serverContent: this.newServerContent,
	    });
	  }
	
	  onAddBlueprint(nameInput: HTMLInputElement) {
	    this.bluePrintCreated.emit({
	      //serverName: this.newServerName,
	      serverName: nameInput.value,
	      serverContent: this.newServerContent,
	    });
	  }
	```

77. **@ViewChild() in Angular 8+**
	In **Angular 8+**, the `@ViewChild()` syntax which you'll see in the next lecture needs to be changed slightly:
	Instead of:
	
	``` ts
	@ViewChild('serverContentInput') serverContentInput: ElementRef;
	```
	use
	``` ts
	@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
	```
	The same change (add `{ static: true }` as a second argument) needs to be applied to ALL usages of `@ViewChild()` (and also `@ContentChild()` which you'll learn about later) IF you plan on accessing the selected element inside of `ngOnInit()`.
	
	If you DON'T access the selected element in `ngOnInit` (but anywhere else in your component), set `static: false` instead!
	
	If you're using Angular 9+, you only need to add `{ static: true }` (if needed) but not `{ static: false }`.


78. **Getting Access to the Template & DOM with @ViewChild**
	- In real project, we don't get the element like this but we have better ways to do so that we will learn further.
	- Example:
	``` ts
	//cockpit.component.html
	<div class="col-xs-12">
	  <p>Add new Servers or blueprints!</p>
	  <label>Server Name</label>
	  <input type="text" class="form-control" #serverNameInput />
	  <label>Server Content</label>
	  <input type="text" class="form-control" #serverContentInput />
	  <br />
	  <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">
	    Add Server
	  </button>
	  <button class="btn btn-primary" (click)="onAddBlueprint(serverNameInput)">
	    Add Server Blueprint
	  </button>
	</div>
	
	//cockpit.component.ts
	export class CockpitComponent implements OnInit {
	  @Output('srvCreated') serverCreated = new EventEmitter<{
	    serverName: string;
	    serverContent: string;
	  }>();
	
	  @Output('bpCreated') bluePrintCreated = new EventEmitter<{
	    serverName: string;
	    serverContent: string;
	  }>();
	
	  //newServerName = '';
	  //newServerContent = '';
	  @ViewChild('serverContentInput')
	  serverContentInput: ElementRef;
	
	  constructor() {}
	
	  ngOnInit(): void {}
	
	  onAddServer(nameInput: HTMLInputElement) {
	    this.serverCreated.emit({
	      // serverName: this.newServerName,
	      serverName: nameInput.value,
	      serverContent: this.serverContentInput.nativeElement.value,
	    });
	  }
	
	  onAddBlueprint(nameInput: HTMLInputElement) {
	    this.bluePrintCreated.emit({
	      //serverName: this.newServerName,
	      serverName: nameInput.value,
	      serverContent: this.serverContentInput.nativeElement.value,
	    });
	  }
	}
	```

79. **Projecting Content into Components with ng-content**
	- `<ng-content></ng-content>` this tag helps to project the content inside the component tag as shown in the below example.
	- Example:
	``` ts
	//server-element.component.html
	<div class="panel panel-default">
	  <div class="panel-heading">{{ element.name }}</div>
	  <div class="panel-body">
	    <ng-content></ng-content>
	  </div>
	</div>
	
	//app.component.ts
	<div class="container">
	  <div class="row"></div>
	  <app-cockpit
	    (srvCreated)="onServerAdded($event)"
	    (bpCreated)="onBlueprintAdded($event)"
  >	</app-cockpit>
	  <hr />
	  <div class="row">
	    <div class="col-xs-12">
	      <app-server-element
	        *ngFor="let serverElement of serverElements"
	        [srvElement]="serverElement"
      >	
	        <p>
	          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{
	            serverElement.content
	          }}</strong>
	          <em *ngIf="serverElement.type === 'blueprint'">{{
	            serverElement.content
	          }}</em>
	        </p></app-server-element
      >	
	    </div>
	  </div>
	</div>
	```

80. **Understanding the Component Lifecycle**
	![[lifecycle-angular.png]]

81. **Seeing Lifecycle Hooks in Action**
	- Example:
	``` ts
	//server-element.component.html
	<div class="panel panel-default">
	  <!-- <div class="panel-heading">{{ element.name }}</div> -->
	  <div class="panel-heading">{{ name }}</div>
	  <div class="panel-body">
	    <ng-content></ng-content>
	  </div>
	</div>
	
	//server-element.component.ts
	export class ServerElementComponent
	  implements
	    OnInit,
	    OnChanges,
	    DoCheck,
	    AfterContentInit,
	    AfterContentChecked,
	    AfterViewInit,
	    AfterViewChecked,
	    OnDestroy
	{
	  @Input('srvElement') element: { type: string; name: string; content: string };
	  @Input() name: string;
	
	  constructor() {
	    console.log('Constructor called!');
	  }
	
	  ngOnChanges(changes: SimpleChanges): void {
	    console.log('ngOnChanges called!');
	    console.log(changes);
	  }
	  ngOnInit(): void {
	    console.log('ngOnInit called!');
	  }
	
	  ngDoCheck(): void {
	    console.log('ngDoCheck called!');
	  }
	
	  ngAfterContentInit(): void {
	    console.log('ngAfterContentInit called!');
	  }
	
	  ngAfterContentChecked(): void {
	    console.log('ngAfterContentChecked called!');
	  }
	
	  ngAfterViewInit(): void {
	    console.log('ngAfterViewInit called!');
	  }
	
	  ngAfterViewChecked(): void {
	    console.log('ngAfterViewChecked called!');
	  }
	
	  ngOnDestroy(): void {
	    console.log('ngOnDestroy called!');
	  }
	}

	//app.component.html
	<div class="container">
	  <div class="row"></div>
	  <app-cockpit
	    (srvCreated)="onServerAdded($event)"
	    (bpCreated)="onBlueprintAdded($event)"
  >	</app-cockpit>
	  <hr />
	  <div class="row">
	    <div class="col-xs-12">
	      <button class="btn btn-primary" (click)="onChangeFirst()">
	        Change 1st Element
	      </button>
	      <button class="btn btn-danger" (click)="onDestroyFirst()">
	        Destroy 1st Component
	      </button>
	      <br />
	      <app-server-element
	        *ngFor="let serverElement of serverElements"
	        [srvElement]="serverElement"
	        [name]="serverElement.name"
      >	
	        <p>
	          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{
	            serverElement.content
	          }}</strong>
	          <em *ngIf="serverElement.type === 'blueprint'">{{
	            serverElement.content
	          }}</em>
	        </p></app-server-element
      >	
	    </div>
	  </div>
	</div>

	//app.component.ts
	export class AppComponent {
	  serverElements = [
	    { type: 'server', name: 'TestServer', content: 'Just a test!' },
	  ];
	
	  onServerAdded(serverData: { serverName: string; serverContent: string }) {
	    this.serverElements.push({
	      type: 'server',
	      name: serverData.serverName,
	      content: serverData.serverContent,
	    });
	  }
	
	  onBlueprintAdded(serverData: { serverName: string; serverContent: string }) {
	    this.serverElements.push({
	      type: 'blueprint',
	      name: serverData.serverName,
	      content: serverData.serverContent,
	    });
	  }
	  onChangeFirst() {
	    this.serverElements[0].name = 'Changed!';
	  }
	
	  onDestroyFirst() {
	    this.serverElements.splice(0, 1);
	  }
	}
	```

82. **Lifecycle Hooks and Template Access**
	- Elements in the DOM can't be accessed inside ngOnInit() since they will be accessible inside the ngAfterViewInit() after rendering.
	- Example:
	``` ts
	//server-element.component.html
	<div class="panel panel-default">
	  <div class="panel-heading" #heading>{{ name }}</div>
	  <div class="panel-body">
	    <ng-content></ng-content>
	  </div>
	</div>
	
	//server-element.component.ts
	...
	  @ViewChild('heading') header: ElementRef;
	  
	  ngOnInit(): void {
	    console.log('ngOnInit called!');
	    //Error: we don't have access to header yet
	    //console.log('Text Content: ' + this.header.nativeElement.textContent);
	  }
	
	 ngAfterViewInit(): void {
	    console.log('ngAfterViewInit called!');
	    //Success
	    console.log('Text Content: ' + this.header.nativeElement.textContent);
	  } 
	  ...
	```

83. **@ContentChild() in Angular 8+**
	For **ContentChild**, the same adjustments as for **ViewChild** apply: [https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14865241](https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14865241)

84. **Getting Access to ng-content with @ContentChild**
	- It is similar to `@ViewChild()` but the access to the  `@ContentChild()` can be done inside the `ngAfterContentInit()` after contents in the DOM are rendered.
	- Example:
	``` ts
	//app.component.html
	...
	<app-server-element
        *ngFor="let serverElement of serverElements"
        [srvElement]="serverElement"
        [name]="serverElement.name"
      >
        <p #contentParagraph>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{
            serverElement.content
          }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{
            serverElement.content
          }}</em>
        </p></app-server-element
      >
	...
	
	//server-element.component.ts
	...
	@ContentChild('contentParagraph') paragraph: ElementRef; 
	ngOnInit(): void {
	    console.log('ngOnInit called!');
	    //Error: we don't have access to content yet
	    // console.log(
	    //   'Paragraph Content: ' + this.paragraph.nativeElement.textContent
	    // );
	  }
	
	 ngAfterContentInit(): void {
	    console.log('ngAfterContentInit called!');
	    //Success
	    console.log(
	      'Paragraph Content: ' + this.paragraph.nativeElement.textContent
	    );
	  }
	...
	```

85. **Wrap Up**
	- Custom Event Binding
	- Using Local Reference
	- Access to the different DOM elements at different point of Lifecycle
	- and so on.

	**==Assignment 1: Practicing Components==**
	Find it in the Angular Course Folder.

86. **`[OPTIONAL]` Assignment Solution**
	Already Completed and similar to previously created project in the previous lectures.