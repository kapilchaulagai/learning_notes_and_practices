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

==Assignment 1: Practicing Components==
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
	