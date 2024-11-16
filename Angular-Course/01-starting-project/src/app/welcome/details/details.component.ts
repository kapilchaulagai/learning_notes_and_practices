import { Component } from '@angular/core';
import { HighlightDirective } from 'src/app/shared/highlight.directive';
import { AnalyticsService } from 'src/app/shared/analytics.service';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  //providers: [AnalyticsService]
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
