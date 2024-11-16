#HomeAndroid - [[--Contents - Android--]]
433. **Running Kotlin Projects in Android Studio**

434. **Kotlin Syntax**
	- **fun** : This keyword is short for function. It's used to declare a function in Kotlin.
	- main(): Main is the name of the function in many programming languages, including Kotlin.
		- Main is a conventional name for the function that serves as the program's entry point.
		- These parentheses are used to enclose the function parameters.
	- Example:
``` kotlin
	//HelloKotlin.kt
	package com.practice.kotlinbasics  
	  
	fun main(){  
	    println("Hello My Friends")  
	}
```

436. **Output**
	- The console typically refers to the place where the standard output and error messages of your Kotlin program are displayed when you run it.
	- These messages are essential for debugging and monitoring the behavior of your application.
	- You can view the console output in the Run or Debug tabs at the bottom of the Android Studio window.
	- Run for the console output and look at when we deal with applications and later on when we start creating
	- Android application, we'll use the Logcat.

438. **Comments**
``` kotlin
	//Single-line comments  
	/*Multi  
	* line  
	* comments*/
```

440. **Variables**
	- In Kotlin, a variable is a named storage location in which you can store and manipulate data variables can hold different types of information such as numbers, text, or more complex objects.
	- To create a variable in Kotlin, you need to specify its type, give it a name, and optionally assign an initial value.
	1. Step 1: The first step in creating a variable is the variable declaration.
		- You declare a variable using var or val keyword, followed by the variable name and its type.
		- You declare a variable using the var or val keyword, followed by the variable name and its type.
		- The var keyword is used to declare a mutable variable, one that can change its value, and the val is used for an immutable variable, one that can't change its value.
	2. Step 2: The second step in creating the variables is to specify the type of this variable.
		- It's named as type inference. In many cases, you can let Kotlin automatically infer the variable's type based on the assigned value, so you don't need to specify it explicitly. This is known as type inference.
	3. Step 3: The third step in creating the variables is to assign the values to this variable.
		- You can change the value of a mutable variable using the assignment operator. However, you can't change the value of an immutable variable.
	- Example:
``` kotlin
	//HelloKotlin.kt
	/*Steps to  Create Variables:  
	* -Variable Declaration  
	* -Type Inference  
	* -Assigning Values*/  
	  
	//Mutable Variable  
	var myAge: Int = 25  
	  
	//Immutable Variable  
	val pi: Double = 3.14159  
	  
	//Type Inference  
	var myRealAge = 24  
	  
	println("My age is: "+myAge)
```

442. **Data Types**
	- In Kotlin, data types can be categorized into two main groups primitive data types and non primitive data types.
	- Primitive - 8
	- Non-Primitive - (> 4)

444. **Numbers**
	- Byte: -128 --> 127
	- Short: -32,768 --> 32,767
	- Int: -2147483648 --> 2147483647
	- Long: -9223372036854775808 --> 9223372036854775807
	
445. **Decimals**
	- Float (32 bit)
	- Double (64 bit)

447. **Boolean**
	- Boolean

449. **Characters**
	- Char

451. **Operators**
	- Arithmetic Operators: + - * / %
	- Logical Operators: && || !
	- Assignment Operators: = += -= *= /= %=
	- Relational Operators: == != > < >= <=

453. **Strings**
	- Strings are sequences of characters that are used to represent text.
	- String Concatenation
	- String Templates
	- String Interpolation
	- Kotlin's string class provides various functions and properties for working with strings. Some commonly used ones include.
		- length
		- isEmpty()
		- isBlank()
		- uppercase()
		- lowercase()
		- substring() and so on.
	- String Comparison
	- String Literals

455. **Conditional Statements**
	- **if**: The if statement is used to execute a block of code only if a given condition is true.
	- **if-else**: The if statement is used to execute a block of code only if a given condition is true. If not, else block of code is executed.
	- **when expression**: The when expression is similar to a switch statement in other programming languages. It allows you to evaluate a value against multiple possible cases and execute the code block corresponding to the first matching case.
	- **nested conditionals**: Conditions inside the condition.

457. **Loops - (For, While, Do While Loops)**
	- **for loop**: The for loop is used to iterate over a range, a collection, or a sequence of elements. It has a defined starting and ending point.
	- **while loop**: The while loop repeats a block of code as long as a specified condition is true.
	- **do-while loop**: The do while loop is similar to the while loop, but it guarantees that the loop body is executed at least once because the condition is checked after the loop body.
	
458. **Break and Continue**
	- **break**: It terminates the loop and transfers control to the statement following the loop.
	- **continue**: It skips the current iteration and proceeds to the next iteration of the loop.

460. **Arrays**
	- Array is a collection of elements of the same data type organized in a specific order and accessed by an index.

462. **Ranges**
	- **Closed Range**: A closed range is defined using the two dots operator. It includes both the start and end values.
	- **Half-Open Range**: A half open range is defined using the until function or the two dot operators in combination with the exclude end function. It includes the start value, but excludes the end value.

- **Examples**
``` kotlin
	package com.practice.kotlinbasics  
	  
	fun main() {  
	    //Single-line comments  
	    /*Multi    
	    * line    
	    * comments*/    
	    println("Hello My Friends")  
	  
	    /*Steps to  Create Variables:  
	    * -Variable Declaration    
	    * -Type Inference    
	    * -Assigning Values*/  
	    //Mutable Variable    
	    var myAge: Int = 25  
	  
	    //Immutable Variable  
	    val pi: Double = 3.14159  
	  
	    //Type Inference  
	    var myRealAge = 24  
	  
	    println("My age is: " + myAge)  
	  
	    /*Kotlin provides several integer data types with  
	    * varying sizes.    
	    * */  
	    //Byte: -128 to 127    
	    val myByte: Byte = 127  
	  
	    //Short: -32786 to 32767  
	    val myShort: Short = 5473  
	  
	    //Int: -2147483648 to 2147483647  
	    val myInt: Int = 478595  
	  
	    //Long: -9223372036854775808 to 9223372036854775807  
	    val myLong: Long = 883543454353  
	  
	    //Float: Store values with fractional parts  
	    val myFloat: Float = 3.123214f  
	  
	    //Long: Store values with greater precision  
	    val myDouble: Double = 2.345345435435324  
	  
	    //Boolean: True or False?  
	    val isRaining: Boolean = false  
	    if (isRaining) {  
	        println("It's raining outside.")  
	    }  
	  
	    //Characters: represent single characters..  
	    //(Letter, Digit, Symbol or Special Characters..)    
	    var myChar: Char = '\n'  
	  
	    //Arithmetic Operators: + - * / %  
	    val result1: Int = 5 - 3  
	    println("Result: " + result1)  
	  
	    //Logical Operators: && || !  
	    val result2: Boolean = true && true  
	    println("Result: " + result2)  
	  
	    //Assignment Operators: = += -= *= /= %=  
	    //Relational Operators: == != > < >= <= 
	     
	    /*Strings are sequences of characters that are used    
	    * to represent text.*/  
	    //String Declaration    
	    val text1: String = "Hello My Friends."  
	    val text2: String = " Welcome Back!"  
	  
	    //String Concatenation  
	    val text3 = text1 + text2  
	    println("The full text: " + text3)  
	  
	    //String Templates  
	    val name = "Jack"  
	    val age = 30  
	    val info = "My name is $name and I am $age years old."    println(info)  
	  
	    //String Interpolation  
	    val x = 5  
	    val y = 3  
	    val result = "The sum of $x and $y is ${x + y}."  
	    println(result)  
	  
	    //String Functions and Properties  
	    val text = "Welcome to our course."  
	    val length = text.length  
	    val subText = text.substring(0, 7)  
	    println("Length: " + length)  
	    println("SubString: " + subText)  
	  
	    //String Comparison  
	    val str1 = "Hello"  
	    val str2 = "Hello"  
	    val comparisonResult = str1.equals(str2);  
	    println("String Comparison Result: " + comparisonResult)  
	  
	    //String Literals  
	    val newLineText = "This is the first line\nThis is the second line"  
	    println(newLineText)  
	  
	    //if statement  
	    val ageVal = 30  
	    if (age > 18) {  
	        println("You are an adult.")  
	    }  
	  
	    //if-else statement  
	    val score = 85  
	    if (score >= 60) {  
	        println("Pass")  
	    } else {  
	        println("Fail")  
	    }  
	  
	    //when Expression  
	    val day = 3  
	    when (day) {  
	        1 -> println("Monday")  
	        2 -> println("Tuesday")  
	        3 -> println("Wednesday")  
	        else -> println("Unknown day")  
	    }  
	  
	    //Nested Conditionals  
	    val isRainingOut = true  
	    val isCold = false  
	  
	    if (isRainingOut) {  
	        if (isCold) {  
	            println("Use Umbrella and Coat")  
	        } else {  
	            println("Use Umbrella Only")  
	        }  
	    } else {  
	        println("No need for an Umbrella")  
	    }  
	  
	    //Loops: used to repeat a block of code multiple times  
	    //for loop: defined starting and ending points    
	    for (i in 1..5) {  
	        println(i)  
	    }  
	  
	    //while loop: repeats a block of code as long as  
	    // a specified condition is 'true'    
	    var count = 0;  
	    while (count < 5) {  
	        println("Count : $count")  
	        count++  
	    }  
	  
	    //do-while loop: it guarantees that the loop body is  
	    //executed at least once because the condition is checked   
	    //after the loop body    
	    var xVal = 1  
	    do {  
	        println("This will be printed at least once..")  
	    } while (xVal < 0)  
	  
	    //break: terminates the loop and transfers control to the   
	    //statement following the loop    
	    //continue: skips the current iteration and proceeds to the 
	    //next iteration of the loop    
	    for (i in 1..10) {  
	        if (i == 5) {  
	            break  
	        }  
	        println(i)  
	    }  
	  
	    for (i in 1..10) {  
	        if (i % 2 == 0) {  
	            continue  
	        }  
	        println(i)  
	    }  
	  
	    //Array: is a collection of elements of the same data type  
	    //organized in a specific order and accessed by an index.
	    //Array Declaration    
	    val osNames = arrayOf("Windows", "Android", "MacOS", "Linux")  
	  
	    //Accessing Elements  
	    val firstElement = osNames[0]  
	    println(firstElement)  
	  
	    //Modifying Elements  
	    osNames[1] = "iOS"  
	    println(osNames[1])  
	  
	    //Array Size  
	    val size = osNames.size  
	    println("The size of this array is $size.")  
	  
	    //Iterating through an array  
	    for (nameOs in osNames) {  
	        println(nameOs)  
	    }  
	  
	    //Iterating using forEach  
	    osNames.forEach { osName -> println(osName) }  
	  
	    //Range: interval between 2 values  
	    //Closed Range    
	    val closedRange = 1..5 //1 2 3 4 5  
	  
	    //Half-Open Range    
	    val halfOpenRange = 1 until 5 //1 2 3 4  
	  
	    //Iterating through a specific range    
	    for (i in halfOpenRange) {  
	        println(i)  
	    }  
	}
```