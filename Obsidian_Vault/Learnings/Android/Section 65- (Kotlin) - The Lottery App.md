#HomeAndroid - [[--Contents - Android--]]

514. **App Promo**

515. **Designing Layouts**

516. **Second Activity Layout**

517. **Sending Data to Another Activity**

518. **Generating Random Numbers**

519. **Receiving Data from Another Activity**

520. **Sharing Results with Other Apps**

- Example:
``` xml
	//activity_main.xml
	<?xml version="1.0" encoding="utf-8"?>  
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
	    xmlns:app="http://schemas.android.com/apk/res-auto"  
	    xmlns:tools="http://schemas.android.com/tools"  
	    android:id="@+id/main"  
	    android:background="@drawable/back1"  
	    android:layout_width="match_parent"  
	    android:layout_height="match_parent"  
	    tools:context=".MainActivity">  
	  
	    <TextView        android:id="@+id/title_textview"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:textColor="@color/white"  
	        android:text="Welcome to Lottery Generator App"  
	        android:textAlignment="center"  
	        android:textSize="32sp"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent" />  
	  
	    <EditText        android:id="@+id/username_edittext"  
	        android:layout_width="0dp"  
	        android:layout_height="wrap_content"  
	        android:layout_marginBottom="172dp"  
	        android:hint="Enter your name"  
	        android:textColorHint="@color/white"  
	        android:textSize="28sp"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintHorizontal_bias="1.0"  
	        app:layout_constraintStart_toStartOf="parent" />  
	  
	    <Button        android:id="@+id/generate_button"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:layout_marginBottom="60dp"  
	        android:text="Generate Random Lottery Number"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent" />  
	  
	</androidx.constraintlayout.widget.ConstraintLayout>
	
	//activity_second.xml
	<?xml version="1.0" encoding="utf-8"?>  
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"  
	    xmlns:app="http://schemas.android.com/apk/res-auto"  
	    xmlns:tools="http://schemas.android.com/tools"  
	    android:id="@+id/main"  
	    android:layout_width="match_parent"  
	    android:layout_height="match_parent"  
	    android:background="@drawable/back2"  
	    tools:context=".SecondActivity">  
	  
	    <TextView        android:id="@+id/your_lottery_numbers_tv"  
	        android:layout_width="0dp"  
	        android:layout_height="wrap_content"  
	        android:text="Your Lottery Numbers: "  
	        android:textAlignment="center"  
	        android:textSize="32sp"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent" />  
	  
	    <TextView        android:id="@+id/lottery_numbers_tv"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:layout_marginBottom="200dp"  
	        android:text="77777"  
	        android:textColor="@color/white"  
	        android:textAlignment="center"  
	        android:textSize="32sp"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent" />  
	  
	    <Button        android:id="@+id/share_button"  
	        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:layout_marginTop="60dp"  
	        android:text="Share My Lottery Numbers"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toBottomOf="@+id/lottery_numbers_tv" />  
	  
	</androidx.constraintlayout.widget.ConstraintLayout>
```
``` kotlin
	//MainActivity.kt
	package com.practice.lotteryapp  
	  
	import android.content.Intent  
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
	    private lateinit var userNameEditText: EditText  
	    private lateinit var generateButton: Button  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        titleTextView = findViewById(R.id.title_textview)  
	        userNameEditText = findViewById(R.id.username_edittext)  
	        generateButton = findViewById(R.id.generate_button)  
	  
	        generateButton.setOnClickListener {  
	            val name: String = userNameEditText.text.toString()  
	  
	            //Explicit Intent  
	            val intent = Intent(this, SecondActivity::class.java)  
	            intent.putExtra("username", name);  
	            startActivity(intent)  
	        }  
	    }  
	}
	
	 //SecondActivity.kt
	 package com.practice.lotteryapp  
	  
	import android.content.Intent  
	import android.media.tv.TvView  
	import android.os.Bundle  
	import android.widget.Button  
	import android.widget.TextView  
	import android.widget.Toast  
	import androidx.activity.enableEdgeToEdge  
	import androidx.appcompat.app.AppCompatActivity  
	import androidx.core.view.ViewCompat  
	import androidx.core.view.WindowInsetsCompat  
	  
	class SecondActivity : AppCompatActivity() {  
	    private lateinit var yourLotteryNumTv: TextView  
	    private lateinit var lotteryNumTvView: TextView  
	    private lateinit var shareNumButton: Button  
	  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_second)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	  
	        yourLotteryNumTv = findViewById(R.id.your_lottery_numbers_tv)  
	        lotteryNumTvView = findViewById(R.id.lottery_numbers_tv)  
	        shareNumButton = findViewById(R.id.share_button)  
	  
	        //Generate 6 random numbers and store in a string  
	        val randomNumbers = generateRandomNumbers(6)  
	        lotteryNumTvView.text = randomNumbers  
	  
	        //Getting the Username from the main activity  
	        val username = receiveUserName()  
	  
	        //Sharing the username and generated Numbers with Email App  
	        shareNumButton.setOnClickListener {  
	            if (username != null)  
	                shareResult(username, randomNumbers)  
	        }  
	    }  
	  
	    private fun generateRandomNumbers(count: Int): String {  
	        //Lambda Expression to generate random numbers  
	        val randomNumbers = List(count) {  
	            (0..9).random()  
	  
	            /*//Alternative  
	            val random = java.util.Random()            val randomNum = random.nextInt(43)*/        }  
	  
	        //Convert the list numbers to String  
	        return randomNumbers.joinToString(" ")  
	    }  
	  
	    private fun receiveUserName(): String? {  
	        //Retrieve the extras that were added to an INTENT  
	        //? : "Question Mark" indicates that the variable can be NULL        val bundle: Bundle? = intent.extras  
	        val username = bundle?.getString("username")  
	        return username  
	    }  
	  
	    private fun shareResult(username: String, generatedNums: String) {  
	        val intent = Intent(Intent.ACTION_SEND)  
	        intent.type = "text/plain"  // Set the MIME type  
	        intent.putExtra(Intent.EXTRA_SUBJECT, "$username generates these numbers")  
	        intent.putExtra(Intent.EXTRA_TEXT, "The Lottery Numbers are: $generatedNums")  
	  
	        // Verify that there's an app available to handle this intent  
	        if (intent.resolveActivity(packageManager) != null) {  
	            startActivity(intent)  
	        } else {  
	            // Handle the case where no app is available  
	            Toast.makeText(this, "No app available to share the result.", Toast.LENGTH_SHORT).show()  
	        }  
	    }  
	}
```
