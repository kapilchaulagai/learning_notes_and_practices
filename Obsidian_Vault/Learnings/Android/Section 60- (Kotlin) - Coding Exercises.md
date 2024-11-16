#HomeAndroid - [[--Contents - Android--]]
482. **Exercise 1**
	- Question: Write a program that gets from the user 2 numbers and  displays their division and remainder.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise1() {  
	    var scanner = Scanner(System.`in`)  
	    print("Please enter a number")  
	    var x = scanner.nextInt()  
	  
	    print("Please enter a second number")  
	    var y = scanner.nextInt()  
	  
	    var divResult = x / y  
	    var remainder = x % y  
	  
	    print("The result is $divResult and the remainder is $remainder.")  
	}
	exercise1()
```

483. **Exercise 2**
	- Question: Write a program that gets from the user radius and print the area and perimeter of a circle.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise2() {  
	    var scanner = Scanner(System.`in`)  
	  
	    print("Please enter the radius ")  
	    var radius = scanner.nextInt()  
	  
	    var perimeter: Double = 2 * Math.PI * radius  
	    var area: Double = radius * radius * Math.PI  
	  
	    print("The area is $area, the perimeter is $perimeter.")  
	}
	exercise2()
```

484. **Exercise 3**
	- Question: Write a program to swap to variables.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise3() {  
	    var a: Int  
	    var b: Int  
	    var temp: Int  
	  
	    print("Enter the two numbers: ")  
	    var scanner = Scanner(System.`in`)  
	  
	    a = scanner.nextInt()  
	    b = scanner.nextInt()  
	  
	    temp = a  
	    a = b  
	    b = temp  
	  
	    print("The value of a: $a and b: $b.")  
	}
	exercise3()
```

485. **Exercise 4**
	- Question: Write a program to count the letters, numbers and other characters of an input string.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise4() {  
	    var scanner = Scanner(System.`in`)  
	    print("Please enter some text: ")  
	    var text = scanner.nextLine()  
	  
	    var charArr = text.toCharArray()  
	    var letter = 0  
	    var space = 0  
	    var num = 0  
	    var others = 0  
	  
	    for (char in charArr) {  
	        if (char.isLetter()) {  
	            letter++  
	        } else if (char.isWhitespace()) {  
	            space++  
	        } else if (char.isDigit()) {  
	            num++  
	        } else {  
	            others++  
	        }  
	    }  
	    print("Letters: $letter\nSpaces: $space\nNumbers: $num\nOthers: $others")  
	}
	exercise4()
```

486. **Exercise 5**
	- Question: Write a program to reverse a string.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise5() {  
	    var scanner = Scanner(System.`in`)  
	    print("Enter a string: \n")  
	  
	    //var letters = scanner.nextLine().toCharArray()  
	    var letters = scanner.nextLine()  
	    print("Reversed String: \n")  
	  
	    /*var reverse = ""  
	    for (i in letters.size - 1 downTo 0) {        
		    reverse += letters[i]    
	    }    
	    print(reverse)*/    
	    //Alternative    
	    print(letters.reversed())  
	}
	exercise5()
```

487. **Exercise 6**
	- Question: Write a program to multiply corresponding elements of two arrays of integers.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise6() {  
	    var arr1 = arrayOf(1, 3, -5, 4)  
	    var arr2 = arrayOf(1, 4, -5, -2)  
	    var result = ""  
	  
	    for (i in arr1.withIndex()) {  
	        result += (arr1[i.index] + arr2[i.index])  
	        result += " "  
	    }  
	    print("Result: " + result)  
	}
	exercise6()
```

488. **Exercise 7**
	- Question: Write a program to count the number of even and odd elements in a given array of integers.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise7() {  
	    var nums = arrayOf(5, 3, 2, 6, 8, 1)  
	    var evenCounter = 0  
	    var oddCounter = 0  
	  
	    for (i in nums) {  
	        if (i % 2 == 0) evenCounter++  
	        else oddCounter++  
	    }  
	    print("Odd Number Count: $oddCounter and Even Number Count: $evenCounter")  
	}
	exercise7()
```

489. **Exercise 8**
	- Question: Write a program that takes 3 numbers from the user and prints the greatest number among them.
	- Code:
``` kotlin
	//Exercises.kt
	private fun exercise8() {  
	    var scanner = Scanner(System.`in`)  
	  
	    print("Enter the first number: ")  
	    var x = scanner.nextInt()  
	  
	    print("Enter the second number: ")  
	    var y = scanner.nextInt()  
	  
	    print("Enter the third number: ")  
	    var z = scanner.nextInt()  
	  
	    if (x > y) {  
	        if (x > z) {  
	            print("$x is the greatest.")  
	        }  
	    }  
	  
	    if (y > x) {  
	        if (y > z) {  
	            print("$y is the greatest.")  
	        }  
	    }  
	  
	    if (z > x) {  
	        if (z > y) {  
	            print("$z is the greatest.")  
	        }  
	    }  
	}
	exercise8()
```