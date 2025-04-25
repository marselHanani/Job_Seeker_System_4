import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListingsComponent } from './Job-Listings.component';

describe('JobListingsComponent', () => {
  let component: JobListingsComponent;
  let fixture: ComponentFixture<JobListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobListingsComponent]
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
