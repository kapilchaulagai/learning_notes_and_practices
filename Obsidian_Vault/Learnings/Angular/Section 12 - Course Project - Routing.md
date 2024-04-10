#HomeAngular - [[--Contents - Angular--]]
158. **Planning the General Structure**
	- Implement Child Routing for RecipeComponent.

159. **Setting Up Routes**
	- Example:
``` ts 
	//app-routing.module.ts
	import { NgModule } from '@angular/core';
	import { RouterModule, Routes } from '@angular/router';
	import { RecipesComponent } from './recipes/recipes.component';
	import { ShoppingListComponent } from './shopping-list/shopping-list.component';
	
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  { path: 'recipes', component: RecipesComponent },
	  { path: 'shopping-list', component: ShoppingListComponent },
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
	    ShoppingListComponent,
	    ShoppingEditComponent,
	    RecipesComponent,
	    RecipeListComponent,
	    RecipeDetailComponent,
	    RecipeItemComponent,
	    DropdownDirective,
	  ],
	  imports: [BrowserModule, AppRoutingModule],
	  providers: [ShoppingListService],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.html
	<app-header (featureSelected)="onNavigate($event)"></app-header>
	<div class="container">
	  <div class="row">
	    <div class="col-md-12">
	      <!-- <app-recipes *ngIf="loadedFeature === 'recipe'"></app-recipes>
	      <app-shopping-list *ngIf="loadedFeature !== 'recipe'"></app-shopping-list> -->
	      <router-outlet></router-outlet>
	    </div>
	  </div>
	</div>
```

160. **Adding Navigation to the App**
	- Example:
``` ts
	//header.component.html
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <a href="#" class="navbar-brand">Recipe Book</a>
	    </div>
	    <div class="collapse navbar-collapse">
	      <ul class="nav navbar-nav">
	        <li><a routerLink="/recipes">Recipes</a></li>
	        <li>
	          <a [routerLink]="['/shopping-list']">Shopping List</a>
	        </li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li class="dropdown" appDropdown>
	          <a href="#" class="dropdown-toggle" role="button"
            >	Manage <span class="caret"></span
          >	</a>
	          <ul class="dropdown-menu">
	            <li><a href="#">Save Data</a></li>
	            <li><a href="#">Fetch Data</a></li>
	          </ul>
	        </li>
	      </ul>
	    </div>
	  </div>
	</nav>
	
	//header.component.ts
	import { Component, EventEmitter, Output } from '@angular/core';
	
	@Component({
	  selector: 'app-header',
	  templateUrl: './header.component.html',
	})
	export class HeaderComponent {}
```

161. **Marking Active Routes**
	- Use of `routerlinkActive = "active"`.
	- Example:
``` ts
	//header.component.html
	...
	<ul class="nav navbar-nav">
        <li routerLinkActive="active"><a routerLink="/recipes">Recipes</a></li>
        <li routerLinkActive="active">
          <a [routerLink]="['/shopping-list']">Shopping List</a>
        </li>
    </ul>
    ...
```

162. **Fixing Page Reload Issues**
	- Let's remove `href='#'` from different anchor tags to avoid reloading of the page.
	- Example:
``` ts
	//recipe-item.component.html
	<a
	  style="cursor: pointer"
	  class="list-group-item clearfix"
	  (click)="onSelected()">
	
	//recipe-detail.component.html
	...
	<div class="row">
	  <div class="col-xs-12">
	    <div class="btn-group" appDropdown>
	      <button class="btn btn-primary dropdown-toggle">
	        Manage Recipe <span class="caret"></span>
	      </button>
	      <ul class="dropdown-menu">
	        <li>
	          <a (click)="onAddToShoppingList()" style="cursor: pointer"
            >	To Shopping List.</a
          >	
	        </li>
	        <li><a style="cursor: pointer">Edit Recipe.</a></li>
	        <li><a style="cursor: pointer">Delete Recipe</a></li>
	      </ul>
	    </div>
	  </div>
	</div>
	...
	
	//header.component.html
	...
	 <ul class="nav navbar-nav navbar-right">
        <li class="dropdown" appDropdown>
          <a style="cursor: pointer" class="dropdown-toggle" role="button"
            >Manage <span class="caret"></span
          ></a>
          <ul class="dropdown-menu">
            <li><a style="cursor: pointer">Save Data</a></li>
            <li><a style="cursor: pointer">Fetch Data</a></li>
          </ul>
        </li>
    </ul>
      ...
```

163. **Child Routes: Challenge**
	- Understanding How Child Routes should be configured.

164. **Adding Child Routing Together**
	- Example:
``` ts
	//app-routing.module.ts
	const appRoutes: Routes = [
	  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
	  {
	    path: 'recipes',
	    component: RecipesComponent,
	    children: [
	      { path: '', component: RecipeStartComponent },
	      { path: ':id', component: RecipeDetailComponent },
	    ],
	  },
	  { path: 'shopping-list', component: ShoppingListComponent },
	];
	
	//recipe-start.component.html
	<h3>Please select a Recipe!</h3>
```
```	html
	//recipes.component.html
	<div class="row">
	  <div class="col-md-5">
	    <app-recipe-list></app-recipe-list>
	  </div>
	  <div class="col-md-7">
	    <!-- <app-recipe-detail
	      *ngIf="selectedRecipe; else infoText"
	      [recipe]="selectedRecipe"
    >	</app-recipe-detail>
	    <ng-template #infoText>
	      <p>Please select a Recipe!</p>
	    </ng-template> -->
	    <router-outlet></router-outlet>
	  </div>
	</div>
```

165. **Configuring Route Parameters**
	- Remove `(onClick) = ''` from `recipe-item.component.html`.
	- Remove corresponding onClick method from `recipe-item.component.ts` i.e, `onSelected(){}`.
	- Add `getRecipe(){}` method in `recipe.service.ts`.
	- Make required changes in the file `recipe-detail.component.ts` as shown in the below example.
	- Example:
``` ts
	//recipe-item.component.html
	<a style="cursor: pointer" class="list-group-item clearfix">
	  <div class="pull-left">
	    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
	    <p class="list-group-item-text">{{ recipe.description }}</p>
	  </div>
	  <span class="pull-right"
    >	<img
	      [src]="recipe.imagePath"
	      alt="{{ recipe.name }}"
	      class="img-responsive"
	      style="max-height: 50px"
	  /></span>
	</a>
	
	//recipe-item.component.ts
	export class RecipeItemComponent implements OnInit {
	  @Input() recipe: Recipe;
	
	  ngOnInit(): void {}
	}
	
	//recipe.service.ts
	...
	getRecipe(index: number) {
	   return this.recipes[index];
	 }
	...
	
	//recipe-detail.component.ts
	...
	  ngOnInit(): void {
	    this.route.params.subscribe((params: Params) => {
	      this.id = +params['id']; // convert string to number
	      this.recipe = this.recipeService.getRecipe(this.id);
	    });
	  }
	...
```

166. **Passing Dynamic Parameters to Links**
	- Example:
``` ts
	//recipe-item.component.ts
	export class RecipeItemComponent implements OnInit {
	  @Input() recipe: Recipe;
	  @Input() index: number;
	
	  ngOnInit(): void {}
	}
	
	//recipe-item.component.html
	<a
	  style="cursor: pointer"
	  [routerLink]="[index]"
	  class="list-group-item clearfix">	
	  ...
``` 
``` html
	//recipe-list.component.html
	...
	<div class="row">
	  <div class="col-xs-12">
	    <app-recipe-item
	      *ngFor="let recipeEl of recipes; let i = index"
	      [recipe]="recipeEl"
	      [index]="i"
    >	</app-recipe-item>
	  </div>
	</div>
```

167. **Styling Active Recipe items**
	- Add `routerlinkActive = "active"` for the anchor tag of the item.
	- Example:
``` html
	//recipe-item.component.html
	<a
	  style="cursor: pointer"
	  [routerLink]="[index]"
	  routerLinkActive="active"
	  class="list-group-item clearfix">
	  ...
```

168. **Adding Editing Routes**
	- First of all, just create a new component `recipe-edit`.
	- Make changes in routes.
	- Example:
``` ts
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
	      { path: ':id', component: RecipeDetailComponent },
	      { path: ':id/edit', component: RecipeEditComponent },
	    ],
	  },
	  { path: 'shopping-list', component: ShoppingListComponent },
	];
	...
```

169. **Retrieving Route Parameters**
	- Example:
``` ts
	//recipe-edit.component.ts
	export class RecipeEditComponent implements OnInit {
	  id: number;
	  editMode = false;
	
	  constructor(private route: ActivatedRoute) {}
	
	  ngOnInit(): void {
	    this.route.params.subscribe((params: Params) => {
	      this.id = +params['id'];
	      this.editMode = params['id'] != null;
	    });
	  }
	}
```

170. **Programmatic Navigation to the Edit Page**
	- Example:
``` ts
	//recipe-list.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <button class="btn btn-success" (click)="onNewRecipe()">New Recipe</button>
	  </div>
	</div>
	...
	
	//recipe-list.component.ts
	export class RecipeListComponent implements OnInit {
	  recipes: Recipe[];
	
	  constructor(
	    private recipeService: RecipeService,
	    private router: Router,
	    private route: ActivatedRoute
	  ) {}
	
	  ngOnInit(): void {
	    this.recipes = this.recipeService.getRecipes();
	  }
	
	  onNewRecipe() {
	    this.router.navigate(['new'], { relativeTo: this.route });
	  }
	}
	
	//recipe-detail.component.html
	...
	<ul class="dropdown-menu">
        <li>
          <a (click)="onAddToShoppingList()" style="cursor: pointer"
            >To Shopping List.</a
          >
        </li>
        <li>
          <a style="cursor: pointer" (click)="onEditRecipe()">Edit Recipe.</a>
        </li>
        <li><a style="cursor: pointer">Delete Recipe</a></li>
    </ul>
	...
	
	//recipe-detail.component.ts
	...
	 onEditRecipe() {
	    this.router.navigate(['edit'], { relativeTo: this.route });
	  }
	...
```

171. **One Note about Route Observables**
	- Whenever w e subscribe to params Observable, we don't need to cleanup them by unsubscribing.
	- But in case of our own created Observables, we definitely need to cleanup them by unsubscribing.

172. **Project Cleanup**
	- There's one thing I forgot to clean up here (will be cleaned up later in the course). Feel free to do the cleanup right now though.
	- Our app.component.html file looks like that:
``` ts
	<app-header (featureSelected)="onNavigate($event)"></app-header>
	<div class="container">
	  <div class="row">
	    <div class="col-md-12">
	      <router-outlet></router-outlet>
	    </div>
	  </div>
	</div>
```
- The `(featureSelected)="..."`  event listener is a relict of our "old" navigation approach using ngIf. We no longer need it, so feel free to change this template to:
``` ts
	<app-header></app-header>
	<div class="container">
	  <div class="row">
	    <div class="col-md-12">
	      <router-outlet></router-outlet>
	    </div>
	  </div>
	</div>
```