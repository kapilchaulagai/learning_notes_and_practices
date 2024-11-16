#HomeAndroid - [[--Contents - Android--]]
62. **Views & View Group**
	![[android-view.png]]
	![[android-view-class.png]]

63. **UI Editing in android**
	- Code
	- Split
	- Design
	- Palette

64. **View's Attributes**
	- id: assigns unique id
	- layout_width/layout_height : size of the view
	- constraint_attributes
	- margin: separating with other views with empty spaces around the view
	- padding: difference between view and its content

65. **TextView - Formatting**
	- Show Text content.
		- text
		- textSize
		- textColor
		- textStyle
		- typeface
		- gravity
		- textAllCaps
		- padding
		- margin
		- background
		- inputType

66. **Declaring & Initializing Views**
	- First set the `id` for the view.
	``` java
	//Iniside the Activity's onCreate()
	TextView myTextView = findViewById(R.id.myTextView);
	myTextView.setText("Hi");
	```

67. **EditText**
	- User can input the text values.
		- text
		- hint
		- inputType
		- textColor
		- textStyle
		- textSize
		- maxLength
		- padding
		- margin / layout_editor_absoluteX /  layout_editor_absoluteY
	- Example:
	``` java
	//Inside the Activity's onCreate()
	EditText myEditText = findViewById(R.id.myEditText);
	String input = myEditText.getText();
	```

68. **Buttons**
	- text
	- textStyle
	- textSize
	- maxLength
	- padding
	- margin
	- enabled
	- clickable

69. **Listeners in Android**
	- Listens the event triggered.

70. **ImageView - Displaying Images**
	- width/height
	- id
	- src
	- scaleType
	- contentDescription
	- padding/margin

71. **The Greetings App**

72. The Counter App ![[android-counter-app.png]]