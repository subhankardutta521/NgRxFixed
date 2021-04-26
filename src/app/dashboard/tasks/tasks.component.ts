import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as todoActions from '../../app-state/actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private store: Store) { }

  @Input() tasks: any[];
  @Output() deleteTask = new EventEmitter<any>();
  @Output() editTask = new EventEmitter<any>();

  editingId: any;

  editForm = new FormGroup({
    id: new FormControl('', Validators.nullValidator && Validators.required),
    task: new FormControl('', Validators.nullValidator && Validators.required),
    assignee: new FormControl('', Validators.nullValidator && Validators.required),
    status: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
    console.log("In ngOnInit");
    console.log(this.tasks);
  }

  refresh(): void {
    this.store.dispatch(todoActions.getTasks({page: 1, pageIndex: 2}));
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.modalService.hide(1);
    this.editTask.emit(this.editForm.value);
  }

  delTask(task) {
    this.deleteTask.emit(task);
  }

  openModal(template: TemplateRef<any>, task) {
    this.editingId = task.id;
    this.editForm.setValue({id: task.id, task: task.task, assignee: task.assignee, status: task.status});
    this.modalRef = this.modalService.show(template);
  }

}
