import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinInformationComponent } from './skin-information.component';

describe('SkinInformationComponent', () => {
  let component: SkinInformationComponent;
  let fixture: ComponentFixture<SkinInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
