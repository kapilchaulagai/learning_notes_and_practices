# AppSteer UI Setup
- Pull below modules and switch to develop branch before running:
	- appsteer-admin-ui
	- appsteer-login-ui
	- appsteer-shared-lib-ui
	- appsteer-user-ui
- Instructions to run:
	- Install shared library dependency using `npm i --legacy-peer-deps --registry http://registry.npmjs.org/`
	- Run shared-lib in watch mode: `ng build appsteer-shared-lib --watch`
	- Same for other modules
	- Build Shared library in watch mode using `npm run watch`
	- Install the shared library in other modules (admin, user, and login) `npm i --legacy-peer-deps --registry http://registry.npmjs.org/ <build-path>`
		- If Reinstalling shared library in respective modules then remove node modules from all the modules using `remove-node-modules` (NPM package). [PACKAGE](https://www.npmjs.com/package/remove-node-modules). Use `npm i -g remove-node-modules`
		- EXAMPLE `D:\appsteer-frontend-project\appsteer-shared-lib-ui\dist\shared-lib`
		- Remove the shared library from `package.json` using CMD `git reset package.json`
		- Remove `package-lock.json` from all modules use `del package-lock.json`
		- To run modules 
			- Admin - `ng s --port 4301`
				- `  <base href="/admin">` to `  <base href="/">`
			- Login - `ng s -o`
			- User - `ng s --port 4402`
				- `  <base href="/user">` to `  <base href="/">`
		- Change the path for the local DB inside the file `environment.ts` only if it is required.
	- If any error comes up regarding `CORS Error`, please add CORS access extension for chrome and then enable it.
	- Always put version upgrade commit separately
# Instructions to push changes to other branches than dev
- Create your local branch from the origin branch: Example: Run `git switch -c kapil-shared-lib-qa`
	- Get the other branch latest changes logs before cherry picking it to this branch: Example: Run `git log --oneline -n 15 --author=kapil origin/develop`
- Then cherry pick the commits and also resolve conflicts if exists: Example: Run `git cherry-pick 02eacf19` or sometimes we need to do `git cherry-pick -m 1 35729a7`
	- When encounter conflicts, edit the file and check the status of the conflicts: Example: Run `git status`
	- Once everything looks fine, stage the changes: Example: Run ` git add projects/shared-lib/package.json`
	- Then, continue cherry-pick: Example: Run `git cherry-pick --continue`
	- Finally the changes committed to your required branch.
- Finally, Check logs in your current branch: Example: Run `git log --oneline -n 15 --author=kapil`

# Instructions to pull changes
- Stash existing changes
- Switch/Checkout to original remote branch
- Take the pull
- Switch/Checkout to respective local branch
- Merge the changes
- Apply the stashed changes
- Clear the stash
# Issues
- QA | preview icon and other icons are not clickable on second time
- QA | search by address geo-location not working
- Summary fields should not contain group fields
- When we change label of the fields, it doesn't reflect immediately in the summary field selection dialog