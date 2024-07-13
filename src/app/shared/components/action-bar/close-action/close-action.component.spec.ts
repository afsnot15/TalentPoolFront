import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseActionComponent } from './close-action.component';

describe('CloseActionComponent', () => {
  let component: CloseActionComponent;
  let fixture: ComponentFixture<CloseActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
