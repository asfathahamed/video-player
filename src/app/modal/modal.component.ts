import { Component, Inject, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ModalComponent implements AfterViewInit {

  private src: string;
  private title: string;
  private youtubeUrl: string;
  private vimeoUrl: string;
  private subTitle: string;
  private currentTime: any;
  private volume: any;
  private muted: boolean;
  @ViewChild('video') video: ElementRef;


  constructor(
    private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.src = data.src;
    this.youtubeUrl = data.youtubeUrl;
    this.vimeoUrl = data.vimeoUrl;
    this.title = data.title;
    this.currentTime = data.videoState.currentTime;
    this.volume = data.videoState.volume;
    this.muted = data.videoState.muted;
  }

  ngAfterViewInit() {
    this.video.nativeElement.currentTime = this.currentTime;
    this.video.nativeElement.volume = this.volume;
    this.video.nativeElement.muted = this.muted;
    this.video.nativeElement.play();
  }

  onClickCancel(): void {
    this.dialogRef.close({
      currentTime: this.video.nativeElement.currentTime,
      volume: this.video.nativeElement.volume,
      muted: this.muted
    });
  }
}
