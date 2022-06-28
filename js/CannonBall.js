class CannonBall {
    constructor(x,y){

        this.r =30
        this.body = Bodies.circle(x,y, this.r, {isStatic:true});
        this.image = loadImage ("assets/cannonball.png");
        this.trajectory = [];  // add variável que receberá a trajetória da bola
        World.add(world, this.body);
    }

    lance(){
        var newAngle = cannon.angle -28
        newAngle = newAngle *(3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle); //the desired angle, in radians
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, { x:velocity.x *(180/3.14), y: velocity.y * (180/3.14)});
    }

    remove(index) {
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    
        setTimeout(() => {
          Matter.World.remove(world, this.body);
          delete balls[index];
        }, 1000);
    }

    show (){
        var pos = this.body.position;
        push ();
        imageMode(CENTER);
        image ( this.image, this.body.position.x, this.body.position.y,this.r, this.r );
        pop ();
        
         // Additional Activity
        if(this.body.velocity.x > 0 && pos.x > 180){
            var position = [pos.x, pos.y];  //pego a posição
            this.trajectory.push(position); // e add na matriz
        }

            // adicionando a imagem da trajetória: 
        for (var i = 0; i < this.trajectory.length; i++) {
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
        }  // é a mesma imagem da bala, porém em tamanho menor! 


    }
}