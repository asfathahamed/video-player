import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { StickyPosition } from '../StickyPosition.enum';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Overlay } from '@angular/cdk/overlay';
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
  @Input() stickyPosition: StickyPosition;
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  @ViewChild('youtube') youtubeplayer: ElementRef;
  @ViewChild('vimeo') vimeoPlayer: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('subtitle') subtitle: ElementRef;
  dialogRef: MatDialogRef<ModalComponent>;
  player;
  done = false;
  private videoPosition: any;
  stickyOptions = {
    width: '200px'
  };
  private openedWithSticky: boolean;
  private played = false;

  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2,
    private overlay: Overlay
  ) {}

  ngOnInit() {
    if (this.sticky) {
      this.initializeSticky();
    }
  }
  ngAfterViewInit() {
    this.loadVideo();
    const doc = (<Window>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    this.videoPosition = this.getPos(this.videoPlayer.nativeElement);
    doc.body.appendChild(playerApiScript);
  }

  loadVideo() {
    if (this.youtubeUrl) {
      this.loadYoutubeVideo();
    } else if (this.vimeoUrl) {
      this.loadVimeoVideo();
    } else if (this.videoMp4 || this.videoOgg) {
      this.loadNativeVideo();
    } else {
      alert('no video url available');
    }
  }

  loadVimeoVideo(): any {
  }

  loadNativeVideo(): any {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.addEventListener('play', () => {
        this.openedWithSticky = false;
        this.played = true;
      });
      this.videoPlayer.nativeElement.addEventListener('pause', () => {
        this.openedWithSticky = false;
        this.played = false;
      });
    }
  }

  YouTubeGetID(youtubeUrl) {
    const url = youtubeUrl
      .replace(/(>|<)/gi, '')
      .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    const id = url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url;
    return id;
  }

  loadYoutubeVideo(): any {
    const youtubeID = this.YouTubeGetID(this.youtubeUrl);
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        width: '50%',
        videoId: youtubeID,
        playerVars: { autoplay: 0, rel: 0, controls: 2 },
        events: {
          onReady: () => {},
          onStateChange: () => {}
        }
      });
    };
  }

  stopVideo() {
    this.player.stopVideo();
  }
  initializeSticky(): any {
    this.onWindowScroll();
  }

  getStickyClass(): string {
    let stickyClass = '';
    switch (this.stickyPosition) {
      case StickyPosition.TopRight: stickyClass = 'stuck-right-top'; break;
      case StickyPosition.BottomRight: stickyClass = 'stuck-right-bottom'; break;
      case StickyPosition.TopLeft: stickyClass = 'stuck-left-top'; break;
      case StickyPosition.BottomLeft: stickyClass = 'stuck-left-bottom'; break;
    }
    return stickyClass;
  }

  openSticky(options?, callback?) {
    const stickyClass = this.getStickyClass();
    if (this.videoMp4 || this.videoOgg) {
      this.renderer.addClass(
        this.videoPlayer.nativeElement,
        stickyClass
      );
    } else if (this.vimeoUrl) {
      this.renderer.addClass(
        this.vimeoPlayer.nativeElement,
        stickyClass
      );
    } else if (this.youtubeUrl) {
      this.renderer.addClass(
        this.youtubeplayer.nativeElement,
        stickyClass
      );
    }
  }

  closeSticky(options?, callback?) {
    const stickyClass = this.getStickyClass();
    if (this.videoMp4 || this.videoOgg) {
      this.renderer.removeClass(
        this.videoPlayer.nativeElement,
        stickyClass
      );
    } else if (this.vimeoUrl) {
      this.renderer.removeClass(
        this.vimeoPlayer.nativeElement,
        stickyClass
      );
    } else if (this.youtubeUrl) {
      this.renderer.removeClass(
        this.youtubeplayer.nativeElement,
        stickyClass
      );
    }
  }

  openModal(options?, callback?) {
    this.videoPlayer.nativeElement.pause();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'videoPanel';
    dialogConfig.width = options && options.width || '60%';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (options) {
      dialogConfig.hasBackdrop = false;
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
      switch (this.stickyPosition) {
        case StickyPosition.BottomLeft:
        dialogConfig.position = {
          bottom: '0',
          left: '0'
        };
        break;
        case StickyPosition.BottomRight:
        dialogConfig.position = {
          bottom: '0',
          right: '0'
        };
        break;
        case StickyPosition.TopLeft:
        dialogConfig.position = {
          top: '0',
          left: '0'
        };
        break;
        case StickyPosition.TopRight:
        dialogConfig.position = {
          top: '0',
          right: '0'
        };
        break;
      }
    }

    dialogConfig.data = {
      youtubeUrl: this.youtubeUrl,
      vimeoUrl: this.vimeoUrl,
      src: this.videoMp4 || this.videoOgg,
      title: this.title.nativeElement.textContent,
      videoState: {
        currentTime: this.videoPlayer.nativeElement.currentTime,
        volume: this.videoPlayer.nativeElement.volume,
        muted: this.videoPlayer.nativeElement.muted,
      }
    };

    this.dialogRef = this.dialog.open(ModalComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(videoState => {
      this.modal = false;
      this.videoPlayer.nativeElement.currentTime = videoState.currentTime;
      this.videoPlayer.nativeElement.volume = videoState.volume;
      this.videoPlayer.nativeElement.muted = videoState.muted;
      this.dialogRef = undefined;
      this.openedWithSticky = !!options;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.openedWithSticky && this.videoPlayer && this.sticky && this.played) {
      const scrollY = window.pageYOffset;
      if (!this.dialogRef && scrollY > this.videoPosition.top) {
        this.openModal(this.stickyOptions);
      }
    }
  }

  getPos(el: HTMLVideoElement) {
    return el.getBoundingClientRect();
  }
}
