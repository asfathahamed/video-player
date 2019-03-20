import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog , MatDialogModule} from '@angular/material/dialog';
import { OverlayContainer} from '@angular/cdk/overlay';
import { ModalComponent } from './modal.component';
import { BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
describe('ModalComponent', () => {

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };



  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      imports: [MatDialogModule],
      providers: [{provide : MatDialogRef, useValue : {mockDialogRef}}, { provide: MAT_DIALOG_DATA, useValue: {}}]
    });
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [ModalComponent]
      }
    });
    TestBed.compileComponents();

}));
let dialog: MatDialog;
let overlayContainerElement: HTMLElement;
let overlayContainer: OverlayContainer;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: OverlayContainer, useFactory: () => {
        overlayContainerElement = document.createElement('div');
        return { getContainerElement: () => overlayContainerElement };
      }}
    ]
  });

  dialog = TestBed.get(MatDialog);
});
  beforeEach(() => {
   const fixture = TestBed.createComponent(ModalComponent);
   const component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should have the h1 tag', () => {
    const fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.title')).toBeTruthy();
  });

  it('should render app with video tag', () => {
   const  fixture = TestBed.createComponent(ModalComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('video')).toBeTruthy();
  });

  it('should render video tag with autoplay to be truthy', () => {
   const  fixture = TestBed.createComponent(ModalComponent);
     fixture.detectChanges();
     const compiled = fixture.nativeElement;
     expect(compiled.querySelector('video').autoplay).toBeTruthy();
   });
   beforeEach(inject([MatDialog, OverlayContainer],
    (d: MatDialog, oc: OverlayContainer) => {
      dialog = d;
      overlayContainer = oc;
    })
  );

   it('should render video tag with allowScreen to be Falsy', () => {
    const  fixture = TestBed.createComponent(ModalComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('video').controlsList).toBeTruthy('nofullscreen');
    });
    it('should render video tag and contains child element source', () => {
      const fixture = TestBed.createComponent(ModalComponent);
       fixture.detectChanges();
       const compiled = fixture.nativeElement;
       expect(compiled.querySelector('video source')).toBeTruthy();
       expect(compiled.querySelector('video source').src).toBeTruthy();
     });
     it('click close button should close the dialog', () => {
      const fixture = TestBed.createComponent(ModalComponent);
      const component = fixture.componentInstance;
      mockDialogRef.close.calls.reset();
      const button = fixture.debugElement.query(By.css('.close'));
      button.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toBeTruthy();
    });
});

