#HomeAngular - [[--Contents - Angular--]]
221. **Introduction**
	- Let's add forms.

222. **TD: Adding the Shopping List Form**
	- Don't forget to import FormsModule in the app module.
	- Example:
``` ts
	//shopping-edit.component.ts
	export class ShoppingEditComponent implements OnInit {
	  constructor(private slService: ShoppingListService) {}
	
	  ngOnInit(): void {}
	
	  onAddItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    this.slService.addIngredient(newIngredient);
	  }
	}
	
	//shopping-edit.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <form (ngSubmit)="onAddItem(f)" #f="ngForm">
	      <div class="row">
	        <div class="col-sm-5 form-group">
	          <label for="name">Name</label>
	          <input
	            type="text"
	            id="name"
	            name="name"
	            ngModel
	            class="form-control"
	          />
	        </div>
	        <div class="col-sm-2 form-group">
	          <label for="amount">Amount</label>
	          <input
	            type="number"
	            id="amount"
	            name="amount"
	            ngModel
	            class="form-control"
	          />
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

223. **Adding Validation to the Form**
	- Use `pattern = ""` for string regex validation.
	- Example:
``` ts
	//shopping-edit.component.html
	...
	<form (ngSubmit)="onAddItem(f)" #f="ngForm">
      <div class="row">
        <div class="col-sm-5 form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ngModel
            class="form-control"
            required
          />
        </div>
        <div class="col-sm-2 form-group">
          <label for="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            class="form-control"
            ngModel
            required
            pattern="^[1-9]+[0-9]*$"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" type="submit" [disabled]="!f.valid">
            Add
          </button>
          <button class="btn btn-danger" type="button">Delete</button>
          <button class="btn btn-primary" type="button">Clear</button>
        </div>
      </div>
    </form>
	...
```

224. **Allowing the Selection of Items in the List**
	- Example:
``` ts
	//shopping-list.service.ts
	...
	  startedEditing = new Subject<number>();
	...
	
	//shopping-list.component.ts
	export class ShoppingListComponent implements OnInit, OnDestroy {
	  ingredients: Ingredient[];
	  private igChangeSub: Subscription;
	
	  constructor(private slService: ShoppingListService) {}
	
	  ngOnInit(): void {
	    this.ingredients = this.slService.getIngredients();
	    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
	      (ingredients) => {
	        this.ingredients = ingredients;
	      }
	    );
	  }
	
	  onEditItem(index: number) {
	    this.slService.startedEditing.next(index);
	  }
	
	  ngOnDestroy(): void {
	    this.igChangeSub.unsubscribe();
	  }
	}
	
	//shopping-list.component.html
	...
	<a
        class="list-group-item"
        style="cursor: pointer"
        *ngFor="let ingredient of ingredients; let i = index"
        (click)="onEditItem(i)"
    >
	...
	
	//shopping-edit.component.ts
	...
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	...
	onAddItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    this.slService.addIngredient(newIngredient);
	}
	
	ngOnDestroy(): void {
	    this.subscription.unsubscribe();
	}
	  ...
```

225. **Loading the Shopping List items into the Form**
	- Example:
``` ts
	//shopping-list.service.ts
	...
	getIngredient(index: number) {
	    return this.ingredients[index];
	}
	...
	
	//shopping-edit.component.ts
	...
	@ViewChild('f') slForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;
	...
	ngOnInit(): void {
	    this.subscription = this.slService.startedEditing.subscribe((index) => {
	      this.editedItemIndex = index;
	      this.editMode = true;
	      this.editedItem = this.slService.getIngredient(index);
	      this.slForm.setValue({
	        name: this.editedItem.name,
	        amount: this.editedItem.amount,
	      });
	    });
	}
	...
```

226. **Updating existing Items**
	- Example:
``` ts
	//shopping-list.service.ts
	...
	updateIngredient(index: number, newIngredient: Ingredient) {
	    this.ingredients[index] = newIngredient;
	    this.ingredientsChanged.next(this.ingredients.slice());
	}
	...
	
	//shopping-edit.component.ts
	...
	onAddItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    if (this.editMode) {
	      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
	    } else this.slService.addIngredient(newIngredient);
	}
	...
	
	//shopping-edit.component.html
	...
	<button class="btn btn-success" type="submit" [disabled]="!f.valid">
        {{ editMode ? "Update" : "Add" }}
    </button>
	...
```

227. **Resetting the Form**
	- Rename Alert: `onAddItem()` to `onSubmitItem()`.
	- Example:
``` ts
	//shopping-edit.component.ts
	...
	onSubmitItem(form: NgForm) {
	    const ingName = form.value.name;
	    const ingAmount = form.value.amount;
	
	    const newIngredient = new Ingredient(ingName, ingAmount);
	    if (this.editMode) {
	      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
	      this.editMode = false;
	    } else this.slService.addIngredient(newIngredient);
	    form.reset();
	}
	...
```

228. **Allowing the User to Clear (Cancel) the Form**
	- Example:
``` ts
	//shopping-edit.component.html
	...
	<button class="btn btn-primary" type="button" (click)="onClear()">
            Clear
    </button>
    ...
    
    //shopping-edit.component.ts
    ...
     onClear() {
	    this.slForm.reset();
	    this.editMode = false;
	}
	...
```

229. **Allowing the Deletion of Shopping List Items**
	- Example:
``` ts
	//shopping-edit.component.html
	...
	 <button
            class="btn btn-danger"
            type="button"
            (click)="onDelete()"
            *ngIf="editMode"
          >
            Delete
    </button>
	...
	
	//shopping-edit.component.ts
	...
	onDelete() {
	    this.slService.deleteIngredient(this.editedItemIndex);
	    this.onClear();
	}
	...
	
	//shopping-list.service.ts
	...
	deleteIngredient(index: number) {
	    this.ingredients.splice(index, 1);
	    this.ingredientsChanged.next(this.ingredients.slice());
	}
	...
```

230. **Creating the Template for the (Reactive) Recipe Edit Form**
	- Let's create a Template first.
	- Example:
``` ts
	//recipe-edit.component.html
	<div class="row">
	  <div class="col-xs-12">
	    <form>
	      <div class="row">
	        <div class="col-xs-12">
	          <button class="btn btn-success">Save</button>
	          <button class="btn btn-danger">Cancel</button>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xs-12">
	          <div class="form-group">
	            <label for="name">Name</label>
	            <input type="text" id="name" class="form-control" />
	          </div>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xs-12">
	          <div class="form-group">
	            <label for="imagePath">Image URL</label>
	            <input type="text" id="imagePath" class="form-control" />
	          </div>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xs-12">
	          <img src="" alt="Image" class="img-responsive" />
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xs-12">
	          <div class="form-group">
	            <label for="description">Description</label>
	            <textarea
	              type="text"
	              id="description"
	              class="form-control"
	              rows="6"
            >	</textarea>
	          </div>
	        </div>
	      </div>
	      <div class="row">
	        <div class="col-xs-12">
	          <div class="row">
	            <div class="col-xs-8">
	              <input type="text" class="form-control" />
	            </div>
	            <div class="col-xs-2">
	              <input type="number" class="form-control" />
	            </div>
	            <div class="col-xs-2">
	              <button class="btn-danger">X</button>
	            </div>
	          </div>
	        </div>
	      </div>
	    </form>
	  </div>
	</div>
```

231. **Creating the Form For Editing Recipes**
	- Example:
``` ts
	//recipe-edit.component.ts
	export class RecipeEditComponent implements OnInit {
	  id: number;
	  editMode = false;
	  recipeForm: FormGroup;
	
	  constructor(
	    private route: ActivatedRoute,
	    private recipeService: RecipeService
	  ) {}
	
	  ngOnInit(): void {
	    this.route.params.subscribe((params: Params) => {
	      this.id = +params['id'];
	      this.editMode = params['id'] != null;
	      this.initForm();
	    });
	  }
	
	  private initForm() {
	    let recipeName = '';
	    let recipeImagePath = '';
	    let recipeDescription = '';
	
	    if (this.editMode) {
	      const recipe = this.recipeService.getRecipe(this.id);
	      recipeName = recipe.name;
	      recipeImagePath = recipe.imagePath;
	      recipeDescription = recipe.description;
	    }
	
	    this.recipeForm = new FormGroup({
	      name: new FormControl(recipeName),
	      imagePath: new FormControl(recipeImagePath),
	      description: new FormControl(recipeDescription),
	    });
	  }
	}
```

232. **Syncing HTML with the Form**
	- Example:
``` ts
	//recipe-edit.component.html
	...
	    <form [formGroup]="recipeForm" (ngSubmit)="onSubmit()">
	    ...
	            <label for="name">Name</label>
	            <input
	              type="text"
	              id="name"
	              formControlName="name"
	              class="form-control"
	            />
	    ...
	            <label for="imagePath">Image URL</label>
	            <input
	              type="text"
	              id="imagePath"
	              formControlName="imagePath"
	              class="form-control"
	            />
	    ...
	      <div class="row">
	        <div class="col-xs-12">
	          <img src="" alt="Image" class="img-responsive" />
	        </div>
	      </div>
	    ...
	            <label for="description">Description</label>
	            <textarea
	              type="text"
	              id="description"
	              formControlName="description"
	              class="form-control"
	              rows="6"
            >	</textarea>
	    ...
	    </form>
	...
```

233. **Fixing a Bug**
	- In the next lecture, we'll add some code to access the controls of our form array:
		`*ngFor="let ingredientCtrl of recipeForm.get('ingredients').controls; let i = index"`
	- This code will fail with the latest Angular version.
	- You can fix it easily though. Outsource the "get the controls" logic into a getter of your component code (the `.ts` file):
		`get controls() { // a getter! return (<FormArray>this.recipeForm.get('ingredients')).controls;}`
	- In the template, you can then use:
		`*ngFor="let ingredientCtrl of controls; let i = index"`
	- This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).

234. **Adding Ingredient Controls to a Form Array**
	- Example:
``` ts
	//recipe-edit.component.html
	...
	<div class="row">
        <div class="col-xs-12" formArrayName="ingredients">
          <div
            class="row"
            *ngFor="let ingredientCtrl of getControls(); let i = index"
            [formGroupName]="i"
          >
            <div class="col-xs-8">
              <input type="text" formControlName="name" class="form-control" />
            </div>
            <div class="col-xs-2">
              <input
                type="number"
                formControlName="amount"
                class="form-control"
              />
            </div>
            <div class="col-xs-2">
              <button class="btn-danger">X</button>
            </div>
          </div>
        </div>
    </div>
	...
	
	//recipe-edit.component.ts
	export class RecipeEditComponent implements OnInit {
	  id: number;
	  editMode = false;
	  recipeForm: FormGroup;
	
	  constructor(
	    private route: ActivatedRoute,
	    private recipeService: RecipeService
	  ) {}
	
	  ngOnInit(): void {
	    this.route.params.subscribe((params: Params) => {
	      this.id = +params['id'];
	      this.editMode = params['id'] != null;
	      this.initForm();
	    });
	  }
	
	  private initForm() {
	    let recipeName = '';
	    let recipeImagePath = '';
	    let recipeDescription = '';
	    let recipeIngredients = new FormArray([]);
	
	    if (this.editMode) {
	      const recipe = this.recipeService.getRecipe(this.id);
	      recipeName = recipe.name;
	      recipeImagePath = recipe.imagePath;
	      recipeDescription = recipe.description;
	      if (recipe['ingredients']) {
	        for (let ingredient of recipe.ingredients) {
	          recipeIngredients.push(
	            new FormGroup({
	              name: new FormControl(ingredient.name),
	              amount: new FormControl(ingredient.amount),
	            })
	          );
	        }
	      }
	    }
	
	    this.recipeForm = new FormGroup({
	      name: new FormControl(recipeName),
	      imagePath: new FormControl(recipeImagePath),
	      description: new FormControl(recipeDescription),
	      ingredients: recipeIngredients,
	    });
	  }
	
	  getControls() {
	    return (<FormArray>this.recipeForm.get('ingredients')).controls;
	  }
	
	  onSubmit() {
	    console.log(this.recipeForm);
	  }
	}
```

235. **Adding new Ingredient Controls**
	- Example:
``` ts
	//recipe-edit.component.html
	...
	   <hr />
        <div class="row">
            <div class="col-xs-12">
              <button
                class="btn btn-success"
                type="button"
                (click)="onAddIngredient()"
              >
                Add Ingredient
              </button>
            </div>
        </div>
    ...
    
    //recipe-edit.component.ts
    ...
    onAddIngredient() {
	    (<FormArray>this.recipeForm.get('ingredients')).push(
	      new FormGroup({
	        name: new FormControl(null),
	        amount: new FormControl(null),
	      })
	    );
	}
    ...
```

236. **Validating User Input**
	- Example:
``` ts
	//recipe-edit.component.html
	...
	<button class="btn btn-success" [disabled]="!recipeForm.valid">
            Save
    </button>
    ...
	<div
        class="row"
        style="margin-top: 10px"
        *ngFor="let ingredientCtrl of getControls(); let i = index"
        [formGroupName]="i"
        >
        <div class="col-xs-8">
            <input type="text" formControlName="name" class="form-control" />
        </div>
        <div class="col-xs-2">
            <input
            type="number"
            formControlName="amount"
            class="form-control"
            />
        </div>
        <div class="col-xs-2">
            <button class="btn-danger">X</button>
        </div>
    </div>
    ...
    
    //recipe-edit.component.ts
    ...
    onAddIngredient() {
	    (<FormArray>this.recipeForm.get('ingredients')).push(
	      new FormGroup({
	        name: new FormControl(null, Validators.required),
	        amount: new FormControl(null, [
	          Validators.required,
	          Validators.pattern(/^[1-9]+[0-9]*$/),
	        ]),
	      })
	    );
	  }
	
	  private initForm() {
	    let recipeName = '';
	    let recipeImagePath = '';
	    let recipeDescription = '';
	    let recipeIngredients = new FormArray([]);
	
	    if (this.editMode) {
	      const recipe = this.recipeService.getRecipe(this.id);
	      recipeName = recipe.name;
	      recipeImagePath = recipe.imagePath;
	      recipeDescription = recipe.description;
	      if (recipe['ingredients']) {
	        for (let ingredient of recipe.ingredients) {
	          recipeIngredients.push(
	            new FormGroup({
	              name: new FormControl(ingredient.name, Validators.required),
	              amount: new FormControl(ingredient.amount, [
	                Validators.required,
	                Validators.pattern(/^[1-9]+[0-9]*$/),
	              ]),
	            })
	          );
	        }
	      }
	    }
	
	    this.recipeForm = new FormGroup({
	      name: new FormControl(recipeName, Validators.required),
	      imagePath: new FormControl(recipeImagePath, Validators.required),
	      description: new FormControl(recipeDescription, Validators.required),
	      ingredients: recipeIngredients,
	    });
	  }
    ...
    
    //recipe-edit.component.css
    input.ng-invalid.ng-touched,
	textarea.ng-invalid.ng-touched {
	  border: 1px solid red;
	}
```

237. **Submitting the Recipe Edit Form**
	- Example:
``` ts
	//recipe.service.ts
	...
	recipesChanged = new Subject<Recipe[]>();
	...
	addRecipe(recipe: Recipe) {
	    this.recipes.push(recipe);
	    this.recipesChanged.next(this.recipes.slice());
	}
	
	  updateRecipe(index: number, newRecipe: Recipe) {
	    this.recipes[index] = newRecipe;
	    this.recipesChanged.next(this.recipes.slice());
	}
	...
	
	//recipe-list.component.ts
	...
	ngOnInit(): void {
	    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
	      this.recipes = recipes;
	    });
	    this.recipes = this.recipeService.getRecipes();
	}
	...
	
	//recipe-edit.component.ts
	...
	onSubmit() {
	    // const newRecipe = new Recipe(
	    //   this.recipeForm.value['name'],
	    //   this.recipeForm.value['description'],
	    //   this.recipeForm.value['imagePath'],
	    //   this.recipeForm.value['ingredients']
	    // );
	    if (this.editMode) {
	      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
	    } else {
	      this.recipeService.addRecipe(this.recipeForm.value);
	    }
	}
	...
```

238. **Adding a Delete and Clear (Cancel) Functionality**
	- Example:
``` ts
	//recipe-detail.component.html
	...
	<li>
          <a style="cursor: pointer" (click)="onDeleteRecipe()"
            >Delete Recipe</a
          >
    </li>
    ...
    
    //recipe-detail.component.ts
    ...
    onDeleteRecipe() {
	    this.recipeService.deleteRecipe(this.id);
	    //this.router.navigate(['/recipes']);
	}
    ...
    
    //recipe.service.ts
    ...
    deleteRecipe(index: number) {
	    this.recipes.splice(index, 1);
	    this.recipesChanged.next(this.recipes.slice());
	}
	...
	
	//recipe-edit.component.html
	...
	 <button class="btn btn-danger"  (click)="onCancel()">Cancel</button>
	...
	
	//recipe-edit.component.ts
	...
	onCancel() {
	    this.router.navigate(['../'], { relativeTo: this.route });
	  }
	
	  onSubmit() {
	    if (this.editMode) {
	      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
	    } else {
	      this.recipeService.addRecipe(this.recipeForm.value);
	    }
	    this.onCancel();
	}
	...
```

239. **Redirecting the User (after Deleting a Recipe)**
	- Example:
``` ts
	//recipe-detail.component.ts
	...
	onDeleteRecipe() {
	    this.recipeService.deleteRecipe(this.id);
	    this.router.navigate(['/recipes']);
	}
	...
```

240. **Adding an Image Preview**
	- Example:
``` ts
	//recipe-edit.component.html
	...
	<div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="imagePath">Image URL</label>
            <input
              type="text"
              id="imagePath"
              formControlName="imagePath"
              class="form-control"
              #imagePath
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <img [src]="imagePath.value" class="img-responsive" />
        </div>
    </div>
	...
```

241. **Providing the Recipe Service Correctly**
	- Move RecipeService Instance created in RecipeComponent to AppModule.

242. **Deleting Ingredients and Some Finishing Touches**
	- Example:
```ts
	//recipe-edit.component.html
	...
	<div class="col-xs-2">
        <button
            type="button"
            class="btn-danger"
            (click)="onDeleteIngredient(i)">	
            X
        </button>
    </div>
    ...
    
    //recipe-edit.component.ts
    ...
    onDeleteIngredient(index: number) {
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}
    ...
    
    //recipe-list.component.ts
    export class RecipeListComponent implements OnInit, OnDestroy {
	  recipes: Recipe[];
	  subscription: Subscription;
	
	  constructor(
	    private recipeService: RecipeService,
	    private router: Router,
	    private route: ActivatedRoute
	  ) {}
	
	  ngOnInit(): void {
	    this.subscription = this.recipeService.recipesChanged.subscribe(
	      (recipes: Recipe[]) => {
	        this.recipes = recipes;
	      }
	    );
	    this.recipes = this.recipeService.getRecipes();
	  }
	
	  onNewRecipe() {
	    this.router.navigate(['new'], { relativeTo: this.route });
	  }
	
	  ngOnDestroy(): void {
	    this.subscription.unsubscribe();
	  }
	}
```

243. **Deleting all Items in a FormArray**
	- As of Angular 8+, there's a new way of clearing all items in a `FormArray`.		`(<FormArray>this.recipeForm.get('ingredients')).clear();`
	- The `clear()` method automatically loops through all registered `FormControls` (or `FormGroups`) in the FormArray and removes them.
	- It's like manually creating a loop and calling `removeAt()` for every item.