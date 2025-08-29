import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSearchMaterialComponent } from './filter-search-material.component';

describe('FilterSearchMaterialComponent', () => {
  let component: FilterSearchMaterialComponent;
  let fixture: ComponentFixture<FilterSearchMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterSearchMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterSearchMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
