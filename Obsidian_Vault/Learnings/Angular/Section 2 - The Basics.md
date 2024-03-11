#HomeAngular - [[--Contents - Angular--]]
14. **Module Introduction**
	- How Angular Works?
	- What does actually angular do on the browser page?

15. **How an Angular App gets Loaded and Started**
	- appcomponent -> bootstrap -> index.html

16. **Components are Important!**
	Note: Angular in the end is a *JS framework*, changing your DOM ('HTML') at runtime!
	![[components.png]]

17. **Creating a New Component**
	- Under folder `app`: Create a new folder `server` for a new component.
	- Under folder `server`: Create new files: `server.component.ts` and `server.component.html`.
	- Code:
	``` ts
	//server.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-server',
	  templateUrl: './server.component.html',
	})
	export class ServerComponent {}
	```
	``` html
	//server.component.html
	//Empty
	```
18. **Understanding the Role of AppModule and Component Declaration**
	- This is how we declare component in our app: `srever.component`
	``` ts
	//app.module.ts
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	
	import { AppComponent } from './app.component';
	import { ServerComponent } from './server/server.component';
	
	@NgModule({
	  declarations: [AppComponent, ServerComponent],
	  imports: [BrowserModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}	
	```

19. **Working with Standalone Components**
	Depending on the Angular version your project is using, you can also build Components in a different way: As "Standalone Components".

	This course comes with an entire section focusing on Standalone Components - hence you'll learn more about this feature later.
	
	The main idea behind Standalone Components is that you can build Angular components & apps without (or with less) `@NgModule`s - i.e., Standalone Components allow you to write less (boilerplate) code.
	
	How Are Standalone Components Built?
	You build a standalone component by adding the standalone: true property/value pair to the `@Component` decorator.
	
	Like this:
	``` ts
	@Component({
	  standalone: true,
	  selector: 'app-cmp',
	  template: '<h1>I work standalone!</h1>'
	})
	export class SomeComponent {}
```
	Such components then don't have to (and shouldn't be) added to any `@NgModule`.
	
	Therefore, if you only work with such components, no `@NgModule` is needed at all.
	
	To "tell Angular" which features should be available in a Standalone Component (e.g., which other component selectors can be used there), you have to add the special `imports` property to the `@Component` selector.
	
	Like this:
	``` ts
	@Component({
	  standalone: true,
	  selector: 'app-cmp',
	  template: '<app-some-other-component />',
	  imports: [[SomeOtherComponent]]
	})
	export class SomeComponent {}
	```
	But again, you'll learn more about this later in the course, in a dedicated section.
	
	Should You Use Standalone Components
	Standalone components can reduce the amount of boilerplate code you have to write - after all, you don't have to add and manage those extra `@NgModule`s anymore.
	
	That being said, many Angular projects (especially big, established projects) still use `@NgModule`s since this was the only way of building Angular components for more than 5 years.
	
	That's also the reason for why this course - at the moment - uses `@NgModule`s as a default and covers Standalone Components in a separate section.

20. **Using Custom Components**
	- Let's connect `server.component.html` with `app.component.html`:
	``` html
	//server.component.html
	<h2>Hi! This is Server Component!</h2>
	
	//app.component.html
	<h1>I'm in the app.</h1>
	<hr />
	<app-server></app-server>
	```

21. **Creating Components with the CLI & Nesting Components**
	- Similarly how we have created custom component, we can achieve same thing by using following command: `ng g c servers`
	- Let's see some nesting components:
	``` ts
	//app.component.html
	<h1>I'm in the app.</h1>
	<hr />
	<app-servers></app-servers>

	//servers.component.html
	<app-server></app-server>
	<app-server></app-server>

	//server.component.html
	<h2>Hi! This is Server Component!</h2>
	```

22. **Working with Component Templates**
	- In a `component.ts` file, under the `template: '...'` we can also write inline html but it is better to have external file if it has more than 3 lines of content.
	- We use `template` instead of `templateUrl` when we write inline-html. For example:
	``` ts
	//Under the file: servers.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-servers',
	  template: ` <app-server></app-server>
	    <app-server></app-server>`,
	  styleUrl: './servers.component.css',
	})
	export class ServersComponent implements OnInit {
	  constructor() {}
	  ngOnInit(): void {
	    //throw new Error('Method not implemented.');
	  }
	}
	```

23. **Working with Component Styles**
	- In a `component.ts` file, under the `styles: '...'` we can also write inline css but it is better to have external file if it has more than 3 lines of content.
	- We use `styles` instead of `styleUrls` when we write inline-css. For example:
	``` ts
	//Under the file: app.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  //styleUrls: ['./app.component.css']
	  styles: [
		    `
	      h1 {
	        color: dodgerblue;
	      }
	    `,
	  ],
	})
	export class AppComponent {}
	```
	``` html
	//Under the file: app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12">
	      <h1>I'm in the app.</h1>
	      <hr />
	      <app-servers></app-servers>
	    </div>
	  </div>
	</div>
	```

24. **Fully Understanding the Component Selector**
	- Selector can select html element is different ways:
		1. As an element
		2. As an attriute
		3. As as class
	- Example:
	``` ts
	//Under app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12">
	      <h1>I'm in the app.</h1>
	      <hr />
	      <!-- Use element -->
	      <!-- <app-servers></app-servers> -->
	
	      <!-- Use attribute -->
	      <div app-servers></div>
	
	      <!-- Use class -->
	      <div class="app-servers"></div>
	    </div>
	  </div>
	</div>
	
	//Under servers.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  //Select Element
	  // selector: 'app-servers',
	
	  //Select attribute
	  // selector: `[app-servers]`,
	
	  //Select class
	  selector: '.app-servers',
	
	  template: ` <app-server></app-server>
	    <app-server></app-server>`,
	  styleUrl: './servers.component.css',
	})
	export class ServersComponent implements OnInit {
	  constructor() {}
	  ngOnInit(): void {
	    //throw new Error('Method not implemented.');
	  }
	}
	```

**==Assignment 1: Practicing Components==**
	Find it in the Angular Course Folder.

25. **`[OPTIONAL]` Assignment Solution**
	Already Completed and similar to previously created project in the previous lectures.

26. **What is Databinding?**
	![[databinding.png]]

27. **String Interpolation**
	- String interpolation is nothing but a syntax to write an single-line expression which has the string value or the value that is easy to convert into string inside the html file.
	- Such values can be taken dynamically from the properties or methods in the corresponding typescript class of the component.
	- Example:
	``` ts
	//server.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-server',
	  templateUrl: './server.component.html',
	})
	export class ServerComponent {
	  serverId = 101;
	  private serverName = 'no-offline';
	
	  getServerName() {
	    return this.serverName;
	  }
	}
	
	//server.component.html
	<h2>Hi! This is Server Component!</h2>
	<p>
	  {{ "Server" }} with server id {{ serverId }} has the name
	  {{ getServerName() }}.
	</p>
	```

28. **Property Binding**
	- Below example which shows how we have worked with disabled attribute of  the button on run time shows the property binding:
	``` ts
	//servers.component.html
		<button class="btn btn-primary" [disabled]="!allowNewServer">ADD SERVER</button>
	<app-server></app-server>
	<app-server></app-server>
	
	//servers.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-servers',
	  templateUrl: './servers.component.html',
	  styleUrl: './servers.component.css',
	})
	export class ServersComponent implements OnInit {
	  allowNewServer = false;
	
	  constructor() {
	    setTimeout(() => {
	      this.allowNewServer = true;
	    }, 2000);
	  }
	  ngOnInit(): void {
	    //throw new Error('Method not implemented.');
	  }
	}
	```

29. **Property Binding vs String Interpolation**
	- Example:
	``` ts
	//servers.component.html
		<button class="btn btn-primary" [disabled]="!allowNewServer">ADD SERVER</button>
	
	<!-- String Interpolation -->
	<!-- <p>{{ allowNewServer }}</p> -->
	
	<!-- Property Binding -->
	<p [innerText]="allowNewServer"></p>
	
	<app-server></app-server>
	<app-server></app-server>
	```
	
30. **Event Binding**
	- It is similar to property binding and string interpolation but has different syntax to write it.
	- Example:
	``` ts
	//servers.component.html
	<button
	  class="btn btn-primary"
	  [disabled]="!allowNewServer"
	  (click)="onCreateServer()"
>	
	  ADD SERVER
	</button>
	
	<p>{{ serverCreationStatus }}</p>
	
	<!-- String Interpolation -->
	<!-- <p>{{ allowNewServer }}</p> -->
	
	<!-- Property Binding -->
	<!-- <p [innerText]="allowNewServer"></p> -->
	
	<app-server></app-server>
	<app-server></app-server>
	
	//servers.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-servers',
	  templateUrl: './servers.component.html',
	  styleUrl: './servers.component.css',
	})
	export class ServersComponent implements OnInit {
	  allowNewServer = false;
	  serverCreationStatus = 'No server was created!';
	
	  constructor() {
	    setTimeout(() => {
	      this.allowNewServer = true;
	    }, 2000);
	  }
	  ngOnInit(): void {
	    //throw new Error('Method not implemented.');
	  }
	
	  onCreateServer() {
	    this.serverCreationStatus = 'Server was created!';
	  }
	}
	```

31. **Bindable Properties and Events**
	How do you know to which Properties or Events of HTML Elements you may bind? You can basically bind to all Properties and Events - a good idea is to console.log()  the element you're interested in to see which properties and events it offers.
	
	Important: For events, you don't bind to onclick but only to click (=> (click)).
	
	The MDN (Mozilla Developer Network) offers nice lists of all properties and events of the element you're interested in. Googling for YOUR_ELEMENT properties  or YOUR_ELEMENT events  should yield nice results.

32. **Passing and Using Data with Event Binding**
	- Example `$event`:
	``` ts
	//servers.component.html
	//This is how we Pass the data
	<label for="server">Server Name</label>
	<input type="text" class="form-control" (input)="onUpdateServerName($event)" />
	
	<hr />
	
	<p>{{ serverName }}</p>
	<button
	  class="btn btn-primary"
	  [disabled]="!allowNewServer"
	  (click)="onCreateServer()"
>	
	  ADD SERVER
	</button>
	
	<p>{{ serverCreationStatus }}</p>
	
	<app-server></app-server>
	<app-server></app-server>
	
	//servers.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-servers',
	  templateUrl: './servers.component.html',
	  styleUrl: './servers.component.css',
	})
	export class ServersComponent implements OnInit {
	  allowNewServer = false;
	  serverCreationStatus = 'No server was created!';
	  serverName = '';
	
	  constructor() {
	    setTimeout(() => {
	      this.allowNewServer = true;
	    }, 2000);
	  }
	  ngOnInit(): void {
	    //throw new Error('Method not implemented.');
	  }
	
	  onCreateServer() {
	    this.serverCreationStatus = 'Server was created!';
	  }
	
	  onUpdateServerName(event: any) {
	    this.serverName = (<HTMLInputElement>event.target).value;
	  }
	}
	```

33. **Important: FormsModule is Required for Two-Way-Binding!**
	Important: For Two-Way-Binding (covered in the next lecture) to work, you need to enable the `ngModel`  directive. This is done by adding the `FormsModule`  to the `imports[]`  array in the AppModule.
	
	You then also need to add the import from `@angular/forms`  in the app.module.ts file:
	
	`import { FormsModule } from '@angular/forms'; `

34. **Two-Way-Databinding**
	- Two-way data binding in Angular refers to the synchronization of data between the model (component) and the view (template).
	- Example:
	``` ts
	//servers.component.html
	<label>Server Name</label>
	
	<!-- Two Way Binding -->
	<input
	  type="text"
	  class="form-control"
	  [(ngModel)]="serverName"
	  placeholder="Enter Server Name"
	/>
	
	<!-- Event Binding -->
	<input
	  type="text"
	  class="form-control-1"
	  (input)="onUpdateServerName($event)"
	/>
	
	<hr />
	<p>{{ serverName }}</p>
	<button
	  class="btn btn-primary"
	  [disabled]="!allowNewServer"
	  (click)="onCreateServer()"
>	
	  ADD SERVER
	</button>
	
	<p>{{ serverCreationStatus }}</p>
	
	<app-server></app-server>
	<app-server></app-server>
	
	//servers.component.ts
	import { Component, OnInit } from '@angular/core';
	
	@Component({
	  selector: 'app-servers',
	  templateUrl: './servers.component.html',
	  styleUrl: './servers.component.css',
	})
	export class ServersComponent implements OnInit {
	  allowNewServer = false;
	  serverCreationStatus = 'No server was created!';
	  serverName = 'TestServer';
	
	  constructor() {
	    setTimeout(() => {
	      this.allowNewServer = true;
	    }, 2000);
	  }
	  ngOnInit(): void {
	    //throw new Error('Method not implemented.');
	  }
	
	  onCreateServer() {
	    this.serverCreationStatus = 'Server was created!';
	  }
	
	  onUpdateServerName(event: any) {
	    this.serverName = (<HTMLInputElement>event.target).value;
	  }
	}
	```

35. **Combining all forms of Databinding**
	Already used in previous examples.

**==Assignment 2: Practicing Databinding==**
	Find it in the Angular Course Folder.

36. **`[OPTIONAL]` Assignment Solution**
	Already Completed and similar to previously created project in the previous lectures.

37. **Understanding Directives**
	- What are Directives? : Directives are instructions in the DOM!
	``` ts
	//Example:
	<p appTurnGreen> Receives a green background!</p>
	
	@Directive({
		selector: '[appTurnGreen]'
	})
	export class TurnGreenDirective{
		...
	}
	```

38. **Using ngIf to Output Data Conditionally**
	- Example:
	``` ts
	//Example:
	//servers.component.ts : add a property
	  serverCreated = false;
	  
	//servers.component.html
	<label>Server Name</label>
	
	<input
	  type="text"
	  class="form-control"
	  [(ngModel)]="serverName"
	  placeholder="Enter Server Name"
	/>
	
	<hr />
	<button
	  class="btn btn-primary"
	  [disabled]="!allowNewServer"
	  (click)="onCreateServer()"
>	
	  ADD SERVER
	</button>
	
	<p *ngIf="serverCreated">
	  Server was created, server name is {{ serverName }}.
	</p>
	
	<app-server></app-server>
	<app-server></app-server>
	```

39. **Enhancing ngIf with an Else Condition**
	- Just some addition in the previous lectures HTML content:
	``` ts
	//servers.component.html
	<label>Server Name</label>
	
	<input
	  type="text"
	  class="form-control"
	  [(ngModel)]="serverName"
	  placeholder="Enter Server Name"
	/>
	
	<hr />
	<button
	  class="btn btn-primary"
	  [disabled]="!allowNewServer"
	  (click)="onCreateServer()"
>	
	  ADD SERVER
	</button>
	
	<p *ngIf="serverCreated; else noServer">
	  Server was created, server name is {{ serverName }}.
	</p>
	
	<ng-template #noServer>
	  <p>No Server was created.</p>
	</ng-template>
	
	<app-server></app-server>
	<app-server></app-server>
	```

40. **Angular 17: Alternative "if" Syntax**
	If you're in an Angular 17 project (and only then!), you can also use an alternative syntax for outputting conditional content:
	
	Instead of using `*ngIf`, you can use a built-in` @if` template control flow statement.
	``` ts
	@if (someCondition) {
	  <p>Only visible if 'someCondition' is true</p>
	}
	```
	would replace
	``` ts
	<p *ngIf="someCondition">Only visible if 'someCondition' is true</p>
	```
	The advantage of the new syntax is that it can be slightly more efficient under the hood and that it does not rely on NgIf or the CommonModule being imported / available.
	
	Using it is entirely optional! It's also worth noting that this new syntax is only available in "Developer Preview" right now and therefore may change in the future!
	
	You can learn more about this syntax here. And I'll share more details in an upcoming course update (which you'll get for free & which I'll announce once it's done) :-)

41. **Styling Elements Dynamically with ngStyle**
	- Unlike structural directives, attribute directives don't add or remove elements. They only change the element they were placed on.
	- Example:
	``` ts
	//server.component.html
	<h2>Hi! This is Server Component!</h2>
	<p [ngStyle]="{ backgroundColor: getColor() }">
	  {{ "Server" }} with server id {{ serverId }} is {{ serverStatus }}.
	</p>
	
	//server.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-server',
	  templateUrl: './server.component.html',
	})
	export class ServerComponent {
	  serverId = 101;
	  serverStatus = 'offline';
	
	  constructor() {
	    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
	  }
	
	  getServerStatus() {
	    this.serverStatus;
	  }
	
	  getColor() {
	    return this.serverStatus === 'online' ? 'green' : 'red';
	  }
	}
	```

42. **Applying CSS Classes Dynamically with ngClass**
	- In Angular, the `ngClass` directive is used to dynamically add and remove CSS classes to HTML elements based on certain conditions.
	- Example:
	``` ts
	//server.component.html
	<h2>Hi! This is Server Component!</h2>
	<p
	  [ngStyle]="{ backgroundColor: getColor() }"
	  [ngClass]="{ online: serverStatus === 'online' }"
>	
	  {{ "Server" }} with server id {{ serverId }} is {{ serverStatus }}.
	</p>
	
	//server.component.ts
	 import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-server',
	  templateUrl: './server.component.html',
	  styles: [
	    `
	      .online {
	        color: white;
	      }
	    `,
	  ],
	})
	export class ServerComponent {
	  serverId = 101;
	  serverStatus = 'offline';
	
	  constructor() {
	    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
	  }
	
	  getServerStatus() {
	    this.serverStatus;
	  }
	
	  getColor() {
	    return this.serverStatus === 'online' ? 'green' : 'red';
	  }
	}
	```

43. **Outputting Lists with ngFor**
	- Example:
	``` ts
	//servers.component.html
	<app-server *ngFor="let server of servers"></app-server>
	
	//servers.component.ts
	servers = ['Testserver 1', 'Testserver 2'];
	onCreateServer() {
	    this.serverCreated = true;
	    this.servers.push(this.serverName);
	    this.serverCreationStatus =
	      'Server was created! Name is ' + this.serverName;
	  }
	```

44. Angular 17: Alternative "for" Syntax
	If you're in an Angular 17 project (and only then!), you can also use an alternative syntax for outputting conditional content:
	
	Instead of using `*ngFor`, you can use a built-in `@for` template control flow statement.
	``` ts
	@for (item of items; track item.id) {
		  <li>{{ item.title }}</li>
	  }
	```
	would replace
	``` ts
	<li *ngFor="let item of items">{{ item.title }}</li>
	```
	The advantage of the new syntax is that it can be slightly more efficient under the hood and that it does not rely on NgFor or the CommonModule being imported / available.
	
	The track item.id part is required when using this new syntax - it ensures that Angular can efficiently track and re-render (if needed) the list items.
	
	Using it is entirely optional! It's also worth noting that this new syntax is only available in "Developer Preview" right now and therefore may change in the future!
	
	You can learn more about this syntax here. And I'll share more details in an upcoming course update (which you'll get for free & which I'll announce once it's done) :-)

**==Assignment 3: Practicing Directives==**
	Find it in the Angular Course Folder.

45. **`[OPTIONAL]` Assignment Solution**
	Already Completed and similar to previously created project in the previous lectures.

46. **Getting the Index when using ngFor**
	- Example:
	``` ts
	<div class="container">
	  <button (click)="showDetails()" id="detailsBtn">Display Details</button><br />
	  <p [hidden]="!displayDetails" id="secretParagraph">Secret Password = tuna</p>
	  <ul
	    *ngFor="let entry of logs; let i = index"
	    [ngStyle]="{ backgroundColor: entry > 5 ? getColor() : '' }"
	    [ngClass]="{
	      moreThanFive: entry > 5
	    }"
  >	
	    <li>{{ entry }} - {{ i + 1 }}</li>
	  </ul>
	</div>
	```