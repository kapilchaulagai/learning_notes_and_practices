#HomeAngular - [[--Contents - Angular--]]
290. **Module Introduction**
	- How we can add authentication in our app?

291. **How Authentication works** ![[how-authentication-works.png]]

292. **Adding the Auth Page**
	- Example:
``` ts
	//auth.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-auth',
	  templateUrl: './auth.component.html',
	})
	export class AuthComponent {}
	
	//auth.component.html
	<div class="row">
	  <div class="col-xs-12 col-md-6 col-md-offset-3">
	    <form>
	      <div class="form-group">
	        <label for="email">E-mail</label>
	        <input type="email" id="email" class="form-control" />
	      </div>
	      <div class="form-group">
	        <label for="password">Password</label>
	        <input type="password" id="password" class="form-control" />
	      </div>
	      <div>
	        <button class="btn-primary">Sign Up</button> |
	        <button class="btn-primary">Switch to Login</button>
	      </div>
	    </form>
	  </div>
	</div>
	
	//app-routing.module.ts
	...
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  {
	    path: 'recipes',
	    component: RecipesComponent,
	    children: [
	      { path: '', component: RecipeStartComponent },
	      { path: 'new', component: RecipeEditComponent },
	      {
	        path: ':id',
	        component: RecipeDetailComponent,
	        resolve: [RecipesResolverService],
	      },
	      {
	        path: ':id/edit',
	        component: RecipeEditComponent,
	        resolve: [RecipesResolverService],
	      },
	    ],
	  },
	  { path: 'shopping-list', component: ShoppingListComponent },
	  { path: 'auth', component: AuthComponent },
	];
	...
	
	//header.component.html
	...
	<ul class="nav navbar-nav">
        <li routerLinkActive="active"><a routerLink="/recipes">Recipes</a></li>
        <li routerLinkActive="active">
          <a routerLink="/auth">Authenticate</a>
        </li>
        <li routerLinkActive="active">
          <a routerLink="/shopping-list">Shopping List</a>
        </li>
    </ul>
    ...
```

293. **Switching Between Auth Modes**
	- Example:
``` ts
	//auth.component.ts
	export class AuthComponent {
	  isLoginMode = true;
	
	  onSwitchMode() {
	    this.isLoginMode = !this.isLoginMode;
	  }
	}
	
	//auth.component.html
	...
	<div>
        <button class="btn-primary" type="submit">
          {{ isLoginMode ? "Login" : "Sign Up" }}
        </button>
        |
        <button class="btn-primary" type="button" (click)="onSwitchMode()">
          Switch to {{ isLoginMode ? "Sign Up" : "Login" }}
        </button>
    </div>
	...
```

294. **Handling Form Input**
	- Example:
``` ts
	//auth.component.html
	...
	<form #authForm="ngForm" (ngSubmit)="onSubmit(authForm)">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          class="form-control"
          ngModel
          name="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          ngModel
          name="password"
          required
          minlength="6"
        />
      </div>
      <div>
        <button class="btn-primary" type="submit" [disabled]="!authForm.valid">
          {{ isLoginMode ? "Login" : "Sign Up" }}
        </button>
        |
        <button class="btn-primary" type="button" (click)="onSwitchMode()">
          Switch to {{ isLoginMode ? "Sign Up" : "Login" }}
        </button>
      </div>
    </form>
	...
	
	//auth.component.ts
	export class AuthComponent {
	  isLoginMode = true;
	
	  onSwitchMode() {
	    this.isLoginMode = !this.isLoginMode;
	  }
	
	  onSubmit(authForm: NgForm) {
	    const formValues = { ...authForm.value };
	    console.log(formValues);
	    authForm.reset();
	  }
	}
```

295. **Preparing the Backend**
	- Go to Firebase and got to Authentication.
	- Choose: `Sign-in method` and choose `Email/Password` in Native Section.
	- Now, Go to `Rules` inside your project's Realtime Database section.
	- Change rules to:
		``` ts
		{
			"rules": {
				".read": "auth!= null",
			    ".write": "auth!= null"
			}
		}
		```

296. **Make sure you got Recipes in your backend!**
	- In order to continue with this module and send successful authenticated requests, you need to ensure that you got recipes stored in your backend database.
	- So in case you deleted those (or never added any), make sure you do add some recipes before you turn on protection as shown in the last lecture!

297. **Preparing the Signup Request**
	- Search in browser: `Firebase Auth REST API` and choose sign up with email/password type.
	- Or, got to this URL: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
	- There will be all the info about the APIs , Payloads and Responses. So that we can start with the signing up an user.
	- First Sign Up then Login.
	- For calling signup API we need an API_KEY which can be found in our Firebase project under project settings.
	- Based on the info provided let's create an AuthService as shown in the below example.
	- Example:
``` ts
	//auth.service.ts
	import { HttpClient } from '@angular/common/http';
	import { Injectable } from '@angular/core';
	
	interface AuthResponseData {
	  kind: string;
	  idToken: string;
	  email: string;
	  refreshToken: string;
	  expiresIn: string;
	  localId: string;
	}
	
	@Injectable({ providedIn: 'root' })
	export class AuthService {
	  constructor(private http: HttpClient) {}
	
	  signup(email: string, password: string) {
	    return this.http.post<AuthResponseData>(
	      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	      {
	        email: email,
	        password: password,
	        returnSecureToken: true,
	      }
	    );
	  }
	}
```

298. **Sending the Signup Request**
	- Example:
``` ts
	//auth.service.ts
	import { HttpClient } from '@angular/common/http';
	import { Injectable } from '@angular/core';
	
	interface AuthResponseData {
	  kind: string;
	  idToken: string;
	  email: string;
	  refreshToken: string;
	  expiresIn: string;
	  localId: string;
	}
	
	@Injectable({ providedIn: 'root' })
	export class AuthService {
	  constructor(private http: HttpClient) {}
	
	  signup(email: string, password: string) {
	    return this.http.post<AuthResponseData>(
	      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	      {
	        email: email,
	        password: password,
	        returnSecureToken: true,
	      }
	    );
	  }
	}
	
	//auth.component.ts
	export class AuthComponent {
	  isLoginMode = true;
	
	  constructor(private authService: AuthService) {}
	
	  onSwitchMode() {
	    this.isLoginMode = !this.isLoginMode;
	  }
	
	  onSubmit(authForm: NgForm) {
	    if (!authForm.valid) return;
	
	    const email = authForm.value.email;
	    const password = authForm.value.password;
	
	    if (!this.isLoginMode) {
	      this.authService.signup(email, password).subscribe(
	        (responseData) => console.log(responseData),
	        (error) => console.log(error)
	      );
	    }
	    authForm.reset();
	  }
	}
```

299. **Adding a Loading Spinner & Error Handling Logic**
	- Search in browser for: `css loading spinner` or go to: https://loading.io/css/
	- Choose your favorite loader and copy the CSS/HTML.
	- Paste the copied CSS/HTML in the new component `LoadingSpinnerComponent`.
	- Don't forget to add new component in module declaration.
	- Example:
``` ts
	//loading-spinner.component.ts
	import { Component } from '@angular/core';
	
	@Component({
	  selector: 'app-loading-spinner',
	  template: `<div class="lds-ring">
	    <div></div>
	    <div></div>
	    <div></div>
	    <div></div>
	  </div>`,
	  styleUrls: ['./loading-spinner.component.css'],
	})
	export class LoadingSpinnerComponent {}
	
	//loading-spinner.component.css
	.lds-ring,
	.lds-ring div {
	  box-sizing: border-box;
	}
	.lds-ring {
	  display: inline-block;
	  position: relative;
	  width: 80px;
	  height: 80px;
	}
	.lds-ring div {
	  box-sizing: border-box;
	  display: block;
	  position: absolute;
	  width: 64px;
	  height: 64px;
	  margin: 8px;
	  border: 8px solid currentColor;
	  border-radius: 50%;
	  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
	  border-color: currentColor transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
	  animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
	  animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
	  animation-delay: -0.15s;
	}
	@keyframes lds-ring {
	  0% {
	    transform: rotate(0deg);
	  }
	  100% {
	    transform: rotate(360deg);
	  }
	}
	
	//auth.component.ts
	...
	isLoading = false;
	error: string = null;
	...
	onSubmit(authForm: NgForm) {
	    if (!authForm.valid) return;
	
	    const email = authForm.value.email;
	    const password = authForm.value.password;
	
	    if (!this.isLoginMode) {
	      this.isLoading = true;
	      this.authService.signup(email, password).subscribe(
	        (responseData) => {
	          console.log(responseData);
	          this.isLoading = false;
	        },
	        (error) => {
	          console.log(error);
	          this.error = 'An error occured!';
	          this.isLoading = false;
	        }
	      );
	    }
	    authForm.reset();
	}
	...
	
	//auth.component.html
	...
	<div class="alert alert-danger" *ngIf="error">
      <p>{{ error }}</p>
    </div>
    <div *ngIf="isLoading" style="text-align: center">
      <app-loading-spinner></app-loading-spinner>
    </div>
    ...
```

300. **Improving Error Handling**
	- Example:
``` ts
	//auth.service.ts
	...
	  signup(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	        {
	          email: email,
	          password: password,
	          returnSecureToken: true,
	        }
	      )
	      .pipe(
	        catchError((errorRes) => {
	          let errorMessage = 'An error occured!';
	          if (!errorRes.error || !errorRes.error.error)
	            return throwError(errorMessage);
	
	          switch (errorRes.error.error.message) {
	            case 'EMAIL_EXISTS':
	              errorMessage = 'This email already exists!';
	              break;
	            default:
	              errorMessage = 'An error occured!';
	          }
	          return throwError(errorMessage);
	        })
	      );
	  }
	...
	
	//auth.component.ts
	...
	  onSubmit(authForm: NgForm) {
	    if (!authForm.valid) return;
	
	    const email = authForm.value.email;
	    const password = authForm.value.password;
	
	    if (!this.isLoginMode) {
	      this.isLoading = true;
	      this.authService.signup(email, password).subscribe(
	        (responseData) => {
	          console.log(responseData);
	          this.isLoading = false;
	        },
	        (errorMessage) => {
	          console.log(errorMessage);
	          this.error = errorMessage;
	          this.isLoading = false;
	        }
	      );
	    }
	    authForm.reset();
	  }
	...
```

301. **Sending Login Requests**
	- Search in browser: `Firebase Auth REST API` and choose sign in with email/password type.
	- Or, got to this URL: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
	- There will be all the info about the APIs , Payloads and Responses. So that we can login with the an existing user credential that we had signed up before.
	- Note: First Sign Up in not, then Login.
	- For calling signin API we need an API_KEY which can be found  in our Firebase project under project settings.
	- Based on the info provided let's create a signin method in AuthService as shown in the below example.
	- Example:
``` ts
	//auth.service.ts
	...
	export interface AuthResponseData {
	  kind: string;
	  idToken: string;
	  email: string;
	  refreshToken: string;
	  expiresIn: string;
	  localId: string;
	  registered?: boolean;
	}
	...
	  login(email: string, password: string) {
	    return this.http.post<AuthResponseData>(
	      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	      {
	        email: email,
	        password: password,
	        returnSecureToken: true,
	      }
	    );
	}
	...
	
	//auth.component.ts
	...
	  onSubmit(authForm: NgForm) {
	    if (!authForm.valid) return;
	
	    const email = authForm.value.email;
	    const password = authForm.value.password;
	
	    let authObs: Observable<AuthResponseData>;
	
	    this.isLoading = true;
	    authObs = this.isLoginMode
	      ? this.authService.login(email, password)
	      : this.authService.signup(email, password);
	
	    authObs.subscribe(
	      (responseData) => {
	        console.log(responseData);
	        this.isLoading = false;
	      },
	      (errorMessage) => {
	        console.log(errorMessage);
	        this.error = errorMessage;
	        this.isLoading = false;
	      }
	    );
	
	    authForm.reset();
	}
	...
```

302. **Login Error Handling**
	- Example:
``` ts
	//auth.service.ts
	...
	signup(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	        {
	          email: email,
	          password: password,
	          returnSecureToken: true,
	        }
	      )
	      .pipe(catchError(this.handleError));
	}
	
	login(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	        {
	          email: email,
	          password: password,
	          returnSecureToken: true,
	        }
	      )
	      .pipe(catchError(this.handleError));
	}
	
	private handleError(errorRes: HttpErrorResponse) {
	    let errorMessage = 'An error occured!';
	    if (!errorRes.error || !errorRes.error.error)
	      return throwError(errorMessage);
	
	    switch (errorRes.error.error.message) {
	      case 'EMAIL_EXISTS':
	        errorMessage = 'This email already exists!';
	        break;
	      case 'EMAIL_NOT_FOUND':
	        errorMessage = 'This email does not exist!';
	        break;
	      case 'INVALID_PASSWORD':
	        errorMessage = 'This password is not correct!';
	        break;
	      default:
	        errorMessage = 'An error occured!';
	    }
	    return throwError(errorMessage);
	}
	...
```

303. **Creating & Storing the User Data**
	- Example:
``` ts
	//user.model.ts
	export class User {
	  constructor(
	    public email: string,
	    public id: string,
	    private _token: string,
	    private _tokenExpirationDate: Date
	  ) {}
	  get token() {
	    if (!this._tokenExpirationDate || this._tokenExpirationDate <= new Date())
	      return null;
	
	    return this._token;
	  }
	}
	
	//auth.service.ts
	...
	  user = new Subject<User>();
	
	  constructor(private http: HttpClient) {}
	
	  signup(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	        {
	          email: email,
	          password: password,
	          returnSecureToken: true,
	        }
	      )
	      .pipe(
	        catchError(this.handleError),
	        tap((resData) =>
	          this.handleAuthentication(
	            resData.email,
	            resData.localId,
	            resData.idToken,
	            +resData.expiresIn
	          )
	        )
	      );
	  }
	
	  login(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk',
	        {
	          email: email,
	          password: password,
	          returnSecureToken: true,
	        }
	      )
	      .pipe(
	        catchError(this.handleError),
	        tap((resData) =>
	          this.handleAuthentication(
	            resData.email,
	            resData.localId,
	            resData.idToken,
	            +resData.expiresIn
	          )
	        )
	      );
	  }
	
	  private handleAuthentication(
	    email: string,
	    userId: string,
	    token: string,
	    expiresIn: number
	  ) {
	    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
	    const user = new User(email, userId, token, expirationDate);
	    this.user.next(user);
	  }
	...
```

304. **Reflecting the Auth State in the UI**
	- Example:
``` ts
	//auth.component.ts
	...
	constructor(private authService: AuthService, private router: Router) {}
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
        this.isLoading = false;
      }
    );
	...
	
	//header.component.ts
	export class HeaderComponent implements OnInit, OnDestroy {
	  isAuthenticated = false;
	  private userSub: Subscription;
	
	  constructor(
	    private dataStorageService: DataStorageService,
	    private authService: AuthService
	  ) {}
	
	  ngOnInit(): void {
	    this.userSub = this.authService.user.subscribe((user) => {
	      this.isAuthenticated = !!user;
	      console.log(!user);
	      console.log(!!user);
	    });
	  }
	
	  onSaveData() {
	    this.dataStorageService.storeRecipes();
	  }
	
	  onFetchData() {
	    this.dataStorageService.fetchRecipes().subscribe();
	  }
	
	  ngOnDestroy(): void {
	    this.userSub.unsubscribe();
	  }
	}
	
	//header.component.html
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <a href="#" class="navbar-brand">Recipe Book</a>
	    </div>
	    <div class="collapse navbar-collapse">
	      <ul class="nav navbar-nav">
	        <li routerLinkActive="active" *ngIf="isAuthenticated">
	          <a routerLink="/recipes">Recipes</a>
	        </li>
	        <li routerLinkActive="active" *ngIf="!isAuthenticated">
	          <a routerLink="/auth">Authenticate</a>
	        </li>
	        <li routerLinkActive="active">
	          <a routerLink="/shopping-list">Shopping List</a>
	        </li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li *ngIf="isAuthenticated">
	          <a style="cursor: pointer">Logout</a>
	        </li>
	        <li class="dropdown" appDropdown *ngIf="isAuthenticated">
	          <a style="cursor: pointer" class="dropdown-toggle" role="button"
            >	Manage <span class="caret"></span
          >	</a>
	          <ul class="dropdown-menu">
	            <li>
	              <a style="cursor: pointer" (click)="onSaveData()">Save Data</a>
	            </li>
	            <li>
	              <a style="cursor: pointer" (click)="onFetchData()">Fetch Data</a>
	            </li>
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </div>
	</nav>
```

305. **Adding the Token to Outgoing Requests**
	- Once the authenticate part has been implemented we must attach token to every outgoing API call, otherwise we will get the 401 error.
	- Example:
``` ts
	//data-storage.service.ts
	...
	fetchRecipes() {
	    return this.authService.user.pipe(
	      take(1),
	      exhaustMap((user) => {
	        return this.http.get<Recipe[]>(
	          'https://ng-course-recipe-book-16586-default-rtdb.firebaseio.com/recipes.json',
	          {
	            params: new HttpParams().set('auth', user.token),
	          }
	        );
	      }),
	      map((response) => {
	        return response.map((response) => {
	          return {
	            ...response,
	            ingredients: response.ingredients ? response.ingredients : [],
	          };
	        });
	      }),
	      tap((recipes) => {
	        this.recipeService.setRecipes(recipes);
	      })
	    );
	}
	...
	
	//header.component.ts
	...
	onFetchData() {
	    this.dataStorageService.fetchRecipes().subscribe();
	}
	...
	
	//auth.service.ts
	...
	user = new BehaviorSubject<User>(null);
	...
```

306. **Attaching the Token with an Interceptor**
	- Interceptors gets trigger before every outgoing API calls as we know already.
	- Also we can do such modifications which is required across all the outgoing API calls.
	- Example:
``` ts
	//auth-interceptor.service.ts
	import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
	import { Injectable } from "@angular/core";
	import { Observable, exhaustMap, take } from "rxjs";
	import { AuthService } from "./auth.service";
	
	@Injectable({
	    providedIn:"root"
	})
	export class AuthInterceptorService implements HttpInterceptor{
	    constructor(private authService: AuthService){}
	
	    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	        return this.authService.user.pipe(
	            take(1),
	            exhaustMap((user) => {  
	                if(!user) return next.handle(req);
	                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
	                return next.handle(modifiedReq);
	             }));     
	    }
	}
	
	//app.module.ts
	...
	providers: [
		ShoppingListService, 
	    RecipeService, 
	    {
			provide: HTTP_INTERCEPTORS, 
		    useClass: AuthInterceptorService, 
		    multi: true
	    }
	],
	...
	
	//data-storage.service.ts
	...
	fetchRecipes() {
	    return this.http.get<Recipe[]>(
	        'https://ng-course-recipe-book-16586-default-rtdb.firebaseio.com/recipes.json'
	      ).pipe(
	      map((response) => {
	        return response.map((response) => {
	          return {
	            ...response,
	            ingredients: response.ingredients ? response.ingredients : [],
	          };
	        });
	      }),
	      tap((recipes) => {
	        this.recipeService.setRecipes(recipes);
	      })
	    );
	}
	...
```

307. **Adding Logout**
	- Example:
``` ts
	//auth.service.ts
	...
	logout(){
		this.user.next(null);
	    this.router.navigate(['/auth']);
		localStorage.removeItem('userData');
	}
	...
	
	//header.component.ts
	...
	onLogout(){
	    this.authService.logout();
	}
	...
	
	//header.component.html
	...
	<li *ngIf="isAuthenticated">
          <a style="cursor: pointer" (click)="onLogout()">Logout</a>
    </li>
	...
```

308. **Adding Auto-Login**
	- Example:
``` ts
	//auth.service.ts
	...
	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
	    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
	    const user = new User(email, userId, token, expirationDate);
	    this.user.next(user);
	    localStorage.setItem('userData', JSON.stringify(user))
	}
	...
	autoLogin(){
	    const userData:{
	      email: string,
	      id: string,
	      _token: string,
	      _tokenExpirationDate: string
	    } = JSON.parse(localStorage.getItem('userData'));
	    if(!userData) return;
	    const loadedUser = new User(
	      userData.email,
	      userData.id,
	      userData._token,
	      new Date(userData._tokenExpirationDate)
	    );
	    if(loadedUser.token){
	      this.user.next(loadedUser);
	      this.router.navigate(['/recipes']);
	    }
	}
	...
	
	//app.component.ts
	export class AppComponent implements OnInit{
	  constructor(private authService: AuthService){}
	
	  ngOnInit(): void {
	    this.authService.autoLogin();
	  }
	}
```

309. **Adding Auto-Logout**
	- Example:
``` ts
	//auth.service.ts
	...
	private tokenExpirationTimer: any;
	...
	autoLogin(){
	    const userData:{
	      email: string,
	      id: string,
	      _token: string,
	      _tokenExpirationDate: string
	    } = JSON.parse(localStorage.getItem('userData'));
	    if(!userData) return;
	    const loadedUser = new User(
	      userData.email,
	      userData.id,
	      userData._token,
	      new Date(userData._tokenExpirationDate)
	    );
	    if(loadedUser.token){
	      this.user.next(loadedUser);
	      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
	      this.autoLogout(expirationDuration);
	      this.router.navigate(['/recipes']);
	    }
	  }
	
	  logout(){
	    this.user.next(null);
	    this.router.navigate(['/auth']);
	    localStorage.removeItem('userData');
	
	    if(this.tokenExpirationTimer) 
	      clearTimeout(this.tokenExpirationTimer);
	
	    this.tokenExpirationTimer = null;
	  }
	
	  autoLogout(expirationDuration: number){
	    setTimeout(()=>{
	    this.tokenExpirationTimer = this.logout();
	    }, expirationDuration);
	  }
	
	  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
	    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
	    const user = new User(email, userId, token, expirationDate);
	    this.user.next(user);
	    this.autoLogout(expiresIn*1000);
	    localStorage.setItem('userData', JSON.stringify(user))
	}
	...
```

310. **Adding an Auth Guard**
	- CanActivate has been depricated. Let's try alternative way.
	- Example:
``` ts
	//auth.guard.ts
	import { Injectable, inject } from "@angular/core";
	import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
	import { Observable, map, take } from "rxjs";
	import { AuthService } from "./auth.service";
	
	@Injectable({providedIn: 'root'})
	class PermissionsClass{
	    constructor(private authService: AuthService, private router:Router){
	
	    }
	
	    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
	        return this.authService.user.pipe(take(1), map(user => {
	            const isAuth = !!user;
	            if(isAuth)
	                return true;
	        
	            return this.router.createUrlTree(['/auth']);
	        }));
	    }
	}
	
	export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
	    return inject(PermissionsClass).canActivate(next, state);
	}
	
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  {
	    path: 'recipes',
	    component: RecipesComponent,
	    canActivate:[AuthGuard],
	    children: [
	      { path: '', component: RecipeStartComponent },
	      { path: 'new', component: RecipeEditComponent },
	      {
	        path: ':id',
	        component: RecipeDetailComponent,
	        resolve: [RecipesResolverService],
	      },
	      {
	        path: ':id/edit',
	        component: RecipeEditComponent,
	        resolve: [RecipesResolverService],
	      },
	    ],
	  },
	  { path: 'shopping-list', component: ShoppingListComponent },
	  { path: 'auth', component: AuthComponent },
	];
```

311. **Wrap Up**
	- Covered all kind of topics most probably regarding authentication.

312. **Useful Resources & Links**
	- Useful Docs:
		- Firebase Auth REST API Docs: https://firebase.google.com/docs/reference/rest/auth
		- More on JWT: https://jwt.io