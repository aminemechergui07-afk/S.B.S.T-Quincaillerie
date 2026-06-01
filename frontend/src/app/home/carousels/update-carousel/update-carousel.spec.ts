import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarousel } from './update-carousel';

describe('UpdateCarousel', () => {
  let component: UpdateCarousel;
  let fixture: ComponentFixture<UpdateCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
