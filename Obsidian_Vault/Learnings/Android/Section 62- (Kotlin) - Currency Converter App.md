#HomeAndroid - [[--Contents - Android--]]
499. **Layout Design**
	- App Creation Steps:
		1. The Required Dependencies and Libraries
		2. Adding Permissions
		3. Designing the Layout
		4. Adding the Functionalities and Logic
		5. Running and Testing
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
	    android:background="@drawable/background"  
	    tools:context=".MainActivity">  
	  
	    <TextView        android:id="@+id/textView"  
	        android:layout_width="0dp"  
	        android:layout_height="wrap_content"  
	        android:layout_marginTop="18dp"  
	        android:gravity="center"  
	        android:text="Currency Converter App"  
	        android:textColor="@color/white"  
	        android:textSize="28sp"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent" />  
	  
	    <EditText        android:id="@+id/editText"  
	        android:layout_width="0dp"  
	        android:layout_height="wrap_content"  
	        android:layout_marginTop="154dp"  
	        android:hint="Enter USD Value"  
	        android:inputType="number"  
	        android:textColorHint="@color/white"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent" />  
	  
	    <Button        android:id="@+id/button"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:text="Convert to Euro"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent"  
	        app:layout_constraintVertical_bias="0.355" />  
	  
	    <TextView        android:id="@+id/textView2"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:text="0 EUR"  
	        android:textColor="@color/white"  
	        android:textSize="34sp"  
	        android:textStyle="bold"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toBottomOf="@+id/button"  
	        app:layout_constraintVertical_bias="0.121" />  
	  
	</androidx.constraintlayout.widget.ConstraintLayout>
```

500. **Declaring & Initializing Widgets**
	-  In Android, declaring and initializing views involves defining variables to reference UI elements, which are the views in your app's layout, XML files, and initializing these variables with the corresponding views from the XML layout.

501. **Adding Functions**
	- We need to convert the entered USD amount by the user in this edit text and display the result of conversion in this text view.

- Example:
``` kotlin
	//MainActivity.kt
	package com.practice.currencyconverterapp  
	  
	import android.os.Bundle  
	import android.widget.Button  
	import android.widget.EditText  
	import android.widget.TextView  
	import androidx.activity.enableEdgeToEdge  
	import androidx.appcompat.app.AppCompatActivity  
	import androidx.core.view.ViewCompat  
	import androidx.core.view.WindowInsetsCompat  
	  
	class MainActivity : AppCompatActivity() {  
	    private lateinit var titleTextView: TextView  
	    private lateinit var resultTextView: TextView  
	    private lateinit var inputEditText: EditText  
	    private lateinit var convertButton: Button  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        titleTextView = findViewById(R.id.textView)  
	        resultTextView = findViewById(R.id.result_textview)  
	        inputEditText = findViewById(R.id.input_edittext)  
	        convertButton = findViewById(R.id.convert_button)  
	  
	        convertButton.setOnClickListener {  
	            val enteredUSD: String = inputEditText.text.toString()  
	            val usdToDouble: Double = enteredUSD.toDouble()  
	  
	            //Convert  
	            val eurosVal = makeConversion(usdToDouble)  
	  
	            //Display Result  
	            resultTextView.text = eurosVal.toString()  
	        }  
	    }  
	  
	    private fun makeConversion(usdVal: Double): Double {  
	        return usdVal * 0.94;  
	    }  
	}
```