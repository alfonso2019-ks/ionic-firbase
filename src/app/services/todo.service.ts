import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from 'angularfire2/firestore'
import {Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Itask} from '../models/task.interface'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Itask>;
  private todos: Observable<Itask[]>;
  
  constructor(db:AngularFirestore) {
    this.todosCollection = db.collection<Itask>('todos');
    this.todos = this.todosCollection.snapshotChanges().pipe(map(action=>{
      return action.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      })
    })
      );
  }

  getTodos(){
    return this.todos;
  }

  getTodo(id: string){
    return this.todosCollection.doc<Itask>(id).valueChanges();
  }

  updateTodo(todo: Itask, id: string){
    return this.todosCollection.doc(id).update(todo);
  }

  addTodo(todo: Itask){
    return this.todosCollection.add(todo);
  }

  deleteTodo(id: string){
    return this.todosCollection.doc(id).delete();
  }

}
