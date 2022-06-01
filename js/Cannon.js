class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.cannonimage = loadImage ("assets/canon.png")
    this.cannonbaseimage = loadImage ("assets/cannonBase.png")
  }
  show (){
    image (this.cannonbaseimage, 70, 20, 200, 200)
    push ()
    imageMode (CENTER)
    image (this.cannonimage, this.x, this.y, this.width, this.height)
    pop ()
  }
}
