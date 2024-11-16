import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { addIngredient, deleteIngredient, stopEdit, updateIngredient } from '../shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      } else this.editMode = false;
    })
  }

  onSubmitItem(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;

    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient(
        { newIngredient: newIngredient }
      ))
      this.editMode = false;
    } else {
      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
    }
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(stopEdit())
  }

  onDelete() {
    this.store.dispatch(deleteIngredient())
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEdit())
  }
}
