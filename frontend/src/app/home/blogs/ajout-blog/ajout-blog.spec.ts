import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBlog } from './ajout-blog';

describe('AjoutBlog', () => {
  let component: AjoutBlog;
  let fixture: ComponentFixture<AjoutBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
