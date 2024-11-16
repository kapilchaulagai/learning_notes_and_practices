- Soft delete to sandbox
- On disable permission, mainactivity goes blank (Life Cycle issue)
- Huge parcellable data are not able to transfer throughout the activities
- Error border color for field controls
- Group/Subapp atleast one row mandatory and all
- Label Alignment-285, Label Position-283, Label Style-224, Separate Column for label-284, X-Axis Label-135, Y-Axis Label-136 field attribute
- Add change appspace icon
- Fingerprint depricated
- Check how recurring profiles are handled, multiple profiles/multiple app cards
- added accounts logs in without asking password or nay consent, similar may happen in our case for work profile when one default user will be automatically logged in.
- viewAttribute.getAttributeTypeId() == 8 ; in prod: code: edit/skip button text value , server value: show in full screen : Layout : 3641
- Different privileges for different profiles
- Search app
- formulas not working for chips to text for: `"\'`
- AppSpace/ Workspace
- language related changes
- onbackpress no dialogue box opening for a submitted edit record
- camera resolution and orientation are not mobile screen friendly

image resolution
Finger select for capture
chosen finger visibility in UI
Threshold show in required area of use
button color for all
profile fields should be same as form fields
audio ui is different in the mobile
check menu hierarchy to find app for the openapp macro

- Variable, label fields for inputs in formula
//web
sometimes attr drop down in change attr macro config is not working
photo validator is not hiding on hidden change attr macro perform
inparams edit and submit not happening issue
``` 
Interlinking: [[abcd]]
Heading1: # abcd
Heading2: ## abcd
Tag: #abcd
```

# Icons Required:
- Restore icon: AppDetailsActivity
- Pause/Play icon: Audio/Video Player


## Product flavor explore on android

# Nano : 
- Border Radius: 1px
- Modal Mask Bg Color: rgba(0, 0, 0, 0.4)

# Rhea : 
- Border Radius: 2px
- Modal Mask Bg Color: rgba(0, 0, 0, 0.4)

# Luna Green/ Luna Pink/ Luna Amber/ Luna Blue/ Saga Blue/ Saga Green/ Saga Orange/ Saga Purple: 
- Border Radius: 3px
- Modal Mask Bg Color: rgba(0, 0, 0, 0.4)

# Bootstrap Light Blue/ Bootstrap Light Purple/ Bootstrap Dark Blue/ Bootstrap Dark Purple : 
- Border Radius: 4px
- Modal Mask Bg Color: rgba(0, 0, 0, 0.4)

# Lara Light Indigo/ Lara Light Purple/ Lara Light Teal/ Lara Dark Blue/ Lara Dark Indigo/ Lara Dark Purple/ Lara Dark Teal/ Lara Light Blue 
Arya Blue/ Arya Green/ Arya Orange/ Arya Purple/ Soho Light/ Soho Dark : 
- Border Radius: 6px
- Modal Mask Bg Color: rgba(0, 0, 0, 0.4)


``` xml
//When used mobile oauth client id
<activity  
    android:name=".activity.LoginActivity"  
    android:exported="true"  
    android:theme="@style/NoActionBarTheme"> 
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
            android:scheme="com.example.yourapp"
            android:host="${appAuthRedirectScheme}" />
    </intent-filter>
</activity>

manifestPlaceholders = [  
        appAuthRedirectScheme: "com.example.yourapp"  
]

//Redirect uri
"redirect_uri": "com.example.yourapp:/oauth2redirect",
```

``` xml
//When used web oauth client id
<activity  
    android:name=".activity.LoginActivity"  
    android:exported="true"  
    android:theme="@style/NoActionBarTheme">  
    <intent-filter>        <action android:name="android.intent.action.VIEW" />  
  
        <category android:name="android.intent.category.DEFAULT" />  
        <category android:name="android.intent.category.BROWSABLE" />  
  
        <data            android:host="cloud.appsteer.io"  
            android:path="/services/web/login/secured/redirect/sso"  
            android:scheme="${appAuthRedirectScheme}" />  
    </intent-filter></activity>

manifestPlaceholders = [  
        appAuthRedirectScheme: "https"  
]

//Redirect uri
"redirect_uri": "https://cloud.appsteer.io/services/web/login/secured/redirect/sso",
```
