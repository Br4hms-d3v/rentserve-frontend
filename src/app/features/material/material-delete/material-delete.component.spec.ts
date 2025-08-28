import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDeleteComponent } from './material-delete.component';

describe('MaterialDeleteComponent', () => {
  let component: MaterialDeleteComponent;
  let fixture: ComponentFixture<MaterialDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
