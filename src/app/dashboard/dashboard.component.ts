import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../_services';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as todoActions from '../app-state/actions';
import * as fromRoot from '../app-state';
import { urlParams } from '../app-state/entity/urlParams.entity';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  tasks: any[] = [];

  constructor(private router: Router, private readonly store: Store) {
    this.store.select(fromRoot.getLoggedInUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.user = data.user);

    const urlParams = {
      page: 1,
      pageSize: 2
    };
    this.store.select(fromRoot.getTasks(urlParams)).pipe(
     takeUntil(this.destroy$)
    ).subscribe(data => 
      {
        console.log("Inside Constructor first call");
        console.log(data.tasks);
        this.tasks = data.tasks});
  }

  todoForm = new FormGroup({
    task: new FormControl('', Validators.nullValidator && Validators.required),
    assignee: new FormControl('', Validators.nullValidator && Validators.required),
    status: new FormControl('', Validators.nullValidator && Validators.required)
  });

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit() {
    console.log(this.todoForm.value);
    const task = {
      createdBy: this.user.email,
      task: this.todoForm.value.task,
      assignee: this.todoForm.value.assignee,
      status: this.todoForm.value.status
    };
    this.store.dispatch(todoActions.createTask({task}));
    this.todoForm.reset();
  }

  deleteTask(taskid: any) {
    console.log('deleting this task:::', taskid);
    this.store.dispatch(todoActions.deleteTask({taskid}));
  }

  editTask(task: any) {
    console.log('editing this task:::', task);
    this.store.dispatch(todoActions.editTask({task}));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {

  }

}
