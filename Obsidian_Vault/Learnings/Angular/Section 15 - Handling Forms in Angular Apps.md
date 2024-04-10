#HomeAngular - [[--Contents - Angular--]]
186. **Module Introduction**
	- Forms

187. Why do we Need Angular's Help?
	- Angular retrieves key-value pair from the forms template and also checks for valid data in the forms.

188. **Template-Driven (TD) vs Reactive Approach**
		![[forms-approaches.png]]
189. **An Example Form**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	  }
	}
	```
``` html
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
	      <form>
	        <div id="user-data">
	          <div class="form-group">
	            <label for="username">Username</label>
	            <input type="text" id="username" class="form-control">
	          </div>
	          <button class="btn btn-default" type="button">Suggest an Username</button>
	          <div class="form-group">
	            <label for="email">Mail</label>
	            <input type="email" id="email" class="form-control">
	          </div>
	        </div>
	        <div class="form-group">
	          <label for="secret">Secret Questions</label>
	          <select id="secret" class="form-control">
	            <option value="pet">Your first Pet?</option>
	            <option value="teacher">Your first teacher?</option>
	          </select>
	        </div>
	        <button class="btn btn-primary" type="submit">Submit</button>
	      </form>
	    </div>
	  </div>
	</div>
```

190. **TD: Creating the Form and Registering the Controls**
	- Don't forget to import `FormsModule` in the app module.
	- Add some controls in the forms template using `ngModel` and `name =""`.
	- Example:
``` html
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
	      <form>
	        <div id="user-data">
	          <div class="form-group">
	            <label for="username">Username</label>
	            <input
	              type="text"
	              id="username"
	              class="form-control"
	              ngModel
	              name="username"
	            />
	          </div>
	          <button class="btn btn-default" type="button">
	            Suggest an Username
	          </button>
	          <div class="form-group">
	            <label for="email">Mail</label>
	            <input
	              type="email"
	              id="email"
	              class="form-control"
	              ngModel
	              name=" email"
	            />
	          </div>
	        </div>
	        <div class="form-group">
	          <label for="secret">Secret Questions</label>
	          <select id="secret" class="form-control" ngModel name="secret">
	            <option value="pet">Your first Pet?</option>
	            <option value="teacher">Your first teacher?</option>
	          </select>
	        </div>
	        <button class="btn btn-primary" type="submit">Submit</button>
	      </form>
	    </div>
	  </div>
	</div>
```

191. **TD: Submitting and Using the Form**
	- Most important line: `<form (ngSubmit)="onSubmit(f)" #f="ngForm"></form>`.
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	  }
	
	  onSubmit(form: NgForm) {
	    console.log(form);
	  }
	}
	
	//app.component.html
	...
	<form (ngSubmit)="onSubmit(f)" #f="ngForm">
		...
		...
	</form>
	...
```

192. **TD: Understanding Form State**
	- Understanding meanings of key-value pairs in the form.

193. **TD: Accessing the Form with @ViewChild**
	-  Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  @ViewChild('f') signupForm: NgForm;
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	  }
	
	  // onSubmit(form: NgForm) {
	  //   console.log(form);
	  // }
	
	  onSubmit() {
	    console.log(this.signupForm);
	  }
	}
	
	//app.component.html
	...
	<form (ngSubmit)="onSubmit()" #f="ngForm">
		...
		...
	</form>
	...
```

194. **TD: Adding Validation to check User Input**
	- Directives:
	- required : validates whether field has value or not.
	- email: validates whether values entered match email format or not
	- We can find few representations of key-value pair added by angular in the html tag of the respective controls too.
	- Also, we can find few key-value pairs like `valid : false` in the control level also like in the form level.

195. **Built-in Validators & Using HTML5 Validation**
	- Which Validators do ship with Angular? 
	- Check out the Validators class: [https://angular.io/api/forms/Validators](https://angular.io/api/forms/Validators) - these are all built-in validators, though that are the methods which actually get executed (and which you later can add when using the reactive approach).
	- For the template-driven approach, you need the directives. You can find out their names, by searching for "validator" in the official docs: [https://angular.io/api?type=directive](https://angular.io/api?type=directive) - everything marked with "D" is a directive and can be added to your template.
	- Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the `ngNativeValidate`  to a control in your template.

196. **Using the Form State**
	- Set css for showing warning red borders for the controls when they are touched and invalid.
	- Set some warning message below the invalid control.
	- Example:
``` css
	//app.component.css
	.container {
	  margin-top: 30px;
	}
	
	input.ng-invalid.ng-touched {
	  border: 1px solid red;
	}
	
```
``` html
	//app.component.html
	...
	<div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name=" email"
              required
              email
            />
          </div>
    <p *ngIf="">Please enter a valid value!</p>
	...
```

197. **TD: Outputting Validation Error Messages**
	- Example:
``` html
	//app.component.html
	...
	<div class="form-group">
            <label for="email">Mail</label>
            <input
              type="email"
              id="email"
              class="form-control"
              ngModel
              name=" email"
              required
              email
              #email="ngModel"
            />
            <span class="help-block" *ngIf="!email.valid && email.touched"
              >Please enter a valid email!</span
            >
    </div>
	...
```

198. **TD: Set Default Values with ngModel Property Binding**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  defaultQuestion = 'pet';
	  @ViewChild('f') signupForm: NgForm;
	
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	  }
	
	  onSubmit() {
	    console.log(this.signupForm);
	  }
	}
	
	//app.component.html
	...
	<div class="form-group">
          <label for="secret">Secret Questions</label>
          <select
            id="secret"
            class="form-control"
            [ngModel]="defaultQuestion"
            name="secret"
          >
            <option value="pet">Your first Pet?</option>
            <option value="teacher">Your first teacher?</option>
          </select>
    </div>
	...
```

199. **TD: Using ngModel with Two-Way-Binding**
	- Two-way data binding creates a live connection between the model and the view, allowing changes to propagate in both directions. This means that when the data in the model changes, the view updates immediately, and vice versa.
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  defaultQuestion = 'pet';
	  answer = '';
	  @ViewChild('f') signupForm: NgForm;
	
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	  }
	
	  onSubmit() {
	    console.log(this.signupForm);
	  }
	}
	
	//app.component.html
	...
	  <div class="form-group">
          <textarea
            name="questionAnswer"
            rows="3"
            class="form-control"
            [(ngModel)]="answer"
          ></textarea>
    </div>
    <p>Your reply: {{ answer }}</p>
    ...
```

200. **TD: Grouping Form Controls**
	- Example:
``` html
	//app.component.html
	<div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
          <div class="form-group">
            ...
            ...
          </div>
    </div>
    <p *ngIf="!userData.valid && userData.touched"></p>
```

201. **TD: Handling Radio Buttons**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	...
	  genders = ['Male', 'Female', 'Other'];
	...
	}
	
	//app.component.html
	...
	<label for="gender">Gender</label>
    <div class="radio" *ngFor="let gender of genders">
          <label>
            <input
              type="radio"
              name="gender"
              ngModel
              [value]="gender"
              required
            />
            {{ gender }}
          </label>
    </div>
    ...
```

202. **TD: Setting and Patching Form Values**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  defaultQuestion = 'pet';
	  answer = '';
	  genders = ['Male', 'Female', 'Other'];
	
	  @ViewChild('f') signupForm: NgForm;
	
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	    // this.signupForm.setValue({
	    //   userData: {
	    //     username: suggestedName,
	    //     email: '',
	    //   },
	    //   secret: 'pet',
	    //   questionAnswer: '',
	    //   gender: 'male',
	    // });
	    this.signupForm.form.patchValue({
	      userData: {
	        username: suggestedName,
	      },
	    });
	  }
	
	  onSubmit() {
	    console.log(this.signupForm);
	  }
	}
	
	//app.component.html
	...
	 <button
            class="btn btn-default"
            type="button"
            (click)="suggestUserName()"
          >
            Suggest an Username
     </button>
	...
```

203. **TD: Using Form Data**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent {
	  submitted = false;
	  defaultQuestion = 'pet';
	  answer = '';
	  genders = ['Male', 'Female', 'Other'];
	  user = {
	    username: '',
	    email: '',
	    secretQuestion: '',
	    answer: '',
	    gender: '',
	  };
	
	  @ViewChild('f') signupForm: NgForm;
	
	  suggestUserName() {
	    const suggestedName = 'Superuser';
	    this.signupForm.form.patchValue({
	      userData: {
	        username: suggestedName,
	      },
	    });
	  }
	
	  onSubmit() {
	    this.submitted = true;
	    this.user.username = this.signupForm.value.userData.username;
	    this.user.email = this.signupForm.value.userData.email;
	    this.user.secretQuestion = this.signupForm.value.secret;
	    this.user.answer = this.signupForm.value.questionAnswer;
	    this.user.gender = this.signupForm.value.gender;
	  }
	}

	//app.component.html
	...
	<hr />
	<div class="row" *ngIf="submitted">
	    <div class="col-xs-12">
	      <h3>Your Data</h3>
	      <p>Username: {{ user.username }}</p>
	      <p>Mail: {{ user.email }}</p>
	      <p>Secret Question: {{ user.secretQuestion }}</p>
	      <p>Answer: {{ user.answer }}</p>
	      <p>Gender: {{ user.gender }}</p>
	    </div>
	  </div>
	...
```

204. **TD: Resetting Forms**
	- Straight forward, we can use the method `signupForm.reset()` to reset the form to empty.
	- But if you want, you can pass the same object as in `setValue()` to `reset()` which will then reset the form to specific values!
	- Example:
``` ts
	//app.component.ts
	...
	onSubmit() {
	    this.submitted = true;
	    this.user.username = this.signupForm.value.userData.username;
	    this.user.email = this.signupForm.value.userData.email;
	    this.user.secretQuestion = this.signupForm.value.secret;
	    this.user.answer = this.signupForm.value.questionAnswer;
	    this.user.gender = this.signupForm.value.gender;
	
	    this.signupForm.reset();
	  }
	...
```

**==Assignment 2: Practicing Services==**
	Find it in the Angular Course Folder.

205. **Introduction to the Reactive Approach**
	- Form is created programmatically and synchronized with the DOM.

206. **Reactive: Setup**
	- Set up imports.
	- Example:
``` ts
	//app.module.ts
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { ReactiveFormsModule } from '@angular/forms';
	
	import { AppComponent } from './app.component';
	
	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, ReactiveFormsModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	
	//app.component.ts
	import { Component } from '@angular/core';
	import { FormGroup } from '@angular/forms';
	
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css'],
	})
	export class AppComponent {
	  genders = ['male', 'female'];
	  signupForm: FormGroup;
	}
	
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
	      <form>
	        <div class="form-group">
	          <label for="username">Username</label>
	          <input
	            type="text"
	            id="username"
	            class="form-control">
	        </div>
	        <div class="form-group">
	          <label for="email">email</label>
	          <input
	            type="text"
	            id="email"
	            class="form-control">
	        </div>
	        <div class="radio" *ngFor="let gender of genders">
	          <label>
	            <input
	              type="radio"
	              [value]="gender">{{ gender }}
	          </label>
	        </div>
	        <button class="btn btn-primary" type="submit">Submit</button>
	      </form>
	    </div>
	  </div>
	</div>
```

207. **Reactive: Creating a Form in Code**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent implements OnInit {
	  genders = ['male', 'female'];
	  signupForm: FormGroup;
	
	  ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      username: new FormControl(null),
	      email: new FormControl(null),
	      gender: new FormControl('male'),
	    });
	  }
	}
```

208. **Reactive: Syncing HTML and Form**
	- Using `[formGroup]=""` and `formControlName=""` , we have synchronized our form created programmatically with the HTML form.
	- Example:
``` html
	//app.component.html
	<div class="container">
	  <div class="row">
	    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
	      <form [formGroup]="signupForm">
	        <div class="form-group">
	          <label for="username">Username</label>
	          <input
	            type="text"
	            id="username"
	            formControlName="username"
	            class="form-control"
	          />
	        </div>
	        <div class="form-group">
	          <label for="email">email</label>
	          <input
	            type="text"
	            id="email"
	            formControlName="email"
	            class="form-control"
	          />
	        </div>
	        <div class="radio" *ngFor="let gender of genders">
	          <label>
	            <input type="radio" [value]="gender" formControlName="gender" />{{
	              gender
	            }}
	          </label>
	        </div>
	        <button class="btn btn-primary" type="submit">Submit</button>
	      </form>
	    </div>
	  </div>
	</div>
```

209. **Reactive: Submitting the Form**
	- The `(ngSubmit)="onSubmit()"` works similarly for the Reactive forms as well but the only difference is, we don't pass the form from the HTML file to access it in the `onSubmit(){}` method.
	- Because we already have access since we created the form programmatically.
	- Example:
``` ts
	//app.component.ts
	export class AppComponent implements OnInit {
	  genders = ['male', 'female'];
	  signupForm: FormGroup;
	
	  ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      username: new FormControl(null),
	      email: new FormControl(null),
	      gender: new FormControl('male'),
	    });
	  }
	
	  onSubmit() {
	    console.log(this.signupForm);
	  }
	}
	
	//app.component.html
	...
	<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
        ...
        ...
        </div>
    </form>
    ...
```

210. **Reactive: Adding Validation**
	- Example:
``` ts
	//app.component.ts
	...
	ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      username: new FormControl(null, Validators.required),
	      email: new FormControl(null, [Validators.email, Validators.required]),
	      gender: new FormControl('male'),
	    });
	}
	...
```

211. **Reactive: Getting Access to Controls**
	- Example:
``` ts
	//app.component.html
	...
    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            formControlName="username"
            class="form-control"
          />
          <span
            *ngIf="
              !signupForm.get('username').valid &&
              signupForm.get('username').touched
            "
            class="help-block"
            >Please enter a valid username.</span
          >
        </div>
        <div class="form-group">
          <label for="email">email</label>
          <input
            type="text"
            id="email"
            formControlName="email"
            class="form-control"
          />
          <span
            *ngIf="
              !signupForm.get('email').valid && signupForm.get('email').touched
            "
            class="help-block"
            >Please enter a valid email.</span
          >
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" [value]="gender" formControlName="gender" />{{
              gender
            }}
          </label>
        </div>
        <span *ngIf="!signupForm.valid && signupForm.touched" class="help-block"
          >Please enter a valid data.</span
        >
        <button class="btn btn-primary" type="submit">Submit</button>
    </form>
    ...
```

212. **Reactive: Grouping Controls**
	- Example:
``` ts
	//app.component.ts
	...
	ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      userData: new FormGroup({
	        username: new FormControl(null, Validators.required),
	        email: new FormControl(null, [Validators.email, Validators.required]),
	      }),
	      gender: new FormControl('male'),
	    });
	  }
	...
	
	//app.component.html
	<form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div formGroupName="userData">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control"
            />
            <span
              *ngIf="
                !signupForm.get('userData.username').valid &&
                signupForm.get('userData.username').touched
              "
              class="help-block"
              >Please enter a valid username.</span
            >
          </div>
          <div class="form-group">
            <label for="email">email</label>
            <input
              type="text"
              id="email"
              formControlName="email"
              class="form-control"
            />
            <span
              *ngIf="
                !signupForm.get('userData.email').valid &&
                signupForm.get('userData.email').touched
              "
              class="help-block"
              >Please enter a valid email.</span
            >
          </div>
        </div>
        <div class="radio" *ngFor="let gender of genders">
          <label>
            <input type="radio" [value]="gender" formControlName="gender" />{{
              gender
            }}
          </label>
        </div>
        <span *ngIf="!signupForm.valid && signupForm.touched" class="help-block"
          >Please enter a valid data.</span
        >
        <button class="btn btn-primary" type="submit">Submit</button>
    </form>
```

213. **Fixing a Bug**
	- In the next lecture, we'll add some code to access the controls of our form array:
		`*ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"`
	- This code will fail as of the latest Angular version.You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):
		`getControls() {return (<FormArray>this.signupForm.get('hobbies')).controls;}`
	- In the template, you can then use:
		`*ngFor="let hobbyControl of getControls(); let i = index"`
	- Alternatively, you can set up a getter and use an alternative type casting syntax:
		`get controls() {return (this.signupForm.get('hobbies') as FormArray).controls;}`
	- and then in the template:
		`*ngFor="let hobbyControl of controls; let i = index"
	- This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).

214. **Reactive: Arrays of Form Controls (FormArray)**
	- Example:
``` ts
	//app.component.ts
	export class AppComponent implements OnInit {
	  genders = ['male', 'female'];
	  signupForm: FormGroup;
	
	  ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      userData: new FormGroup({
	        username: new FormControl(null, Validators.required),
	        email: new FormControl(null, [Validators.email, Validators.required]),
	      }),
	      gender: new FormControl('male'),
	      hobbies: new FormArray([]),
	    });
	  }
	
	  onAddHobby() {
	    const control = new FormControl(null, Validators.required);
	    (<FormArray>this.signupForm.get('hobbies')).push(control);
	  }
	
	  getControls() {
	    return (<FormArray>this.signupForm.get('hobbies')).controls;
	  }
	
	  onSubmit() {
	    console.log(this.signupForm);
	  }
	}
	
	//app.component.html
	...
	<div formArrayName="hobbies">
          <h4>Ypur Hobbies</h4>
          <button class="btn btn-default" type="button" (click)="onAddHobby()">
            Add Hobby
          </button>
          <div
            class="form-group"
            *ngFor="let hobbuControl of getControls(); let i = index"
          >
            <input type="text" class="form-control" [formControlName]="i" />
          </div>
    </div>
	...
```

215. **Reactive: Creating Custom Validators**
	- Example:
``` ts
	//app.component.ts
	...
	forbiddenUsernames = ['Chris', 'Anna'];
	...
	ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      userData: new FormGroup({
	        username: new FormControl(null, [
	          Validators.required,
	          this.forbiddenNames.bind(this),
	        ]),
	        email: new FormControl(null, [Validators.email, Validators.required]),
	      }),
	      gender: new FormControl('male'),
	      hobbies: new FormArray([]),
	    });
	}
	...
	forbiddenNames(control: FormControl): { [key: string]: boolean } {
	    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
	      return { nameIsForbiden: true };
	    }
	    return null;
	}
	...
	  
	//app.component.html
	/no changes/
```

216. **Reactive: Using Error Codes**
	- No changes in component `.ts` file.
	- Example:
``` ts
	//app.component.html
	...
	<div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="form-control"
            />
            <span
              *ngIf="
                !signupForm.get('userData.username').valid &&
                signupForm.get('userData.username').touched
              "
              class="help-block"
            >
              <span
                *ngIf="
                  signupForm.get('userData.username').errors['nameIsForbidden']
                "
                class="help-block"
                >Please enter a valid username.</span
              >
              <span
                *ngIf="signupForm.get('userData.username').errors['required']"
                class="help-block"
                >This field is required.</span
              ></span
            >
    </div>
	...
```

217. **Reactive: Creating a Custom Async Validator**
	- No changes in component `.html` file.
	- No need to bind async validators while passing in the FormControl.
	- Example:
``` ts
	//app.component.ts
	...
	ngOnInit(): void {
	    this.signupForm = new FormGroup({
	      userData: new FormGroup({
	        username: new FormControl(null, [
	          Validators.required,
	          this.forbiddenNames.bind(this),
	        ]),
	        email: new FormControl(
	          null,
	          [Validators.email, Validators.required],
	          this.forbiddenEmails
	        ),
	      }),
	      gender: new FormControl('male'),
	      hobbies: new FormArray([]),
	    });
	}
	...
	  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
	    const promise = new Promise<any>((resolve, reject) => {
	      setTimeout(() => {
	        if (control.value === 'test@test.com') {
	          resolve({ emailIsForbidden: true });
	        } else {
	          resolve(null);
	        }
	      }, 1500);
	    });
	    return promise;
	}
	...
```

218. **Reactive: Reacting to Status or Value Changes**
	- Example:
``` ts
	//app.component.ts
	...
	ngOnInit(): void{
		...
		...
		this.signupForm.valueChanges.subscribe((value) => console.log(value));
	    this.signupForm.statusChanges.subscribe((status) => console.log(status));
	}
	...
```

219. **Reactive: Setting and Patching Values**
```ts
	//app.component.ts
	...
	ngOnInit(): void{
		...
		...
		 //this.signupForm.valueChanges.subscribe((value) => console.log(value));
	    //this.signupForm.statusChanges.subscribe((status) => console.log(status));
	
	    // this.signupForm.setValue({
	    //   userData: {
	    //     username: 'Max',
	    //     email: 'max@mustermann.de',
	    //   },
	    //   gender: 'male',
	    //   hobbies: [],
	    // });
	
	    this.signupForm.patchValue({
	      userData: {
	        username: 'Max',
	      },
	    });
	...
	onSubmit() {
	    console.log(this.signupForm);
	    this.signupForm.reset();
	}
	...
```

**==Assignment : Practicing Reactive Forms==**

220. **`[OPTIONAL]` Assignment Solution**
	Already Completed and similar to previously created project in the previous lectures.