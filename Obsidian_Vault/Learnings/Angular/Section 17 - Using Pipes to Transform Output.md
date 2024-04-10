#HomeAngular - [[--Contents - Angular--]]
244. **Introduction & Why Pipes are Useful**
	- What are Pipes?![[pipes.png]]

245. **Using Pipes**
	- Example with `uppercase` in-built pipe:
``` ts
	//app.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css']
	})
	export class AppComponent {
	  servers = [
	    {
	      instanceType: 'medium',
	      name: 'Production Server',
	      status: 'stable',
	      started: new Date(15, 1, 2017)
	    },
	    {
	      instanceType: 'large',
	      name: 'User Database',
	      status: 'stable',
	      started: new Date(15, 1, 2017)
	    },
	    {
	      instanceType: 'small',
	      name: 'Development Server',
	      status: 'offline',
	      started: new Date(15, 1, 2017)
	    },
	    {
	      instanceType: 'small',
	      name: 'Testing Environment Server',
	      status: 'stable',
	      started: new Date(15, 1, 2017)
	    }
	  ];
	  getStatusClasses(server: {instanceType: string, name: string, status: string, started: Date}) {
	    return {
	      'list-group-item-success': server.status === 'stable',
	      'list-group-item-warning': server.status === 'offline',
	      'list-group-item-danger': server.status === 'critical'
	    };
	  }
	}
	
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
	      <ul class="list-group">
	        <li
	          class="list-group-item"
	          *ngFor="let server of servers"
	          [ngClass]="getStatusClasses(server)"
        >	
	          <span class="badge">
	            {{ server.status }}
	          </span>
	          <strong>{{ server.name }}</strong> |
	          {{ server.instanceType | uppercase }} |
	          {{ server.started }}
	        </li>
	      </ul>
	    </div>
	  </div>
	</div>
```

246. **Parameterizing Pipes**
	-  `date : "fullDate"` pipe is an example of parameterized pipe.
	- `date` pipe doesn't take more than one parameter but also if it does, we can set it like this:
``` ts
	//just an example
	{{ server.started | date : "fullDate":"UTC" }}
```

247. **Where to learn more about Pipes**
	- Pipe: https://angular.io/api?query=pipe

248. **Chatting Multiple Pipes**
	- Order is important and it is left-to-right.
	- Example:
``` ts
	//first date pipe then uppercase
	{{ server.started | date : "fullDate" | uppercase }}
```

249. **Creating a Custom Pipe**
	- Example:
``` ts
	//shorten.pipe.ts
	import { Pipe, PipeTransform } from '@angular/core';
	
	@Pipe({
	  name: 'shorten',
	})
	export class ShortenPipe implements PipeTransform {
	  transform(value: any) {
	    return value.substr(0, 10) + '...';
	  }
	}
	
	//app.module.ts
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { FormsModule } from '@angular/forms';
	
	import { AppComponent } from './app.component';
	import { ShortenPipe } from './shorten.pipe';
	
	@NgModule({
	  declarations: [AppComponent, ShortenPipe],
	  imports: [BrowserModule, FormsModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.html
	<li
          class="list-group-item"
          *ngFor="let server of servers"
          [ngClass]="getStatusClasses(server)"
        >
          <span class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date : "fullDate" | uppercase }}
    </li>
```

250. **Parameterizing a Custom Pipe**
	- Example:
``` ts
	//shorten.pipe.ts
	@Pipe({
	  name: 'shorten',
	})
	export class ShortenPipe implements PipeTransform {
	  transform(value: any, limit: number) {
	    if (value.length > limit) {
	      return value.substr(0, limit) + '...';
	    } else {
	      return value;
	    }
	  }
	}
	
	//app.component.html
	...
	<strong>{{ server.name | shorten : 5 }}</strong> |
	...
```

251. **Example: Creating a Filter Pipe**
	- To generate pipe using CLI: Run `ng g p pipe-name`.
	- Don't forget to check the FilterPipe inside the declarations of AppModule.
	- Example:
``` ts
	//filter.pipe.ts
	import { Pipe, PipeTransform } from '@angular/core';
	
	@Pipe({
	  name: 'filter',
	})
	export class FilterPipe implements PipeTransform {
	  transform(value: any, filterString: string, propName: string): any {
	    if (value.length === 0 || filterString === '') return value;
	    const resultArray = [];
	    for (const item of value) {
	      if (item[propName] === filterString) {
	        resultArray.push(item);
	      }
	    }
	    return resultArray;
	  }
	}
	
	//app.component.html
	...
	<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus" />
      <hr />
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let server of servers | filter : filteredStatus : 'status'"
          [ngClass]="getStatusClasses(server)"
        >
          <span class="badge">
            {{ server.status }}
          </span>
          <strong>{{ server.name | shorten : 5 }}</strong> |
          {{ server.instanceType | uppercase }} |
          {{ server.started | date : "fullDate" | uppercase }}
        </li>
      </ul>
    </div>
	...
```

252. **Pure and Impure Pipes (or: How to "fix" the Filter Pipe)**
	- Updating Arrays or Objects doesn't trigger it while pipe is being used.
	- That means we have to re-run the pipe by making some changes to see the changes reflected in the UI.
	- To resolve this issue, we need to add second parameter in `@Pipe({})` decorator i.e, `pure: false`.
	- Example:
``` ts
	//filter.pipe.ts
	import { Pipe, PipeTransform } from '@angular/core';
	
	@Pipe({
	  name: 'filter',
	  pure: false,
	})
	export class FilterPipe implements PipeTransform {
	  transform(value: any, filterString: string, propName: string): any {
	    if (value.length === 0 || filterString === '') return value;
	    const resultArray = [];
	    for (const item of value) {
	      if (item[propName] === filterString) {
	        resultArray.push(item);
	      }
	    }
	    return resultArray;
	  }
	}
	
	//app.component.html
	<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <input type="text" [(ngModel)]="filteredStatus" />
      <br />
      <button class="btn btn-primary" (click)="onAddServer()">
        Add Server
      </button>
      ...
      ...
    </div>
    
    //app.component.ts
    ...
      filteredStatus = '';
	...
	
	  onAddServer() {
	    this.servers.push({
	      instanceType: 'small',
	      name: 'New Server',
	      status: 'stable',
	      started: new Date(15, 1, 2017),
	    });
	  }
    ...
```

253. **Understanding the "async" Pipe**
	- In the below example, `appStatus` without async is just a Promise which displays as `[object object]` in the UI.
	- But `async` built-in pipe extracts the value after resolving the Promise and displays the actual value.
	- Example:
``` ts
	//app.component.html
	...
	<br /><br />
    <h2>App Status: {{ appStatus | async }}</h2>
    <hr />
	...
	
	//app.component.ts
	...
	appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });
	...
```

==**Assignment 8: Practicing Pipes**==
Find it in the Angular Course Folder.
Project: pipes-start