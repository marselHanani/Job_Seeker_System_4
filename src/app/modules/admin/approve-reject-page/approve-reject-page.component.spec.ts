import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectPageComponent } from './approve-reject-page.component';

describe('ApproveRejectPageComponent', () => {
  let component: ApproveRejectPageComponent;
  let fixture: ComponentFixture<ApproveRejectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveRejectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRejectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
