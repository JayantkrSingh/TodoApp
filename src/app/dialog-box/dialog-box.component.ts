import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})

export class DialogBoxComponent implements OnInit {
  taskName: FormControl = new FormControl();
  date: FormControl = new FormControl();
  taskStatus: FormControl = new FormControl();
  fromPage: any;
  fromDialog: string;
  type: any;
  status = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.tasks;
    this.type = data.actionType;
    this.taskName.setValue(data.tasks.name);
    this.date.setValue(data.tasks.date);
    this.taskStatus.setValue(this.status.filter(entry => {return entry.value == data.tasks.status})[0].value);
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromPage });
  }

  deleteData() {
    this.dialogRef.close({ event: 'delete', data: this.fromPage });
  }

  saveData() {
    let arr = [];
    if (this.taskName.value && this.taskName.value !== "" && this.date.value && this.taskStatus.value) {
      arr['name'] = this.taskName.value;
      arr['status'] = this.taskStatus.value;
      arr['date'] = this.date.value;
      this.dialogRef.close({ event: 'save', data: arr });
    }
  }
}
