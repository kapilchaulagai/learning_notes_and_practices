#HomeAndroid - [[--Contents - Android--]]
474. **Literals in Kotlin**
	- Literals are representations of constant values in your source code.
	- They are used to define values directly in your code without the need of explicit expressions or calculations.
	- Kotlin supports various types of literals for different data types. For example, integer literals are used to represent whole numbers, floating point literals are used to represent real numbers with a decimal point or in scientific notation, string literals are used to represent sequences of characters enclosed in double quotes.
	- Literals are used to initialize variables, constants, and properties in your Kotlin code, and they make your code more readable and self-explanatory.
	- Depending on the data type, you can use the appropriate literal representation in your code to define values.
	- **Function Literals:**
		- Function literals, also known as lambda expressions or anonymous functions, are a fundamental concept in Kotlin that allows you to define small inline functions without the need for a separate function declaration.
		- Function literals are often used as arguments to higher order functions, allowing you to pass behavior as parameter, allowing you to pass functions as parameters.
		- They are concise and flexible, making your code more readable and expressive.
		- Function literals in Kotlin are versatile and commonly used with higher order functions like map, filter, reduce, and for each functions where you can pass the lambda expression to customize the behavior of the function, they simplify code, make it more concise, and encourage a functional programming style.
	![[android_function_literals.png]]

475. **Syntax of Lambda Expressions**
	![[android_lambda1.png]] ![[android_lambda2.png]] ![[android_lambda3.png]]

476. **Basic Lambda Expressions**
	- Lambda expressions in Kotlin are a concise way to define anonymous functions.
	- They are often used for passing functions as arguments, defining small inline functions and making code more readable and expressive.
	- Example:
``` kotlin
	//HelloLambda.kt
	fun main() {  
	    /*Lambda Expressions:  
	    * concise way to define anonymous fun.*/  
	    //Basic Lambda Expression: {parameters -> body}    
	    val add: (Int, Int) -> Int = { a, b -> a + b }  
	    val result: Int = add.invoke(5, 3)  
	    println(result)  
	}
```

477. **Types of Lambda Expressions**
	- Depending on parameters and return type, we have four lambda expression types.
		1. With parameters and return type
		2. With parameters and no return value
		3. No parameters, but with return value
		4. No parameters and no return value.
	- Example:
``` kotlin
	//HelloLambda.kt
	//Types of Lambda Expressions:  
	//1- With Parameters and Return Type  
	val add1: (Int, Int) -> Int = { a, b -> a + b }  
	val result: Int = add1.invoke(5, 3)  
	println("Param & Return: " + result)  
	  
	//2- With Parameters & No Return Value  
	val add2: (Int, Int) -> Unit = { a, b -> println("Param & No return: " + (a + b)) }  
	add2(3, 6)  
	  
	//3- No Parameters But with Return Value  
	val add3: () -> String = { "My name is Kapil Chaulagai." }  
	println("No param but return: " + add3.invoke())  
	  
	//4- No Parameter & No Return Value  
	val add4: () -> Unit = { println("No param & No return: Finish!") }  
	add4()  
	  
	//Direct use of lambda expressions  
	println("Direct Use: " + { a: Int, b: Int -> a * b }(4, 5))
```

478. **Anonymous Functions**
	- Anonymous functions are a way to define a function without giving it a name.
	- They are often used for creating small, one off functions that are passed as arguments to other functions, or used in local scope.
	- Anonymous functions are similar to lambda expressions, but they allow you to specify the return type explicitly, whereas lambda expressions often infer the return type from the context. ![[android_anonymous_fun1.png]] ![[android_anonymous_fun2.png]]
	- Example:
``` kotlin
	//HelloLambda.kt
	/*Anonymous Function: a function without a name  
	* val anonymousFunction = fun(parameters): ReturnType{  
	*               Function Body  
	*               Return Statement if needed  
	* }  
	* */  
	val numbers = listOf(1, 2, 3, 4, 5)  
	  
	//An anonymous Function that squares a number  
	val squareAnomFun = fun(x: Int): Int {  
	    return x * x  
	}  
	  
	val squaredNumbers = numbers.map(squareAnomFun)  
	println(squaredNumbers)
```

479. **Types of Anonymous Functions**
	- Depending on parameters and return type, we have four anonymous function types.
		1. With parameters and return type
		2. With parameters and no return value
		3. No parameters, but with return value
		4. No parameters and no return value.
	- Example:
``` kotlin
	//HelloLambda.kt
	//Types of Anonymous Function:  
	//1- With Parameters and Return Type  
	val multiply1 = fun(a: Int, b: Int): Int { return a * b }  
	println("Anom Fun with param and return: " + multiply1(4, 7))  
	  
	//2- With Parameters & No Return Value  
	val multiply2 = fun(a: Int, b: Int) { println("Anom Fun with param but no return: " + a * b) }  
	multiply2.invoke(4, 2)  
	  
	//3- No Parameters But with Return Value  
	val multiply3 = fun(): Int { return 4 * 7 }  
	println("Anom Fun with no param but with return: " + multiply3())  
	  
	//4- No Parameter & No Return Value  
	val multiply4 = fun() { println("Anom fun with no param and no return: Hey Kapil!") }  
	multiply4.invoke()
```

480. **Higher Order Functions**
	- Higher order functions are a fundamental concept in functional programming and are also supported in many modern programming languages, including Kotlin.
	- A higher order function is a function that accepts one or more functions as parameters, or it can return a function as its result. 
	- These functions are often referred to as function parameters or function arguments. This is sometimes called function composition.
	- Essentially, it treats functions as first class citizen just like any other data type.
	- Higher order functions are valuable because they enable you to write more reusable and modular code.
	- They allow you to abstract away common patterns and behavior, making your code more concise and easier to maintain. ![[android_higher_order_fun.png]]
	- Example:
``` kotlin
	//HelloLambda.kt
	/*Higher-Order Functions:  
	* accept one or more functions as parameters  
	* can return a function as its result*/  
	  
	fun operateOnNumbers(a: Int, b: Int, operation: (Int, Int) -> Int): Int {  
	    return operation(a, b)  
	}
	val addResult = operateOnNumbers(5, 3) { x, y -> x + y }  
	val multiplyResult = operateOnNumbers(4, 7) { x, y -> x * y }  
	println("Addition Result: $addResult")  
	println("Multiplication Result: $multiplyResult")
```

481. **It Keyword**
	- The "it" keyword in Kotlin is a special implicit name for a single parameter in a lambda expression or anonymous function when that lambda or function takes only one parameter.
	- It's a shorthand notation that allows you to simplify your code when you have a lambda with a single parameter and you don't want to explicitly declare a parameter name, instead, you can use "it" to refer to that parameter.
	- Example:
``` kotlin
	//HelloLambda.kt
	/*"it" keyword:  
	* implicit name for a single parameter in a lambda  
	* expression or anonymous function when that lambda  
	* or fun takes only one parameter*/  
	val numbersIt = listOf(1, 2, 3, 4, 5)  
	  
	//Using Lambda Expressions to square every number  
	val squaredNumbs = numbersIt.map { x: Int -> x * x }  
	println(squaredNumbs)  
	  
	//Using anonymous function to square every number  
	val squaredNumbsAnom = fun(x: Int): Int {  
	    return x * x  
	}  
	println(numbersIt.map(squaredNumbsAnom))  
	  
	//Using "it" keyword  
	val squaredNumbsWithIt = numbersIt.map { it * it }  
	println(squaredNumbsWithIt)  
	  
	//Getting the even numbers from the list  
	val evenNumbers = numbersIt.filter { it % 2 == 0 }  
	println(evenNumbers)
```