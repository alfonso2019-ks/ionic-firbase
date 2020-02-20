import {Platform} from '@ionic/angular';
import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

import {Itask} from "../models/task.interface";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private task: Itask;
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  tasks = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private plf: Platform, private sqlPorter: SQLitePorter, private http: HttpClient  ) {
    this.plf.ready().then(()=>{
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        this.database = db;
        this.seedDatabase();
        //db.executeSql('create table todos(task VARCHAR(30),priority int, id VARCHAR(15))');
      }).catch(e=>console.log(e));
    })
  }

  seedDatabase(){
    this.http.get('assets/seed.sql',{responseType: 'text'}).subscribe(sql=>{
      this.sqlPorter.importSqlToDb(this.database,sql).then(_=>{
        this.dbReady.next(true);
      }).catch(e=>console.error(e));
    });
  }  

  getDatabaseState(){
    return this.tasks.asObservable();
  }

  getTasks(): Observable<Itask[]>{
    return this.tasks.asObservable();
  }

  getProducts(): Observable<any[]>{
    return this.products.asObservable();
  }

  loadDevelopers(){
    return this.database.executeSql('Select * from tasks', []).then(data=>{
      let tasks: Itask[]=[];
      if(data.rows.lenght){
        for (let i = 0; i < data.rows.lenght; i++) {
          tasks.push({
            id: data.rows.item(i).id,
            task: data.rows.item(i).task,
            priority: data.rows.item(i).priority
          }) 
        }
      }
      this.tasks.next(tasks);
    });
  }

  addDeveloper(task, priority){
    let data = [task, priority];
    return this.database.executeSql('INSERT INTO tasks (task, priority) VALUES (?,?)', data).then(data=>{
      this.loadDevelopers();
    });
  }

  getDevelopers(id): Promise<Itask>{
    return this.database.executeSql('SELECT * from tasks WHERE id = ?', [id]).then(data=>{
      return{
        id: data.rows.item(0).id,
        task: data.rows.item(0).task,
        priority: data.rows.item(0).priority
      }
    });
  }

  deleteDeveloper(id){
    return this.database.executeSql('DELETE FROM tasks WHERE id = ?',[id]).then(_=>{
      this.loadDevelopers();
    });
  }

  updateDevelopers(task: Itask){
    let data = [task.task, task.priority]
    return this.database.executeSql('UPDATE tasks SET task = ?, priority = ? WHERE id = ${task.id}', data).then(data => {
      this.loadDevelopers();
    });
  }
}
