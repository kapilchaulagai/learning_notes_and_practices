#HomeAndroid - [[--Contents - Android--]]
131. **Introduction to RecyclerView**
	- Recycler view makes it easy to efficiently display large sets of data.
	- You supply the data and define how each item looks and the recycler view library dynamically creates the elements when they are needed.
	- As the name implies, recycler view recycles those individual elements.
	- When an item scrolls off the screen, recycler view doesn't destroy its view. Instead, the recycler view reuses the view for new items that have scrolled on screen.
	- The recycler view improves performance by reusing recycling the existing layouts and the views. ![[android_recyclerview.png]]

132. **Designing Layouts**
	- z