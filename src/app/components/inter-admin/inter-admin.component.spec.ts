import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterAdminComponent } from './inter-admin.component';

describe('InterAdminComponent', () => {
  let component: InterAdminComponent;
  let fixture: ComponentFixture<InterAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
