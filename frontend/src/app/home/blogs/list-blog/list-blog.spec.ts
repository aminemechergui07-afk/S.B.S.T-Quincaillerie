import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBlog } from './list-blog';

describe('ListBlog', () => {
  let component: ListBlog;
  let fixture: ComponentFixture<ListBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
