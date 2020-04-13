import { Component, OnInit, Input } from '@angular/core';
import { TYPE_OF_SKINS } from 'src/app/models/labels';
import { SkinPredictService } from 'src/app/skin-predict.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss'],
})
export class ResultViewComponent implements OnInit {
  @Input() predictions: number[] = null;
  public labels = TYPE_OF_SKINS;
  constructor(private service: SkinPredictService) {}

  ngOnInit(): void {
    this.service.skinPrediction.subscribe(
      (skins) => (this.predictions = skins)
    );
  }
}
