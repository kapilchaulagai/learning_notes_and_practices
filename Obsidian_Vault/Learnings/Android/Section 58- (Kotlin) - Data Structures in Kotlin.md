#HomeAndroid - [[--Contents - Android--]]
467. **Collections in Kotlin**
	- Collections in Kotlin are part of the Kotlin Standard library and are designed to be concise and efficient.
	- Kotlin's collection framework can be categorized into two main types immutable collections and immutable collections.
	- Immutable collections are read only collections, meaning that their elements cannot be modified after they are created.
	- They are designed for situations where you need to ensure that the data remains unchanged.
	- Some common immutable collection types in Kotlin includes list, set and map.
	- While mutable collections are collections that can be modified after creation.
	- You can add, remove, or update elements in these collections.
	- Some common mutable collection types in Kotlin include mutable list, mutable set, and mutable map. ![[android_collection.png]]

468. **Immutable List**
	- **List**: Ordered collection in which we can access elements by using indices that define a position for each element.
	- **Immutable**: read-only list.

469. **Mutable List**
	- **Mutable List**: Supports both read and write functionalities.
	- Also, you can create immutable lists with `arrayListOf()` functions.

470. **Immutable Set**
	- **Set**: It is a collection of unordered unique elements  (No Duplicate Elements).
	- An immutable set in Kotlin is a collection of unique elements that cannot be modified after it's created.
	- Immutable sets ensure that their contents remain constant and they do not allow duplicate elements.
	- You can use immutable sets when you need to store a fixed set of distinct elements, and you want to prevent any changes to that set elements.
	- Immutable sets are created using the `setOf()` or `setOfNotNull()` functions.

471. **Mutable Set**
	- A mutable set is a collection that allows you to modify its elements after it's created.
	- Mutable sets are used to store a collection of unique elements, and you can add, remove, and modify elements within a mutable set.
	- These sets are part of Kotlin's collection framework and are created using functions like the `mutableSetOf()` function is used to create a mutable set in Kotlin.

472. **Immutable Map**
	- **Map**: A map is a collection that represents a set of key value pairs, where each key is associated with a corresponding value.
	- Maps are used to store and retrieve data based on a unique key.
	- Kotlin provides both mutable and immutable map collections.
	- A map is a collection of key value pairs where each key is unique.
	- Immutable maps are read only and can't be modified once they are created, they ensure that the data remains constant and elements cannot be added, removed, or updated after initialization.
	- Immutable maps are created using the `mapOf()` or `mapOfNotNull()` functions.

473. **Mutable Map**
	- A mutable map is a collection that allows you to add, remove, and update key value pairs after it's created.
	- Mutable maps are used to store and manage key value associations and are part of Kotlin's collection framework.
	- The `mutableMapOf()` function is used to create a mutable map.
	- In Kotlin, you can modify a mutable map using various functions and operations such as put, remove, and updating the values associated with a key.

- **Examples**
``` kotlin
	//HelloCollections.kt
	package com.practice.kotlinbasics  
	  
	fun main() {  
	    /*List:  
	    * Ordered collection in which we can access elements by   
	    * using indices that define a position for each element.*/   
	    //Immutable: read-only list    
	    val fruits = listOf("Apple", "Banana", "Cherry")  
	  
	    //Accessing elements of Immutable List  
	    for (item in fruits) {  
	        println("Immutable List: " + item)  
	    }  
	  
	  
	    //Mutable List: Supports both read and write functionalities  
	    val vegetables = mutableListOf("Potato", "Tomato", "Broccoli")  
	    val colors = arrayListOf("Red", "Green", "Blue")  
	  
	    //Adding Elements  
	    vegetables.add("Carrots")  
	    colors.add("Purple")  
	  
	    //Removing Elements by index  
	    vegetables.removeAt(0)  
	    colors.removeAt(0)  
	  
	    //Updating Elements  
	    vegetables[1] = "Garlic"  
	    colors[0] = "Orange"  
	  
	    //Printing all elements of a list  
	    for (veg in vegetables) {  
	        println("Mutable Veg List: " + veg)  
	    }  
	  
	    for (color in colors) {  
	        println("Mutable Color List: " + color)  
	    }  
	  
	    /*Set:  
	    * It is a collection of unordered unique elements    
	    * (No Duplicate Elements).*/  
	    //Immutable Sets    
	    val colorsSet = setOf("Red", "Green", "Blue")  
	  
	    //Iterating over set elements  
	    for (color in colorsSet) {  
	        println("Immutable Set: " + color)  
	    }  
	  
	    //Mutable Set: Supports both read and write functionalities  
	    val fruitsSet = mutableSetOf("Apple", "Banana", "Cherry")  
	  
	    //Adding Elements to a set (prevents duplicate)  
	    fruitsSet.add("Melon")  
	    fruitsSet.add("Apple")  
	  
	    //Removing elements in a set  
	    fruitsSet.remove("Banana")  
	  
	    //Updating elements in a set  
	    fruitsSet.add("Orange")  
	  
	    //Iterating over set elements  
	    for (fruit in fruitsSet) {  
	        println("Mutable Set: " + fruit)  
	    }  
	  
	    /*Map:  
	    * It is an object that maps key to values    
	    * Map Keys are unique    
	    * Map values can be duplicates*/  
	    //Immutable Maps    
	    val fruitsMap = mapOf("apple" to 5, "banana" to 8, "cherry" to 12)  
	  
	    //Accessing Map Elements  
	    val bananaQuantity = fruitsMap["banana"]  
	    println("The quantity of bananas: " + bananaQuantity)  
	  
	    //Mutable Map  
	    val vegetablesPrice = mutableMapOf("potato" to 1.5, "tomato" to 3.5, "broccoli" to 6.0)  
	  
	    //Updating the price of tomato  
	    vegetablesPrice["tomato"] = 4.0  
	  
	    //Adding a new element to the map  
	    vegetablesPrice.put("garlic", 5.0)  
	  
	    //printing all map elements  
	    for ((key, value) in vegetablesPrice) {  
	        println("Vegetable: $key, Price $value")  
	    }  
	}
```