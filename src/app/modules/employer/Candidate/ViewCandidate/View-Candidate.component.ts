import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-candidate-list',
  imports: [CommonModule, RouterLink, FormsModule, NgFor, NgIf],

  templateUrl: './View-Candidate.component.html',
  styleUrls: ['./View-Candidate.component.css']
})
export class ViewCandidates {
  searchText: string = '';
  candidates = [
    { id: 1, name: 'John Doe', experience: 3 },
    { id: 2, name: 'Jane Smith', experience: 5 },
    { id: 3, name: 'Robert Johnson', experience: 2 },
    { id: 4, name: 'Emily Davis', experience: 4 }
  ];

  constructor(private router: Router) {}

  get filteredCandidates() {
    return this.candidates.filter(candidate =>
      candidate.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  sortByExperience() {
    this.candidates.sort((a, b) => b.experience - a.experience);
  }

  viewCandidateDetails(candidateId: number) {
    this.router.navigate(['/candidate', candidateId]);
  }

  acceptCandidate(id: number) {
    console.log('Accepted candidate with ID:', id);
  }

  rejectCandidate(id: number) {
    console.log('Rejected candidate with ID:', id);
  }

}