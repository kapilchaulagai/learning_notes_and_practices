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