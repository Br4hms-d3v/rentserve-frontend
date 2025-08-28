import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialByIdComponent } from './material-by-id.component';

describe('MaterialByIdComponent', () => {
  let component: MaterialByIdComponent;
  let fixture: ComponentFixture<MaterialByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
