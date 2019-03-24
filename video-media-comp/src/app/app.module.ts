import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import {MaterialModule} from './material/material.module';

import {MatDialogModule} from '@angular/material';
import {MediaPlayerComponent} from './media-player/media-player.component';
import {UrlPipe} from './urlPipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule,  MaterialModule, BrowserAnimationsModule, MatDialogModule],
  declarations: [ AppComponent,  ModalComponent,  MediaPlayerComponent, UrlPipe],
  bootstrap:    [ AppComponent ],
  entryComponents: [ModalComponent]
})
export class AppModule { }
