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
	- 