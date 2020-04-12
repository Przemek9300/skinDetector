import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinPredictComponent } from './skin-predict.component';

describe('SkinPredictComponent', () => {
  let component: SkinPredictComponent;
  let fixture: ComponentFixture<SkinPredictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinPredictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinPredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
