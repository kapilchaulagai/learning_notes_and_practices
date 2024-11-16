#HomeAndroid - [[--Contents - Android--]]
113. **App Promo - What we'll build together?**
	- ListView using Adapter for listing out planets and their satellites info.

114. **Designing Layout**
	- Example:
``` xml
	//item_list_layout.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    android:layout_width="match_parent"
	    android:layout_height="wrap_content">
	
	    <ImageView
	        android:id="@+id/imageView"
	        android:layout_width="100dp"
	        android:layout_height="100dp"
	        android:layout_margin="16dp"
	        android:layout_marginStart="16dp"
	        app:layout_constraintBottom_toBottomOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <TextView
	        android:id="@+id/planet_name"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginStart="16dp"
	        android:layout_marginTop="16dp"
	        android:text="Planet Name"
	        android:textSize="28sp"
	        app:layout_constraintStart_toEndOf="@+id/imageView"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <TextView
	        android:id="@+id/satellites"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="8dp"
	        android:text="0 Moon"
	        android:textSize="20sp"
	        app:layout_constraintStart_toStartOf="@id/planet_name"
	        app:layout_constraintTop_toBottomOf="@id/planet_name" />
	
	</androidx.constraintlayout.widget.ConstraintLayout>
	
	//activity_main.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    xmlns:tools="http://schemas.android.com/tools"
	    android:id="@+id/main"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    tools:context=".MainActivity">
	
	    <ListView
	        android:id="@+id/listview"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        app:layout_constraintBottom_toBottomOf="parent"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	</androidx.constraintlayout.widget.ConstraintLayout>
```

115. **Model Class**
	- Example:
``` java
	//Planet.java
	package com.practice.planetapp;
	
	//This class is acting as Model Class for our ListView
	public class Planet {
	    //Attributes
	    private String planetName;
	    private String moonCount;
	    private int planetImage;
	
	    //Constructor
	    public Planet(String planetName, String moonCount, int planetImage) {
	        this.planetName = planetName;
	        this.moonCount = moonCount;
	        this.planetImage = planetImage;
	    }
	
	    //Getters & Setters
	    public String getPlanetName() {
	        return planetName;
	    }
	
	    public void setPlanetName(String planetName) {
	        this.planetName = planetName;
	    }
	
	    public String getMoonCount() {
	        return moonCount;
	    }
	
	    public void setMoonCount(String moonCount) {
	        this.moonCount = moonCount;
	    }
	
	    public int getPlanetImage() {
	        return planetImage;
	    }
	
	    public void setPlanetImage(int planetImage) {
	        this.planetImage = planetImage;
	    }
	}
```

116. **Creating Custom Adapters**
	- Example:
``` java
	//MyCustomAdapter.java
	package com.practice.planetapp;
	
	import android.content.Context;
	import android.widget.ArrayAdapter;
	
	import java.util.ArrayList;
	
	public class MyCustomAdapter extends ArrayAdapter<Planet> {
	    //Using Custom Layouts --> MyCustomAdapter
	    //Using Custom Objects --> extends ArrayAdapter<Planet>
	    private ArrayList<Planet> planetsArrayList;
	    Context context;
	
	    public MyCustomAdapter(ArrayList<Planet> planetsArrayList, Context context){
	        super(context, R.layout.item_list_layout, planetsArrayList);
	        this.planetsArrayList = planetsArrayList;
	        this.context = context;
	    }
	}
```

117. **View Holder Class**
118. **ConvertView**
119. **SetTag() & GetTag() Methods**
	- Example:
``` java
	//MyCustomAdapter.java
	...
	private static class MyViewHolder {
        TextView planetName;
        TextView moonCount;
        ImageView planetImg;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        //Get the planet object for the current position
        Planet planets = getItem(position);

        //Inflate Layout
        MyViewHolder myViewHolder;
        final View result;

        if (convertView == null) {
            //create new
            myViewHolder = new MyViewHolder();
            LayoutInflater inflater = LayoutInflater.from(getContext());
            convertView = inflater.inflate(
                    R.layout.item_list_layout,
                    parent,
                    false
            );

            //Finding Views
            myViewHolder.planetName = convertView.findViewById(R.id.planet_name);
            myViewHolder.moonCount = convertView.findViewById(R.id.satellites);
            myViewHolder.planetImg = convertView.findViewById(R.id.imageView);

            result = convertView;

            convertView.setTag(myViewHolder);
        } else {
            //recycle/reuse
            myViewHolder = (MyViewHolder) convertView.getTag();
            result = convertView;
        }
        myViewHolder.planetName.setText(planets.getPlanetName());
        myViewHolder.moonCount.setText(planets.getMoonCount());
        myViewHolder.planetImg.setImageResource(planets.getPlanetImage());

        return result;
    }
	...
```

120. **Using ArrayLists in ListViews**
121. **Handling Click Events on ListView**
	- Example:
``` java
	//MainActivity.java
	package com.practice.planetapp;
	
	import android.os.Bundle;
	import android.widget.ListView;
	import android.widget.Toast;
	
	import androidx.activity.EdgeToEdge;
	import androidx.appcompat.app.AppCompatActivity;
	import androidx.core.graphics.Insets;
	import androidx.core.view.ViewCompat;
	import androidx.core.view.WindowInsetsCompat;
	
	import java.util.ArrayList;
	
	public class MainActivity extends AppCompatActivity {
	    ListView listView;
	    ArrayList<Planet> planetsArrayList;
	    private static MyCustomAdapter adapter;
	
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
	
	        //AdapterView: a ListView
	        listView = findViewById(R.id.listview);
	
	        //Data Source: ArrayList<Planet>
	        planetsArrayList = new ArrayList<>();
	        Planet planet1 = new Planet("Mercury", "1", R.drawable.mercury);
	        Planet planet2 = new Planet("Venus", "2", R.drawable.venus);
	        Planet planet3 = new Planet("Earth", "3", R.drawable.earth);
	        Planet planet4 = new Planet("Mars", "4", R.drawable.mars);
	        Planet planet5 = new Planet("Jupiter", "5", R.drawable.jupiter);
	        Planet planet6 = new Planet("Saturn", "6", R.drawable.saturn);
	        Planet planet7 = new Planet("Uranus", "7", R.drawable.uranus);
	        Planet planet8 = new Planet("Neptune", "8", R.drawable.neptune);
	        Planet planet9 = new Planet("Pluto", "9", R.drawable.pluto);
	
	        planetsArrayList.add(planet1);
	        planetsArrayList.add(planet2);
	        planetsArrayList.add(planet3);
	        planetsArrayList.add(planet4);
	        planetsArrayList.add(planet5);
	        planetsArrayList.add(planet6);
	        planetsArrayList.add(planet7);
	        planetsArrayList.add(planet8);
	        planetsArrayList.add(planet9);
	
	        //Adapter
	        adapter = new MyCustomAdapter(planetsArrayList, getApplicationContext());
	        listView.setAdapter(adapter);
	
	        //Handling Click Events
	        listView.setOnItemClickListener((parent, view, position, id) -> {
	            Toast.makeText(MainActivity.this, "Planet Name: " + adapter.getItem(position).getPlanetName(), Toast.LENGTH_SHORT).show();
	        });
	    }
	}
```