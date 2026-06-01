import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlog } from './detail-blog';

describe('DetailBlog', () => {
  let component: DetailBlog;
  let fixture: ComponentFixture<DetailBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
