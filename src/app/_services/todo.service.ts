import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  getTasks(params: any) {
    return this.http.get(this.rootURL + '/tasks', {params});
  }

  addTask(task: any) {
    return this.http.post(this.rootURL + '/task', {task});
  }

  editTask(task: any) {
    return this.http.put(this.rootURL + '/task', {task});
  }

  deleteTask(taskId: any) {
    console.log('deleting task:::', taskId);
    return this.http.delete(`${this.rootURL}/task/${taskId}`);
  }
}
