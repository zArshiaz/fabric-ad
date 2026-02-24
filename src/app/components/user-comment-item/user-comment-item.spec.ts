import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentItem } from './user-comment-item';

describe('UserCommentItem', () => {
  let component: UserCommentItem;
  let fixture: ComponentFixture<UserCommentItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommentItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommentItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
