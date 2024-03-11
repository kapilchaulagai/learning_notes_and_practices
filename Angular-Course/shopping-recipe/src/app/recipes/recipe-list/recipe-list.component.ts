import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'Thakali Khana1',
      'This is a typical nepali thali.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
    ),
    new Recipe(
      'Thakali Khana2',
      'This is a typical nepali thali.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
    ),
    new Recipe(
      'Thakali Khana3',
      'This is a typical nepali thali.',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZiNaq-KP_05cBRzT28mj6HlDM282RwAvrmMkfzLUBbTwFhVYBW6ZDmigNUDloKAXyI50&usqp=CAU'
    ),
  ];
  constructor() {}
  ngOnInit(): void {}

  onRecipeSelected(recipeEl: Recipe) {
    this.recipeWasSelected.emit(recipeEl);
  }
}
