import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialByCategoryComponent } from './material-by-category.component';

describe('MaterialByCategoryComponent', () => {
  let component: MaterialByCategoryComponent;
  let fixture: ComponentFixture<MaterialByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
