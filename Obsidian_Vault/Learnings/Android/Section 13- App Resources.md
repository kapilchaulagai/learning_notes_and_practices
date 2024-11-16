#HomeAndroid - [[--Contents - Android--]]
93. **Drawable & Shapes**
	- This directory holds image files like PNG JPG XML drawable that your app uses for visual elements like icons, backgrounds and image views.

92. **Mipmap Folder - Changing the App Icon**
	- XML Layout Files define the structure and arrangement of UI components in your apps screen.
	- Mipmap folder is used to store launcher icons for your Android application at different resolutions and densities.
	- Launcher icons are the app icons that users see on their device's home screen app drawer and other places where apps are displayed.
	- The Mipmap folder is a specialized directory with the resource folder that helps ensure that launcher icons are appropriately sized and crisp on various devices.

94. **Values Folder - String.xml, Themes.xml & Colors.xml**
	- Values folder contains XML files that define various types of resources that your app uses to provide different aspects of its user interface and behavior.
	- These resources are organized into the values folder to centralize configuration settings, localization and styling information.

95. **Menu - Creating Menus**
	- Create a new `Android Resource Directory` choosing `Resource Type` as `Menu` under `res` folder and then right click on `menu` directory to create a new menu resource file choosing `Menu Resource File`.
	- Don't forget to remove `No Action Bar` from theme to see the menu in the activity.
	- Example:
	``` java
	//my_menu.xml	
	<?xml version="1.0" encoding="utf-8"?>
	<menu xmlns:android="http://schemas.android.com/apk/res/android">
	    <item android:id="@+id/action_search"
	        android: android:title="Search"
	        android: android:icon="@drawable/search"/>
	
	    <item android:id="@+id/action_home"
	        android: android:title="Home"
	        android: android:icon="@drawable/home"/>
	</menu>
	
	//MainActivity.class
	...
	@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.my_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == R.id.action_home) {

        } else if (item.getItemId() == R.id.action_home) {

        }
        return super.onOptionsItemSelected(item);
    }
    ...
	```

96. **Font**
	- Create a new `Android Resource Directory` choosing `Resource Type` as `Font` under `res` folder and then right click on `font` directory to create a new font resource file choosing `Font Resource File`.
	- Or, also you can copy and paste the `ttf` font resource file from your local to the respective font folder.