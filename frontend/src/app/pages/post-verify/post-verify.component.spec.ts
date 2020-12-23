import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVerifyComponent } from './post-verify.component';

describe('PostVerifyComponent', () => {
  let component: PostVerifyComponent;
  let fixture: ComponentFixture<PostVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
