#HomeAngular - [[--Contents - Angular--]]
282. **Module Introduction**

283. **Backend (Firebase) Setup**
	- Follow same steps as in the previous section(Lecture-259) to create a new project and a new real-time database.

284. **Setting Up the DataStorage Service**
	- Let's create a `data-storage.service.ts` service in shared folder.
	- First of all, don't forget to import `HttpClientModule` in the `app.module.ts`.
	- Example:
``` ts
	//data-storage.service.ts
	import { HttpClient } from '@angular/common/http';
	import { Injectable } from '@angular/core';
	
	@Injectable({ providedIn: 'root' })
	export class DataStorageService {
	  constructor(private http: HttpClient) {}
	}
```

285. **Storing Recipes**
	- Example:
``` ts
	//data-storage.service.ts
	@Injectable({ providedIn: 'root' })
	export class DataStorageService {
	  constructor(private http: HttpClient, private recipeService: RecipeService) {}
	
	  storeRecipes() {
	    const recipes = this.recipeService.getRecipes();
	    this.http
	      .put(
	        'https://ng-course-recipe-book-16586-default-rtdb.firebaseio.com/recipes.json',
	        recipes
	      )
	      .subscribe((response) => {
	        console.log(response);
	      });
	  }
	}
	
	//header.component.ts
	export class HeaderComponent {
	  constructor(private dataStorageService: DataStorageService) {}
	
	  onSaveData() {
	    this.dataStorageService.storeRecipes();
	  }
	}
	 
	//header.component.html
	...
	<ul class="dropdown-menu">
        <li>
            <a style="cursor: pointer" (click)="onSaveData()">Save Data</a>
        </li>
        <li><a style="cursor: pointer">Fetch Data</a></li>
    </ul>
	...
```

286. **Fetching Recipes**
	- Example:
``` ts
	//header.component.html
	...
	<ul class="dropdown-menu">
        <li>
            <a style="cursor: pointer" (click)="onSaveData()">Save Data</a>
        </li>
        <li>
            <a style="cursor: pointer" (click)="onFetchData()">Fetch Data</a>
        </li>
    </ul>
	...
	
	//header.component.ts
	...
	onFetchData() {
	    this.dataStorageService.fetchRecipes();
	}
	...
	
	//data-storage.service.ts
	...
	fetchRecipes() {
	    this.http
	      .get<Recipe[]>(
	        'https://ng-course-recipe-book-16586-default-rtdb.firebaseio.com/recipes.json'
	      )
	      .subscribe((recipes) => this.recipeService.setRecipes(recipes));
	}
	...
	
	//recipe.service.ts
	...
	setRecipes(recipes: Recipe[]) {
	    this.recipes = recipes;
	    this.recipesChanged.next(this.recipes.slice());
	}
	...
```

287. **Transforming Response Data**
	- Now, since we are fetching recipes from server we don't need dummy recipes array written in the `recipe.service.ts` that we can remove and initialize the empty recipe array.
	- Also, if we don't add ingredients and submit the recipe to the server then we may encounter any error while fetching and working with recipe that doesn't contain ingredients at all.
	- So, let's transform response to add at least an empty ingredients array so that we can avoid the possible errors.
	- Example:
``` ts
	//data-storage.service.ts
	...
	fetchRecipes() {
	    this.http
	      .get<Recipe[]>(
	        'https://ng-course-recipe-book-16586-default-rtdb.firebaseio.com/recipes.json'
	      )
	      .pipe(
	        map((response) => {
	          return response.map((response) => {
	            return {
	              ...response,
	              ingredients: response.ingredients ? response.ingredients : [],
	            };
	          });
	        })
	      )
	      .subscribe((recipes) => this.recipeService.setRecipes(recipes));
	}
	...
```

288. **Resolving Data Before Loading**
	- We sometimes try to reload some URLs that want to get some local resources which are not available and leads to an error.
	- To prevent such error, we can fetch resources from the server if they don't lie locally, which is possible using `Resolve`.
	- Example:
``` ts
	//recipes-resolver.service.ts
	import { Injectable } from '@angular/core';
	import {
	  ActivatedRouteSnapshot,
	  Resolve,
	  RouterStateSnapshot,
	} from '@angular/router';
	import { Recipe } from './recipe.model';
	import { Observable } from 'rxjs';
	import { DataStorageService } from '../shared/data-storage.service';
	
	@Injectable({ providedIn: 'root' })
	export class RecipesResolverService implements Resolve<Recipe[]> {
	  constructor(private dataStorageService: DataStorageService) {}
	
	  resolve(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
	  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
	    return this.dataStorageService.fetchRecipes();
	  }
	}
	
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
	];
	...
	
	//data-storage.service.ts
	...
	fetchRecipes() {
	    return this.http
	      .get<Recipe[]>(
	        'https://ng-course-recipe-book-16586-default-rtdb.firebaseio.com/recipes.json'
	      )
	      .pipe(
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
```

289. **Fixing a Bug with the Resolver**
	- Check available recipe locally before fetching from server.
	- Example:
``` ts
	//data-storage.service.ts
	...
	@Injectable({ providedIn: 'root' })
	export class RecipesResolverService implements Resolve<Recipe[]> {
	  constructor(
	    private dataStorageService: DataStorageService,
	    private recipesService: RecipeService
	  ) {}
	
	  resolve(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot
	  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
	    const recipes = this.recipesService.getRecipes();
	    return recipes.length === 0
	      ? this.dataStorageService.fetchRecipes()
	      : recipes;
	  }
	}
	...
```