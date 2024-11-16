import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store, select } from '@ngrx/store';
import { startEdit } from './shopping-list.actions';
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.pipe(select('shoppingList'));
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index: number  ) {
    this.store.dispatch(startEdit({ index: index }))
  }

  ngOnDestroy(): void {
  }

  
}



