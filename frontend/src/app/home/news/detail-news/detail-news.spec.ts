import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNews } from './detail-news';

describe('DetailNews', () => {
  let component: DetailNews;
  let fixture: ComponentFixture<DetailNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailNews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
