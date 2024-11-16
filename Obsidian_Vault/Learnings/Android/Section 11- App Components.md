#HomeAndroid - [[--Contents - Android--]]
82. **App Life Cycle** ![[android-life-cycle.png]]
	- OnCreate(): 
		- This is the first method called when the activity is created. 
		- All the initialization of the variables, views and layouts must be done here.
	- OnStart(): 
		- This method is called when the activity becomes visible to the user, but it is not yet interactive. 
		- It's good place to start animations or other UI related tasks.
	- onResume():
		- This method is called when the activity is in the foreground and ready for user interaction. It's where you should start. 
		- Components that need to be actively running, such as sensors or location updates.
	- onPause():
		- This method is called when the activity is about to lose focus typically because another activity is starting or the device is going into a multi-window mode.
		- You should release resources or pose ongoing operations.
	- onStop():
		- This method is called when the activity is no longer visible to the user.
		- It's a good place to release resources that are no longer needed.
	- onRestart():
		- This method is called when the activity is restarting after being stopped.
		- It's followed by Onstart method.
	- onDestroy():
		- This method is called when the activity is being destroyed.
		- It's your last chance to clean up resources and perform final tasks.
	- **MOST IMPORTANT: ** On Orientation change, Activity gets destroyed and the whole app again gets Created by calling `onCreate()`, `onStart()` followed by `onResume()` and so on.

83. **Explicit Intent**
	- An intent is a fundamental component that facilitates communication between different components of an application as well as between different applications.
	- Intents are used to request an action to be performed either within the same app or by other apps, and they can be used for a variety of purposes, such as starting activities, launching services, broadcasting messages and more.
	- There are two main types of intents in Android, explicit intents and implicit intents.
	``` java
	//Intent() Syntax:
	Intent intent = new Intent(this, SecondActivity.class);
	startActivity(intent);
	```

84. **Implicit Intent**
	- Implicit intents are used to perform actions that can involve components from other applications.
	- You specify the action you want to perform, and the Android system finds the appropriate component to handle that action.
	- Example:
	``` java
	Uri webpage = Uri.parse("https://www.google.com");
	
	Intent intent = new Intent(Intent.ACTION_VIEW, webpage);
	startActivity(intent);
	```

85. **The Manifest**
	- The Androidmanifest.xml file, commonly referred as the manifest file, is a crucial configuration file that provides essential information about your Android application to the Android operating system.
	- It acts as a blueprint for the Android system to understand and interact with your application.
	- The manifest file is required in every Android application and plays a central role in how your application is installed, launched and interacts with other applications and system components.
	- `<application></application>` :
		- So in this application tag, we define the different and various components that make up your application, such as activities, services, broadcast receivers and content providers. 
		- Each component must be declared with its name and configuration settings.
	- `<intent-filter></intent-filter>`:
		- The intent filter specifies that this activity is the main entry point of the app because we have the action dot main and should be displayed in the launcher activity. 
		- So when opening the app, go and launch this activity. 
		- So the intent filters define how your app can respond to implicit intents which are requested to perform a certain action.
		- They specify the types of actions and data that your app can handle.
	- `<uses-permission android:name="..."/>`:
		- The permissions, the manifest file lists, the permissions your app requires to access certain system features or perform specific actions. Users are informed about these permissions when they install the app.