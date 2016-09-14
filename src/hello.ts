class Point {
  x: number;
  y: number;
  constructor(x: number,y: number) {
    this.x = x;
    this.y = y;
  }
  toString(): string {
    return "(" + this.x + "," + this.y + ")";
  }
}

function main() {
  const pt = new Point(10,20);

  console.log('Hello, TypeScript!');
  console.log('pt is ' + pt);
}

main();
