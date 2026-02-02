import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmisionFacturas } from './emision-facturas';

describe('EmisionFacturas', () => {
  let component: EmisionFacturas;
  let fixture: ComponentFixture<EmisionFacturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmisionFacturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmisionFacturas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
