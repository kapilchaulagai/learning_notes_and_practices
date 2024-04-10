#HomeAngular - [[--Contents - Angular--]]
107. **Module Introduction**
	- What are Services?![[services.png]]

108. **Why would you Need Services?**
	- To perform same tasks using a same code base without repeating it in different component.

109. **Creating a Logging Service**
	- Example:
		``` ts
		//logging.service.ts
		export class LoggingService {
		  logStatusChange(status: string) {
		    console.log('A server status changed, new status: ' + status);
		  }
		}
		
		//account.component.ts
		export class AccountComponent {
		  @Input() account: { name: string; status: string };
		  @Input() id: number;
		  @Output() statusChanged = new EventEmitter<{
		    id: number;
		    newStatus: string;
		  }>();
		
		  onSetTo(status: string) {
		    this.statusChanged.emit({ id: this.id, newStatus: status });
		    const service = new LoggingService();
		    service.logStatusChange(status);
		  }
		}
		
		//new-account.component.ts
		export class NewAccountComponent {
		  @Output() accountAdded = new EventEmitter<{ name: string; status: string }>();
		
		  onCreateAccount(accountName: string, accountStatus: string) {
		    this.accountAdded.emit({
		      name: accountName,
		      status: accountStatus,
		    });
		    const service = new LoggingService();
		    service.logStatusChange(accountStatus);
		  }
		}
		```

110. **Injecting the Logging Service into Components**
	- Example:
		``` ts
		//logging.service.ts
		export class LoggingService {
		  logStatusChange(status: string) {
		    console.log('A server status changed, new status: ' + status);
		  }
		}
		
		//account.component.ts
		@Component({
		  ...
		  providers: [LoggingService],
		})
		export class AccountComponent {
		  ...
		  constructor(private loggingService: LoggingService) {}
		    this.loggingService.logStatusChange(status);
		  }
		}
		//new-account.component.ts
		@Component({
		  ...
		  providers: [LoggingService],
		})
		export class NewAccountComponent {
		  ...
		  constructor(private loggingService: LoggingService) {}
			this.loggingService.logStatusChange(status);
		  }
		}
		```

111. **Alternative Injection Syntax**
	- Injecting services (or, in general: dependencies) into components via the **constructor functions** is the most common way of perform such injections. You'll see this approach in **most Angular projects** you'll be working on.
	- However, there also is an alternative way of injecting dependencies: Via Angular's `inject()` function.
	- t's totally up to you, which approach you prefer. In this course (and, as mentioned, in most projects), we'll use the constructor approach.
		``` ts
	//Instead of injecting `LoggingService` like this:
		@Component(...)
		export class AccountComponent {
		  // @Input() & @Output() code as shown in the previous lecture
		 
		  constructor(private loggingService: LoggingService) {}
		}
		```

``` ts
	//you could inject it like this, by using the  `inject()`  function:
		import { Component, Input, Output, inject } from '@angular/core'; // <- Add inject import
		 
		@Component(...)
		export class AccountComponent {
		  // @Input() & @Output() code as shown in the previous lecture
		  private loggingService?: LoggingService; // <- must be added
		 
		  constructor() {
		    this.loggingService = inject(LoggingService);
		  }
		}
```

112. **Creating a Data Service**
	- Example:
		``` ts
		//accounts.service.ts
		export class AccountsService {
		  accounts = [
		    {
		      name: 'Master Account',
		      status: 'active',
		    },
		    {
		      name: 'Testaccount',
		      status: 'inactive',
		    },
		    {
		      name: 'Hidden Account',
		      status: 'unknown',
		    },
		  ];
		
		  addAccount(name: string, status: string) {
		    this.accounts.push({ name: name, status: status });
		  }
		
		  updateStatus(id: number, status: string) {
		    this.accounts[id].status = status;
		  }
		}
		
		//app.component.ts
		@Component({
		  selector: 'app-root',
		  templateUrl: './app.component.html',
		  styleUrls: ['./app.component.css'],
		  providers: [AccountsService],
		})
		export class AppComponent implements OnInit {
		  accounts: { name: string; status: string }[] = [];
		
		  constructor(private accountsService: AccountsService) {}
		
		  ngOnInit() {
		    this.accounts = this.accountsService.accounts;
		  }
		}
		
		//account.component.ts
		@Component({
		  selector: 'app-account',
		  templateUrl: './account.component.html',
		  styleUrls: ['./account.component.css'],
		  providers: [LoggingService, AccountsService],
		})
		export class AccountComponent {
		  @Input() account: { name: string; status: string };
		  @Input() id: number;
		
		  constructor(
		    private loggingService: LoggingService,
		    private accountsService: AccountsService
		  ) {}
		
		  onSetTo(status: string) {
		    this.accountsService.updateStatus(this.id, status);
		    this.loggingService.logStatusChange(status);
		  }
		}
		
		//new-account.component.ts
		@Component({
		  selector: 'app-new-account',
		  templateUrl: './new-account.component.html',
		  styleUrls: ['./new-account.component.css'],
		  providers: [LoggingService, AccountsService],
		})
		export class NewAccountComponent {
		  constructor(
		    private loggingService: LoggingService,
		    private accountsService: AccountsService
		  ) {}
		
		  onCreateAccount(accountName: string, accountStatus: string) {
		    this.accountsService.addAccount(accountName, accountStatus);
		    this.loggingService.logStatusChange(accountStatus);
		  }
		}
		```

113. **Understanding the Hierarchical Injector**
	![[injector-hierarchy.png]]

114. **How many Instances of Service Should It Be?**
	- Since we require the only one service instance that has been created in AppComponent (i.e, app.component.ts), remove the service added inside the `providers:[]` in each lower-hierarchy component.

115. **Injecting Services into Services**
	- `@Injectable()`: is a decorator in Angular, a popular web framework for building single-page client applications using HTML and TypeScript.
	- When you apply `@Injectable()` to a class in Angular, you're indicating to the Angular Dependency Injection (DI) system that the class may have its own dependencies that need to be injected. This decorator allows Angular to identify services, such as those with business logic or data access responsibilities, and manage their instantiation and injection into other components or services that require them.
	- Example:
		``` ts
		//logging.service.ts
		export class LoggingService {
		  logStatusChange(status: string) {
		    console.log('A server status changed, new status: ' + status);
		  }
		}
		
		//account.service.ts
		import { Injectable } from "@angular/core";
		import { LoggingService } from "./logging.service";
		
		@Injectable()
		export class AccountsService {
		  accounts = [
		    {
		      name: 'Master Account',
		      status: 'active',
		    },
		    {
		      name: 'Testaccount',
		      status: 'inactive',
		    },
		    {
		      name: 'Hidden Account',
		      status: 'unknown',
		    },
		  ];
		
		  constructor(private loggingService: LoggingService){}
		
		  addAccount(name: string, status: string) {
		    this.accounts.push({ name: name, status: status });
		    this.loggingService.logStatusChange(status);
		  }
		
		  updateStatus(id: number, status: string) {
		    this.accounts[id].status = status;
		    this.loggingService.logStatusChange(status);
		  }
		}
		
		//app.module.ts
		imports {...} from '...';
		@NgModule({
		  declarations: [
		    AppComponent,
		    AccountComponent,
		    NewAccountComponent
		  ],
		  imports: [
		    BrowserModule,
		    FormsModule,
		  ],
		  providers: [AccountsService, LoggingService],
		  bootstrap: [AppComponent]
		})
		export class AppModule { }

		//account.component.ts
		@Component({
		  selector: 'app-account',
		  templateUrl: './account.component.html',
		  styleUrls: ['./account.component.css'],
		  // providers: [LoggingService],
		})
		export class AccountComponent {
		  @Input() account: { name: string; status: string };
		  @Input() id: number;
		
		  constructor(
		    //private loggingService: LoggingService,
		    private accountsService: AccountsService
		  ) {}
		
		  onSetTo(status: string) {
		    this.accountsService.updateStatus(this.id, status);
		    //this.loggingService.logStatusChange(status);
		  }
		}
		```

116. **Using Services for Cross-Component Communication**
	- We are creating an EventEmitter inside the service which emits an event on some scenarios which can be subscribed over any component so that we can maintain some particular part of logics within the service itself that are being used in multiple places throughout different components.
	- Example: Instance of the service has been created in module level for the given example.
		``` ts
		//accounts.service.ts
		@Injectable()
		export class AccountsService {
		  accounts = [
		    {
		      name: 'Master Account',
		      status: 'active',
		    },
		    {
		      name: 'Testaccount',
		      status: 'inactive',
		    },
		    {
		      name: 'Hidden Account',
		      status: 'unknown',
		    },
		  ];
		
		  statusUpdated = new EventEmitter<string>();
		
		  constructor(private loggingService: LoggingService){}
		
		  addAccount(name: string, status: string) {
		    this.accounts.push({ name: name, status: status });
		    this.loggingService.logStatusChange(status);
		  }
		
		  updateStatus(id: number, status: string) {
		    this.accounts[id].status = status;
		    this.loggingService.logStatusChange(status);
		  }
		}
		
		//account.component.ts
		@Component({
		  selector: 'app-account',
		  templateUrl: './account.component.html',
		  styleUrls: ['./account.component.css'],
		})
		export class AccountComponent {
		  @Input() account: { name: string; status: string };
		  @Input() id: number;
		
		  constructor(
		    private accountsService: AccountsService
		  ) {}
		
		  onSetTo(status: string) {
		    this.accountsService.updateStatus(this.id, status);
		    this.accountsService.statusUpdated.emit(status);
		  }
		}
		
		//new-account.component.ts
		@Component({
		  selector: 'app-new-account',
		  templateUrl: './new-account.component.html',
		  styleUrls: ['./new-account.component.css'],
		})
		export class NewAccountComponent {
		  constructor(
		    private accountsService: AccountsService
		  ) {
		    this.accountsService.statusUpdated.subscribe(
		      (status:string) => alert("New Status:  " + status)
		    );
		  }
		
		  onCreateAccount(accountName: string, accountStatus: string) {
		    this.accountsService.addAccount(accountName, accountStatus);
		  }
		}
		```

117. **A Different Way Of Injecting Services**
	- If you're using **Angular 6+** (check your `package.json`  to find out), you can provide application-wide services in a different way.
	- Instead of adding a service class to the `providers[]`  array in `AppModule` , you can set the following config in `@Injectable()` :
		``` ts
		@Injectable({providedIn: 'root'})
		export class MyService { ... }
		```
		This is exactly the same as:
		``` ts
		export class MyService { ... }
		```
		and
		``` ts
		import { MyService } from './path/to/my.service';
		 
		@NgModule({
		    ...
		    providers: [MyService]
		})
		export class AppModule { ... }
		```
		Using this syntax is **completely optional**, the traditional syntax (using `providers[]` ) will also work.
	- The "new syntax" does offer one advantage though: Services **can be loaded lazily** by Angular (behind the scenes) and redundant code can be removed automatically. This can lead to a better performance and loading speed - though this really only kicks in for bigger services and apps in general.

**==Assignment 2: Practicing Services==**
	Find it in the Angular Course Folder.

118. **`[OPTIONAL]` Assignment Solution**
	Already Completed and similar to previously created project in the previous lectures.