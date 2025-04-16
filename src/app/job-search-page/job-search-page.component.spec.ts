import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jobSearchPageComponent } from './job-search-page.component';



describe('jobSearchPageComponent', () => {
  let component: jobSearchPageComponent;
  let fixture: ComponentFixture<jobSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [jobSearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(jobSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
