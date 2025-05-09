import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingsComponent } from './job-listing.component';

describe('JobListingComponent', () => {
  let component: JobListingsComponent;
  let fixture: ComponentFixture<JobListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
