import { Component, OnInit, Input, ViewChild , ElementRef, Renderer2, HostListener, AfterViewInit, Renderer} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
@Component({
  selector: 'app-edge-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {


  @Input() videoOgg: string;
  @Input() videoMp4: string;
  @Input() youtubeUrl: string;
  @Input() vimeoUrl: string;
  @Input() modal: boolean;
  @Input() sticky: boolean;
  @Input() stickyPosition: string;
  @Input() title: string;
  @Input() subTitle: string;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('youtube') youtubeplayer: ElementRef;
  @ViewChild('vimeo') vimeoplayer: ElementRef;
 YouTubeUrl;
 VimeoUrl;
 VideoOgg;
 VideoMp4;
  dialogRef: MatDialogRef<ModalComponent>;
  player;
ID = '';
  done = false;

constructor(private dialog: MatDialog, private el: ElementRef, private renderer: Renderer2, private render: Renderer) {}

  ngOnInit() {
    this.loadVideo();
    if (this.modal === true) {
      this.openModal();
    }
    if (this.sticky === true) {
      this.initializeSticky();
    }
  }
  ngAfterViewInit() {
    const doc = (<Window>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';

    doc.body.appendChild(playerApiScript);
 console.log(doc.body.appendChild(playerApiScript));
  }

  loadVideo() {

    if (this.youtubeUrl) {

      this.loadYoutubeVideo();
      this.ID =  this.YouTubeGetID(this.youtubeUrl);
    } else if (this.vimeoUrl) {

      this.loadVimeoVideo();
    } else if (this.videoMp4 || this.videoOgg) {
      this.loadNativeVideo();
    } else {
      alert('no video url available');
    }
  }
  loadVimeoVideo(): any {
    this.VimeoUrl = this.vimeoUrl;
  }
  loadNativeVideo(): any {
    this.VideoMp4 = this.videoMp4;
    this.VideoOgg = this.videoOgg;

  }

  YouTubeGetID(youtubeUrl) {
    const url = youtubeUrl.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
 this.ID = url[2].split(/[^0-9a-z_\-]/i);
     this.ID = this.ID[0];
    } else {
      this.ID = url;
    }
      return this.ID;
  }

  loadYoutubeVideo(): any {
    this.YouTubeUrl = this.youtubeUrl;
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        width: '50%',
        videoId: this.ID,
        playerVars: {'autoplay': 0, 'rel': 0, 'controls': 2},
        events: {
          'onReady': () => {
          },
          'onStateChange': () => {

          }
        }
      });
     console.log(this.player);
    };
  }

  stopVideo() {
    this.player.stopVideo();
  }
  initializeSticky(): any {

this.onWindowScroll();
  }

  openSticky(options?, callback?) {

    if (this.VideoMp4  || this.VideoOgg) {

    switch (this.stickyPosition) {
case 'right top' : this.renderer.addClass(this.videoplayer.nativeElement, 'stuck-right-top');
                     break;
case 'right bottom' :  this.renderer.addClass(this.videoplayer.nativeElement, 'stuck-right-bottom');
break;
case 'left top' :  this.renderer.addClass(this.videoplayer.nativeElement, 'stuck-left-top');
break;
case 'left bottom' :  this.renderer.addClass(this.videoplayer.nativeElement, 'stuck-left-bottom');
break;
default:
      alert('wrong positon');
    }
  } else if (this.vimeoUrl) {
    switch (this.stickyPosition) {
      case 'right top' : this.renderer.addClass(this.vimeoplayer.nativeElement, 'stuck-right-top');
                           break;
      case 'right bottom' :  this.renderer.addClass(this.vimeoplayer.nativeElement, 'stuck-right-bottom');
      break;
      case 'left top' :  this.renderer.addClass(this.vimeoplayer.nativeElement, 'stuck-left-top');
      break;
      case 'left bottom' :  this.renderer.addClass(this.vimeoplayer.nativeElement, 'stuck-left-bottom');
      break;
      default:
            alert('wrong positon');
          }
    } else if (this.YouTubeUrl) {
      switch (this.stickyPosition) {
        case 'right top' : this.renderer.addClass(this.youtubeplayer.nativeElement, 'stuck-right-top');
                             break;
        case 'right bottom' :  this.renderer.addClass(this.youtubeplayer.nativeElement, 'stuck-right-bottom');
        break;
        case 'left top' :  this.renderer.addClass(this.youtubeplayer.nativeElement, 'stuck-left-top');
        break;
        case 'left bottom' :  this.renderer.addClass(this.youtubeplayer.nativeElement, 'stuck-left-bottom');
        break;
        default:
              alert('wrong positon');
            }
    }

}
  closeSticky(callback?) {

    if (this.VideoMp4  || this.VideoOgg) {

      switch (this.stickyPosition) {
  case 'right top' : this.renderer.removeClass(this.videoplayer.nativeElement, 'stuck-right-top');
                       break;
  case 'right bottom' :  this.renderer.removeClass(this.videoplayer.nativeElement, 'stuck-right-bottom');
  break;
  case 'left top' :  this.renderer.removeClass(this.videoplayer.nativeElement, 'stuck-left-top');
  break;
  case 'left bottom' :  this.renderer.removeClass(this.videoplayer.nativeElement, 'stuck-left-bottom');
  break;
  default:
        alert('wrong positon');
      }
    } else if (this.vimeoUrl) {
      switch (this.stickyPosition) {
        case 'right top' : this.renderer.removeClass(this.vimeoplayer.nativeElement, 'stuck-right-top');
                             break;
        case 'right bottom' :  this.renderer.removeClass(this.vimeoplayer.nativeElement, 'stuck-right-bottom');
        break;
        case 'left top' :  this.renderer.removeClass(this.vimeoplayer.nativeElement, 'stuck-left-top');
        break;
        case 'left bottom' :  this.renderer.removeClass(this.vimeoplayer.nativeElement, 'stuck-left-bottom');
        break;
        default:
              alert('wrong positon');
            }
      } else if (this.YouTubeUrl) {
        switch (this.stickyPosition) {
          case 'right top' : this.renderer.removeClass(this.youtubeplayer.nativeElement, 'stuck-right-top');
                               break;
          case 'right bottom' :  this.renderer.removeClass(this.youtubeplayer.nativeElement, 'stuck-right-bottom');
          break;
          case 'left top' :  this.renderer.removeClass(this.youtubeplayer.nativeElement, 'stuck-left-top');
          break;
          case 'left bottom' :  this.renderer.removeClass(this.youtubeplayer.nativeElement, 'stuck-left-bottom');
          break;
          default:
                alert('wrong positon');
              }
      }

}

openModal(options?, callback?) {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.panelClass = 'myPanel';
  dialogConfig.width = '60%';
  dialogConfig.height = 'auto';
  dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.data = {
    youtubeUrl: this.YouTubeUrl ,
    vimeoUrl: this.VimeoUrl,
    src: this.VideoMp4 || this.VideoOgg,
   title: this.title,
   subTitle: this.subTitle
   };

   const dialogRef  = this.dialog.open(ModalComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(value => {
   this.modal = false;
  });

  }
  closeModal(callback?) {
  }

    @HostListener('window:scroll', [])
    onWindowScroll() {
      if (this.sticky) {
    const windowScroll = window.pageYOffset;

     if (windowScroll > 250) {

        this.openSticky();

       } else {
this.closeSticky();

       }

    }
  }

  }

