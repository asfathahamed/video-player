import {Component, Inject, ViewEncapsulation, OnInit, AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ModalComponent {

private src: string;
private title: string;
private youtubeUrl: string;
private vimeoUrl: string;
private subTitle: string;


 constructor(
   private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
       this.src = data.src;
       this.youtubeUrl = data.youtubeUrl;
this.vimeoUrl = data.vimeoUrl;
       this.title = data.title;
       this.subTitle = data.subTitle;

   }

 onNoClick(): void {
   this.dialogRef.close();
 }
}
