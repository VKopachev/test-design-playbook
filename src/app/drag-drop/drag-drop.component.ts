import { Component, OnInit } from '@angular/core';
import { CdkDragEnd, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CommentEditDialogComponent } from '../comment-edit-dialog/comment-edit-dialog.component'

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  position = {
    x: 0,
    y: 0,
    xInterest: 0,
    yInterest: 0
  }
  
  dragMoved(event: CdkDragMove) {
    // this.position = `> Position X: ${event.pointerPosition.x} - Y: ${event.pointerPosition.y}`;
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);

    const width = element.parentElement.offsetWidth
    const height = element.parentElement.offsetHeight

    this.position.x = boundingClientRect.x - parentPosition.left
    this.position.y = boundingClientRect.y - parentPosition.top
    this.position.xInterest = this.position.x / width
    this.position.yInterest = this.position.y / height



    console.log(this.position)
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentEditDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
