#HomeAndroid - [[--Contents - Android--]]
86. **Lucky Number App Promo**

87. **Main Activity Layout**
	- Example:
	```xml
	//activity_main.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    xmlns:tools="http://schemas.android.com/tools"
	    android:id="@+id/main"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    android:background="@drawable/bg1"
	    tools:context=".MainActivity">
	
	    <TextView
	        android:textColor="@color/white"
	        android:id="@+id/textView2"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="82dp"
	        android:text="Welcome to Lucky Number"
	        android:textSize="32sp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <EditText
	        android:id="@+id/edit_text"
	        android:textSize="20sp"
	        android:layout_width="match_parent"
	        android:layout_height="wrap_content"
	        android:layout_marginStart="10dp"
	        android:layout_marginTop="264dp"
	        android:layout_marginEnd="10dp"
	        android:hint="Please enter your name"
	        android:textColor="@color/white"
	        android:textColorHint="@color/white"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintHorizontal_bias="0.0"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <Button
	        android:id="@+id/btn"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="52dp"
	        android:text="Wish me a Luck!"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/edit_text" />
	
	    <ImageView
	        android:id="@+id/imageview"
	        android:layout_width="200dp"
	        android:layout_height="0dp"
	        android:src="@drawable/dice"
	        app:layout_constraintBottom_toBottomOf="parent"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/btn" />
	
	</androidx.constraintlayout.widget.ConstraintLayout>
	```

88. **Second Activity Layout**
	- Example:
	``` xml
	//activity_second.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    xmlns:tools="http://schemas.android.com/tools"
	    android:id="@+id/main"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    android:background="@drawable/bg2"
	    tools:context=".SecondActivity">
	
	    <TextView
	        android:textColor="@color/white"
	        android:id="@+id/textView"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="44dp"
	        android:text="Your Lucky Number is:"
	        android:textSize="32sp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <TextView
	        android:textColor="@color/white"
	        android:id="@+id/lucky_number_text"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="205dp"
	        android:text="888"
	        android:textSize="64sp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <Button
	        android:id="@+id/share_btn"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="80dp"
	        android:text="Share my Lucky Number"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/lucky_number_text" />
	
	</androidx.constraintlayout.widget.ConstraintLayout>
	```

89. **Passing Data Between Activities**
	- Example:
	``` java
	//MainActivity.class
	EditText editText;
    Button btn;
    TextView txt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        txt = findViewById(R.id.text_view);
        editText = findViewById(R.id.edit_text);
        btn = findViewById(R.id.btn);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        btn.setOnClickListener(v -> {
            String userName = editText.getText().toString();

            //Explicit Intent()
            Intent i = new Intent(getApplicationContext(), SecondActivity.class);
            i.putExtra("name", userName);
            startActivity(i);
        });
    }
	```

90. **Generating Random Numbers**
	- Example:
	``` java
	//SeconActivity.class
	TextView welcomeTxt, luckyNumberTxt;
    Button shareBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_second);

        welcomeTxt = findViewById(R.id.textView);
        luckyNumberTxt = findViewById(R.id.lucky_number_text);
        shareBtn = findViewById(R.id.share_btn);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        //Receiving the data from Main Activity
        Intent i = getIntent();
        String userName = i.getStringExtra("name");

        //Generating Random Numbers
    }

    public int generateRandomNumber(){
        Random random = new Random();
        int upperLimit = 1000;
        return random.nextInt(upperLimit);
    }
	```
	
91. **Sharing the Results**
	- Example:
	``` java
	//SecondActivity.class
	...
	protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_second);

        welcomeTxt = findViewById(R.id.textView);
        luckyNumberTxt = findViewById(R.id.lucky_number_text);
        shareBtn = findViewById(R.id.share_btn);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        //Receiving the data from Main Activity
        Intent i = getIntent();
        String userName = i.getStringExtra("name");

        //Generating Random Numbers
        int randomNum = generateRandomNumber();
        luckyNumberTxt.setText(String.valueOf(randomNum));

        shareBtn.setOnClickListener(v -> shareData(userName, randomNum));
    }

    public int generateRandomNumber() {
        Random random = new Random();
        int upperLimit = 1000;
        return random.nextInt(upperLimit);
    }

    public void shareData(String userName, int randomNumber) {
        Intent i = new Intent(Intent.ACTION_SEND);
        i.setType("text/plain");
        i.putExtra(Intent.EXTRA_SUBJECT, userName + " got lucky today!");
        i.putExtra(Intent.EXTRA_TEXT, "His lucky number is: " + randomNumber);
        startActivity(Intent.createChooser(i, "Choose a Platform"));
    }
	...
	```