import { Injectable } from '@angular/core';
import { SimulationInteraction, Vector2D } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  public readonly simulation: SimulationInteraction = new SimulationInteraction();
  private total = 0;
  private inside = 0;

  constructor() {
    this.simulation.points$.subscribe((vec: Vector2D[]) => {
      this.evaluatePy(vec);
    });
  }

  private evaluatePy(vec: Vector2D[]) {
    this.inside += vec.filter(p => Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2)) <= 1).length;
    this.total += vec.length;
    this.simulation.nextPy((this.inside / this.total) * 4);
  }
}
