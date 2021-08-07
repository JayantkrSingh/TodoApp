import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  taskName: FormControl = new FormControl();
  taskDate: FormControl = new FormControl();
  taskStatus: FormControl = new FormControl();

  allTasks: any = [];
  constructor(
    public dialog: MatDialog
  ) { }


  ngOnInit(): void { }

  status = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Inactive', viewValue: 'Inactive' },
  ];

  dialogValue: string;
  sendValue: string;

  onSubmit() {
    let arr = [];
    arr['name'] = this.taskName.value;
    arr['date'] = this.taskDate.value;
    arr['status'] = this.taskStatus.value;
    if (this.taskName.value && this.taskName.value !== "" && this.taskDate.value && this.taskStatus.value) {
      this.allTasks.push(arr);
    }
  }

  deleteTask(index) {
    this.allTasks.splice(index, 1);
  }

  editTask(index, result) {
    this.allTasks[index] = result

    console.log("data saved in table >", this.allTasks, index);
  }

  openDialog(index, type) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '400px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { tasks: this.allTasks[index], index: index, actionType: type }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogValue = result;

      if (result) {
        if (result.event === "delete" && type === "delete") {
          this.deleteTask(index);
        }
        if (result.event === "save" && type === "edit") {
          console.log("Save date after close", result);
          this.editTask(index, result.data)
        }
      }
    });
  }
}
