import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  currentDate = new Date();

  constructor() { }

  ngOnInit(): void {
  }
}
