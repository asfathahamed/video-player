import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { VideoComponent } from './video/video.component';
import {MatDialog } from '@angular/material';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, VideoComponent
      ],
      providers: [{provide : MatDialog, useValue : {}}]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
