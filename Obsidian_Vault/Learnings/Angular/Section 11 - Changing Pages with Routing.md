#HomeAngular - [[--Contents - Angular--]]
127. **Module Introduction**
	- Routing - Change URL
128. **Why do we need a Router?**
	- Routing to Home/Servers/User
129. **Understanding the Example Project**
	- In our app, we got three sections:
		- Home
		- Servers
		    - View and Edit Servers
		    - A Service is used to load and update Servers
		- Users
		    - View Users
	- This app will be improved by adding routing but definitely feel free to play around with it - besides routing, everything should be working fine.

130. **Setting up and Loading Routes**
	- Registering routes, providing path and setting `<router-outlet></router-outle>` will be done.
	- Example:
``` ts
	//app.module.ts
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  { path: 'users', component: UsersComponent },
	  { path: 'servers', component: ServersComponent },
	];
	
	@NgModule({
	  declarations: [
	    AppComponent,
	    HomeComponent,
	    UsersComponent,
	    ServersComponent,
	    UserComponent,
	    EditServerComponent,
	    ServerComponent,
	  ],
	  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
	  providers: [ServersService],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.html
	<div class="row">
	    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
	      <router-outlet></router-outlet>
	    </div>
	</div>
```

131. **Navigating with Router Links
	- Let's make the tabs click to route the page to the respective component.
	- Few changes required only in the html file as shown in the below example.
``` ts
	//app.component.html
	...
	<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="/servers">Servers</a></li>
        <li role="presentation"><a [routerLink]="['/users']">Users</a></li>
      </ul>
    </div>
    ...
```

132. **Understanding Navigation Paths**
	- Absolute Path: `/servers` appends to the root domain
	- Relative Path: `servers` or `../servers` appends or change the current domain
	- Relative Path mostly used for the nested navigations

133. **Styling Active Router Links**
	- For this we will just add few attributes provided by angular.
	- Example:
``` ts
	//app.component.html
	...
	<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li
          role="presentation"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <a routerLink="/">Home</a>
        </li>
        <li role="presentation" routerLinkActive="active">
          <a routerLink="/servers">Servers</a>
        </li>
        <li role="presentation" routerLinkActive="active">
          <a [routerLink]="['/users']">Users</a>
        </li>
      </ul>
    </div>
	...
```

134. **Navigating Programmatically**
	- Example:
``` ts
	//home.component.ts
	import { Component, OnInit } from '@angular/core';
	import { Router } from '@angular/router';
	
	@Component({
	  selector: 'app-home',
	  templateUrl: './home.component.html',
	  styleUrls: ['./home.component.css'],
	})
	export class HomeComponent implements OnInit {
	  constructor(private router: Router) {}
	
	  ngOnInit() {}
	  onLoadServers() {
	    //complex calculations
	    this.router.navigate(['/servers']);
	  }
	}
	
	//home.component.html
	<h4>Welcome to Server Manager 4.0</h4>
	<p>Manage your Servers and Users.</p>
	<button class="btn btn-primary" (click)="onLoadServers()">Load Servers</button>
```

135. **Using Relative Paths in Programmatic Navigation**
	- The example given below is just a method to perform Programmatic Navigation using relative path.
	- So it might give console error. But the code that gives error is commented below.
	- Example:
``` ts
	//servers.component.ts
	export class ServersComponent implements OnInit {
	  public servers: { id: number; name: string; status: string }[] = [];
	
	  constructor(
	    private serversService: ServersService,
	    private router: Router,
	    private route: ActivatedRoute
	  ) {}
	
	  ngOnInit() {
	    this.servers = this.serversService.getServers();
	  }
	  onReload() {
	    //this.router.navigate(['servers'], { relativeTo: this.route });
	  }
	}
	
	//servers.component.html
	...
	<div class="col-xs-12 col-sm-4">
	    <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
	    <app-edit-server></app-edit-server>
	    <hr />
	    <app-server></app-server>
	</div>
	...
```

136. **Passing Parameters to Route**
	- As shown in the example, `:id` with colon is considered as dynamic parameter of the path which can be replaced with any value to navigate to that path.
	- Example:
``` ts
	//app.module.ts
	...
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  { path: 'users', component: UsersComponent },
	  { path: 'users/:id', component: UserComponent },
	  { path: 'servers', component: ServersComponent },
	];
	...
```

137. **Fetching Route Parameters**
	- Example:
``` ts
	 //app.module.ts
	 ...
	 const appRoutes: Routes = [
		  { path: '', component: HomeComponent },
		  { path: 'users', component: UsersComponent },
		  { path: 'users/:id/:name', component: UserComponent },
		  { path: 'servers', component: ServersComponent },
	];
	 ...
	
	//user.component.ts
	export class UserComponent implements OnInit {
	  user: { id: number; name: string };
	
	  constructor(private route: ActivatedRoute) {}
	
	  ngOnInit() {
	    this.user = {
	      id: this.route.snapshot.params['id'],
	      name: this.route.snapshot.params['name'],
	    };
	  }
	}
	
	//user.component.html
	<p>User with ID {{ user.id }} loaded.</p>
	<p>User name is {{ user.name }}.</p>
```

138. **Fetching Route Parameters Reactively**
	- We can simply change the URL while routing by the help of snapshot as shown in the example.
	- But when you try to route to the same component from current component with just some value changes then you have to subscribe to params to get the latest changes in data.
	- Example:
``` ts
	//Other part of the code is same as the previous lecture.
	//user.component.ts
	export class UserComponent implements OnInit {
	  user: { id: number; name: string };
	
	  constructor(private route: ActivatedRoute) {}
	
	  ngOnInit() {
	    this.user = {
	      id: this.route.snapshot.params['id'],
	      name: this.route.snapshot.params['name'],
	    };
	
	    this.route.params.subscribe((params: Params) => {
	      this.user.id = params['id'];
	      this.user.name = params['name'];
	    });
	  }
	}
```

139. **An Important Note about Route Observables**
	- Let's unsubscribe the subscription done in the params as shown in the above lecture.
	- To do so, let's implement OnDestroy and perform below step as well.
	- Example:
``` ts
	//user.component.ts
	export class UserComponent implements OnInit, OnDestroy {
	  user: { id: number; name: string };
	  paramSubscription: Subscription;
	
	  constructor(private route: ActivatedRoute) {}
	
	  ngOnInit() {
	    this.user = {
	      id: this.route.snapshot.params['id'],
	      name: this.route.snapshot.params['name'],
	    };
	
	    this.paramSubscription = this.route.params.subscribe((params: Params) => {
	      this.user.id = params['id'];
	      this.user.name = params['name'];
	    });
	  }
	  ngOnDestroy(): void {
	    this.paramSubscription.unsubscribe();
	  }
	}
```

140. **Passing Query Parameters and Fragments**
	- There are various query parameters having prefixed with symbols like `=,&,?,#` such as `\servers?allowEdit=1#loading`.
	- Json Object written inside `queryParams` will give url with `?=&`.
	- String value written inside `fragment` will give url with `#`.
	- We have two approach: One is on click of some button using `navigate()` and another is providing in `routerLink` in the html file.
	- Example:
``` ts
	//home.component.ts
	...
	onLoadServer(id: number) {
	    //complex calculations
	    this.router.navigate(['/servers', id, 'edit'], {
	      queryParams: { allowEdit: '1' },
	      fragment: 'loading',
	    });
	}
	...
	
	//home.component.html
	...
	<button class="btn btn-primary" (click)="onLoadServer(1)">Load Server 1</button>
	
	//servers.component.html
	...
	<div class="list-group">
      <a
        [routerLink]="['/servers', 5, 'edit']"
        [queryParams]="{ allowEdit: '1' }"
        fragment="loading"
        href="#"
        class="list-group-item"
        *ngFor="let server of servers"
      >
        {{ server.name }}
      </a>
    </div>
    ...
```

141. **Retrieving Query Parameters and Fragments**
	- Example:
``` ts
	//edit-server.component.ts
	...
	constructor(
	    private serversService: ServersService,
	    private route: ActivatedRoute
	  ) {}
	
	  ngOnInit() {
	    console.log(this.route.snapshot.queryParams);
	    console.log(this.route.snapshot.fragment);
	    // this.route.queryParams.subscribe();
	    // this.route.fragment.subscribe();
	
	    this.server = this.serversService.getServer(1);
	    this.serverName = this.server.name;
	    this.serverStatus = this.server.status;
	  }
	...
```

142. **Practicing and some Gotchas**
	- Always remember whatever values we get from route params will always be a string which needs to be converted based on the scenario and requirement.
	- Example:
``` ts
	//server.component.ts
	export class ServerComponent implements OnInit {
	  server: { id: number; name: string; status: string };
	
	  constructor(
	    private serversService: ServersService,
	    private route: ActivatedRoute
	  ) {}
	
	  ngOnInit() {
	    const id = +this.route.snapshot.params['id'];
	    this.server = this.serversService.getServer(id);
	    this.route.params.subscribe((params: Params) => {
	      this.server = this.serversService.getServer(+params['id']);
	    });
	  }
	}
	
	//servers.component.html
	<div class="row">
	  <div class="col-xs-12 col-sm-4">
	    <div class="list-group">
	      <a
	        [routerLink]="['/servers', server.id]"
	        [queryParams]="{ allowEdit: '1' }"
	        fragment="loading"
	        href="#"
	        class="list-group-item"
	        *ngFor="let server of servers"
      >	
	        {{ server.name }}
	      </a>
	    </div>
	  </div>
	  <div class="col-xs-12 col-sm-4">
	    <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
	    <app-edit-server></app-edit-server>
	    <hr />
	    <!-- <app-server></app-server> -->
	  </div>
	</div>
```

143. **Setting up Child(Nested) Routes**
	- Using `childern:[]` key in the routes, we can add children routes that helps to load nested child component in the same page screen.
	- Example:
``` ts
	//app.module.ts
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    children: [
	      { path: ':id', component: ServerComponent },
	      { path: ':id/edit', component: EditServerComponent },
	    ],
	  },
	];
	
	//users.component.html
	...
	<div class="col-xs-12 col-sm-4">
	    <!-- <app-user></app-user> -->
	    <router-outlet></router-outlet>
	</div>
	...
	
	//servers.component.html
	...
	<div class="col-xs-12 col-sm-4">
	    <router-outlet></router-outlet>
	    <!-- <button class="btn btn-primary" (click)="onReload()">Reload Page</button>
	    <app-edit-server></app-edit-server>
	    <hr />
	    <app-server></app-server> -->
	</div>
	...
```

144. **Using Query Parameters - Practice**
	- Here, we are getting values from queryParams on subscribe().
	- Example:
``` ts
	//servers.component.html
	<h5>{{ server.name }}</h5>
	<p>Server status is {{ server.status }}</p>
	<button class="btn btn-primary" (click)="onEdit()">Edit Server</button>

	//server.component.ts
	export class ServerComponent implements OnInit {
	  server: { id: number; name: string; status: string };
	
	  constructor(
	    private serversService: ServersService,
	    private route: ActivatedRoute,
	    private router: Router
	  ) {}
	
	  ngOnInit() {
	    const id = +this.route.snapshot.params['id'];
	    this.server = this.serversService.getServer(id);
	    this.route.params.subscribe((params: Params) => {
	      this.server = this.serversService.getServer(+params['id']);
	    });
	  }
	
	  onEdit() {
	    this.router.navigate(['edit'], { relativeTo: this.route });
	  }
	}
	
	//edit-server.component.html
	<h4 *ngIf="!allowEdit">You're not allowed to edit!</h4>
	<div *ngIf="allowEdit">
	</div>
	
	//edit-server.component.ts
	export class EditServerComponent implements OnInit {
	  server: { id: number; name: string; status: string };
	  serverName = '';
	  serverStatus = '';
	  allowEdit = false;
	
	  constructor(
	    private serversService: ServersService,
	    private route: ActivatedRoute
	  ) {}
	
	  ngOnInit() {
	    console.log(this.route.snapshot.queryParams);
	    console.log(this.route.snapshot.fragment);
	    this.route.queryParams.subscribe((queryParams: Params) => {
	      this.allowEdit = queryParams['allowEdit'] === '1';
	    });
	    // this.route.fragment.subscribe();
	
	    this.server = this.serversService.getServer(1);
	    this.serverName = this.server.name;
	    this.serverStatus = this.server.status;
	  }
	
	  onUpdateServer() {
	    this.serversService.updateServer(this.server.id, {
	      name: this.serverName,
	      status: this.serverStatus,
	    });
	  }
	}
```

145. **Configuring the Handling of Query Parameters**
	- For this, we make use of `queryParamsHandling : 'preserve`.
	- Example:
``` ts
	//server.component.ts
	...
	onEdit() {
	    this.router.navigate(['edit'], {
	      relativeTo: this.route,
	      queryParamsHandling: 'preserve',
	    });
	  }
	...
```

146. **Redirecting and Wildcard Routes**
	- It is nothing but catching invalid routes to redirect them to page not found component.
	- Wildcard routes (**) must be placed at last as shown in the below example.
	- Example:
``` ts
	//app.module.ts
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    children: [
	      { path: ':id', component: ServerComponent },
	      { path: ':id/edit', component: EditServerComponent },
	    ],
	  },
	  { path: 'not-found', component: PageNotFoundComponent },
	  { path: 'something', redirectTo: '/not-found' },
	  { path: '**', redirectTo: '/not-found' },
	];
```

147. **Important: Redirection Path Matching**
	- In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding redirections.
	- By default, Angular matches paths by prefix. That means, that the following route will match both `/recipes`  and just `/` 
		`{ path: '', redirectTo: '/somewhere-else' }`
	- Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?
	- Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").
	- To fix this behavior, you need to change the matching strategy to `"full"` :
		`{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } ``
	- Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

148. **Outsourcing the Route Configuration**
	- Basically, we are separating Routes to our own separate module as shown in the below example.
	- Example:
``` ts
	//app-routing.module.ts
	import { NgModule } from '@angular/core';
	import { RouterModule, Routes } from '@angular/router';
	import { HomeComponent } from './home/home.component';
	import { UsersComponent } from './users/users.component';
	import { UserComponent } from './users/user/user.component';
	import { ServersComponent } from './servers/servers.component';
	import { ServerComponent } from './servers/server/server.component';
	import { EditServerComponent } from './servers/edit-server/edit-server.component';
	import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
	
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    children: [
	      { path: ':id', component: ServerComponent },
	      { path: ':id/edit', component: EditServerComponent },
	    ],
	  },
	  { path: 'not-found', component: PageNotFoundComponent },
	  { path: 'something', redirectTo: '/not-found' },
	  { path: '**', redirectTo: '/not-found' },
	];
	
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes)],
	  exports: [RouterModule],
	})
	export class AppRoutingModule {}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HomeComponent,
	    UsersComponent,
	    ServersComponent,
	    UserComponent,
	    EditServerComponent,
	    ServerComponent,
	    PageNotFoundComponent,
	  ],
	  imports: [BrowserModule, FormsModule, AppRoutingModule],
	  providers: [ServersService],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

149. **An introduction to Guards**
	- In Angular, guards are used to protect routes by controlling whether a user can access them or not. They are a mechanism to implement security and permissions in your application's routing system. Angular provides several types of guards, including:
		1. CanActivate
		2. CanActivateChild
		3. CanDeactivate
		4. CanLoad
		5. Resolve

150. **Protecting Routes with CanActivate**
	- Example:
``` ts
	//auth-guard.service.ts
	import { Injectable } from '@angular/core';
	import {
	  ActivatedRouteSnapshot,
	  CanActivate,
	  Router,
	  RouterStateSnapshot,
	  UrlTree,
	} from '@angular/router';
	import { Observable } from 'rxjs';
	import { AuthService } from './auth.service';
	
	@Injectable()
	export class AuthGuard implements CanActivate {
	  constructor(private authService: AuthService, private router: Router) {}
	
	  canActivate(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
	  ): Observable<boolean> | Promise<boolean> | boolean {
	    return this.authService.isAuthenticated().then((authenticated: boolean) => {
	      if (authenticated) return true;
	      else {
	        this.router.navigate(['/']);
	      }
	    });
	  }
	}
	
	//auth.service.ts
	export class AuthService {
	  loggedIn = false;
	
	  isAuthenticated() {
	    const promise = new Promise((resolve, reject) => {
	      setTimeout(() => {
	        resolve(this.loggedIn);
	      }, 800);
	    });
	    return promise;
	  }
	
	  login() {
	    this.loggedIn = true;
	  }
	
	  logout() {
	    this.loggedIn = false;
	  }
	}
	
	//app-routing.module.ts
	...
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    canActivate: [AuthGuard],
	    children: [
	      { path: ':id', component: ServerComponent },
	      { path: ':id/edit', component: EditServerComponent },
	    ],
	  },
	  { path: 'not-found', component: PageNotFoundComponent },
	  { path: 'something', redirectTo: '/not-found' },
	  { path: '**', redirectTo: '/not-found' },
	];
	...
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HomeComponent,
	    UsersComponent,
	    ServersComponent,
	    UserComponent,
	    EditServerComponent,
	    ServerComponent,
	    PageNotFoundComponent,
	  ],
	  imports: [BrowserModule, FormsModule, AppRoutingModule],
	  providers: [ServersService, AuthService, AuthGuard],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

151. **Protecting Child (Nested) Routes with canActivateChild**
	- Example:
``` ts
	 //app-routing.module.ts
	 const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    //canActivate: [AuthGuard],
	    canActivateChild: [AuthGuard],
	    children: [
	      { path: ':id', component: ServerComponent },
	      { path: ':id/edit', component: EditServerComponent },
	    ],
	  },
	  { path: 'not-found', component: PageNotFoundComponent },
	  { path: 'something', redirectTo: '/not-found' },
	  { path: '**', redirectTo: '/not-found' },
	];
	
	//auth-guard.service.ts
	@Injectable()
	export class AuthGuard implements CanActivate, CanActivateChild {
	  constructor(private authService: AuthService, private router: Router) {}
	
	  canActivate(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
	  ): Observable<boolean> | Promise<boolean> | boolean {
	    return this.authService.isAuthenticated().then((authenticated: boolean) => {
	      if (authenticated) return true;
	      else {
	        this.router.navigate(['/']);
	      }
	    });
	  }
	
	  canActivateChild(
	    childRoute: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
	  ):
	    | boolean
	    | UrlTree
	    | Observable<boolean | UrlTree>
	    | Promise<boolean | UrlTree> {
	    return this.canActivate(childRoute, state);
	  }
	}
```

152. **Using a Fake Auth Service**
	- Example:
``` ts
	//home.component.ts
	export class HomeComponent implements OnInit {
	  constructor(private router: Router, private authService: AuthService) {}
	
	  ngOnInit() {}
	  onLoadServer(id: number) {
	    //complex calculations
	    this.router.navigate(['/servers', id, 'edit'], {
	      queryParams: { allowEdit: '1' },
	      fragment: 'loading',
	    });
	  }
	
	  onLogin() {
	    this.authService.login();
	  }
	
	  onLogout() {
	    this.authService.logout();
	  }
	}
	
	//home.component.html
	<h4>Welcome to Server Manager 4.0</h4>
	<p>Manage your Servers and Users.</p>
	<button class="btn btn-primary" (click)="onLoadServer(1)">Load Server 1</button>
	<button class="btn btn-default" (click)="onLogin()">Login</button>
	<button class="btn btn-default" (click)="onLogout()">Logout</button>
```

153. **Controlling Navigation with canDeactivate**
	- Example:
``` ts
	//can-deactive-guard.service.ts
	import {
	  ActivatedRoute,
	  ActivatedRouteSnapshot,
	  CanDeactivate,
	  RouterStateSnapshot,
	} from '@angular/router';
	import { Observable } from 'rxjs';
	
	export interface CanComponentDeactivate {
	  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
	}
	
	export class CanDeactivateGuard
	  implements CanDeactivate<CanComponentDeactivate>
	{
	  canDeactivate(
	    component: CanComponentDeactivate,
	    currentRoute: ActivatedRouteSnapshot,
	    canCurrentState: RouterStateSnapshot,
	    nextState?: RouterStateSnapshot
	  ): Observable<boolean> | Promise<boolean> | boolean {
	    return component.canDeactivate();
	  }
	}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HomeComponent,
	    UsersComponent,
	    ServersComponent,
	    UserComponent,
	    EditServerComponent,
	    ServerComponent,
	    PageNotFoundComponent,
	  ],
	  imports: [BrowserModule, FormsModule, AppRoutingModule],
	  providers: [ServersService, AuthService, AuthGuard, CanDeactivateGuard],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//edit-server.component.ts
	export class EditServerComponent implements OnInit, CanComponentDeactivate {
	  server: { id: number; name: string; status: string };
	  serverName = '';
	  serverStatus = '';
	  allowEdit = false;
	  changeSaved = false;
	
	  constructor(
	    private serversService: ServersService,
	    private route: ActivatedRoute,
	    private router: Router
	  ) {}
	
	  ngOnInit() {
	    console.log(this.route.snapshot.queryParams);
	    console.log(this.route.snapshot.fragment);
	    this.route.queryParams.subscribe((queryParams: Params) => {
	      this.allowEdit = queryParams['allowEdit'] === '1';
	    });
	    const id = +this.route.snapshot.params.id;
	    this.server = this.serversService.getServer(id);
	    //Subscribe route params to update the id if params change
	    this.serverName = this.server.name;
	    this.serverStatus = this.server.status;
	  }
	
	  onUpdateServer() {
	    this.serversService.updateServer(this.server.id, {
	      name: this.serverName,
	      status: this.serverStatus,
	    });
	    this.changeSaved = true;
	    this.router.navigate(['../'], { relativeTo: this.route });
	  }
	
	  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
	    if (!this.allowEdit) return true;
	    if (
	      (this.serverName !== this.server.name ||
	        this.serverStatus !== this.server.status) &&
	      !this.changeSaved
	    )
	      return confirm('Do you want to discard the changes?');
	    else return true;
	  }
	}
```

154. **Passing Static Data to a Route**
	- Example:
``` ts
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    canActivateChild: [AuthGuard],
	    children: [
	      { path: ':id', component: ServerComponent },
	      {
	        path: ':id/edit',
	        component: EditServerComponent,
	        canDeactivate: [CanDeactivateGuard],
	      },
	    ],
	  },
	  //{ path: 'not-found', component: PageNotFoundComponent },
	  {
	    path: 'not-found',
	    component: ErrorPageComponent,
	    data: { message: 'Page not found!' },
	  },
	  { path: '**', redirectTo: '/not-found' },
	];
	
	//error-page.component.ts
	import { Component, OnInit } from '@angular/core';
	import { ActivatedRoute, Data } from '@angular/router';
	
	@Component({
	  selector: 'app-error-page',
	  templateUrl: './error-page.component.html',
	  styleUrl: './error-page.component.css',
	})
	export class ErrorPageComponent implements OnInit {
	  errorMessage: string;
	
	  constructor(private route: ActivatedRoute) {}
	
	  ngOnInit(): void {
	    //this.errorMessage = this.route.snapshot.data['message'];
	    this.route.data.subscribe((data: Data) => {
	      this.errorMessage = data['message'];
	    });
	  }
	}
	
	//error-page.component.html
	<p>{{ errorMessage }}</p>
```

155. **Resolving Dynamic Data with the resolve Guard**
	- Using resolver.
	- Example:
``` ts
	//server-resolver.service.ts
	import {
	  ActivatedRouteSnapshot,
	  Resolve,
	  RouterStateSnapshot,
	} from '@angular/router';
	import { Observable } from 'rxjs';
	import { ServersService } from '../servers.service';
	import { Injectable } from '@angular/core';
	
	interface Server {
	  id: number;
	  name: string;
	  status: string;
	}
	
	@Injectable()
	export class ServerResolver implements Resolve<Server> {
	  constructor(private serversService: ServersService) {}
	
	  resolve(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
	  ): Server | Observable<Server> | Promise<Server> {
	    return this.serversService.getServer(+route.params['id']);
	  }
	}
	
	//server.component.ts
	...
	 ngOnInit() {
	    // const id = +this.route.snapshot.params['id'];
	    // this.server = this.serversService.getServer(id);
	    // this.route.params.subscribe((params: Params) => {
	    //   this.server = this.serversService.getServer(+params['id']);
	    // });
	    this.route.data.subscribe((data: Data) => {
	      this.server = data['server'];
	    });
	  }
	...
	
	//app-routing.module.ts
	...
	const appRoutes: Routes = [
	  { path: '', component: HomeComponent },
	  {
	    path: 'users',
	    component: UsersComponent,
	    children: [{ path: ':id/:name', component: UserComponent }],
	  },
	
	  {
	    path: 'servers',
	    component: ServersComponent,
	    canActivateChild: [AuthGuard],
	    children: [
	      {
	        path: ':id',
	        component: ServerComponent,
	        resolve: { server: ServerResolver },
	      },
	      {
	        path: ':id/edit',
	        component: EditServerComponent,
	        canDeactivate: [CanDeactivateGuard],
	      },
	    ],
	  },
	  //{ path: 'not-found', component: PageNotFoundComponent },
	  {
	    path: 'not-found',
	    component: ErrorPageComponent,
	    data: { message: 'Page not found!' },
	  },
	  { path: '**', redirectTo: '/not-found' },
	];
	...
```

156. **Understanding Location Strategies**
	- Use of hash, so that other after the hash part of url are ignored in case of 404 error to show the home page that is url before hash.
	- Example:
``` ts
	//app-routing.module.ts
	...
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
	  exports: [RouterModule],
	})
	export class AppRoutingModule {}
```

157. **Wrap Up**
	- All covered on Routes Topic.