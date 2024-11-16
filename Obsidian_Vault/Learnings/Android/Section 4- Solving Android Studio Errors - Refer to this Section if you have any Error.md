#HomeAndroid - [[--Contents - Android--]]
13. **\[Fix\] - Duplicate Class Found Error**
	- It occurs when we have conflicting class names that are dependencies added in the gradle file that have same class names for two or more dependencies.
	- Solution:
		- Ensure Android SDK is up to date with latest version.
		- Then, Invalidate Caches and Restart the project.
		- If still the issue exists: Add a `org.jetbrains.kotlin-bom...` dependency.
		- And Run
		- If still exists: Add constraints that implements two more dependencies related to jdk7 and jdk8.

14. **\[Fix\] - Dependency Requires Libraries Error**
	- Go to `AndroidManifest.xml` and modify to `tools:targetApi = "34"`.
	- Go to `build.gradle` module level then change `compileSdk=34` and `targetSdk=34`.
	- Sync and Run