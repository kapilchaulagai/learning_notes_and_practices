#HomeAndroid - [[--Contents - Android--]]
450. **Functions & Parameters**
	- In Kotlin, functions are blocks of code that encapsulate a specific task or functionality.
	- Functions are a fundamental building block of any Kotlin program, and they allow you to organize your code into reusable and modular components.
	- You can create functions to perform various tasks, and you can define functions with parameters and return values.
	- To declare a function in Kotlin, you use the fun keyword followed by the function name, a list of parameters enclosed in parentheses, a colon, and the return type.
	- Example:
``` kotlin
	//Functions : are blocks of code that encapsulates a specific  
	//task or functionality  
	  
	//Function Declaration:  
	/*fun functionName(param1: Type, param2: Type): ReturnType{  
	* Function Body  
	* Perform Some Operations  
	* Optionally return a value  
	* }*/
	//HelloKotlin.kt
	fun sayHello(name: String, age: String = "Not Specified!") {  
	    println("Hello $name, your age is $age")  
	    //Hello Jack, your age is Not Specified!  
	}
	sayHello("Jack")
```

451. **Return Type of Functions**
	- The return type of a function in Kotlin specifies the type of a value that the function will return after it completes its operation.
	- In Kotlin, a function can have a return type which is indicated after a colon in the function declaration.
	- Example:
``` kotlin
	//HelloKotlin.kt
	//Function with return type  
	fun sumTwoNumbers(x: Int, y: Int): Int {  
	    var z = x + y  
	    return z  
	}
	var sumResult = sumTwoNumbers(x, y)  
	println(sumResult)
```

452. **Function Overloading**
	- Function Overloading in Kotlin allows you to define multiple functions with the same name, in the same scope, but with different parameter lists.
	- The functions can have different numbers or types of parameters.
	- Example:
``` kotlin
	//HelloKotlin.kt
	//Function overloading: allows you define multiple functions  
	//with the same name in the same scope but with diff. parameters  
	fun sumTwoNumbers(x: Double, y: Double): Double {  
	    var z = x + y  
	    return z  
	}
	var sumDoubleResult = sumTwoNumbers(2.44, 3.9)  
	println(sumDoubleResult)
```

453. **What's OOP?**
	- OOP stands for Object oriented Programming.
	- Procedural programming is about writing procedures or methods that perform operations on data, while object oriented programming is about creating objects that contain both data and methods.
	- Object oriented programming has several advantages over procedural programming or is faster and easier to execute.
	- OOP provides a clear structure for the programs. OOP helps to keep the Kotlin code dry.
	- Don't repeat yourself and makes the code easier to maintain, modify, and debug.
	- OOP makes it possible to create full reusable applications with less code and shorter, shorter development time. ![[android_oops.png]]

454. **Classes**
	- A class is a blueprint that defines the properties and behaviors of objects.
	- It encapsulates data and functions that operate on the data. So a class is a blueprint for creating your objects.
	- Example:
``` kotlin
	//Robot.kt
	package com.practice.kotlinbasics  
  
	class Robot(private val name: String) {  
	    fun walk() {  
	        println("The Robot is Walking Now...")  
	    }  
	  
	    fun speak(message: String) {  
	        println("$name says: $message")  
	    }  
	}
```

455. **Objects**
	- Objects are created following the same blueprint which we called as class.
	- Example:
``` kotlin
	//HelloKotlin.kt
	fun callRobot(){  
	    val robot1: Robot = Robot("Buddy")  
	    robot1.walk()  
	    robot1.speak("hello")  
	  
	    val robot2 = Robot("Max")  
	    robot2.walk()  
	    robot2.speak("hii")  
	}
	callRobot();
```

456. **Primary Constructor**
	- The primary constructor is the main way to define and initialize properties of a class. 
	- It's defined directly in the class header following the class name.
	- The primary constructor allows you to define properties that are part of the class, and initialize them when creating objects of that class.
	- Example:
``` kotlin
	//Robot.kt
	//The Primary Constructor: define and initialize properties for a class  
	//Eg, class MyClass(param1: Type, param2:Type){}  
	class Robot(private val name: String) {  
	    fun walk() {  
	        println("The Robot is Walking Now...")  
	    }  
	  
	    fun speak(message: String) {  
	        println("$name says: $message")  
	    }  
	}
```

457. **What's Inheritance?**
	- Inheritance is a fundamental concept in object oriented programming, and it allows one class to inherit the properties and behaviors of another class. ![[android_inheritance1.png]] ![[android_inheritance2.png]]

458. **Inheritance Example**
	- Example:
``` kotlin
	//GeneralRobot.kt (parent class)
	package com.practice.kotlinbasics  
	  
	open class GeneralRobot(private val name: String) {  
	    fun walk() {  
	        println("The Robot is Walking Now...")  
	    }  
	  
	    fun speak(message: String) {  
	        println("$name says: $message")  
	    }  
	}
	
	//OrdinaryRobot.kt (child-1)
	package com.practice.kotlinbasics  
	  
	class OrdinaryRobot(name: String): GeneralRobot(name) {  
	    fun turnOnLight(){  
	        println("The light is turned on!")  
	    }  
	}
	
	//SuperRobot.kt (child-2)
	package com.practice.kotlinbasics  
	  
	class SuperRobot(name: String): GeneralRobot(name) {  
	    fun cleanHouse(){  
	        println("The robot is cleaning the house.")  
	    }  
	}
	
	//FiringRobot.kt (child-3)
	package com.practice.kotlinbasics  
	  
	class FiringRobot(name: String): GeneralRobot(name) {  
	    fun fire(){  
	        println("Firing...")  
	    }  
	}
```

459. **Open Keyword**
	- In Kotlin, the open keyword is used to declare a class, function, or property as open for extension.
	- When you mark a class function or property with the open keyword, it means that it can be subclassed or inherited or overridden by other classes or functions in other parts of your code.
	- This is a way of explicitly allowing other parts of your code base to extend or customize the behavior of the mark entity.
	- Example:
``` kotlin
	//HelloKotlin.kt
	//Creating Objects from Robot class  
	val ordinaryRobot = OrdinaryRobot("Max")  
	ordinaryRobot.walk()  
	  
	val superRobot = SuperRobot("Buddy")  
	superRobot.cleanHouse()  
	  
	val firingRobot = FiringRobot("FireRobot")  
	firingRobot.fire()
```

460. **init & Secondary Constructors**
	- **Init**: 
		- The init block is a special initialization block that is used to execute code when an instance of a class is created, it's often used to perform additional setup or initialization for properties in a class.
		- The init block is executed after the primary constructor, and any secondary constructors, (if they exist,) have been called.
	- **Secondary Constructor**:
		- Secondary constructors in Kotlin are additional constructors that can you define in a class to provide alternative ways to create instances of that class.
		- Unlike the primary constructor which is declared in a class header, secondary constructors are defined using the constructor keyword within the class body.
		- Secondary constructors allow you to initialize class properties and perform custom initialization logic when creating objects.
		- Example:
		``` kotlin
			//GeneralRobot.kt (parent class)
		package com.practice.kotlinbasics  
		
		//Primary Constructor
		open class GeneralRobot() {  
		    private var name: String  
		    private var modelYear: String  
		  
		    //init block: used to execute code when an instance of a class is created  
		    init {  
		        this.name = ""  
		        this.modelYear = ""  
		        println("A new Robot is created.")  
		    }  
		  
		    //Secondary Constructors:  
		    //Initialize objects    
		    //Provide sets of parameters    
		    constructor(name: String, modelYear: String) : this() {  
		        this.name = name  
		        this.modelYear = modelYear  
		    }  
		  
		    constructor(name: String) : this() {  
		        this.name = name  
		        this.modelYear = "Unknown Model Year"  
		    }  
		  
		    fun walk() {  
		        println("The Robot is Walking Now...")  
		    }  
		  
		    fun speak(message: String) {  
		        println("$name says: $message")  
		    }  
		}
	
	//OrdinaryRobot.kt (child-1)
	package com.practice.kotlinbasics  
	  
	class OrdinaryRobot : GeneralRobot {  
	    constructor(name: String, modelYear: String) : super(name, modelYear)  
	    constructor(name: String) : super(name)  
	  
	    fun turnOnLight() {  
	        println("The light is turned on!")  
	    }  
	}
	
	//SuperRobot.kt (child-2)
	package com.practice.kotlinbasics  
	  
	class SuperRobot : GeneralRobot {  
	    constructor(name: String, modelYear: String) : super(name, modelYear)  
	    constructor(name: String) : super(name)  
	  
	    fun cleanHouse() {  
	        println("The robot is cleaning the house.")  
	    }  
	}
	
	//FiringRobot.kt (child-3)
	package com.practice.kotlinbasics  
	  
	class FiringRobot : GeneralRobot {  
	    constructor(name: String, modelYear: String) : super(name, modelYear)  
	    constructor(name: String) : super(name)  
	  
	    fun fire() {  
	        println("Firing...")  
	    }  
	}
		```

461. **Primary vs Secondary Constructors**
	- In Kotlin, you can define a class with secondary constructors without a primary constructor. 
	- While it's common to have a primary constructor and use secondary constructors for additional flexibility. 
	- It's entirely possible to rely solely on secondary constructors if that fits your design requirements.
	- Example:
``` kotlin
	//GeneralRobot.kt (without primary constructor)
	package com.practice.kotlinbasics  
	  
	open class GeneralRobot {  
	    private var name: String  
	    private var modelYear: String  
	  
	    //init block: used to execute code when an instance of a class is created  
	    init {  
	        this.name = ""  
	        this.modelYear = ""  
	        println("A new Robot is created.")  
	    }  
	  
	    //Secondary Constructors:  
	    //Initialize objects    
	    //Provide sets of parameters    
	    constructor(name: String, modelYear: String) {  
	        this.name = name  
	        this.modelYear = modelYear  
	    }  
	  
	    constructor(name: String) {  
	        this.name = name  
	        this.modelYear = "Unknown Model Year"  
	    }  
	  
	    fun walk() {  
	        println("The Robot is Walking Now...")  
	    }  
	  
	    fun speak(message: String) {  
	        println("$name says: $message")  
	    }  
	}
```

462. **Super Keyword**
	- The super keyword is used to call the constructor of the super class, passing the specified arguments.
	- This is often necessary when a subclass wants to inherit and reuse the initialization logic of the super class.

463. **Getters & Setters**
	- Example:
``` kotlin
	//GeneralRobot.kt
	package com.practice.kotlinbasics  
	  
	open class GeneralRobot {  
	    private var name: String  
	    var modelYear: String = ""  
	        //Getters and Setters  
	        //custom getter        
	        get() {  
	            println("Getting the model year, Please wait..")  
	            return field  
	        }  
	        //custom setter  
	        set(value) {  
	            println("Changing the year, Please wait...")  
	            if (value == "2025") {  
	                println("You can't create future robots.")  
	            } else {  
	                field = value  
	            }  
	        }  
	  
	    //init block: used to execute code when an instance of a class is created  
	    init {  
	        this.name = ""  
	        this.modelYear = ""  
	        println("A new Robot is created.")  
	    }  
	  
	    //Secondary Constructors:  
	    //Initialize objects    
	    //Provide sets of parameters    
	    constructor(name: String, modelYear: String) {  
	        this.name = name  
	        this.modelYear = modelYear  
	    }  
	  
	    constructor(name: String) {  
	        this.name = name  
	        this.modelYear = "Unknown Model Year"  
	    }  
	  
	    fun walk() {  
	        println("The Robot is Walking Now...")  
	    }  
	  
	    fun speak(message: String) {  
	        println("$name says: $message")  
	    }  
	}
	
	//HelloKotlin.kt
	val firingRobot2 = FiringRobot("Dude", "2029")  
	firingRobot2.speak("hey dude")  
	  
	//custom setter  
	firingRobot2.modelYear = "2024"  
	  
	//custom getter  
	println(firingRobot2.modelYear)
```

464. **Visibility Modifiers**
	- **public (default)**:This is the default visibility modifier, and it means that the element is visible everywhere, both inside and outside the current model.
	- **private**: Private are only visible within the file or class where they are declared. They are not accessible from other classes or files.
	- **protected**: Protected elements marked as protected are visible within the current class and its subclasses. The inheritance, but not outside.
	- **internal**: The internal elements marked as internal are visible within the same module. A module is a set of Kotlin files that are compiled together.

465. **Abstract Class**
	- Abstract classes are classes that can't be instantiated on their own and are typically meant to be subclassed.
	- Abstract functions are functions declared in an abstract class that don't have an implementation in the abstract class, but must be implemented in subclass.

466. **Interfaces**
	- An interface is a blueprint for a set of functions or properties that a class must implement.
	- An interface defines a contract specifying which methods and properties a class implementing the interface must provide.
	- Classes can implement one or more interfaces, allowing them to exhibit the behavior specified by those interfaces.
	- Example:
``` kotlin
	//RobotActions.kt (interface)
	package com.practice.kotlinbasics  
	  
	interface RobotActions {  
	    fun start()  
	    fun stop()  
	}
```