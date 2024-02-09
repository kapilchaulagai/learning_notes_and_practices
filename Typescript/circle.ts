import { Calculator } from "./interface";
import { Shape } from "./shape";
export class Circle extends Shape implements Calculator{
    static value: number = 20;
    add(x: number, y: number): void {
        console.log(x+y);
    }
    subtract(x: number, y?: number | undefined): void {
        if(!y) y=3;
        console.log(x-y);
    }
    disp(): void{
        console.log(this.area);
    }
}