import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'defaault'
    }).then((db: SQLiteObject) =>{
      db.executeSql('create table todos(task VARCHAR(30),priority int, id VARCHAR(15))');
    }).catch(e=>console.log(e));
  }

  

}
