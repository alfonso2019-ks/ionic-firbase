import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Itask } from 'src/app/models/task.interface';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.page.html',
  styleUrls: ['./developers.page.scss'],
})
export class DevelopersPage implements OnInit {

  tasks: Itask[]=[];

  task: Itask={
    task : '',
    priority : 0
  };
  selectedView = "tasks";

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready =>{
      if(ready){
        this.db.getTasks().subscribe(task=>{
          console.log('task change', task);
          this.tasks = task;
        });
      }
    });
  }

  addTask(){
    this.db.addDeveloper(this.task['task'],this.tasks['priority']).then(_=>{
      this.task = {
        id : null,
        task : '',
        priority : 0
      };
    });
  }

}
