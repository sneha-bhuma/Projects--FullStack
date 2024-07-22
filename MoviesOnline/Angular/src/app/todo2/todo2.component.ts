import { Component } from '@angular/core';
import { TodoItem } from './todoItem';
import { TodoList } from './todoList';

@Component({
  selector: 'app-todo2',
  templateUrl: './todo2.component.html',
  styleUrl: './todo2.component.css',
})

export class Todo2Component {

  private list = new TodoList('Vijoy', [
    new TodoItem('Go for run', true),
    new TodoItem('Get flowers'),
    new TodoItem('Collect tickets'),
  ]);

  get username(): string {
    return this.list.user;
  }

  get itemCount(): number {
    // console.log('Unchecked cnt =  ' ,this.list.items.filter((item) => !item.complete).length);
    
    return this.list.items.filter((item) => !item.complete).length;
  }

  get items(): readonly TodoItem[] {
    // console.log('Items : ',this.list.items.filter((item) => this.showComplete || !item.complete));
    
    return this.list.items.filter((item) => this.showComplete || !item.complete);
  }

  addItem(newItem: string) {
    if (newItem != '') {
      this.list.addItem(newItem);
    }
  }

  showComplete: boolean = false;
}
