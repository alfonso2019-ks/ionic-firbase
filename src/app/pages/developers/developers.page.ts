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

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.seedDatabase().suscribe(ready =>{
      if(ready){
        this.db.getTasks().subscribe(task=>{
          console.log('task change', task);
          this.tasks = task;
        });
      }
    });
  }

}
