import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ApplicantHelpDialogComponent} from '../applicant-help-dialog/applicant-help-dialog.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() models: any;
  @Input() countCheckedElements: number;
  @Output() onSelect = new EventEmitter<any>();

  selectedModel: any;
  maxCheckedElements = 5;

  constructor (public dialog: MatDialog) { }

  ngOnInit() {
    this.selectedModel = this.models[0];
  }

  onSelectElement(model) {
    this.selectedModel = model; 
    this.onSelect.emit(model);
    console.log(this.selectedModel)
  }

  openHelpDialog(): void {
    this.dialog.open(ApplicantHelpDialogComponent, {width: '400px'});
  }

}
