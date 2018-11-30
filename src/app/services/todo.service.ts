import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo';

@Injectable()
export class TodoService {

  
  private nextId: number;

  constructor() {
   let todos=this.getTodos();

    if(todos.length==0){
      this.nextId=0;
    }else{
      let maxId=todos[todos.length-1].id;
      this.nextId=maxId+1;
    }
  }

  public addTodo(text: string): void {
    let todo = new Todo(this.nextId, text);
   let todos=this.getTodos()
   todos.push(todo);
   this.setLocalStorageTodos(todos);
    this.nextId++;
  }

  public getTodos(): Todo[] {
    let localStorageItem=JSON.parse(localStorage.getItem('todos'));
    return localStorageItem==null?[]:localStorageItem.todos;
  }

  public removeTodo(id: number): void {
    let todos=this.getTodos();
    todos = todos.filter((todo)=> todo.id != id);
    this.setLocalStorageTodos(todos);
  }
  private setLocalStorageTodos(todos:Todo[]):void{
    localStorage.setItem('todos',JSON.stringify({todos:todos}));
   }

}
