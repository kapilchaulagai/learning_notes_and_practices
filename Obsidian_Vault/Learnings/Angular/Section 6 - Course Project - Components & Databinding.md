#HomeAngular - [[--Contents - Angular--]]
87. **Introduction**
	- Let's deep dive into the project.
88. **Adding Navigation with Event Binding and ngIf**
	- Example:
	``` ts
	//header.component.ts
	export class HeaderComponent {
	  @Output() featureSelected = new EventEmitter<string>();
	
	  onSelect(feature: string) {
	    this.featureSelected.emit(feature);
	  }
	}
	
	//header.component.html
	<ul class="nav navbar-nav">
        <li><a href="#" (click)="onSelect('recipe')">Recipes</a></li>
        <li><a href="#" (click)="onSelect('shopping-list')">Shopping List</a>
	    </li>
    </ul>
      
	//app.component.ts
	export class AppComponent {
	  loadedFeature = 'recipe';
	  onNavigate(feature: string) {
	    this.loadedFeature = feature;
	  }
	}
	
	//app.component.html
	<app-header (featureSelected)="onNavigate($event)"></app-header>
	<div class="container">
	  <div class="row">
	    <div class="col-md-12">
	      <app-recipes *ngIf="loadedFeature === 'recipe'"></app-recipes>
	      <app-shopping-list *ngIf="loadedFeature !== 'recipe'"></app-shopping-list>
	    </div>
	  </div>
	</div>
	```

89. **Passing Recipe Data with Property Binding**
	- Example:
	``` ts
	//recipe-item.component.ts
	export class RecipeItemComponent implements OnInit {
	  @Input() recipe: Recipe;
	
	  constructor() {}
	
	  ngOnInit(): void {}
	}
	
	//recipe-item.component.html
	<a href="#" class="list-group-item clearfix">
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
	
	//recipe-list.component.ts
	//no change
	
	//recipe-list.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <button class="btn btn-success">New Recipe</button>
	  </div>
	</div>
	
	<hr />
	<div class="row">
	  <div class="col-xs-12">
	    <app-recipe-item
	      *ngFor="let recipeEl of recipes"
	      [recipe]="recipeEl"
    >	</app-recipe-item>
	  </div>
	</div>
	```

90. **Passing Data with Event and Property Binding (Combined)**
	- Example:
	``` ts
	//recipe-list.component.ts
	export class RecipeListComponent implements OnInit {
	  @Output() recipeWasSelected = new EventEmitter<Recipe>();
	  
	  recipes: Recipe[] = [
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
	  
	  constructor() {}
	  
	  ngOnInit(): void {}
	  
	  onRecipeSelected(recipeEl: Recipe) {
	    this.recipeWasSelected.emit(recipeEl);
	  }
	}
	//recipe-list.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <app-recipe-item
	      *ngFor="let recipeEl of recipes"
	      [recipe]="recipeEl"
	      (recipeSelected)="onRecipeSelected(recipeEl)"
    >	</app-recipe-item>
	  </div>
	</div>
	
	//recipe-item.component.ts
	export class RecipeItemComponent implements OnInit {
	  @Input() recipe: Recipe;
	  @Output() recipeSelected = new EventEmitter<void>();
	
	  constructor() {}
	
	  ngOnInit(): void {}
	
	  onSelected() {
	    this.recipeSelected.emit();
	  }
	}
	
	//recipe-item.component.html
		<a href="#" class="list-group-item clearfix" (click)="onSelected()">
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
	
	//recipe-detail.component.ts
	export class RecipeDetailComponent implements OnInit {
	  @Input() recipe: Recipe;
	
	  constructor() {}
	
	  ngOnInit(): void {}
	}
	
	//recipe-detail.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <img
	      [src]="recipe.imagePath"
	      alt="{{ recipe.name }}"
	      class="img-responsive"
	      style="max-height: 300px"
	    />
	  </div>
	</div>
	<div class="row">
	  <div class="col-xs-12">
	    <h1>{{ recipe.name }}</h1>
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
	  <div class="col-xs-12">{{ recipe.description }}</div>
	</div>
	<div class="row">
	  <div class="col-xs-12">Ingredients</div>
	</div>
	
	//recipes.component.ts
	export class RecipesComponent implements OnInit {
	  selectedRecipe: Recipe;
	  constructor() {}
	
	  ngOnInit(): void {}
	}
	
	//recipes.component.html
	<div class="row">
	  <div class="col-md-5">
	    <app-recipe-list
	      (recipeWasSelected)="selectedRecipe = $event"
    >	</app-recipe-list>
	  </div>
	  <div class="col-md-7">
	    <app-recipe-detail
	      *ngIf="selectedRecipe; else infoText"
	      [recipe]="selectedRecipe"
    >	</app-recipe-detail>
	    <ng-template #infoText>
	      <p>Please select a Recipe!</p>
	    </ng-template>
	  </div>
	</div>
	```

91. **Make sure you have FormsModule added!**
	- One quick note: In case you're hitting an error in the next lecture, make sure you have `FormsModule` added to your `imports[]` in the `AppModule`. Also have a look at the following Q&A thread for more info: [https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/questions/4924644](https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/questions/4924644)

92. **Allowing the User to Add Ingredients to the Shopping List**
	- 