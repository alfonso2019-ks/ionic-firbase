import { Component, OnInit } from '@angular/core';
import {Itask} from '../../models/task.interface';
import {TodoService} from '../../services/todo.service';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todo: Itask = {
    task:'',
    priority:0
  };
  todoId: null;
  constructor(private route: ActivatedRoute, private nav: NavController, 
    private todoService: TodoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if(this.todoId){
      this.loadTodo();
    }
  }

  async loadTodo(){
    const load = await this.loadingController.create({
      message : 'Cargando....'
    });
    await load.present();
    this.todoService.getTodo(this.todoId).subscribe(res=>{
      load.dismiss();
      this.todo = res;
    });
  }

  async saveTodo(){
    const load = await this.loadingController.create({
      message : 'guardando....'
    });
    await load.present();
    if(this.todoId){
      this.todoService.updateTodo(this.todo, this.todoId).then(()=>{
        load.dismiss();
        this.nav.navigateForward('/');
      });
    }else{
      this.todoService.addTodo(this.todo).then(()=>{
        load.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

  async deleteTodo(id: string){
    if(id != ""){
      console.log("Eliminar");
      this.todoService.deleteTodo(id);
    }
  }

}
