import { Shape } from "./shape";
export class Circle extends Shape {
    add(x, y) {
        console.log(x + y);
    }
    subtract(x, y) {
        if (!y)
            y = 3;
        console.log(x - y);
    }
    disp() {
        console.log(this.area);
    }
}
Circle.value = 20;
