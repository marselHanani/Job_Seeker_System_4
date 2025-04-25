import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ViewCandidates } from './View-Candidate.component';



describe('CandidateListComponent', () => {
  let component: ViewCandidates;
  let fixture: ComponentFixture<ViewCandidates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCandidates],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCandidates);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default candidate list', () => {
    const candidateCards = fixture.debugElement.queryAll(By.css('.card'));
    expect(candidateCards.length).toBe(4);
  });

  it('should filter candidates when search input is used', () => {
    const searchInput = fixture.debugElement.query(By.css('input')).nativeElement;
    searchInput.value = 'John';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const filteredCards = fixture.debugElement.queryAll(By.css('.card'));
    expect(filteredCards.length).toBe(1);
    expect(filteredCards[0].nativeElement.textContent).toContain('John Doe');
  });

  it('should sort candidates by experience when sort button is clicked', () => {
    const sortButton = fixture.debugElement.query(By.css('button')).nativeElement;
    sortButton.click();
    fixture.detectChanges();

    const firstCandidate = fixture.debugElement.query(By.css('.card-title'));
    expect(firstCandidate.nativeElement.textContent).toContain('Jane Smith');
  });

  it('should display "No candidates found" when no matches exist', () => {
    const searchInput = fixture.debugElement.query(By.css('input')).nativeElement;
    searchInput.value = 'Nonexistent';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.alert'));
    expect(emptyMessage.nativeElement.textContent).toContain('No candidates found');
  });
});
