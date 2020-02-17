import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Itask} from '../models/task.interface'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  todos: Itask[];
  constructor(private todoService: TodoService) {}
  ngOnInit(){
    this.todoService.getTodos().subscribe(res=>this.todos=res);
  }

}
