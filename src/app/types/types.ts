import { Observable, Subject } from 'rxjs';

export interface Vector2D {
    x: number;
    y: number;
}

export class SimulationInteraction {
    private pi: Subject<number> = new Subject<number>();
    public pi$: Observable<number> = this.pi.asObservable();

    private points: Subject<Vector2D[]> = new Subject<Vector2D[]>();
    public points$: Observable<Vector2D[]> = this.points.asObservable();

    nextPoints(elem: Vector2D[]) {
        this.points.next(elem);
    }

    nextPy(elem: number) {
        this.pi.next(elem);
    }
}
