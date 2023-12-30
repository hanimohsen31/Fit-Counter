import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExcercisesService } from './../store/excercises.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() img = '';
  @Input() title = '';
  @Input() desc = '';
  @Input() ex = '';

  counterList: any = [];
  listPlaceholder: any[] = [];

  constructor(private ExcercisesService: ExcercisesService) {}

  ngOnInit() {
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage() {
    let curruntList = this.ExcercisesService.allListData.getValue();
    let currunt = curruntList.find((elm: any) => elm?.ex == this.ex);
    console.log(currunt);
    if (currunt) {
      this.counterList = currunt?.counter;
      this.listPlaceholder = currunt?.counter;
    } else {
      this.counterList.push({});
      this.listPlaceholder.push({});
    }
  }

  save() {
    let elm = {
      ex: this.ex,
      img: this.img,
      title: this.title,
      date: new Date().getTime(),
      counter: [...this.counterList],
    };
    this.ExcercisesService.save(this.ex, elm);
  }

  add() {
    this.counterList.push({});
    this.listPlaceholder = JSON.parse(JSON.stringify(this.counterList));
  }

  remove(indx: number) {
    this.listPlaceholder.splice(indx, 1);
    this.counterList.splice(indx, 1);
    this.ExcercisesService.remove(this.ex, indx);

    if (this.counterList.length < 1) {
      this.counterList.push({});
      this.listPlaceholder = JSON.parse(JSON.stringify(this.counterList));
    }
  }

  disabled = false;
  disableButtons() {
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
    }, 1000);
  }
}
