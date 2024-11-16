#HomeAndroid - [[--Contents - Android--]]
108. **What's an Adapter?** ![[android-adapter.png]]
	- A list view is a UI component that displays a scrollable list of items.
	- It's a fundamental part of the Android user interface toolkit and is commonly used to display lists of text images or other view elements.
	- A list view is particularly useful when you have a collection of data that needs to be presented in a vertical scrolling fashion.

109. **Custom Adapters**
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
	
	    <ListView
	        android:id="@+id/listview"
	        android:layout_width="0dp"
	        android:layout_height="wrap_content"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	
	</androidx.constraintlayout.widget.ConstraintLayout>
```
``` java
	//MainActivity.java
	public class MainActivity extends AppCompatActivity {
	    ListView listview;
	
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
	
	        //AdapterView: ListView
	        listview = findViewById(R.id.listview);
	
	        //Data Source: String Array
	        String[] countries = {"USA", "Germany", "Saudi Arabia", "France"};
	
	        //Adapter: acts as a bridge between the 'data source' and the 'AdapterView'
	        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, countries);
	
	        //Link Listview with the Adapter
	        listview.setAdapter(adapter);
	    }
	}
```

109. **Custom Adapters**
	- There are several types of adapters used to connect data sources to UI components for displaying lists, grids and other types of data.
	1. Array Adapter:
		- An array adapter is used to bind an array or a list of items to a list view.
		- It's suitable for simple data like strings or simple objects.
	2. Base Adapter:
		- Base adapter is a more customizable adapter that requires you to subclass it and implement certain methods.
		- It's suitable when you need more control over view creation and recycling.
	- Context:
		- The term context refers to the object that provides access to various resources and services within the application environment.
		- It acts as a bridge between the application code and the Android operating system, allowing you to interact with the system, access resources and perform various tasks.
	- Example:
``` xml
	//my_list_item.xml
	<?xml version="1.0" encoding="utf-8"?>
	<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	    xmlns:app="http://schemas.android.com/apk/res-auto"
	    android:layout_width="match_parent"
	    android:layout_height="match_parent">
	
	    <TextView
	        android:id="@+id/text"
	        android:layout_width="0dp"
	        android:layout_height="wrap_content"
	        android:padding="10dp"
	        android:textColor="#D91212"
	        android:textSize="32sp"
	        android:text="item1"
	        app:layout_constraintEnd_toEndOf="parent"
	        app:layout_constraintStart_toStartOf="parent"
	        app:layout_constraintTop_toTopOf="parent" />
	</androidx.constraintlayout.widget.ConstraintLayout>
```
```java
	//MyCustomAdapter.java
	public class MyCustomAdapter extends BaseAdapter {
	    private Context context;
	    private String[] items;
		
		MyCustomAdapter(Context context, String[] items){
	        this.context = context;
	        this.items = items;
	    }
	    
	    @Override
	    public int getCount() {
	        return 0;
	    }
	
	    @Override
	    public Object getItem(int position) {
	        return null;
	    }
	
	    @Override
	    public long getItemId(int position) {
	        return 0;
	    }
	
	    @Override
	    public View getView(int position, View convertView, ViewGroup parent) {
	        return null;
	    }
	}
```

110. **Methods of Adapters**
	- getCount():
		- This method returns the number of items in your data source.
		- It tells the adapter how many items it should create views for.
	- getItem():
		- It's used to get the data for a particular view.
	- getItemId():
		- This method returns a unique identifier for a data item at a specific position.
		- It's mainly used for optimizing the recycling of views.
		- The returned ID doesn't necessarily need to be based on the data, it just needs to be unique.
	-  getView():
		- This method displays the data at a position in in the data set.
		- It's responsible for creating and returning the view for a specific position in the data source.
		- You inflate your layout and populate it with the data.
		- Here, the converted view parameter is recycled view that you can reuse if available for better performance.
	- Example:
``` java
	//MyCustomAdapter.java
	...
	@Override
    public int getCount() {
        return items.length;
    }

    @Override
    public Object getItem(int position) {
        return items[position];
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        return null;
    }

    static class ViewHolder{}
	...
```

111. **View Holder Class**
	- The Viewholder pattern is used in conjunction with adapter such as base adapter or Recyclerview.Aapter to optimize the performance and efficiency of displaying lists or grids of data.
	- It helps improve the scrolling performance of lists by reusing views and minimizing the need to repeatedly inflate and find the views for each item.
	- View convertView: So the convert to view is a recycled view that you can reuse to improve the performance of your list based UI components like list views, grid views and recycler view.
	- Example:
``` java
	//MyCustomAdapter.java
	...
	@Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if(convertView == null){
            convertView = LayoutInflater.from(context).inflate(R.layout.my_list_item, parent, false);
        } else{
            holder = (ViewHolder) convertView.getTag();
        }

        return null;
    }

    static class ViewHolder{
        //Holds references to the views within an item layout
        TextView textView;
    }
    ...
```

112. **Displaying Custom ListViews**
	- Example:
``` java
	//MyCuctomAdapter.java
	...
	 @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder holder;
        if(convertView == null){
            //convertView: is a recycled View that you can reuse to improve
            //              the performance of your list
            convertView = LayoutInflater.from(context).inflate(R.layout.my_list_item, parent, false);
            holder = new ViewHolder();
            holder.textView = convertView.findViewById(R.id.text);
            convertView.setTag(holder);
        } else{
            //Reusing the View (that's recycled)
            holder = (ViewHolder) convertView.getTag();
        }

        holder.textView.setText(items[position]);

        //Binding data to views within the convertView
        return convertView;
    }

    static class ViewHolder{
        //Holds references to the views within an item layout
        TextView textView;
    }
	...
	
	//MainActivity.java
	...
	 //Custom Adapter
      MyCustomAdapter adapter = new MyCustomAdapter(this, countries);
      //Link Listview with the Adapter  
	  listview.setAdapter(adapter);
	...
```