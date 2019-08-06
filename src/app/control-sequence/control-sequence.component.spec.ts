import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSequenceComponent } from './control-sequence.component';

describe('ControlSequenceComponent', () => {
  let component: ControlSequenceComponent;
  let fixture: ComponentFixture<ControlSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
