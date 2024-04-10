#HomeAngular - [[--Contents - Angular--]]
119. **Introduction**
	- Adding some services:![[adding-service.png]]

120. **Setting up the Services**
	- Create RecipeService under recipes folder.
	- Create ShoppingListService under shopping-list folder.

121. **Managing Recipes in a Recipe Service**
	- Refactor the codes from different other components to service class.
	- Example:
``` ts
	//recipe.service.ts
	import { Recipe } from "./recipe.model";
	
	export class RecipeService{
	    private recipes: Recipe[] = [
	        new Recipe(
	          'Thakali Khana1',
	          'This is a typical nepali thali.',
	          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
	        ),
	        new Recipe(
	          'Thakali Khana2',
	          'This is a typical nepali thali.',
	          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
	        ),
	        new Recipe(
	          'Thakali Khana3',
	          'This is a typical nepali thali.',
	          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
	        ),
	      ];
	
	      getRecipes(){
	        return this.recipes.slice();
	      }
	}
	
	//recipes.component.ts
	import { Component, OnInit } from '@angular/core';
	import { Recipe } from './recipe.model';
	import { RecipeService } from './recipe.service';
	
	@Component({
	  selector: 'app-recipes',
	  templateUrl: './recipes.component.html',
	  providers:[RecipeService]
	})
	export class RecipesComponent implements OnInit {
	  selectedRecipe: Recipe;
	  constructor() {}
	
	  ngOnInit(): void {}
	}
	
	//recipe-list.component.ts
		import { Component, EventEmitter, OnInit, Output } from '@angular/core';
	import { Recipe } from '../recipe.model';
	import { RecipeService } from '../recipe.service';
	
	@Component({
	  selector: 'app-recipe-list',
	  templateUrl: './recipe-list.component.html',
	  styleUrls: ['./recipe-list.component.css'],
	})
	export class RecipeListComponent implements OnInit {
	  @Output() recipeWasSelected = new EventEmitter<Recipe>();
	recipes: Recipe[];
	
	  constructor(private recipeService: RecipeService) {}
	  ngOnInit(): void {
	    this.recipes = this.recipeService.getRecipes();
	  }
	
	  onRecipeSelected(recipeEl: Recipe) {
	    this.recipeWasSelected.emit(recipeEl);
	  }
	}
```

122. **Using a Service for Cross-Component Communication**
	- There was a lengthy process for passing information between a component hierarchies.
	- So, let's make use of service to minimize the length of the process.
	- Example:
``` ts
	//recipe.service.ts (added property)
	  recipeSelected = new EventEmitter<Recipe>();
	 
	 //recipe-item.component.ts
	 export class RecipeItemComponent implements OnInit {
	  @Input() recipe: Recipe;
	
	  constructor(private recipeService: RecipeService) {}
	
	  ngOnInit(): void {}
	
	  onSelected() {
	    this.recipeService.recipeSelected.emit(this.recipe);
	  }
	}
	
	//recipe-list.component.ts
	export class RecipeListComponent implements OnInit {
	  recipes: Recipe[];
	
	  constructor(private recipeService: RecipeService) {}
	  ngOnInit(): void {
	    this.recipes = this.recipeService.getRecipes();
	  }
	}
	
	//remove below line from
	//recipe-list.component.html
	(recipeSelected)="onRecipeSelected(recipeEl)"
	
	//recipes.component.ts
	export class RecipesComponent implements OnInit {
	  selectedRecipe: Recipe;
	  constructor(private recipeService: RecipeService) {}
	
	  ngOnInit(): void {
	    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
	      this.selectedRecipe = recipe;
	    });
	  }
	}
	
	//remove below line from
	//recipes.component.html
	(recipeWasSelected)="selectedRecipe = $event"
```

123. **Adding the Shopping List Service**
	- Similarly, how we did the changes in the recipe part now we are going to do in the shopping list.
	- Example:
``` ts
	import { Ingredient } from '../shared/ingredient.model';
	
	export class ShoppingListService {
	  private ingredients: Ingredient[] = [
	    new Ingredient('Apples', 5),
	    new Ingredient('Tomatoes', 10),
	  ];
	
	  getIngredients() {
	    return this.ingredients.slice();
	  }
	
	  addIngredient(ingredient: Ingredient) {
	    this.ingredients.push(ingredient);
	  }
	}
	
	//shopping-edit.component.ts
	export class ShoppingEditComponent implements OnInit {
	  @ViewChild('nameInput') nameInputRef: ElementRef;
	  @ViewChild('amountInput') amountInputRef: ElementRef;
	
	  constructor(private slService: ShoppingListService) {}
	
	  ngOnInit(): void {}
	
	  onAddItem(event: any) {
	    event.preventDefault();
	    const ingName = this.nameInputRef.nativeElement.value;
	    const ingAmount = this.amountInputRef.nativeElement.value;
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    this.slService.addIngredient(newIngredient);
	  }
	}
	
	//shopping-list.component.ts
	export class ShoppingListComponent implements OnInit {
	  ingredients: Ingredient[];
	  constructor(private slService: ShoppingListService) {}
	  ngOnInit(): void {
	    this.ingredients = this.slService.getIngredients();
	  }
	}
	
	//shopping-list.component.html
	<div class="row">
	  <div class="col-xs-10">
	    <app-shopping-edit></app-shopping-edit>
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

124. **Using Services for Pushing Data from A to B**
	- Since, we are using `slice()` array of ingredients we are not able to add new ingredients in the existing array of ingredients.
	- To overcome this issue we are making some changes.
	- Example:
``` ts
	//shopping-list.service.ts
	export class ShoppingListService {
	  ingredientsChanged = new EventEmitter<Ingredient[]>();
	  private ingredients: Ingredient[] = [
	    new Ingredient('Apples', 5),
	    new Ingredient('Tomatoes', 10),
	  ];
	
	  getIngredients() {
	    return this.ingredients.slice();
	  }
	
	  addIngredient(ingredient: Ingredient) {
	    this.ingredients.push(ingredient);
	    this.ingredientsChanged.emit(this.ingredients.slice());
	  }
	}
	
	//shopping-list.component.ts
	export class ShoppingListComponent implements OnInit {
	  ingredients: Ingredient[];
	  constructor(private slService: ShoppingListService) {}
	  ngOnInit(): void {
	    this.ingredients = this.slService.getIngredients();
	    this.slService.ingredientsChanged.subscribe((ingredients) => {
	      this.ingredients = ingredients;
	    });
	  }
	}
```

125. **Adding Ingredients to Recipes**
	- Let's add Ingredients array in the recipe model.
	- Example:
``` ts
	//recipe.model.ts
	export class Recipe {
	  public name: string;
	  public description: string;
	  public imagePath: string;
	  public ingredients: Ingredient[];
	
	  constructor(
	    name: string,
	    desc: string,
	    imagePath: string,
	    ingredients: Ingredient[]
	  ) {
	    this.name = name;
	    this.description = desc;
	    this.imagePath = imagePath;
	    this.ingredients = ingredients;
	  }
	}
	
	//recipe.service.ts
	export class RecipeService {
	  recipeSelected = new EventEmitter<Recipe>();
	
	  private recipes: Recipe[] = [
	    new Recipe(
	      'Thakali Khana1',
	      'This is a typical nepali thali.',
	      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU',
	      [new Ingredient('Meat', 1), new Ingredient('French Fries', 3)]
	    ),
	    new Recipe(
	      'Thakali Khana2',
	      'This is a typical nepali thali.',
	      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU',
	      [new Ingredient('Banana', 4), new Ingredient('Coke', 2)]
	    ),
	    new Recipe(
	      'Thakali Khana3',
	      'This is a typical nepali thali.',
	      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU',
	      [new Ingredient('Cucumber', 5), new Ingredient('Lemon', 3)]
	    ),
	  ];
	
	  getRecipes() {
	    return this.recipes.slice();
	  }
	}
	
	//recipe-detail.component.html
	...
	<div class="row">
	  <div class="col-xs-12">
	    <ul class="list-group" *ngFor="let ingredient of recipe.ingredients">
	      {{
	        ingredient.name
	      }}
	      -
	      {{
	        ingredient.amount
	      }}
	    </ul>
	  </div>
	</div>
```

126. **Passing Ingredients from Recipes to the Shopping List (via a Service)**
	- Let's make "To Shopping List" option under "Manage Recipe" working that adds current ingredients in the recipe to be added in the ingredients shopping list.
	- Example:
``` ts
	export class ShoppingListService {
	  ingredientsChanged = new EventEmitter<Ingredient[]>();
	  private ingredients: Ingredient[] = [
	    new Ingredient('Apples', 5),
	    new Ingredient('Tomatoes', 10),
	  ];
	
	  getIngredients() {
	    return this.ingredients.slice();
	  }
	
	  addIngredient(ingredient: Ingredient) {
	    this.ingredients.push(ingredient);
	    this.ingredientsChanged.emit(this.ingredients.slice());
	  }
	
	  addIngredients(ingredients: Ingredient[]) {
	    // for (let ingredient of ingredients) {
	    //   this.addIngredient(ingredient);
	    // }
	    this.ingredients.push(...ingredients);
	    this.ingredientsChanged.emit(this.ingredients.slice());
	  }
	}
	
	//recipe.service.ts
	@Injectable()
	export class RecipeService {
	  recipeSelected = new EventEmitter<Recipe>();
	
	  private recipes: Recipe[] = [
	    //...recipes
	  ];
	
	  constructor(private slService: ShoppingListService) {}
	
	  getRecipes() {
	    return this.recipes.slice();
	  }
	
	  addIngredientsToShoppingList(ingredients: Ingredient[]) {
	    this.slService.addIngredients(ingredients);
	  }
	}
	
	//recipe-detail.component.ts
	export class RecipeDetailComponent implements OnInit {
	  @Input() recipe: Recipe;
	
	  constructor(private recipeService: RecipeService) {}
	
	  ngOnInit(): void {}
	  onAddToShoppingList() {
	    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
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
        <li><a href="#">Edit Recipe.</a></li>
        <li><a href="#">Delete Recipe</a></li>
    </ul>
	...
```