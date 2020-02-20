import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastController } from '@ionic/angular';
import { Itask } from 'src/app/models/task.interface';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
})
export class DeveloperPage implements OnInit {

  task: Itask = null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router:Router, private toast:ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      let taskId = params.get('id');
      this.db.getTask(taskId).then(data=>{
        this.task = data;
      });
    });
  }

  delete(){
    this.db.deleteDeveloper(this.task.id).then(()=>{
      this.router.navigateByUrl('/');
    });
  }

  update(){
    this.db.updateDevelopers(this.task).then(async (res)=>{
      let toast = await this.toast.create({
        message: 'Task update',
        duration: 3000
      });
      toast.present();
    });
  }

}
