import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { SimulationService } from '../service/simulation.service';
import { Vector2D } from '../types/types';

@Component({
  selector: 'app-py',
  templateUrl: './py.component.html',
  styleUrls: ['./py.component.scss']
})
export class PyComponent implements OnInit {

  public points = 1000;
  public py = 0;
  public loader = false;
  public error = false;
  public callbackLimit: number;
  private limit = 50000;

  constructor(
    private api: ApiService,
    private simulationService: SimulationService
  ) { }

  ngOnInit(): void {
    this.simulationService.simulation.pi$.subscribe(p => this.py = p);
    this.api.pointsEmitted().subscribe((data: Vector2D[]) => {

      this.simulationService.simulation.nextPoints(data);

      this.callbackLimit -= data.length;
      if (this.callbackLimit === 0) {
        this.loader = false;
        return;
      }
      if (this.callbackLimit > this.limit) {
        this.api.getRandomPoints(this.limit);
      } else {
        this.api.getRandomPoints(this.callbackLimit);
      }
    });
  }

  generate() {
    if (this.points >= 1000) {
      this.loader = true;
      this.callbackLimit = this.points;
      if (this.callbackLimit > this.limit) {
        this.api.getRandomPoints(this.limit);
      } else {
        this.api.getRandomPoints(this.callbackLimit);
      }
    } else {
      this.points = this.points < 1000 ? 1000 : this.points;
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 1000);
    }
  }

}
