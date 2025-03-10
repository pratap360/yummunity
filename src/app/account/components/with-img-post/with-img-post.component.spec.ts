import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithImgPostComponent } from './with-img-post.component';

describe('WithImgPostComponent', () => {
  let component: WithImgPostComponent;
  let fixture: ComponentFixture<WithImgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithImgPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithImgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
