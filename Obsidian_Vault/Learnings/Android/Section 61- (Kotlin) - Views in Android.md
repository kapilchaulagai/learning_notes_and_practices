#HomeAndroid - [[--Contents - Android--]]
490. **Views & ViewGroups**
	- **View**: 
		- A view is the basic building block of the Android UI. It represents a single UI element, such as a button, text, field, image, or any other visual component that the user can interact with.
		- Each of the view is an instance of the subclass view class or one of its many subclasses, depending on the type of the UI element you want to display.
		- Examples of a view subclasses include text view, button, image view, and more.
	- **ViewGroup**:
		- A ViewGroup is a subclass of the view class that can contain other views or view groups. It's used to arrange and organize multiple views into a structured layout.
		- View group elements define the structure and hierarchy of the user interface, such as the arrangement of views within a layout.
		- Common examples of a view groups include linear layout, relative layout, constraint layout, frame layout, and much more.
		![[android_views_viewgroups.png]]
		![[android_the_views.png]]

491. **UI Editing in Android Studio**

492. **Layout Editor Modes**

493. **Views' Attributes**
	- id
	- layout_width/layout_height
	- textSize
	- textColor
	- text
	- layout_margin and so on

494. **Declaring & Initializing Views**
	- **lateinit**: 
		- This is a Kotlin modifier that is used for non-null properties, which are initialized at a later point in your code.
		- It tells the compiler that the property will be initialized before it is used, even though it doesn't have any initial value at the point of declaration.
		- This is commonly used for Android views because they are typically initialized in the `OnCreate()` method after setting the content view.
	- **var**:
		- The var keyword declares the property as a mutable variable, meaning that you can change its value after it's initialized.
	- **OnCreate**:
		- This is a callback method or a lifecycle method, and later on we'll talk about these callback methods in deep details.
	- **setContentView**:
		- This method in Android is used to set the content view of an activity or a fragment to a specified layout resource.
	- **findViewById**:
		- This is a method called that searches for a view in the current layout based on its unique resource ID, which is the unique identifier.
		- It returns a reference to the found view, which in this case a text view.
	- Example:
``` kotlin
	//MainActivity.kt
	package com.practice.learnkotlin  
	  
	import android.os.Bundle  
	import android.widget.TextView  
	import androidx.activity.enableEdgeToEdge  
	import androidx.appcompat.app.AppCompatActivity  
	import androidx.core.view.ViewCompat  
	import androidx.core.view.WindowInsetsCompat  
	  
	class MainActivity : AppCompatActivity() {  
	    lateinit var myTextView: TextView  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        myTextView = findViewById(R.id.my_textView)  
	        myTextView.setText("Welcome Again!")  
	    }  
	}
```

495. **EditText**
	- Edit Text is a user interface widget that provides a text input field for users to enter text.
	- Edit text is a fundamental component in building forms, search bars, chat interfaces, and various other features in Android applications.
	- Example:
``` kotlin
	//MainActivity.kt
	class MainActivity : AppCompatActivity() {  
	    lateinit var myTextView: TextView  
	    lateinit var myEditText: EditText  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        myTextView = findViewById(R.id.my_textView)  
	        myEditText = findViewById(R.id.my_editText)  
	  
	        myTextView.setText("Welcome Again!")  
	  
	        val enteredText: String = myEditText.text.toString()  
	        Log.d("Text", enteredText)  
	    }  
	}
```

496. **Buttons & Click Listeners**
	- Buttons are user interface elements that allow users to trigger actions or events by clicking or tapping them.
	- Buttons are fundamental components for user interaction and are commonly used for tasks like submitting forms, navigating between screens, and performing various actions in Android applications.
	- Example:
``` kotlin
	//MainActivity.kt
	class MainActivity : AppCompatActivity() {  
	    lateinit var myTextView: TextView  
	    lateinit var myEditText: EditText  
	    lateinit var myButton: Button  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        myTextView = findViewById(R.id.my_textView)  
	        myEditText = findViewById(R.id.my_editText)  
	        myButton = findViewById(R.id.my_button)  
	  
	        myTextView.setText("Welcome Again!")  
	  
	        val enteredText: String = myEditText.text.toString()  
	        Log.d("Text", enteredText)  
	  
	        myButton.setOnClickListener {  
	            Toast.makeText(this, "Hello! You Clicked Me.", Toast.LENGTH_SHORT).show()  
	        }  
	    }  
	}
```

497. **ImageView**
- An image view is a user interface widget used to display images or drawables in your app's user interface.
- It's a versatile component that allows you to show pictures, icons, and other graphical content to create your image view.
- Example:
``` kotlin
	//MainActivity.kt
	class MainActivity : AppCompatActivity() {  
	    lateinit var myTextView: TextView  
	    lateinit var myEditText: EditText  
	    lateinit var myButton: Button  
	    lateinit var myImageView: ImageView  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        myTextView = findViewById(R.id.my_textView)  
	        myEditText = findViewById(R.id.my_editText)  
	        myButton = findViewById(R.id.my_button)  
	        myImageView = findViewById(R.id.my_imageView)  
	  
	        myTextView.setText("Welcome Again!")  
	  
	        val enteredText: String = myEditText.text.toString()  
	        Log.d("Text", enteredText)  
	  
	        myButton.setOnClickListener {  
	            myImageView.setImageResource(R.drawable.user_image)  
	            Toast.makeText(this, "Hello! You Clicked Me.", Toast.LENGTH_SHORT).show()  
	        }  
	    }  
	}
```

498. **The Greetings App**
	- Example:
``` xml
	//activity_main.xml
	<?xml version="1.0" encoding="utf-8"?>  
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
	    xmlns:app="http://schemas.android.com/apk/res-auto"  
	    xmlns:tools="http://schemas.android.com/tools"  
	    android:id="@+id/main"  
	    android:layout_width="match_parent"  
	    android:layout_height="match_parent"  
	    tools:context=".MainActivity">  
	  
	    <TextView        android:id="@+id/welcome_textview"  
	        android:layout_width="match_parent"  
	        android:layout_height="wrap_content"  
	        android:layout_marginTop="35dp"  
	        android:text="Welcome to our App"  
	        android:textAlignment="center"  
	        android:textSize="28sp"  
	        app:layout_constraintBottom_toTopOf="@+id/name_edittext"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintHorizontal_bias="1.0"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent"  
	        app:layout_constraintVertical_bias="0.050" />  
	  
	    <EditText        android:id="@+id/name_edittext"  
	        android:layout_width="0dp"  
	        android:layout_height="wrap_content"  
	        android:layout_marginTop="130dp"  
	        android:hint="Please enter your name"  
	        android:textSize="18sp"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent" />  
	  
	    <EditText        android:id="@+id/java_or_kotlin_edittext"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:hint="What language do you prefer? Java or Kotlin?"  
	        app:layout_constraintEnd_toEndOf="@+id/name_edittext"  
	        app:layout_constraintStart_toStartOf="@+id/name_edittext"  
	        app:layout_constraintTop_toBottomOf="@+id/name_edittext" />  
	  
	    <Button        android:id="@+id/hello_button"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:layout_marginTop="60dp"  
	        android:text="Say Hello"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toBottomOf="@+id/java_or_kotlin_edittext" />  
	  
	    <ImageView        android:id="@+id/imageView"  
	        android:layout_width="200dp"  
	        android:layout_height="200dp"  
	        android:layout_marginBottom="60dp"  
	        android:contentDescription="Image Here"  
	        android:src="@mipmap/ic_launcher"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toBottomOf="@+id/hello_button" />  
	  
	</androidx.constraintlayout.widget.ConstraintLayout>
```
``` kotlin
	//MainActivity.java
	package com.practice.greetingapp  
	  
	import android.os.Bundle  
	import android.widget.Button  
	import android.widget.EditText  
	import android.widget.ImageView  
	import android.widget.TextView  
	import android.widget.Toast  
	import androidx.activity.enableEdgeToEdge  
	import androidx.appcompat.app.AppCompatActivity  
	import androidx.core.view.ViewCompat  
	import androidx.core.view.WindowInsetsCompat  
	  
	class MainActivity : AppCompatActivity() {  
	    lateinit var userImageView: ImageView  
	    lateinit var nameEditText: EditText  
	    lateinit var languageEditText: EditText  
	    lateinit var welcomeTextView: TextView  
	    lateinit var helloButton: Button  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        //Initialize these widgets  
	        userImageView = findViewById(R.id.imageView)  
	        nameEditText = findViewById(R.id.name_edittext)  
	        languageEditText = findViewById(R.id.java_or_kotlin_edittext)  
	        welcomeTextView = findViewById(R.id.welcome_textview)  
	        helloButton = findViewById(R.id.hello_button)  
	  
	        helloButton.setOnClickListener {  
	            //Getting the user name  
	            val userName = nameEditText.text.toString()  
	  
	            //Getting the language specified by the user  
	            val langSelected = languageEditText.text.toString()  
	  
	            //Say Hello to the user  
	            Toast.makeText(  
	                this,  
	                "Hello $userName",  
	                Toast.LENGTH_LONG  
	            ).show()  
	  
	            //Display Java or Kotlin logo  
	            if (langSelected == "Java")  
	                userImageView.setImageResource(R.drawable.javalogo)  
	            else  
	                userImageView.setImageResource(R.drawable.kotlinlogo)  
	        }  
	    }  
	}
```