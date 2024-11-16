#HomeAndroid - [[--Contents - Android--]]
103. **App Overview**
	- We'll learn about media players in android.

104. **Designing Layout**
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
	    android:background="@drawable/background_media"
	    tools:context=".MainActivity">
	
	    <TextView
	        android:id="@+id/txtView"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:text="French Teacher App"
	        android:textColor="@color/white"
	        android:textSize="32sp"
	        app:layout_constraintBottom_toBottomOf="parent"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent"
	        app:layout_constraintVertical_bias="0.315" />
	
	    <Button
	        android:id="@+id/blackBtn"
	        android:text="Black"
	        android:textColor="@color/black"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="15dp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/txtView" />
	
	    <Button
	        android:id="@+id/greenBtn"
	        android:text="Green"
	        android:textColor="#3ED92C"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="15dp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/blackBtn" />
	
	    <Button
	        android:id="@+id/purpleBtn"
	        android:text="Purple"
	        android:textColor="#9A038D"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="15dp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/greenBtn" />
	
	    <Button
	        android:id="@+id/redBtn"
	        android:text="Red"
	        android:textColor="#B80000"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="15dp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/purpleBtn" />
	
	    <Button
	        android:id="@+id/yellowBtn"
	        android:text="Yellow"
	        android:textColor="#F4C11D"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="15dp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/redBtn" />
	
	</androidx.constraintlayout.widget.ConstraintLayout>
```

105. **MediaPlayer in Android - Playing the French Sounds**
	- raw folder inside res directory:
		- You can store row data files like in form of Json files, XML files or binary files.
		- These files are not pre-processed by Android's resource system, which means they will be included in the APK exactly as you placed them in the resources slash row directory the media files.
		- You can also store audio or video files such as sound clips or video clips in the row folder.
	- The media player class in Android studio is a part of the Android multimedia framework that provides a high level interface for playing audio and video files.
	- It allows you to play various media formats and provides a methods for controlling playback handling playback events and managing media resources.
	- Example:
``` java
	//MainActivity.class
	public class MainActivity extends AppCompatActivity {
	    Button blackBtn, yellowBtn, redBtn, purpleBtn, greenBtn;
	
	    @Override
	    protected void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        EdgeToEdge.enable(this);
	        setContentView(R.layout.activity_main);
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
	            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
	            return insets;
	        });
	
	        blackBtn = findViewById(R.id.blackBtn);
	        yellowBtn = findViewById(R.id.yellowBtn);
	        redBtn = findViewById(R.id.redBtn);
	        purpleBtn = findViewById(R.id.purpleBtn);
	        greenBtn = findViewById(R.id.greenBtn);
	
	        redBtn.setOnClickListener(v -> {
	            MediaPlayer mediaPlayer = MediaPlayer.create(getApplicationContext(), R.raw.red);
	            mediaPlayer.start();
	        });
	    }
	}
```

106. **Handling Multiple Buttons' Click**
	- Example:
``` java
	//MainActivity.class
	public class MainActivity extends AppCompatActivity implements View.OnClickListener{
	    Button blackBtn, yellowBtn, redBtn, purpleBtn, greenBtn;
	
	    @Override
	    protected void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        EdgeToEdge.enable(this);
	        setContentView(R.layout.activity_main);
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
	            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
	            return insets;
	        });
	
	        blackBtn = findViewById(R.id.blackBtn);
	        yellowBtn = findViewById(R.id.yellowBtn);
	        redBtn = findViewById(R.id.redBtn);
	        purpleBtn = findViewById(R.id.purpleBtn);
	        greenBtn = findViewById(R.id.greenBtn);
	
	        redBtn.setOnClickListener(this);
	        yellowBtn.setOnClickListener(this);
	        blackBtn.setOnClickListener(this);
	        purpleBtn.setOnClickListener(this);
	        greenBtn.setOnClickListener(this);
	    }
	
	    @Override
	    public void onClick(View v) {
	
	    }
	}
```

107. **Running the App**
	- Example:
``` java
	//MainActivity.class
	...
	@Override
    public void onClick(View v) {
        int clickedBtnId = v.getId();
        if (clickedBtnId == R.id.redBtn) {
            playSounds(R.raw.red);
        } else if (clickedBtnId == R.id.blackBtn) {
            playSounds(R.raw.black);
        } else if (clickedBtnId == R.id.yellowBtn) {
            playSounds(R.raw.yellow);
        } else if (clickedBtnId == R.id.purpleBtn) {
            playSounds(R.raw.purple);
        } else if (clickedBtnId == R.id.greenBtn) {
            playSounds(R.raw.green);
        }
    }

    private void playSounds(int id) {
        MediaPlayer mediaPlayer = MediaPlayer.create(this, id);
        mediaPlayer.start();
    }
	...
```