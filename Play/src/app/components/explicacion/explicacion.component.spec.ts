import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplicacionComponent } from './explicacion.component';

describe('ExplicacionComponent', () => {
  let component: ExplicacionComponent;
  let fixture: ComponentFixture<ExplicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
