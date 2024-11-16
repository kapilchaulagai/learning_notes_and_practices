#HomeAndroid - [[--Contents - Android--]]
425. **Installing Android Studio + SDK**
	- SDK stands for Software Development Kit.
	- In the context of Android app development, the Android SDK is a collection of software tools, libraries, and resources that developers use to build, test, and deploy Android applications.

427. **Android Virtual Devices + SDK**

428. **Creating Hello World App**
	- Initial stage of an app:
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
	  
	    <TextView        android:layout_width="wrap_content"  
	        android:layout_height="wrap_content"  
	        android:text="Hello World!"  
	        app:layout_constraintBottom_toBottomOf="parent"  
	        app:layout_constraintEnd_toEndOf="parent"  
	        app:layout_constraintStart_toStartOf="parent"  
	        app:layout_constraintTop_toTopOf="parent" />  
	  
	</androidx.constraintlayout.widget.ConstraintLayout>
```
``` kotlin
	//MainActivity.kt
	package com.practice.helloandroid  
	  
	import android.os.Bundle  
	import androidx.activity.enableEdgeToEdge  
	import androidx.appcompat.app.AppCompatActivity  
	import androidx.core.view.ViewCompat  
	import androidx.core.view.WindowInsetsCompat  
	  
	class MainActivity : AppCompatActivity() {  
	    override fun onCreate(savedInstanceState: Bundle?) {  
	        super.onCreate(savedInstanceState)  
	        enableEdgeToEdge()  
	        setContentView(R.layout.activity_main)  
	        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->  
	            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())  
	            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)  
	            insets  
	        }  
	    }  
	}
```
``` kotlin dsl
	//build.gradle.kts (app-level)
	plugins {  
	    alias(libs.plugins.android.application)  
	    alias(libs.plugins.jetbrains.kotlin.android)  
	}  
	  
	android {  
	    namespace = "com.practice.helloandroid"  
	    compileSdk = 34  
	  
	    defaultConfig {  
	        applicationId = "com.practice.helloandroid"  
	        minSdk = 25  
	        targetSdk = 34  
	        versionCode = 1  
	        versionName = "1.0"  
	  
	        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"  
	    }  
	  
	    buildTypes {  
	        release {  
	            isMinifyEnabled = false  
	            proguardFiles(  
	                getDefaultProguardFile("proguard-android-optimize.txt"),  
	                "proguard-rules.pro"  
	            )  
	        }  
	    }    compileOptions {  
	        sourceCompatibility = JavaVersion.VERSION_1_8  
	        targetCompatibility = JavaVersion.VERSION_1_8  
	    }  
	    kotlinOptions {  
	        jvmTarget = "1.8"  
	    }  
	}  
	  
	dependencies {  
	  
	    implementation(libs.androidx.core.ktx)  
	    implementation(libs.androidx.appcompat)  
	    implementation(libs.material)  
	    implementation(libs.androidx.activity)  
	    implementation(libs.androidx.constraintlayout)  
	    testImplementation(libs.junit)  
	    androidTestImplementation(libs.androidx.junit)  
	    androidTestImplementation(libs.androidx.espresso.core)  
	}
```