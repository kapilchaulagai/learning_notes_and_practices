#HomeAngular - [[--Contents - Angular--]]
47. **Project Introduction**
	- Planning the app

48. **Planning the App**
	- We'll also have an extra "RecipesComponent" holding Recipe List and Detail next to each Other!
	![[project-plan.png]]

49. **Creating a New App Correctly**
	MUST READ
	
	In the next lecture, we set up the course project.
	
	Make sure, you do create that app by also adding the `--no-strict`, `--routing false` and `--standalone false` flags to the ng new command - otherwise you will run into issues later on (we'll still dive into that "Strict Mode" later in the course of course, no worries)!
	
	We'll also install the Bootstrap CSS Framework and in this course, we use version 3 of the framework. Install it via `npm install --save bootstrap@3`  => The `@3`  is important!
	
	Additionally, when using a project created with Angular CLI 6+ (check via `ng v` ), you'll have an `angular.json`  file instead of an `.angular-cli.json`  file. In that file, you still need to add Bootstrap to the `styles[]`  array as shown in the next video, but the path should be `node_modules/bootstrap/dist/css/bootstrap.min.css` , NOT `../node_modules/bootstrap/dist/css/bootstrap.min.css` . The leading `../` must not be included.
	
	Also see this lecture - I do show the complete setup process there: https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6655614/
	
	If you're facing any problems, please have a look at this very thorough thread by Jost: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/17862130#questions/10444944

50. **Setting up the Application**
	- Setting up the application has been completed by following the steps provided in the 1st section.

51. **Creating the Components**
	- Complete different components listed below using CLI or manually. The hierarchy is
		- RootComponent
			- HeaderComponent
				- ShoppingListComponent
					- ShoppingEditComponent
				- recipe
					- RecipeDetailComponent
					- RecipeListComponent
						- RecipeItemComponent


52. **Using the Components**
	- Arrange the html on same hierarchy as given above.

53. **Adding a Navigation Bar**
	- Example:
	``` html
	//header.component.html
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <a href="#" class="navbar-brand">Recipe Book</a>
	    </div>
	    <div class="collapse navbar-collapse">
	      <ul class="nav navbar-nav">
	        <li><a href="#">Recipes</a></li>
	        <li><a href="#">Shopping List</a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li class="dropdown">
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
	```

54. Alternative Non-Collapsable Navigation Bar
	The way we added it, the Navbar will collapse on smaller screens. Since we didn't implement a Hamburger menu, that means that there's no way of accessing our links on smaller screens.
	
	You can either add such a menu on your own (see below), or you replace `collapse navbar-collapse`  with just `navbar-default`.
	
	Adding a Hamburger Menu:
	
	Alternatively, if you want to make the navigation bar responsive, please replace these lines in `header.component.html`:
	
	``` html
	<div class="navbar-header">
	  <a routerLink="/" class="navbar-brand">Recipe Book</a>
	</div>
	<div class="collapse navbar-collapse">
	```
	with these lines:
	``` html
	<div class="navbar-header">
	  <button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
	    <span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
	  </button>
	  <a routerLink="/" class="navbar-brand">Recipe Book</a>
	</div>
	<div
	  class="navbar-collapse"
	  [class.collapse]="collapsed"
	  (window:resize)="collapsed = true"
>	</div>
	```
	and add this line to `header.component.ts`:
	``` ts
	collapsed = true;
	```

55. **Creating a "Recipe" Model**
	- Example:
	``` ts
	//recipe.model.ts
	export class Recipe {
	  public name: string;
	  public description: string;
	  public imagePath: string;
	
	  constructor(name: string, desc: string, imagePath: string) {
	    this.name = name;
	    this.description = desc;
	    this.imagePath = imagePath;
	  }
	}
	```

56. **Adding Content to the Recipes Components**
	- Example:
	``` ts
	//recipe-list.component.ts
	import { Component, OnInit } from '@angular/core';
	import { Recipe } from '../recipe.model';
	
	@Component({
	  selector: 'app-recipe-list',
	  templateUrl: './recipe-list.component.html',
	  styleUrls: ['./recipe-list.component.css'],
	})
	export class RecipeListComponent implements OnInit {
	  recipes: Recipe[] = [
	    new Recipe(
	      'Thakali Khana',
	      'This is a typical nepali thali.',
	      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
	    ),
	  ];
	  constructor() {}
	  ngOnInit(): void {}
	}
	
	//recipe-list.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <button class="btn btn-success">New Recipe</button>
	  </div>
	</div>
	
	<div class="row">
	  <div class="col-xs-12">
	    <a href="#" class="list-group-item clearfix">
	      <div class="pull-left">
	        <h4 class="list-group-item-heading">Recipe Name</h4>
	        <p class="list-group-item-text">Description</p>
	      </div>
	      <span class="pull-right"
        >	<img src="" alt="" class="img-responsive" style="max-height: 50px"
	      /></span>
	    </a>
	    <app-recipe-item></app-recipe-item>
	  </div>
	</div>
	```

57. **Outputting a List of Recipes with ngFor**
	- Example:
	``` html
	//recipe-list.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <button class="btn btn-success">New Recipe</button>
	  </div>
	</div>
	
	<hr />
	<div class="row">
	  <div class="col-xs-12">
	    <a href="#" class="list-group-item clearfix" *ngFor="let recipe of recipes">
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
	        <!-- src="{{ recipe.imagePath }}" -->
	      /></span>
	    </a>
	    <app-recipe-item></app-recipe-item>
	  </div>
	</div>
	```

58. **Displaying a Recipe Details**
	- Example:
	``` ts
	//recipe-detail.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <img src="" alt="" class="img-responsive" />
	  </div>
	</div>
	<div class="row">
	  <div class="col-xs-12">
	    <h1>Recipe Name</h1>
	  </div>
	</div>
	<div class="row">
	  <div class="col-xs-12">
	    <div class="btn-group">
	      <button class="btn btn-primary dropdown-toggle">
	        Manage Recipe <span class="caret"></span>
	      </button>
	      <ul class="dropdown-menu">
	        <li><a href="#">To Shopping List.</a></li>
	        <li><a href="#">Edit Recipe.</a></li>
	        <li><a href="#">Delete Recipe</a></li>
	      </ul>
	    </div>
	  </div>
	</div>
	
	<div class="row">
	  <div class="col-xs-12">Description</div>
	</div>
	<div class="row">
	  <div class="col-xs-12">Ingredients</div>
	</div>
	```

59. **Working on ShoppingListComponent**
	- Added html:
	``` html
	//shopping-list.component.html
	<div class="row">
	  <div class="col-xs-10">
	    <app-shopping-edit> </app-shopping-edit>
	    <hr />
	    <ul class="list-group">
	      <a class="list-group-item" style="cursor: pointer"></a>
	    </ul>
	  </div>
	</div>
	```

60. **Creating an Ingredient Model**
	- Added a new model inside a new "shared" folder inside the app.
	- Example:
	``` ts
	//ingredient.model.ts
	export class Ingredient {
	  //   public name: string;
	  //   public amount: number;
	
	  //   constructor(name: string, amount: number) {
	  //     this.name = name;
	  //     this.amount = amount;
	  //   }
	
	  constructor(public name: string, public amount: number) {}
	}
	```

61. **Creating and Outputting the Shopping List**
	- Example:
	``` ts
	//shopping-list.component.ts
	import { Component, OnInit } from '@angular/core';
	import { Ingredient } from '../shared/ingredient.model';
	
	@Component({
	  selector: 'app-shopping-list',
	  templateUrl: './shopping-list.component.html',
	  styleUrls: ['./shopping-list.component.css'],
	})
	export class ShoppingListComponent implements OnInit {
	  ingredients: Ingredient[] = [
	    new Ingredient('Apples', 5),
	    new Ingredient('Tomatoes', 10),
	  ];
	  constructor() {}
	  ngOnInit(): void {}
	}
	
	//shopping-list.component.html
	<div class="row">
	  <div class="col-xs-10">
	    <app-shopping-edit> </app-shopping-edit>
	    <hr />
	    <ul class="list-group">
	      <a
	        class="list-group-item"
	        style="cursor: pointer"
	        *ngFor="let ingredient of ingredients"
      >	
	        {{ ingredient.name }} ({{ ingredient.amount }})
	      </a>
	    </ul>
	  </div>
	</div>
	```

62. **Adding a Shopping List Edit Section**
	- Added a html file as shown in below example:
	``` html
	//shopping-edit.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <form>
	      <div class="row">
	        <div class="col-sm-5 form-group">
	          <label for="name">Name</label>
	          <input type="text" id="name" class="form-control" />
	        </div>
	        <div class="col-sm-2 form-group">
	          <label for="amount">Amount</label>
	          <input type="number" id="amount" class="form-control" />
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xs-12">
	          <button class="btn btn-success" type="submit">Add</button>
	          <button class="btn btn-danger" type="button">Delete</button>
	          <button class="btn btn-primary" type="button">Clear</button>
	        </div>
	      </div>
	    </form>
	  </div>
	</div>
	```

63. **Wrap Up & Next Steps**
	- Some later in the course planning.