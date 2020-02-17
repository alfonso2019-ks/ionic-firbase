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

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  constructor(private sqlite: SQLite, private plf: Platform, private sqlPorter: SQLitePorter, private http: HttpClient  ) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
      db.executeSql('create table todos(task VARCHAR(30),priority int, id VARCHAR(15))');
    }).catch(e=>console.log(e));
  }

  

}
