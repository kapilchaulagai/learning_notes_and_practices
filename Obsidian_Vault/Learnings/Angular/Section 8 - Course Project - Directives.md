#HomeAngular - [[--Contents - Angular--]]
105. **Building and Using a Dropdown  Directive**
	- Here, using directive we are toggling an open class for the button-group.
	- Example:
		``` ts
	//dropdown.directive.ts
	import { Directive, HostBinding, HostListener } from '@angular/core';
	
	@Directive({
	  selector: '[appDropdown]',
	})
	export class DropdownDirective {
	  @HostBinding('class.open') isOpen = false;
	
	  @HostListener('click')
	  toggleOpen() {
	    this.isOpen = !this.isOpen;
	  }
	}
	
	//recipe-detail.component.html
	...
	<div class="btn-group" appDropdown>
      <button class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">To Shopping List.</a></li>
        <li><a href="#">Edit Recipe.</a></li>
        <li><a href="#">Delete Recipe</a></li>
      </ul>
    </div>
	...
	
	//header.component.html
	...
	<li class="dropdown" appDropdown>
          <a href="#" class="dropdown-toggle" role="button"
            >Manage <span class="caret"></span
          ></a>
          <ul class="dropdown-menu">
            <li><a href="#">Save Data</a></li>
            <li><a href="#">Fetch Data</a></li>
          </ul>
    </li>
        ...
		```

106. **Closing the Dropdown From Anywhere**
	- If you want that a dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one (placing the listener not on the dropdown, but on the document):
		``` ts
	import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
	 
	@Directive({
	  selector: '[appDropdown]'
	})
	export class DropdownDirective {
	  @HostBinding('class.open') isOpen = false;
	  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
	    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
	  }
	  constructor(private elRef: ElementRef) {}
	}
		```
