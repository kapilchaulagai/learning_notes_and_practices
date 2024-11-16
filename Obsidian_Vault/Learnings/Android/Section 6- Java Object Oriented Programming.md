#HomeAndroid - [[--Contents - Android--]]
36. **Methods**
	- User-defined Methods
	- Standard Library Methods

37. **Returning Type of Methods**
	- Data Type
	- Void

38. **Methods Parameters**
	- Data Type and Variable Name

39. **Method Overloading**
	- Same method name with different parameters/ different return type

**Coding Exercise 8: Functions**

**Coding Exercise 9: Area of Rectangle**

**Coding Exercise 10: Finding Max Value of an Array**

40. **Classes**
	- Object: An instance of a class.
	- Class: Is a template or blueprint.
	- Fields/States/Attributes/Properties : Store Data
	- Methods/Functionalities/Behavior : Perform Operations

41. **Objects**
	- Example:
		`ClassName className = new ClassName();`

42. **Constructor**
	- Example:
		`public ClassName(){}`

43. **Modifiers**
	- public: Access from any other classes of any other package.
	- private: Access with in the same class.
	- protected: Access from any other classes or subclasses of the same package.
	- default: Access from any other classes of the same package.

44. **Encapsulation**
	- private properties
	- public setters and getters

45. **Inheritance**
	- Child Class extends Parent Class

46. **this**
	- Refers to current instance of the class.

47. **Method Overriding**
	- Same Method with same name, return type and parameters in the parent class will be overridden by child class.
	- We cannot override static and final methods.

48. **Polymorphism**
	- Example:
	``` java
	//Vehicle has child classes: Car and Truck.
	Vehicle car = new Car();
	Vehicle truck = new Truck();
	
	car.start(); //The Car Starts...
	truck.start(); //The Truck Starts..
	```
49. **Abstraction**
	- Hide unnecessary details.
	- To make abstract class, use `abstract` keyword after the class access modifier.
	- Abstract classes can have abstract methods.
	- The classes implementing or extending abstract classes must implement the abstract methods in it.

50. **Interfaces**
	- Architecture that a class must follow.

51. **Abstraction Example - Using Interfaces**
