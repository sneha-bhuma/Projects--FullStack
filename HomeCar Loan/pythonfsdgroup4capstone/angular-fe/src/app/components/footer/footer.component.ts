import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const accordionOpen = document.querySelectorAll('.first_depth p');

    accordionOpen.forEach((element) => {
      element.addEventListener('click', () => {
        document.querySelectorAll('.first_depth').forEach((item) => {
          item.classList.remove('on');
        });
        const parent = element.closest('.first_depth');
        if (parent) {
          parent.classList.add('on');
        }
      });
    });
  }
}
