#HomeAngular - [[--Contents - Angular--]]
342. **Module Introduction**
	- Deployment

343. **Deployment Preparations & Steps** ![[deploy-prep.png]]

344. **Using Environment Variables**
	- To generate environments file: Run `ng g environments`.
	- Example:
``` ts
	//environment.ts
	export const environment = {
	    production: true,
	    firebaseAPIKey: 'AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk'
	};
	
	//environment.development.ts
	export const environment = {
	    production: false,
	    firebaseAPIKey: 'AIzaSyABVLZGrS_CEgSIu_Q1G-l2VDvXGdfoRYk'
	};
	
	//auth.service.ts
	import { environment } from 'src/environments/environment.development';
	...
	...
	signup(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
			...
	      )
	   ...
	}
	...
	login(email: string, password: string) {
	    return this.http
	      .post<AuthResponseData>(
	        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
			...
	      )
		...
	  }
	  ...  
```

345. **Deploying Angular Applications**
	- Angular apps can be built for deployment by running `ng build`. In older versions, you had to run `ng build --prod` - this is now longer required though.
	- In the next lecture, I still show this older syntax - you can simply run `ng build` instead (unless you are working with an older version of Angular of course).

346. **Deployment Example: Firebase Hosting**
	- To build the project: Run `ng build`.
	- Once the build is completed, you can see your whole project converted into `javascript` and `html` files which are located in the folder of your `project name` inside the `dist` folder.
	- Google search for: `static website hosts`. Or, go to this URL: https://firebase.google.com/docs/cli to install firebase CLI in order to make use of `Firebase Hosting`.
	- To install `firebase-tools`: Run `npm install -g firebase-tools`.
	- To login to firebase account: Run `firebase login`.
	- In order to connect our project with firebase: Run `firebase init` from the project path.
	- Then you will be asked to choose the purpose: Choose `Hosting`.
	- Then you will be asked to choose the project and choose it.
	- `What do you want to use as your public directory? ` Answer: `dist/project-name`.
	- `Configure as a single-page app (rewrite all urls to /index.html)?` Answer: `y`.
	- `File \path\index.html already exists. Overwrite?` Answer: `n`.
	- Finally, Run: `firebase deploy`.
	- Once, it is done you will get the URL through which we can visit the project which is now online.

347. **Server Routing vs Browser Routing**
	- When deploying your Angular app, it's really important to make sure that your server (like S3) is configured to always serve the index.html file.
	- Here's why: [https://academind.com/tutorials/angular-q-a#how-to-fix-broken-routes-after-deployment](https://academind.com/tutorials/angular-q-a#how-to-fix-broken-routes-after-deployment)