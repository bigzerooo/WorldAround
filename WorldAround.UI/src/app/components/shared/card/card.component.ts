import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageHelper } from 'src/app/helpers/image-helper';
import { CardModel } from 'src/app/models/cards/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() model: CardModel;

  readonly noImageUrl: string = 'https://demofree.sirv.com/nope-not-here.jpg';

  @ViewChild("avatar", { static: true })
  private avatarRef: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
    this.model.description = this.cropText(this.model.description, 100);
    this.avatarRef.nativeElement.style.setProperty('background-image', `url(${this.model.avatarPath ?? ImageHelper.noUserImage})`);
  }

  private cropText(text: string, maxSymbols: number) {

    if(maxSymbols <= 0)
    {
      maxSymbols = 3;
    }

    if(text?.length > maxSymbols) {
      text = text.substring(0, maxSymbols-3) + '...';
    }

    return text;
  }
}
