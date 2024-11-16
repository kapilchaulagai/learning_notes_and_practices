#HomeAngular - [[--Contents - Angular--]]
324. **Module Introduction**
	- Modules & Optimization

325. **What are Modules?** ![[modules.png]]

326. **Analyzing the AppModule**

327. **Getting Started with Feature Modules** ![[multi-modules.png]]
	- Example:
``` ts
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	    ShoppingListComponent,
	    ShoppingEditComponent,
	    DropdownDirective,
	    AuthComponent,
	    LoadingSpinnerComponent,
	    AlertComponent,
	    PlaceholderDirective
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    ReactiveFormsModule,
	    HttpClientModule,
	    AppRoutingModule,
	    RecipesModule
	  ],
	  providers: [
	    ShoppingListService,
	    RecipeService,
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: AuthInterceptorService,
	      multi: true
	    }
	  ],
	  bootstrap: [AppComponent],
	  // // Placeholder Directive : Requires only in the old version of the angular
	  // entryComponents: [AlertComponent]
	})
	export class AppModule { }

	//recipes.module.ts
	@NgModule({
	    declarations: [
	        RecipesComponent,
	        RecipeListComponent,
	        RecipeDetailComponent,
	        RecipeItemComponent,
	        RecipeStartComponent,
	        RecipeEditComponent
	    ],
	    imports: []
	})
	export class RecipesModule {
	}
```

328. **Splitting Modules Correctly**
	- Except Services, everything like: components, directives, pipes, modules, etc. must be imported in the respective module in order to access their features.
	- Example:
``` ts
	//recipes.module.ts
	@NgModule({
	    declarations: [
	        RecipesComponent,
	        RecipeListComponent,
	        RecipeDetailComponent,
	        RecipeItemComponent,
	        RecipeStartComponent,
	        RecipeEditComponent
	    ],
	    imports: [RouterModule, CommonModule, ReactiveFormsModule]
	})
	export class RecipesModule {
	}
```

329. **Adding Routes to Feature Modules**
	- Example:
``` ts
	//recipe-routing.module.ts
	const routes: Routes = [
	    {
	        path: 'recipes',
	        component: RecipesComponent,
	        canActivate: [AuthGuard],
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
	];
	
	@NgModule({
	    imports: [RouterModule.forChild(routes)],
	    exports: [RouterModule]
	})
	export class RecipesRoutingModule { }
	
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  { path: 'shopping-list', component: ShoppingListComponent },
	  { path: 'auth', component: AuthComponent },
	];
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes)],
	  exports: [RouterModule],
	})
	export class AppRoutingModule { }
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	    ShoppingListComponent,
	    ShoppingEditComponent,
	    DropdownDirective,
	    AuthComponent,
	    LoadingSpinnerComponent,
	    AlertComponent,
	    PlaceholderDirective
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    ReactiveFormsModule,
	    HttpClientModule,
	    AppRoutingModule,
	    RecipesModule
	  ],
	  providers: [
	    ShoppingListService,
	    RecipeService,
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: AuthInterceptorService,
	      multi: true
	    }
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule { }
	
	//recipes.module.ts
	@NgModule({
	    declarations: [
	        RecipesComponent,
	        RecipeListComponent,
	        RecipeDetailComponent,
	        RecipeItemComponent,
	        RecipeStartComponent,
	        RecipeEditComponent
	    ],
	    imports: [RouterModule, CommonModule, ReactiveFormsModule, RecipesRoutingModule]
	})
	export class RecipesModule {
	}
```

330. **Component Declarations**
	- Since we are routing to the recipes components through URL and we are not using them anywhere else than the recipes module and components, we can remove exports of the such components from the recipes module.
``` ts
	//recipes.module.ts
	@NgModule({
	    declarations: [
	        RecipesComponent,
	        RecipeListComponent,
	        RecipeDetailComponent,
	        RecipeItemComponent,
	        RecipeStartComponent,
	        RecipeEditComponent
	    ],
	    imports: [RouterModule, CommonModule, ReactiveFormsModule, RecipesRoutingModule]
	})
	export class RecipesModule {
	}
```

331. **The ShoppingList Feature Module**
	- Create ShoppingListModule, ShoppingListRoutingModule and then move all the declarations and imports/exports as shown in the below example.
	- Most necessarily, don't forget to import ShoppingListRoutingModule in ShoppingListModule and ShoppingListModule in AppModule.
	- Example:
``` ts
	//shopping-list.module.ts
	@NgModule({
	    declarations: [
	        ShoppingListComponent,
	        ShoppingEditComponent,
	    ],
	    imports: [
	        RouterModule, 
	        CommonModule, 
	        FormsModule,
	        ShoppingListRoutingModule
	    ]
	})
	export class ShoppingListModule {
	}
	
	//shopping-list-routing.module.ts
	const routes: Routes = [
	    { path: 'shopping-list', component: ShoppingListComponent },
	];
	
	@NgModule({
	    imports: [RouterModule.forChild(routes)],
	    exports: [RouterModule]
	})
	export class ShoppingListRoutingModule{}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	    DropdownDirective,
	    AuthComponent,
	    LoadingSpinnerComponent,
	    AlertComponent,
	    PlaceholderDirective
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    ReactiveFormsModule,
	    HttpClientModule,
	    AppRoutingModule,
	    RecipesModule,
	    ShoppingListModule
	  ],
	  providers: [
	    ShoppingListService,
	    RecipeService,
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: AuthInterceptorService,
	      multi: true
		    }
		  ],
		  bootstrap: [AppComponent],
		})
		export class AppModule { }
		
		//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  { path: 'auth', component: AuthComponent },
	];
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes)],
	  exports: [RouterModule],
	})
	export class AppRoutingModule { }
```

332. **Understanding Shared Modules** ![[shared-modules.png]]
	- Multiple declarations of same thing: not allowed.
	- Example:
``` ts
	//shared.module.ts
	@NgModule({
	    declarations:[
	        AlertComponent,
	        LoadingSpinnerComponent,
	        PlaceholderDirective,
	        DropdownDirective
	    ],
	    imports:[CommonModule],
	    exports:[
	        AlertComponent,
	        LoadingSpinnerComponent,
	        PlaceholderDirective,
	        DropdownDirective,
	        CommonModule
	    ]
	})
	export class SharedModule{}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	    AuthComponent,
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    ReactiveFormsModule,
	    HttpClientModule,
	    AppRoutingModule,
	    RecipesModule,
	    ShoppingListModule,
	    SharedModule
	  ],
	  providers: [
	    ShoppingListService,
	    RecipeService,
	    {
	      provide: HTTP_INTERCEPTORS,
	      useClass: AuthInterceptorService,
	      multi: true
	    }
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//shopping-list.module.ts
	@NgModule({
	    declarations: [
	        ShoppingListComponent,
	        ShoppingEditComponent,
	    ],
	    imports: [
	        RouterModule, 
	        FormsModule,
	        ShoppingListRoutingModule,
	        SharedModule
	    ]
	})
	export class ShoppingListModule {}
	
	//recipes.module.ts
	@NgModule({
	    declarations: [
	        RecipesComponent,
	        RecipeListComponent,
	        RecipeDetailComponent,
	        RecipeItemComponent,
	        RecipeStartComponent,
	        RecipeEditComponent
	    ],
	    imports: [RouterModule, ReactiveFormsModule, RecipesRoutingModule, SharedModule]
	})
	export class RecipesModule {}
```

333. **Understanding the Core Module** ![[core-module.png]]
	- Example:
``` ts
	//core.module.ts
	@NgModule({
	    providers: [
	        ShoppingListService,
	        RecipeService,
	        {
	            provide: HTTP_INTERCEPTORS,
	            useClass: AuthInterceptorService,
	            multi: true
	        }
	    ]
	})
	export class CoreModule {}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	    AuthComponent,
	  ],
	  imports: [
	    BrowserModule,
	    FormsModule,
	    ReactiveFormsModule,
	    HttpClientModule,
	    AppRoutingModule,
	    RecipesModule,
	    ShoppingListModule,
	    SharedModule,
	    CoreModule
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

334. **Adding an Auth Feature Module**
	- Example:
``` ts
	//auth.module.ts
	@NgModule({
	    declarations:[AuthComponent],
	    imports:[
	        CommonModule, 
	        FormsModule, 
	        SharedModule,
	        RouterModule.forChild([{ path: 'auth', component: AuthComponent }])],
	})
	export class AuthModule{}
	
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	  ],
	  imports: [
	    BrowserModule,
	    HttpClientModule,
	    AppRoutingModule,
	    RecipesModule,
	    ShoppingListModule,
	    SharedModule,
	    CoreModule,
	    AuthModule
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}

	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	];
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes)],
	  exports: [RouterModule],
	})
	export class AppRoutingModule { }
```

335. **Understanding Lazy Loading** ![[lazy-loading.png]]

336. **Implementing Lazy Loading**
	- Example:
``` ts
	//app.module.ts
	@NgModule({
	  declarations: [
	    AppComponent,
	    HeaderComponent,
	  ],
	  imports: [
	    BrowserModule,
	    HttpClientModule,
	    AppRoutingModule,
	    ShoppingListModule,
	    SharedModule,
	    CoreModule,
	    AuthModule
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  {
	    path: 'recipes',
	    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
	  }
	];
	
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes)],
	  exports: [RouterModule],
	})
	export class AppRoutingModule { }
	
	//recipes.module.ts
	@NgModule({
	    declarations: [
	        RecipesComponent,
	        RecipeListComponent,
	        RecipeDetailComponent,
	        RecipeItemComponent,
	        RecipeStartComponent,
	        RecipeEditComponent
	    ],
	    imports: [RouterModule, ReactiveFormsModule, RecipesRoutingModule, SharedModule]
	})
	export class RecipesModule {}
	
	//recipes-routing.module.ts
	const routes: Routes = [
	    {
	        path: '',
	        component: RecipesComponent,            
	        canActivate: [AuthGuard],
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
	];
	
	@NgModule({
	    imports: [RouterModule.forChild(routes)],
	    exports: [RouterModule]
	})
	export class RecipesRoutingModule { }
```

337. **More Lazy Loading**
	- Shopping-List and Auth Module Lazy Loading implementation
	- Example:
``` ts
	//ShoppingListModule
	//shopping-list-routing.module.ts
	const routes: Routes = [
	    { path: '', component: ShoppingListComponent },
	];
	
	@NgModule({
	    imports: [RouterModule.forChild(routes)],
	    exports: [RouterModule]
	})
	export class ShoppingListRoutingModule{}
	
	//AuthModule
	//auth.module.ts
	@NgModule({
	    declarations:[AuthComponent],
	    imports:[
	        CommonModule, 
	        FormsModule, 
	        SharedModule,
	        RouterModule.forChild([{ path: '', component: AuthComponent }])],
	})
	export class AuthModule{}
	
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  {
	    path: 'recipes',
	    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
	  },
	  {
	    path: 'shopping-list',
	    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
	  },
	  {
	    path: 'auth',
	    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	  }
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
	    HeaderComponent,
	  ],
	  imports: [
	    BrowserModule,
	    HttpClientModule,
	    AppRoutingModule,
	    SharedModule,
	    CoreModule,
	  ],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

338. **Preloading Lazy-Loaded Code**
	- We can achieve this by using `preloadingStrategy: PreloadedAllModules`.
	- Example:
``` ts
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  {
	    path: 'recipes',
	    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
	  },
	  {
	    path: 'shopping-list',
	    loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
	  },
	  {
	    path: 'auth',
	    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	  }
	];
	
	@NgModule({
	  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
	  exports: [RouterModule],
	})
	export class AppRoutingModule {}
```

339. **Modules & Services**
	- Services & Modules ![[services-and-modules.png]]

340. **Loading Services Differently**
	- Summary is:
	- We must use AppModule or root Injection for services so that we can get a single and same instance of the services across the app.
	- But by any chance if it is required to have a different instance of a service in an individual component then have a proper understanding to avoid the strange behavior or a bug.

341. **Useful Resources & Links**
	- Useful Resources:
	- Official Docs: [https://angular.io/guide/ngmodules](https://angular.io/guide/ngmodules)
	- NgModules FAQ: [https://angular.io/guide/ngmodule-faq](https://angular.io/guide/ngmodule-faq)