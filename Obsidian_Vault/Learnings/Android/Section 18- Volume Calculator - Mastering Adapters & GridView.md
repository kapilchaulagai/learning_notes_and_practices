#HomeAndroid - [[--Contents - Android--]]
122. **What we'll build together?**
	- Volume Calculator for Different shapes.

123. **Creating GridView Layouts**
	- GridView: 
		- A grid view is a UI widget that displays a collection of items in a two dimensional grid format, much like a grid or table.
		- Each item is represented as a cell within the grid and you can use a grid view to create various types of interfaces such as image galleries, product listing, and of course to create a custom grid view.
		- We need four things: 
			- the grid view, which is the adapter view, 
			- the adapter, which is the bridge between the adapter view and the data source, 
			- the item layout, which represents each item in the grid view 
			- and the data source, which is a collection of items that you want to display in the grid view.
	- Example:
``` xml
	//grid_item_layout.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    android:layout_width="wrap_content"
	    android:layout_height="wrap_content">
	
	    <ImageView
	        android:id="@+id/imageView"
	        android:layout_width="120dp"
	        android:layout_height="120dp"
	        android:layout_marginStart="16dp"
	        android:layout_marginTop="16dp"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <TextView
	        android:id="@+id/textView"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:text="image"
	        android:textColor="@color/black"
	        android:textSize="24sp"
	        app:layout_constraintEnd_toEndOf="@+id/imageView"
	        app:layout_constraintStart_toStartOf="@+id/imageView"
	        app:layout_constraintTop_toBottomOf="@+id/imageView" />
	
	
	</androidx.constraintlayout.widget.ConstraintLayout>
```

124. **Model Class - Shape**
	- Example:
``` java
	//Shape.java
	package com.practice.volumeareaapp;
	
	public class Shape {
	    int shapeImg;
	    String shapeName;
	
	    public Shape(int shapeImg, String shapeName) {
	        this.shapeImg = shapeImg;
	        this.shapeName = shapeName;
	    }
	
	    public int getShapeImg() {
	        return shapeImg;
	    }
	
	    public void setShapeImg(int shapeImg) {
	        this.shapeImg = shapeImg;
	    }
	
	    public String getShapeName() {
	        return shapeName;
	    }
	
	    public void setShapeName(String shapeName) {
	        this.shapeName = shapeName;
	    }
	}
```

125. **Custom GridView Adapter**
126. **GetView() Method**
127. **Layout Inflater**
	- Example:
``` java
	//MyCustomAdapter.java
	package com.practice.volumeareaapp;
	
	import android.content.Context;
	import android.view.LayoutInflater;
	import android.view.View;
	import android.view.ViewGroup;
	import android.widget.ArrayAdapter;
	import android.widget.ImageView;
	import android.widget.TextView;
	
	import androidx.annotation.NonNull;
	import androidx.annotation.Nullable;
	
	import java.util.ArrayList;
	
	public class MyCustomAdapter extends ArrayAdapter<Shape> {
	    private ArrayList<Shape> shapesArrayList;
	    Context context;
	
	    public MyCustomAdapter(ArrayList<Shape> shapesArrayList, @NonNull Context context) {
	        super(context, R.layout.grid_item_layout, shapesArrayList);
	        this.shapesArrayList = shapesArrayList;
	        this.context = context;
	    }
	
	    private static class MyViewHolder {
	        TextView shapeName;
	        ImageView shapeImg;
	    }
	
	    @NonNull
	    @Override
	    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
	        Shape shape = getItem(position);
	        MyViewHolder myViewHolder;
	
	        if (convertView == null) {
	            myViewHolder = new MyViewHolder();
	            LayoutInflater inflater = LayoutInflater.from(getContext());
	            convertView = inflater.inflate(
	                    R.layout.grid_item_layout,
	                    parent,
	                    false
	            );
	            myViewHolder.shapeName = convertView.findViewById(R.id.textView);
	            myViewHolder.shapeImg = convertView.findViewById(R.id.imageView);
	
	            convertView.setTag(myViewHolder);
	        } else {
	            myViewHolder = (MyViewHolder) convertView.getTag();
	        }
	        myViewHolder.shapeName.setText(shape.getShapeName());
	        myViewHolder.shapeImg.setImageResource(shape.getShapeImg());
	
	        return convertView;
	    }
	}
```

128. **Main Activity**
	- Example:
``` java
	//MainActivity.java
	package com.practice.volumeareaapp;
	
	import android.os.Bundle;
	import android.widget.GridView;
	
	import androidx.activity.EdgeToEdge;
	import androidx.appcompat.app.AppCompatActivity;
	import androidx.core.graphics.Insets;
	import androidx.core.view.ViewCompat;
	import androidx.core.view.WindowInsetsCompat;
	
	import java.util.ArrayList;
	
	public class MainActivity extends AppCompatActivity {
	    GridView gridView;
	    ArrayList<Shape> shapeArrayList;
	
	    MyCustomAdapter adapter;
	
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
	
	        gridView = findViewById(R.id.gridView);
	        shapeArrayList = new ArrayList<>();
	
	        Shape s1 = new Shape(R.drawable.sphere, "Sphere");
	        Shape s2 = new Shape(R.drawable.cylinder, "Cylinder");
	        Shape s3 = new Shape(R.drawable.cube, "Cube");
	        Shape s4 = new Shape(R.drawable.prism, "Prism");
	
	        shapeArrayList.add(s1);
	        shapeArrayList.add(s2);
	        shapeArrayList.add(s3);
	        shapeArrayList.add(s4);
	
	        adapter = new MyCustomAdapter(shapeArrayList, getApplicationContext());
	        gridView.setAdapter(adapter);
	        gridView.setNumColumns(2);
	    }
	}
```
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
	
	    <TextView
	        android:id="@+id/title"
	        android:layout_width="0dp"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="180dp"
	        android:gravity="center"
	        android:text="Volume Calculator"
	        android:textColor="@color/white"
	        android:textSize="40sp"
	        android:textStyle="bold"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintHorizontal_bias="0.0"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <GridView
	        android:id="@+id/gridView"
	        android:layout_width="0dp"
	        android:layout_height="0dp"
	        app:layout_constraintBottom_toBottomOf="parent"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/title" />
	
	</androidx.constraintlayout.widget.ConstraintLayout>
```

129. **Calculating Shape Volume**
	- Create a different activities for different shapes like given in the example below.
	- Example:
``` java
	//Sphere.java
	package com.practice.volumeareaapp;
	
	import android.os.Bundle;
	import android.widget.Button;
	import android.widget.EditText;
	import android.widget.TextView;
	
	import androidx.activity.EdgeToEdge;
	import androidx.appcompat.app.AppCompatActivity;
	import androidx.core.graphics.Insets;
	import androidx.core.view.ViewCompat;
	import androidx.core.view.WindowInsetsCompat;
	
	public class Sphere extends AppCompatActivity {
	    EditText sphereRadius;
	    TextView title, result;
	    Button button;
	
	    @Override
	    protected void onCreate(Bundle savedInstanceState) {
	        super.onCreate(savedInstanceState);
	        EdgeToEdge.enable(this);
	        setContentView(R.layout.activity_sphere);
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
	            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
	            return insets;
	        });
	
	        sphereRadius = findViewById(R.id.editText_sphere);
	        title = findViewById(R.id.title_textView_sphere);
	        result = findViewById(R.id.result_textView_sphere);
	        button = findViewById(R.id.sphere_button);
	
	        button.setOnClickListener(v -> {
	            String radius = sphereRadius.getText().toString();
	
	            int r = Integer.parseInt(radius);
	            //V = (4/3) * pi *  r^3
	
	            double volume = (4 / 3) * Math.PI * r * r * r;
	            result.setText("V = " + volume + " m^3");
	        });
	    }
	}
```
``` xml
	//activity_sphere.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    xmlns:tools="http://schemas.android.com/tools"
	    android:id="@+id/main"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent"
	    android:background="@drawable/back2"
	    tools:context=".Sphere">
	
	    <TextView
	        android:id="@+id/title_textView_sphere"
	        android:layout_width="0dp"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="55dp"
	        android:gravity="center"
	        android:text="Sphere Volume"
	        android:textColor="@color/white"
	        android:textSize="32sp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <EditText
	        android:id="@+id/editText_sphere"
	        android:layout_width="0dp"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="199dp"
	        android:hint="Please Enter the radius"
	        android:textColorHint="@color/white"
	        android:textSize="30sp"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	    <TextView
	        android:id="@+id/result_textView_sphere"
	        android:layout_width="0dp"
	        android:layout_height="wrap_content"
	        android:layout_margin="20dp"
	        android:layout_marginStart="20dp"
	        android:layout_marginEnd="20dp"
	        android:layout_marginBottom="200dp"
	        android:text="Result"
	        android:textColor="@color/white"
	        android:textSize="38sp"
	        app:layout_constraintBottom_toBottomOf="parent"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/editText_sphere" />
	
	    <Button
	        android:id="@+id/sphere_button"
	        android:layout_width="wrap_content"
	        android:layout_height="wrap_content"
	        android:layout_marginTop="71dp"
	        android:text="Calculate Volume"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toBottomOf="@+id/editText_sphere" />
	
	
	</androidx.constraintlayout.widget.ConstraintLayout>
```

130. **Your Turn**
	- Follow the same way to implement calculation of volume for all the shapes as given in the previous example.