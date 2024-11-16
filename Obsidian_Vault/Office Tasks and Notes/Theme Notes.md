# Field:
- Palette: Field Controls Palette
- Background:
- Text:
- Border:
# Read Only:
- Palette: General / Opacity
- Background:
- Text:
- Border:
# Buttons and Views Navigation
- Palette: Primary Color
- Background:
- Text:
- Border:

# App Card Views:
- Palette: Base Color Palette
- Background: shade600
- Text: shade000
- Border: 
# Toast Messages:
- Palette: Severities Color Palatte
- Background:
- Text:
- Border:
# Dialogs:
- Palette: Later Dialog palette / Now fine
- Background:
- Text:
- Border:

# Menu Screen:


//Notes theme:
## Note:
### For Example, Let's consider mapping Material/Light/Standard/Indigo - theme
- **Important things to know before mapping**:
	- For one specific theme (eg, material/light/standard/indigo), there are two `_variables.scss` files to be mapped with unique color code (eg, #900000).
		1.  `material/_variables.scss` : Common to all types of themes under say 'material' which has most of the colors to be mapped.
		2. `material/light/standard/indigo/_variables.scss` : Only specific to indigo and has few primary colors.
	- Always make sure that the common variables values in current file (above no.2) that we are about to map should refer to respective theme primary variable values(above no.1).
	- In each specific theme say 'indigo' has one `theme.scss` file which we convert to css after mapping both above mentioned variables.
	- While mapping, use six-digit unique number (prefer starting with 800 for dark or 900 for light) for more accurate mapping without any conflict and confusion.
	- Example for:
		- colors: `#ffffff` to `#9000001`
		- border-radius(px): `4px` to `900002px`
		- opacity: `.60` to `0.900003` (Imp: do not end opacity unique value with 0).
	- Don't map for transparent and none color values.
	- Always find and write the place(variable name) of reusable colors used using comment just along with the variable declaration. Eg for, emphasis colors, shade colors, etc.
	- While replacing actual colors with unique color code and creating object, always make sure that you are putting exact actual color value in the object before changing actual color to unique color code.
	- Also compare the final generated css file with css file inside node modules for the same theme to find out some mistakes in the color and missing styles. Path to css files in node modules: `appsteer-shared-lib-ui\node_modules\primeng\resources\themes`.

//Original files directory:
**Step 1**: Copy the particular light/dark theme files with inner `_variable.scss` file and common outer `_variable.scss` file to a separate folder outside the directory.

//Duplicate files directory:
**Step 2**: Open the copied folder in vs code and open both common and inner `_variable.scss` file in one side and one already mapped file on other side for reference.
**Step 3**: The common variables values in current file that we are about to map should refer to respective theme primary variable values.
**Step 4**: Complete All Mappings for both common and inner variable scss ==`file_map1.scss`== and ==`file_map2.scss`==.
	- Don't map for transparent and none color values
	- Do map for borderRadius in pixel
	- Do map for disableOpacity in decimal
	- Do map for all other colors which are required
**Step 5**: After Completion:
	- Copy only the variables with commented obj mappings with corresponding variable having unique color or radius or opacity codes to another new file ==`file_init_var.json`==.
	- From the ==`file_init_var.json`==, cut all the only commented obj part and paste in another new file ==`file_obj.json`== and keep only the variable names : color code part in the current file ==`file_init_var.json`==.	
	- After moving commented object, modify the all variable with unique codes as value to make a json object. Also the remove comments from commented object to prepare another json object file which is  ==`file_obj.json`==.
	- The modified variables json (i.e, ==`file_init_var.json`==) should be interchanged from `{varName:code}` to `{code:varName}` using a js code snippet and save it as ==`file_interchanged_var.json`==.

//Original files directory:
**Step 6**: Go back to unmodified original file directory, then both inner and common scss mapped initial files ==`file_map1.scss`== and ==`file_map2.scss`== should replace the original both files say `material/_variables.scss` and `material/light/standard/indigo/_variables.scss`.
**Step 7**: Then, above two files that are replaced with mapped values should be converted to css file from scss using command: `sass --update theme.scss:output.css` inside any one specific theme example: material/light/standard/indigo.
**Step 8**: The new output css file will be generated with the name provided in script say ==`map_init_output.css`==.
**Step 9**: Copy the above generated css file in the same directory where we copied file initially and did some mapping work.

//Duplicate files directory:
**Step 10**: Most important step, here we run the javascript file where logic has been written to replace all the unique codes in the ==`map_init_output.css`== file with the variable name that we have in ==`file_interchanged_var.json`==. For that we need to specify the path of this two file in the given script.
**Step 11**: Once the path is given, run the script using command `node script_name.js` and output the file ==`map_final_style.css`==.
**Step 12**: Now generate another variable json file with actual values and corresponding variable names running the value map script in the browser console. For that, copy the ==`file_obj.json`== value and assign it to a variable say `value` then use that variable in the code to achieve what is mentioned in the `Step 11`. The script also should be pasted below the variable initialization in the console.
**Step 13**: After that, copy that generated new object from console where we have variable names and corresponding actual values. Paste the object in new file named as ==`file_actual_var.json`==.
**Step 14**: Now, first of all replace all the color codes that are incorrectly set as background color in the file ==`map_final_style.css`==. To identify, search the line with key `, var(` and copy all the lines in another temp file.
**Step 16**: In temp file, delete the duplicate lines and few other unnecessary lines at the end.
**Step 17**: In temp file, find that what is the hash color code of that incorrect rgb value, which should be some unique color code that we had set. Example:
```
	rgb(144, 0, 1) to #900001
```
**Step 18**: In temp file, find the corresponding variable name and it's actual rgb color of that incorrect rgb color value mentioned in the above `Step 16` and `Step 17`.
**Step 19**: Now, in file ==`file_actual_var.json`== add those colors RGB numbers with new name just below it's actual corresponding variable. Eg: if its `buttonBg` : `#ffffff`.
```
	...
	--buttonBg : #ffffff (this should be already there)
	--buttonBgRgb : 255, 255, 255 (below that add corresponding rgb value like this)
	...
```
**Step 20**: Now, in file  ==`map_final_style.css`== , replace all the incorrectly placed background colors with their corresponding variables like in the example below.
``` css
	...
	//From this
	.p-button.p-button-outlined:enabled:hover {
	    background: rgba(144, 0, 1, var(--textButtonHoverBgOpacity));
	    color: var(--buttonBg);
	    border: 0 none;
	}
	//To this
		.p-button.p-button-outlined:enabled:hover {
	    background: rgba(var(--buttonBgRgb), var(--textButtonHoverBgOpacity));
	    color: var(--buttonBg);
	    border: 0 none;
	}
	...
```
**Step 21**: Like mentioned in the above step `Step 20`, for all incorrect colors do the same. To do so say search for `144, 0, 1` and replace with `var(--buttonBgRgb)` in file ==`map_final_style.css`==.
**Step 22**: After completing `Step 21`, remove existing `root:{}` and `font-family` part of the css code from the file ==`map_final_style.css`==.
**Step 23**: Now, replace new `root:{}` file on top of all variables in above mentioned css file with all values inside ==`file_actual_var.json`== putting inside `root:{}`.
**Step 24**: Finally, we have achieved ready to be used, a final css file which is  ==`map_final_style.css`==.

Example files:
- ==`file_map1.scss`== &  ==`file_map2.scss`==:
``` SCSS
	//file_map1.scss
	..
	$emphasis-high: #900000 !default; //textColor, inputTextColor, inputHoverBorderColor
	//?"--emphasis-high": {
	//?"type": "picker",
	//?"value": "rgba(0,0,0,.87)",
	//?"displayName": "emphasis-high"
	//?}
	..
	$disabledOpacity: 0.900009 !default;
	//?"--disabledOpacity": {
	//?"type": "text",
	//?"value": ".38",
	//?"displayName": "disabledOpacity"
	//?}
	..
	$borderRadius: 900007px !default;
	//?"--borderRadius": {
	//?"type": "text",
	//?"value": "4px",
	//?"displayName": "borderRadius"
	//?}
	..
	
	//file_map2.scss
	$primaryColor:#900098 !default;
	//?"--primaryColor": {
	//?"type": "picker",
	//?"value": "#3F51B5",
	//?"displayName": "primaryColor"
	//?}
	$primaryTextColor:#900099 !default;
	//?"--primaryTextColor": {
	//?"type": "picker",
	//?"value": "#ffffff",
	//?"displayName": "primaryTextColor"
	//?}
	..
```

-  ==`file_init_var.json`==, ==`file_interchanged_var.json`== & ==`file_obj.json`==:
``` JSON
	//file_init_var.json
	{
	    "--primaryColor": "#900098",
	    "--primaryTextColor": "#900099",
	    "--accentColor": "#900100",
	    "--accentTextColor": "#900101",
	    "--emphasis-high": "#900000",
	    "--emphasis-medium": "#900001",
	    "--emphasis-low": "#900002",
	    "--emphasis-lower": "#900003",
	    "--overlayColor": "#900004",
	    "--textColor": "#900005",
	    "--textSecondaryColor": "#900006",
	    "--borderRadius": "900007px",
	    "--divider": "#900008",
	    "--disabledOpacity": "0.900009",
	    "--maskBg": "#900010",
	    "--errorColor": "#900011",
	    "--highlightBg": "#900012",
	    ..
    }
    
	//file_interchanged_var.json
	{
	   "#900098": "--primaryColor",
	   "#900099": "--primaryTextColor",
	   "#900100": "--accentColor",
	   "#900101": "--accentTextColor",
	   "#900000": "--emphasis-high",
	   "#900001": "--emphasis-medium",
	   "#900002": "--emphasis-low",
	   "#900003": "--emphasis-lower",
	   "#900004": "--overlayColor",
	   "#900005": "--textColor",
	   "#900006": "--textSecondaryColor",
	   "900007px": "--borderRadius",
	   "#900008": "--divider",
	   "0.900009": "--disabledOpacity",
	   "#900010": "--maskBg",
	   "#900011": "--errorColor",
	   "#900012": "--highlightBg",
	   ..
	}
	//file_obj.json
	{
	    "--primaryColor": {
	        "type": "picker",
	        "value": "#3F51B5",
	        "displayName": "primaryColor"
	    },
	    "--primaryTextColor": {
	        "type": "picker",
	        "value": "#ffffff",
	        "displayName": "primaryTextColor"
	    },
	    "--accentColor": {
	        "type": "picker",
	        "value": "#ff4081",
	        "displayName": "accentColor"
	    },
	    "--accentTextColor": {
	        "type": "picker",
	        "value": "#ffffff",
	        "displayName": "accentTextColor"
	    },
	    "--emphasis-high": {
	        "type": "picker",
	        "value": "rgba(0,0,0,.87)",
	        "displayName": "emphasis-high"
	    },
	    "--emphasis-medium": {
	        "type": "picker",
	        "value": "rgba(0,0,0,.60)",
	        "displayName": "emphasis-medium"
	    },
	    ..
    }
```

- ==`map_init_output.css`== & ==`map_final_style.css`==:
``` SCSS
	//map_init_output.css
	..
	.p-button:enabled:active {
	  background: #900041;
	  color: #900042;
	  border-color: transparent;
	}
	.p-button.p-button-outlined {
	  background-color: transparent;
	  color: #900037;
	  border: 0 none;
	}
	.p-button.p-button-outlined:enabled:hover {
	  background: rgba(144, 0, 55, 0.900043);
	  color: #900037;
	  border: 0 none;
	}
	..
	
	//map_final_style.css
	..
	.p-button.p-button-outlined {
		background-color: transparent;
		color: var(--buttonBg);
		border: 0 none;
	}
	
	.p-button.p-button-outlined:enabled:hover {
		background: rgba(var(--buttonBgRgb), var(--textButtonHoverBgOpacity));
		color: var(--buttonBg);
		border: 0 none;
	}
	
	.p-button.p-button-outlined:enabled:active {
		background: rgba(var(--buttonBgRgb), var(--textButtonActiveBgOpacity));
		color: var(--buttonBg);
		border: 0 none;
	}
	..
```

- ==`file_actual_var.json`==
```JSON
	//file_actual_var.json
	{
	    "--primaryColor": "#3F51B5",
	    "--primaryTextColor": "#ffffff",
	    "--accentColor": "#ff4081",
	    "--accentTextColor": "#ffffff",
	    "--emphasis-high": "rgba(0,0,0,.87)",
	    "--emphasis-medium": "rgba(0,0,0,.60)",
	    "--emphasis-low": "rgba(0,0,0,.38)",
	    "--emphasis-lower": "rgba(0,0,0,.12)",
	    "--overlayColor": "#000000",
	    "--textColor": "rgba(0,0,0,.87)",
	    "--textSecondaryColor": "rgba(0,0,0,.60)",
	    "--borderRadius": "4px",
	    "--divider": "rgba(0,0,0,.12)",
	    "--disabledOpacity": ".38",
	    "--maskBg": "rgba(0, 0, 0, 0.32)",
	    "--errorColor": "#B00020",
	    "--highlightBg": "rgba(63, 81, 181, .12)",
	    ..
    }
```