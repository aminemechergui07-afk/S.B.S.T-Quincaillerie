import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutProduct } from './ajout-product';

describe('AjoutProduct', () => {
  let component: AjoutProduct;
  let fixture: ComponentFixture<AjoutProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
