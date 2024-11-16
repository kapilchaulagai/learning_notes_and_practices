#HomeAngular - [[--Contents - Angular--]]
254. **A New IDE**

256. **Module Introduction**
	- Http & Backend Interaction

257. **How Does Angular Interact With Backends?**
	- How do I connect Angular to a Database?![[angular-to-database.png]]

258. **The Anatomy of Http Request**![[anatomy-http-request.png]]

259. **Backend (Firebase) Setup**
	- Go to Firebase Website: https://firebase.google.com/
	- Create a new project with any name with applied default settings.
	- Go to `All Products` and Look for `Realtime Database`.
	- Go to `Realtime Database` and then click on `Create Database`.
	- During Creation: Choose `Start in test mode` and keep other as it is.
	- Now, once it is enabled we have URL endpoint to perform all the http requests.
	- And, all set!

260. **Sending a POST Request**
	- The http request get sent only when we subscribe them.
	- Example:
``` ts
	//app.module.ts
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { FormsModule } from '@angular/forms';
	import { HttpClientModule } from '@angular/common/http';
	
	import { AppComponent } from './app.component';
	
	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, FormsModule, HttpClientModule],
	  providers: [],
	  bootstrap: [AppComponent]
	})
	export class AppModule {}
	
	//app.component.ts
	import { Component, OnInit } from "@angular/core";
	import { HttpClient } from "@angular/common/http";
	
	@Component({
	  selector: "app-root",
	  templateUrl: "./app.component.html",
	  styleUrls: ["./app.component.css"],
	})
	export class AppComponent implements OnInit {
	  loadedPosts = [];
	
	  constructor(private http: HttpClient) {}
	
	  ngOnInit() {}
	
	  onCreatePost(postData: { title: string; content: string }) {
	    // Send Http request
	    this.http
	      .post(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        postData
	      )
	      .subscribe((responseData) => {
	        console.log(responseData);
	      });
	  }
	
	  onFetchPosts() {
	    // Send Http request
	  }
	
	  onClearPosts() {
	    // Send Http request
	  }
	}
	
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12 col-md-6 col-md-offset-3">
	      <form #postForm="ngForm" (ngSubmit)="onCreatePost(postForm.value)">
	        <div class="form-group">
	          <label for="title">Title</label>
	          <input
	            type="text"
	            class="form-control"
	            id="title"
	            required
	            ngModel
	            name="title"
	          />
	        </div>
	        <div class="form-group">
	          <label for="content">Content</label>
	          <textarea
	            class="form-control"
	            id="content"
	            required
	            ngModel
	            name="content"
          >	</textarea>
	        </div>
	        <button
	          class="btn btn-primary"
	          type="submit"
	          [disabled]="!postForm.valid"
        >	
	          Send Post
	        </button>
	      </form>
	    </div>
	  </div>
	  <hr />
	  <div class="row">
	    <div class="col-xs-12 col-md-6 col-md-offset-3">
	      <button class="btn btn-primary" (click)="onFetchPosts()">
	        Fetch Posts
	      </button>
	      |
	      <button
	        class="btn btn-danger"
	        [disabled]="loadedPosts.length < 1"
	        (click)="onClearPosts()"
      >	
	        Clear Posts
	      </button>
	    </div>
	  </div>
	  <div class="row">
	    <div class="col-xs-12 col-md-6 col-md-offset-3">
	      <p>No posts available!</p>
	    </div>
	  </div>
	</div>
```

261. **GETing Data**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent implements OnInit {
	  loadedPosts = [];
	
	  constructor(private http: HttpClient) {}
	
	  ngOnInit() {
	    this.fetchPosts();
	  }
	
	  onCreatePost(postData: { title: string; content: string }) {
	    // Send Http request
	    this.http
	      .post(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        postData
	      )
	      .subscribe((responseData) => {
	        console.log(responseData);
	      });
	  }
	
	  onFetchPosts() {
	    // Send Http request
	    this.fetchPosts();
	  }
	
	  onClearPosts() {
	    // Send Http request
	  }
	
	  private fetchPosts() {
	    this.http
	      .get(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .subscribe((posts) => {
	        console.log(posts);
	      });
	  }
	}
```

262. **Using RxJS Operators to Transform Response Data**
	- Using `pipe((map(responseData) =>{}))` to transform response data before returning it.
	- Example:
``` ts
	//app.component.ts
	...
	  private fetchPosts() {
	    this.http
	      .get(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        })
	      )
	      .subscribe((posts) => {
	        console.log(posts);
	      });
	  }
	...
```

263. **Using Types with the HttpClient**
	- Example:
``` ts
	//post.model.ts
	export interface Post {
	  title: string;
	  content: string;
	  id?: string;
	}
	
	//app.component.ts
	...
	  onCreatePost(postData: { title: string; content: string }) {
	    // Send Http request
	    this.http
	      .post<{ name: string }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        postData
	      )
	      .subscribe((responseData) => {
	        console.log(responseData);
	      });
	  }
	  ...
	  private fetchPosts() {
	    this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        })
	      )
	      .subscribe((posts) => {
	        console.log(posts);
	      });
	  }
	  ...
```

264. **Outputting Posts**
	- Example:
``` ts
	//app.component.ts
	...
	  private fetchPosts() {
	    this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        })
	      )
	      .subscribe((posts) => {
	        this.loadedPosts = posts;
	      });
	  }
	  ...
	  
	  //app.component.html
	  ...
	    <div class="row">
	    <div class="col-xs-12 col-md-6 col-md-offset-3">
	      <p *ngIf="loadedPosts.length < 1">No posts available!</p>
	      <ul class="list-group" *ngIf="loadedPosts.length > 1">
	        <li class="list-group-item" *ngFor="let post of loadedPosts">
	          <h1>{{ post.title }}</h1>
	          <p>{{ post.content }}</p>
	        </li>
	      </ul>
	    </div>
	  </div>
	  ...
```

265. **Showing a Loading Indicator**
	- Example:
``` ts
	//app.component.ts
	...
	isFetching = false;
	...
	private fetchPosts() {
	    this.isFetching = true;
	    this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        })
	      )
	      .subscribe((posts) => {
	        this.loadedPosts = posts;
	        this.isFetching = false;
	      });
	}
	...
	//app.component.html
	...
	<div class="row">
	    <div class="col-xs-12 col-md-6 col-md-offset-3">
	      <p *ngIf="loadedPosts.length < 1 && !isFetching">No posts available!</p>
	      <ul class="list-group" *ngIf="loadedPosts.length > 1 && !isFetching">
	        <li class="list-group-item" *ngFor="let post of loadedPosts">
	          <h1>{{ post.title }}</h1>
	          <p>{{ post.content }}</p>
	        </li>
	      </ul>
	      <p *ngIf="isFetching">Loading...</p>
	    </div>
	</div>
	...
```

266. **Using a Service for Http Requests**
	- Other things in the `app.component.ts` file have been moved to `posts.service.ts` except `isFetching = true` boolean.
	- Example:
``` ts
	//posts.service.ts
	import { HttpClient } from "@angular/common/http";
	import { Injectable } from "@angular/core";
	import { map } from "rxjs/operators";
	import { Post } from "./post.model";
	
	@Injectable({
	  providedIn: "root",
	})
	export class PostsService {
	  constructor(private http: HttpClient) {}
	
	  createAndStorePost(title: string, content: string) {
	    const postData: Post = { title: title, content: content };
	    this.http
	      .post<{ name: string }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        postData
	      )
	      .subscribe((responseData) => {
	        console.log(responseData);
	      });
	  }
	
	  fetchPosts() {
	    this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        })
	      )
	      .subscribe((posts) => {
	        // this.loadedPosts = posts;
	        // this.isFetching = false;
	      });
	  }
	}
	
	//app.component.ts
	export class AppComponent implements OnInit {
	  loadedPosts: Post[] = [];
	  isFetching = false;
	
	  constructor(private postsService: PostsService) {}
	
	  ngOnInit() {
	    this.postsService.fetchPosts();
	  }
	
	  onCreatePost(postData: Post) {
	    // Send Http request
	    this.postsService.createAndStorePost(postData.title, postData.content);
	  }
	
	  onFetchPosts() {
	    // Send Http request
	    this.postsService.fetchPosts();
	  }
	
	  onClearPosts() {
	    // Send Http request
	  }
	}
```

266. **Services & Components Working Together**
	- We don't subscribe and write the component logic in service so we are returning the promise that we get from the `fetchPosts()` and subscribe it in component itself.
	- Example:
``` ts
	//posts.service.ts
	...
	  fetchPosts() {
	    return this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        })
	      );
	  }
	...
	
	//app.component.ts
	...
	ngOnInit() {
	    this.isFetching = true;
	    this.postsService.fetchPosts().subscribe((posts) => {
	      this.loadedPosts = posts;
	      this.isFetching = false;
	    });
	}
	...
	onFetchPosts() {
	    // Send Http request
	    this.isFetching = true;
	    this.postsService.fetchPosts().subscribe((posts) => {
	      this.loadedPosts = posts;
	      this.isFetching = false;
	    });
	} 
	... 
```

267. **Sending a DELETE Request**
	- The URL, whether it even supports the DELETE method or not that depends on the API you are using. Firebase offers it.
	- Example:
``` ts
	//posts.service.ts
	...
	deletePosts() {
	    return this.http.delete<{ [key: string]: Post }>(
	      "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	    );
	}
	...
	
	//app.component.ts
	...
	onClearPosts() {
	    // Send Http request
	    this.postsService.deletePosts().subscribe(() => {
	      this.loadedPosts = [];
	    });
	}
	...
```

268. **Handling Errors**
	- Let us create error scenario by setting `read: false` in the rule section in the firebase.
	- Example:
``` ts
	//app.component.ts
	...
	ngOnInit() {
	    this.isFetching = true;
	    this.postsService.fetchPosts().subscribe(
	      (posts) => {
	        this.loadedPosts = posts;
	        this.isFetching = false;
	      },
	      (error) => {
	        this.isFetching = false;
	        this.error = error.message;
	        console.log(error);
	      }
	    );
	}
	...
	onFetchPosts() {
	    // Send Http request
	    this.isFetching = true;
	    this.postsService.fetchPosts().subscribe(
	      (posts) => {
	        this.loadedPosts = posts;
	        this.isFetching = false;
	      },
	      (error) => {
	        this.isFetching = false;
	        this.error = error.message;
	        console.log(error);
	      }
	    );
	}
	...
	
	//app.component.html
	...
	<div class="col-xs-12 col-md-6 col-md-offset-3">
      <p *ngIf="loadedPosts.length < 1 && !isFetching && !error">
        No posts available!
      </p>
      <ul class="list-group" *ngIf="loadedPosts.length > 1 && !isFetching">
        <li class="list-group-item" *ngFor="let post of loadedPosts">
          <h1>{{ post.title }}</h1>
          <p>{{ post.content }}</p>
        </li>
      </ul>
      <p *ngIf="isFetching && !error">Loading...</p>
      <div class="alert alert-danger" *ngIf="error">
        <h1>An Error Occured!</h1>
        <p>{{ error }}</p>
      </div>
    </div>
	...
```

269. **Using Subjects for Error Handling**
	- Example:
``` ts
	//posts.service.ts
	...
	error = new Subject<String>();
	
	  createAndStorePost(title: string, content: string) {
	    const postData: Post = { title: title, content: content };
	    this.http
	      .post<{ name: string }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        postData
	      )
	      .subscribe(
	        (responseData) => {
	          console.log(responseData);
	        },
	        (error) => {
	          this.error = error.message;
	        }
	      );
	}
	...
	
	//app.component.ts
	...//imports
	
	export class AppComponent implements OnInit, OnDestroy {
	  loadedPosts: Post[] = [];
	  isFetching = false;
	  error = null;
	  private errorSub: Subscription;
	
	  constructor(private postsService: PostsService) {}
	
	  ngOnInit() {
	    this.fetchPosts();
	  }
	
	  onCreatePost(postData: Post) {
	    // Send Http request
	    this.postsService.createAndStorePost(postData.title, postData.content);
	  }
		
	  onFetchPosts() {
	    // Send Http request
	    this.fetchPosts();
	  }
	
	  private fetchPosts() {
	    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
	      this.error = errorMessage;
	    });
	
	    this.isFetching = true;
	    this.postsService.fetchPosts().subscribe(
	      (posts) => {
	        this.loadedPosts = posts;
	        this.isFetching = false;
	      },
	      (error) => {
	        this.isFetching = false;
	        this.error = error.message;
	        console.log(error);
	      }
	    );
	  }
	
	  onClearPosts() {
	    // Send Http request
	    this.postsService.deletePosts().subscribe(() => {
	      this.loadedPosts = [];
	    });
	  }
	
	  ngOnDestroy(): void {
	    this.errorSub.unsubscribe();
	  }
	}
```

270. **Using the catchError Operator**
	- To handle generic errors or for some other reason, we can handle errors using `catchError()` and we can throw the error using `throwError()`.
	- Example:
``` ts
	//posts.service.ts
	...
	fetchPosts() {
	    return this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json"
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        }),
	        catchError((errorRes) => {
	          //Send to analytics server
	          return throwError(errorRes);
	        })
	      );
	}
	...
```

271. **Error Handling & UX**
	- Example:
``` ts
	//app.component.ts
	...
	onHandleError() {
	    this.error = null;
	}
	...
	
	//app.component.html
	...
	<div class="alert alert-danger" *ngIf="error">
        <h1>An Error Occured!</h1>
        <p>{{ error }}</p>
        <button class="btn btn-danger" (click)="onHandleError()">Okay</button>
    </div>
	...
```

272. **Setting Headers**
	- Simply, we can attach a key-value pair of `HttpHeaders({})` as the second argument of GET and 3rd argument of POST as custom headers.
	- Example:
``` ts
	//posts.service.ts
	...
	fetchPosts() {
	    return this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        {
	          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
	        }
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        }),
	        catchError((errorRes) => {
	          //Send to analytics server
	          return throwError(errorRes);
	        })
	      );
	}
	...
```

273. **Adding Query Params**
	- We can do that in two different ways: one is adding as another key-value pair as params in the same object where we add headers and another way is create the params outside and set with the variable.
	- Example:
``` ts
	//posts.service.ts
	...
	  fetchPosts() {
	    const searchParams = new HttpParams()
	      .set("print", "pretty")
	      .set("custom", "key");
	
	    return this.http
	      .get<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        {
	          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
	          params: searchParams,
	          // params: new HttpParams().set("print", "pretty"),
	        }
	      )
	      .pipe(
	        map((responseData) => {
	          const postArray: Post[] = [];
	          for (const key in responseData) {
	            if (!responseData.hasOwnProperty(key)) continue;
	            postArray.push({ ...responseData[key], id: key });
	          }
	          return postArray;
	        }),
	        catchError((errorRes) => {
	          //Send to analytics server
	          return throwError(errorRes);
	        })
	      );
	  }
	...
```

274. **Observing Different Types of Responses**
	- There are different types of responses we can get from the API as POST response. For eg:
		- body : gives a body value directly
		- response : gives all the info like: status, body and so on
		- events : returns event type and response
	- Example:
``` ts
	//posts.service.ts
	...
	createAndStorePost(title: string, content: string) {
	    const postData: Post = { title: title, content: content };
	    this.http
	      .post<{ name: string }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        postData,
	        { observe: "response" }
	      )
	      .subscribe(
	        (responseData) => {
	          console.log(responseData);
	        },
	        (error) => {
	          this.error = error.message;
	        }
	      );
	  }
	...
	  deletePosts() {
	    return this.http
	      .delete<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        {
	          observe: "events",
	        }
	      )
	      .pipe(
	        tap((event) => {
	          console.log(event);
	          if (event.type === HttpEventType.Sent) {
	            //when type is Sent, we cannont access body because we don't have one.
	            console.log("Sent");
	          }
	
	          if (event.type === HttpEventType.Response) {
	            console.log(event.body);
	          }
	        })
	      );
	  }
	  ...
```

274. **Changing the Response Body Type**
	- `responseType : ''` also depends on the type you have set for your http request method(GET, PUT, DELETE, POST,...).
	- As shown in the below example, even though there are different types of `responseType: ''` we are obliged to choose `json` since we have given the `{ [key: string]: Post }` `json` object type for the http request method.
	- Example:
``` ts
	//posts.service.ts
	...
	  deletePosts() {
	    return this.http
	      .delete<{ [key: string]: Post }>(
	        "https://ng-complete-guide-d02b1-default-rtdb.firebaseio.com/posts.json",
	        {
	          observe: "events",
	          responseType: "json",
	        }
	      )
	      .pipe(
	        tap((event) => {
	          console.log(event);
	          if (event.type === HttpEventType.Sent) {
	            //when type is Sent, we cannont access body because we don't have one.
	            console.log("Sent");
	          }
	
	          if (event.type === HttpEventType.Response) {
	            console.log(event.body);
	          }
	        })
	      );
	  }
	...
```

275. **Introducing Interceptors**
	- Interceptors in AngularJS are a way to intercept and modify HTTP requests and responses. They can be used for various purposes such as authentication, logging, and caching.
	- Interceptors can also be used to handle errors or redirect the user to a login page if the authentication token is invalid.
	- It runs just before making any http request every time from anywhere in the component.
	- Example:
``` ts
	//auth-interceptors.service.ts
	import {
	  HttpEvent,
	  HttpHandler,
	  HttpInterceptor,
	  HttpRequest,
	} from "@angular/common/http";
	import { Observable } from "rxjs";
	
	export class AuthInterceptorsService implements HttpInterceptor {
	  intercept(
	    req: HttpRequest<any>,
	    next: HttpHandler
	  ): Observable<HttpEvent<any>> {
	    console.log("Request in on the way!");
	    return next.handle(req);
	  }
	}
	
	//app.module.ts
	import { BrowserModule } from "@angular/platform-browser";
	import { NgModule } from "@angular/core";
	import { FormsModule } from "@angular/forms";
	import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
	
	import { AppComponent } from "./app.component";
	import { AuthInterceptorsService } from "./auth-interceptors.service";
	
	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, FormsModule, HttpClientModule],
	  providers: [
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: AuthInterceptorsService,
	      multi: true,
	    },
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

277. **Manipulating Request Objects**
	- Here we are modifying the headers by cloning the request and passing forward so that the modified changes reflect for every request. 
	- Though we can exclude the modification for any specific URL http request by writing some conditional logic.
	- Example:
``` ts
	//auth-interceptors.service.ts
	export class AuthInterceptorsService implements HttpInterceptor {
	  intercept(
	    req: HttpRequest<any>,
	    next: HttpHandler
	  ): Observable<HttpEvent<any>> {
	    console.log("Request in on the way!");
	    console.log(req.url);
	
	    const modifiedRequest = req.clone({
	      headers: req.headers.append("Auth", "xyz"),
	    });
	    return next.handle(modifiedRequest);
	  }
	}
```

278. **Response Interceptors**
	- Example:
``` ts
	//auth-interceptors.service.ts
	export class AuthInterceptorsService implements HttpInterceptor {
	  intercept(
	    req: HttpRequest<any>,
	    next: HttpHandler
	  ): Observable<HttpEvent<any>> {
	    console.log("Request in on the way!");
	    console.log(req.url);
	
	    const modifiedRequest = req.clone({
	      headers: req.headers.append("Auth", "xyz"),
	    });
	    return next.handle(modifiedRequest).pipe(
	      tap((event) => {
	        console.log(event);
	
	        if (event.type === HttpEventType.Response) {
	          console.log("Response arrived, body data: ");
	          console.log(event.body);
	        }
	      })
	    );
	  }
	}
```

279. **Multiple Interceptors**
	- Multiple interceptors run on the order of they are  placed in the `providers:[]` array inside the `app.module.ts`.
	- Example:
``` ts
	//logging-interceptor.service.ts
	import {
	  HttpEvent,
	  HttpEventType,
	  HttpHandler,
	  HttpInterceptor,
	  HttpRequest,
	} from "@angular/common/http";
	import { Observable } from "rxjs";
	import { tap } from "rxjs/operators";
	
	export class LoggingInterceptorService implements HttpInterceptor {
	  intercept(
	    req: HttpRequest<any>,
	    next: HttpHandler
	  ): Observable<HttpEvent<any>> {
	    console.log("Outgoing request!");
	    console.log(req.url);
	    console.log(req.headers);
	
	    return next.handle(req).pipe(
	      tap((event) => {
	        if (event.type === HttpEventType.Response) {
	          console.log("Incoming response..");
	          console.log(event.body);
	        }
	      })
	    );
	  }
	}
	
	//auth-interceptor.service.ts
	export class AuthInterceptorService implements HttpInterceptor {
	  intercept(
	    req: HttpRequest<any>,
	    next: HttpHandler
	  ): Observable<HttpEvent<any>> {
	    const modifiedRequest = req.clone({
	      headers: req.headers.append("Auth", "xyz"),
	    });
	    return next.handle(modifiedRequest);
	  }
	}
	
	//app.module.ts
	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, FormsModule, HttpClientModule],
	  providers: [
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: AuthInterceptorService,
	      multi: true,
	    },
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: LoggingInterceptorService,
	      multi: true,
	    },
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

280. **Wrap Up**
	- Almost all topics covered in Http Request related topics.

281. **Useful Resources & Links**
	- Official Docs: [https://angular.io/guide/http](https://angular.io/guide/http)