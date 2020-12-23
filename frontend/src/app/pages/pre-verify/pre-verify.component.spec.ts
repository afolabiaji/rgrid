import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreVerifyComponent } from './pre-verify.component';

describe('PreVerifyComponent', () => {
  let component: PreVerifyComponent;
  let fixture: ComponentFixture<PreVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
