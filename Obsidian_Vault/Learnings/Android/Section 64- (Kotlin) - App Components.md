#HomeAndroid - [[--Contents - Android--]]

509. **Android Activity Life Cycle**
	- The Android activity lifecycle is a crucial concept in Android app development and understanding.
	- It is essential for building robust and well-behaved Android applications.
	- The Android life cycle defines how an Android component, such as an activity or fragment, transitions through various states during its existence,
	- We have **`seven`** methods **`oCreate()`**, **`onStart()`**, **`onResume()`**, **`onRestart()`**, **`onPause()`**, **`onStop()`** and **`onDestroy()`**.
	1. onCreate()
		- Whenever you create any new project in Android Studio, the `Oncreate()` method is created. This method is called when the activity is first created.
		- You can perform one time initialization tasks here, such as setting up UI elements and data.
		- And this is what we've done before in the previous lessons, such as initializing the widgets.
		- The saved instance state parameter is used to restore the previous state of the activity, if applicable.
	2. onStart():
		- On start is a method that exists in Android Activity class, and it's one of the Android lifecycle methods.
		- When you call Super on start, you are invoking the Onstart() method of the super class, which is in this case the activity which ensures that the Superclass's behavior is also executed along with any additional behavior you define in the overridden on start method.
	3. onResume():
		- This method is called when the activity is interacting with the user.
		- You can start animations, play media, and handle UI updates.
		- That should only occur when the activity is in the foreground.
	4. onPause():
		- This method is called when the activity is about to lose focus, but is still visible to the user. You should pause or release any resources that are not needed when the activity is not in the foreground.
	5. onStop():
		- This method is called when the activity is no longer visible to the user.
		- You can release resources that should be closed when the activity is not active.
	6. onRestart():
		- This method is called when the activity is about to be restarted after being stopped.
		- You can perform any necessary tasks to prepare for a restart.
	- Following this hierarchy on pause, on stop, on restart and then on start and on resume. Finally, Resumed activity running in foreground.
	7. onDestroy():
		- This method is called when the activity is being destroyed. You should release all resources Unregister receivers and perform any final clean up.
	- Understanding and properly implementing the Android lifecycle methods is a crucial for creating Android applications that behave as expected and manage resources efficiently.

510. **Explicit Intents**
	- Intents are a fundamental concept used to facilitate communication between different components of an Android application, or between different Android applications.
	- An intent is an abstract description of an operation to be performed, serving as a messaging object that can be used to request an action from another component, either within the same application or in a different one.
	- There are two main types of intents in Android explicit intents and implicit intents.
	- Explicit intents are used when you know the target component to which you want to send data.
	- They explicitly specify the target component by providing the component name, class name, or the package name of the application.
	- Example:
``` kotlin
	//MainActivity.kt TO SecondActivity.kt
	val explicitIntent = Intent(this, MainActivity::class.java)  
	startActivity(explicitIntent)
```

511. **Passing Data between Activities**
	- We can use the method called Put Extra that it's a part of intent class to attach additional information extras to the intent.
	- putExtra(): This is a method provided by the intent class in Android, and it's used to add extra data to the intent.
	- The data can be of various types such as strings, integers, booleans, and etc.
	- In the Oncreate() method of the receiving class, we can get the data received by calling method getExtra() based on the type like: getStringExtra(), getIntExtra(), getBooleanExtra(), etc.

512. **Implicit Intent**
	- An implicit intent is used when you want to perform an action, such as opening a web page or sending an email, but you don't specify a particular target component.
	- Instead, you declare an action to be performed, and the Android system determines the appropriate components that can handle that action.
	- There are a lot of actions in intent class.
	- Intent is a class in Android that represents an intention to perform an action. It's used to request an action from another component, such as starting an activity, broadcasting a message, or invoking a service.
	- Example:
``` kotlin
	//MainActivity.kt TO a web URL
	val implicitIntent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.google.com"))  
	startActivity(implicitIntent)
```

513. **The Manifest**
	- The Androidmanifest.xml file is a crucial configuration file that provides essential information about your Android app to the Android system.
	- It contains metadata about the app, defines the app's components, and specifies the required permissions.
	- Inside the manifest we have application.
	- The application element contains information about the application and its components such as activities services, broadcast receivers and content providers.
	- So every new component you should declare it here inside the application tag we have activity.
	- The activity element within the application element defines the individual screens or UI components of the app.
	- You can use intent filter to declare the types of intents your component can respond to.
	- For example, an activity might specify that can handle the main action and the launcher.
	- Inside this manifest, the `<uses-permission>` tag and element allows you to declare the permissions your app requires, such as accessing the internet, using the camera, and etc..
	- And there are a lot of attributes you can specify for this application.
	- For example, the icon here I can change the icon of our application.