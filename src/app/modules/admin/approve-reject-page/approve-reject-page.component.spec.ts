import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectEmployersComponent } from './approve-reject-page.component';

describe('ApproveRejectPageComponent', () => {
  let component: ApproveRejectEmployersComponent;
  let fixture: ComponentFixture<ApproveRejectEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveRejectEmployersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRejectEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
