#HomeAngular - [[--Contents - Angular--]]
1. **Course Introduction**
2. What is Angular?
	Angular is a robust open-source web application framework maintained by Google, facilitating the development of dynamic single-page applications through TypeScript and HTML, featuring powerful data binding and component-based architecture.
3. **Join our Online Learning Community**
	Great to have you on board as a student!
	
	This course also comes with free access to our “**Academind Community**” on Discord: “[**Academind Community**](https://academind.com/community/)”.
	
	There, you can find **like-minded people**, **discuss** issues, **help each other**, share progress, successes and ideas and simply **have a good time**!
	---
	I believe that you learn the most if you **don’t learn alone** but find learning partners and other people with similar interests. Our community is a great place for this - it’s the perfect complimentary resource for this course.
	
	**Joining it is of course free and 100% optional and of course not required to finish this course! :-)**
4. **Understanding Angular Versioning**
	![[angular-versioning.png]]
5. **CLI Deep Dive & Troubleshooting**
	In the next lecture, we're going to build our first little app!

	If the CLI prompts you to **answer some questions** (some versions do that), you can simply hit `**ENTER**` for all questions. This will accept the default settings which are fine for this course.
	
	The CLI generates a different welcome screen than you're going to see in my video though. No worries, you'll still be able to follow along without issues! Just make sure to code along **so that your code equals mine** - Angular itself didn't change a bit :)
	
	If you want to **dive deeper into the CLI** and learn more about its usage, have a look at its official **documentation**: [https://github.com/angular/angular-cli/wiki](https://github.com/angular/angular-cli/wiki)
	
	**You encountered issues during the installation of the CLI or setup of a new Angular project?**
	
	A lot of problems are solved by making sure you're using the latest version of NodeJS, npm and the CLI itself.
	
	**Updating NodeJS:**
	
	Go to nodejs.org and download the latest version - uninstall (all) installed versions on your machine first.
	
	**Updating npm:**
	
	Run `[sudo] npm install -g npm`  (`sudo`  is only required on Mac/ Linux)
	
	**Updating the CLI**
	
	`[sudo] npm uninstall -g angular-cli @angular/cli` 
	
	`npm cache verify` 
	
	`[sudo] npm install -g @angular/cli` 
	
	**Here are some common issues & solutions:**
	
	1. **Creation of a new project takes forever (longer than 3 minutes)**  
	    That happens on Windows from time to time => Try running the command line as administrator
	    
	2. **You get an EADDR error (Address already in use)**  
	    You might already have another ng serve process running - make sure to quit that or use `ng serve --port ANOTHERPORT`  to serve your project on a new port
	    
	3. **My changes are not reflected in the browser (App is not compiling)**  
	    Check if the window running `ng serve`  displays an error. If that's not the case, make sure you're using the latest CLI version and try restarting your CLI

6. **Project Setup and First App**
	- Step1 - Once all pre - requisites of node.js and CLI have been installed, create a new project.
	- Step 2 - To create new project run: `ng new my-first-app --no-strict --standalone false --routing false`
	- Step 3 - Select the appropriate options for completing app creation
	- Step 4 - Run `ng serve` to get the app running in the browser once the app creation is completed

7. **Editing the First App**
	Need to import `FormModules` to use `ngModel` inside the component html file as shown in the below example.
	``` ts
	//Example: app.module.ts
	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { FormsModule } from '@angular/forms';
	
	import { AppComponent } from './app.component';
	
	@NgModule({
	  declarations: [AppComponent],
	  imports: [BrowserModule, FormsModule],
	  providers: [],
	  bootstrap: [AppComponent],
	})
	export class AppModule {}
	```
	``` html
	//app.component.html
	<input type="text" [(ngModel)]="name" />
	<p>{{ name }}</p>
	```

8. **The Course Structure**
	![[course-structure.png]]

9. **How to get the Most out of the Course**
	- Watch the Videos
	- Do the Assignments
	- Do the Course Projects
	- Ask in Q&A, but..
	- ...also answer in Q&A!
	Go through `Docs+Google` to resolve the issue if faced.

10. **What is TypeScript?**
	![[typescript.png]]

11. **Optional: TypeScript Quick Introduction**
	At the **end of this course**, you also find a **"TypeScript Introduction" section** which is **100% optional**. You can jump to this section now or take a look at it **at a later point of time**, in case you want to get a quick TypeScript summary.
	
	I will also introduce and explain key TypeScript concepts as we start using them throughout this course though, hence this section is really just meant to be a "backup section".

12. **A Basic Project Setup using Bootstrap for Styling**
	- Don't forget to set `"strict" : false;` inside the file `tsConfig.json`
	- To install `bootstrap`library for css: Run `npm i --save bootstrap@3`
	- In order to use css file from bootstrap, add ` "node_modules/bootstrap/dist/css/bootstrap.min.css",` just before the default style source inside the`"styles":[]
	- To recompile: Run `ng serve`

13. **About the Course Code / Code Snapshots**
	Do you get some strange error? Are you stuck? 
	
	Have a look at the source code of this course - by comparing it to your code you should be able to quickly find out where your code deviates and what causes the issue!
	
	You can find the source code of each section attached to the last lecture of that section!
	
	Each ZIP file holds code files which you can use to compare your code to it.
	
	One important note: All the course code will only work if you are NOT using "strict mode" see the "First App" lecture in this module. Strict mode forces you to write more verbose code in some places (especially when it comes to class properties). If you enabled it by accident, you can also disable it by setting strict: false in your tsconfig.json file.
	
	Due to dependency version mismatches, running the attachments might fail though - in that case, you can try the following:
	1) Create a new project via ng new my-project --strict false (the --strict false part is important!)
	
	2) Copy the content of the ZIP attachment src/app folder into the newly created project src/app folder.
	
	3) Run your project (my-project) via ng serve
	
	If you try to directly run my ZIP attachments, you must run npm install first.
	
	If you're getting errors when running npm install, you can often solve them by running npm install --legacy-peer-deps instead of npm install.
	
	Got any problems with the code (e.g. error messages when running it or you don't know how to use it)? Check this thread created by Jost: https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/6709112#questions/8079942