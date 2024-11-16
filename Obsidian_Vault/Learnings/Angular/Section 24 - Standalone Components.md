#HomeAngular - [[--Contents - Angular--]]
348. **Module Introduction**
	- What & Why?
	- Basic Standalone Components
	- Adding Services, Routing & Lazy Loading

349. **Starting Setup & Why We Want Standalone Components**
	- Let's get rid of Boiler Plate Codes.

350. **Building a First Standalone Component**
	- Only thing we need to add for converting a non-standalone component to standalone is by adding `standalone: true` in the Component decorator.
	- Once the component is set as a standalone component then we should not add the component in the NgModule declarations.
	- Example:
``` ts
	//app.module.ts
	@NgModule({
	  declarations: [AppComponent, WelcomeComponent],
	  imports: [BrowserModule, DetailsComponent],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}

	//details.component.ts
	@Component({
	  standalone: true,
	  imports: [SharedModule],
	  selector: 'app-details',
	  templateUrl: './details.component.html',
	  styleUrls: ['./details.component.css'],
	})
	export class DetailsComponent {
	  constructor(private analyticsService: AnalyticsService) {}
	
	  onClick() {
	    this.analyticsService.registerClick();
	  }
	}
	
	//welcome.component.ts
	@Component({
	  //imports:[DetailsComponent],
	  selector: 'app-welcome',
	  templateUrl: './welcome.component.html'
	})
	export class WelcomeComponent {}
```

351. **Standalone Components Are Now Stable**
	- As mentioned in the previous lecture, Angular 14 introduced standalone components in "Preview Mode". With **Angular 15**, this feature now became **stable** (the syntax didn't change though).
	- You may now use standalone components instead of NgModules in production-ready apps. And, as will be shown throughout this section, you can also mix and match the concepts as needed.
	- But should you use standalone components in all scenarios?
	- Well, for the moment, that's probably a "No". Especially for large, very complex applications, NgModules reduce the amount of boilerplate code (imports etc.) that needs to be written. NgModules can also help with structuring dependency injection, bundling features together and more.
	- But this may change in the future, as Angular continues to evolve and new patterns may emerge.
	- I'll of course keep this course updated to reflect any changes that may occur.

352. **Standalone Directives & Connecting Building Blocks**
	- Since the `HighlightDirective` has been converted to standalone and used directly in the components, we don't need `SharedModule` anymore.
	- Delete `SharedModule` and follow the example:
``` ts
	//highlight.directive.ts
	import { Directive, ElementRef } from '@angular/core';
	
	@Directive({
	  standalone: true,
	  selector: '[appHighlight]',
	})
	export class HighlightDirective {
	  constructor(private element: ElementRef) {
	    this.element.nativeElement.style.backgroundColor = '#5f5aee';
	    this.element.nativeElement.style.color = 'black';
	    this.element.nativeElement.style.padding = '0.5rem';
	  }
	}

	//details.component.ts
	import { Component } from '@angular/core';
	import { AnalyticsService } from 'src/app/shared/analytics.service';
	import { HighlightDirective } from 'src/app/shared/highlight.directive';
	
	@Component({
	  standalone: true,
	  imports: [HighlightDirective],
	  selector: 'app-details',
	  templateUrl: './details.component.html',
	  styleUrls: ['./details.component.css'],
	})
	export class DetailsComponent {
	  constructor(private analyticsService: AnalyticsService) {}
	
	  onClick() {
	    this.analyticsService.registerClick();
	  }
	}
```

353. **Migrating Another Component**
	- Example:
``` ts
	//welcome.component.ts
	@Component({
	  standalone: true,
	  imports:[DetailsComponent],
	  selector: 'app-welcome',
	  templateUrl: './welcome.component.html'
	})
	export class WelcomeComponent {}

	//app.module.ts
	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, WelcomeComponent],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
```

354. **A Standalone Root Component**
	- Finally, our root component i.e, `AppComponent` itself is now standalone so the imports we had in the `AppModule` are not necessarily be there.
	- So, let's delete the `AppModule` and attach the project with `bootstrap` by the help of `main.ts` file as shown in the below example:
``` ts
	//app.component.ts
	@Component({
	  standalone: true,
	  imports:[WelcomeComponent],
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css'],
	})
	export class AppComponent {}
	
	//main.ts
	import { enableProdMode } from '@angular/core';
	
	import { environment } from './environments/environment';
	import { bootstrapApplication } from '@angular/platform-browser';
	import { AppComponent } from './app/app.component';
	
	if (environment.production) {
	  enableProdMode();
	}
	
	bootstrapApplication(AppComponent)
	// platformBrowserDynamic().bootstrapModule(AppModule)
	//   .catch(err => console.error(err));
```

355. **Services & Standalone Components**
	- If we are injecting services in root like: `@Injectable({ providedIn: 'root' })` then we are good to go. No changes are required in order to work with standalone components.
	- But we do have different ways to do that.
	- Example:
``` ts
	//analytics.service.ts
	//Remove root injection
	import { Injectable } from '@angular/core';
	
	@Injectable()
	export class AnalyticsService {
	  registerClick() {
	    console.log('Clicked!');
	  }
	}
	
	//For component level instance we can add in the providers array as show in the commented code below
	//details.component.ts
	@Component({
	  standalone: true,
	  imports: [HighlightDirective],
	  selector: 'app-details',
	  templateUrl: './details.component.html',
	  styleUrls: ['./details.component.css'],
	  //providers: [AnalyticsService]
	})
	export class DetailsComponent {
	  constructor(private analyticsService: AnalyticsService) {}
	
	  onClick() {
	    this.analyticsService.registerClick();
	  }
	}
	
	//But if it is required root level in different way, see the main.ts
	//main.ts
	if (environment.production) {
	  enableProdMode();
	}
	
	bootstrapApplication(AppComponent, {
	  providers: [AnalyticsService]
	})
```

356. **Routing with Standalone Components**
	- Example:
``` ts
	//main.ts
	if (environment.production) {
	  enableProdMode();
	}
	
	bootstrapApplication(AppComponent, {
	  providers: [
	    // AnalyticsService,
	    importProvidersFrom(AppRoutingModule)
	  ],
	});
	
	//app.component.ts
	@Component({
	  standalone: true,
	  imports: [WelcomeComponent, RouterModule],
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.css'],
	})
	export class AppComponent {}
```

357. **Lazy Loading**
	- Delete `DashboardModule` and `DashboardRoutingModule`.
	- Example:
``` ts
	//about.component.ts
	@Component({
	  standalone: true,
	  templateUrl: './about.component.html'
	})
	export class AboutComponent {}
	
	//app-routing.module.ts
	const routes: Route[] = [
	  {
	    path: '',
	    component: WelcomeComponent,
	  },
	  {
	    path: 'about',
	    //component: AboutComponent, //standaloe lazy loading
	    loadComponent: () => import('./about/about.component').then((mod) => mod.AboutComponent)
	  },
	  {
	    //lazy loading children non standalone
	    path: 'dashboard',
	    loadChildren: () =>
	      import('./dashboard/routes').then(
	        (mod) => mod.DASHBOARD_ROUTES
	      ),
	  },
	];
	
	@NgModule({
	  imports: [RouterModule.forRoot(routes)],
	  exports: [RouterModule],
	})
	export class AppRoutingModule {}
	
	//dashboard.component.ts
	@Component({
	  standalone: true,
	  imports: [RouterModule],
	  templateUrl: './dashboard.component.html',
	})
	export class DashboardComponent {}
	
	//routes.ts
	export const DASHBOARD_ROUTES: Route[] = [
	    {
	        path: '',
	        component: DashboardComponent
	    },
	    {
	        path: 'today',
	        component: TodayComponent,
	    }
	]
	
	//today.component.ts
	@Component({
	  standalone: true,
	  templateUrl: './today.component.html',
	})
	export class TodayComponent {}
```

358. **Summary**
	- Done wit the standalone.