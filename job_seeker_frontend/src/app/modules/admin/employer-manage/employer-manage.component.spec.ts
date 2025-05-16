import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerManageComponent } from './employer-manage.component';

describe('EmployerManageComponent', () => {
  let component: EmployerManageComponent;
  let fixture: ComponentFixture<EmployerManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
