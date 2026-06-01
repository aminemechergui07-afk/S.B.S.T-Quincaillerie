import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutNews } from './ajout-news';

describe('AjoutNews', () => {
  let component: AjoutNews;
  let fixture: ComponentFixture<AjoutNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutNews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
