/**
Credited all to threejs.org. I love this site so much
*/

var direction = 0;
var npdirection = 0;
var foodStatus = 0;
var xPos = 0;
var yPos = 0;
var apple = null;
var snake = null;
var npsnake = null;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var canvas = document.createElement('canvas');
const context = canvas.getContext('2d');


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 38 && direction !== 3) {
        direction = 2; // Up
    } else if (e.keyCode === 40 && direction !== 2) {
        direction = 3; // Down
    } else if (e.keyCode === 37 && direction !== 0) {
        direction = 1; // Left
    } else if (e.keyCode === 39 && direction !== 1) {
        direction = 0; // Right
    } else {
		direction = direction;
	}
});

//Add light 
var light = new THREE.AmbientLight(0xffee40, 0.4);
scene.add(light);
var light2 = new THREE.PointLight(0xffffff, 1, 100);
light2.position.set(-3,3,3);
scene.add(light2);

//Add material
var material = new THREE.MeshLambertMaterial({
color: 0xF3FFE2,
map: new THREE.TextureLoader().load('https://wma8.github.io/prog4/brick_bump.jpg')
});
var material1 = new THREE.MeshLambertMaterial({
color: 0xF3FFE2,
map: new THREE.TextureLoader().load('https://wma8.github.io/prog4/apple.png')
});
var material2 = new THREE.MeshLambertMaterial({
color: 0xF3FFE2,
map: new THREE.TextureLoader().load('https://wma8.github.io/prog4/grasslight-big.jpg')
});

//Add geometry
var createBox = function() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var cube = new THREE.Mesh( geometry, material );
	return cube;
}
var snakePiece = function(xpos, ypos) {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material3 = new THREE.MeshLambertMaterial({
		color: 0xF3FFE2,
		map: new THREE.TextureLoader().load('https://wma8.github.io/prog4/grasslight-big-nm.jpg')
	});
	var snake = new THREE.Mesh( geometry, material3 );
	snake.position.x = xpos;
	snake.position.y = ypos;
	scene.add(snake);
	return snake;
}
var npsnakePiece = function(xpos, ypos) {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material3 = new THREE.MeshLambertMaterial({
		color: 0xF3FFE2,
		map: new THREE.TextureLoader().load('https://wma8.github.io/prog4/brick_roughness.jpg')
	});
	var snake = new THREE.Mesh( geometry, material3 );
	snake.position.x = xpos;
	snake.position.y = ypos;
	scene.add(snake);
	return snake;
}
var Food = function() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var food = new THREE.Mesh( geometry, material1 );
	return food;
}

// Create walls
for(var i = 0; i < 20; i++) {
	var cube1 = createBox();
	cube1.position.x = -10 + i;
	cube1.position.y = 10;
	scene.add( cube1 );

	var cube2 = createBox();
	cube2.position.x = -10 + i;
	cube2.position.y = -10;
	scene.add( cube2 );

	var cube3 = createBox();
	cube3.position.x = -10 ;
	cube3.position.y = 10 - i;
	scene.add( cube3 );

	var cube4 = createBox();
	cube4.position.x = 10 ;
	cube4.position.y = 10 - i;
	scene.add( cube4 );
}
var cube4 = createBox();
cube4.position.x = 10 ;
cube4.position.y = -10;
scene.add( cube4 );
camera.position.z = 20;
camera.position.y = -10;

// Create base for grids
var geometry = new THREE.PlaneGeometry( 20, 20 );
var plane = new THREE.Mesh( geometry, material2 );
scene.add( plane );

// Create food
var createFood = function()
{
	xPos = Math.round(Math.random() * 17 - 9);
	yPos = Math.round(Math.random() *-17 + 9);
	apple = Food();
	apple.position.x = xPos;
	apple.position.y = yPos;
	scene.add(apple);
	foodStatus = 1;
};

var createUserSnake = function() {
	snake = new Array(4);
	var sxPos = -6;
	var syPos = 3;
	for( var i = 0; i < snake.length; i++) {
		snake[i] = snakePiece(sxPos-i, syPos);
	}
};

var npSnake = function() {
	npsnake = new Array(4);
	var sxPos = -6;
	var syPos = -2;
	for( var i = 0; i < npsnake.length; i++) {
		npsnake[i] = npsnakePiece(sxPos-i, syPos);
	}
};

var move = function() {
	if(direction == 0) {
		for(var i = snake.length - 1; i > 0; i--) {
			snake[i].position.x = snake[i - 1].position.x;
			snake[i].position.y = snake[i - 1].position.y;
		}
		snake[0].position.x += 1;
	} else if (direction == 1) {
		for(var i = snake.length - 1; i > 0; i--) {
			snake[i].position.x = snake[i - 1].position.x;
			snake[i].position.y = snake[i - 1].position.y;
		}
		snake[0].position.x -= 1;
	} else if (direction == 2) {
		for(var i = snake.length - 1; i > 0; i--) {
			snake[i].position.x = snake[i - 1].position.x;
			snake[i].position.y = snake[i - 1].position.y;
		}
		snake[0].position.y += 1
	} else if (direction == 3) {
		for(var i = snake.length - 1; i > 0; i--) {
			snake[i].position.x = snake[i - 1].position.x;
			snake[i].position.y = snake[i - 1].position.y;
		}
		snake[0].position.y -= 1
	}
};

var randomDir = function(){
	var temp = Math.round( (Math.random() * 27606147382) % 4);
	if (temp == 2 && npdirection != 3) {
        npdirection = 2; // Up
    } else if (temp == 3 && npdirection != 2) {
        npdirection = 3; // Down
    } else if (temp == 1 && npdirection != 0) {
        npdirection = 1; // Left
    } else if (temp == 0 && npdirection != 1) {
        npdirection = 0; // Right
    } else {
		npdirection = npdirection;
	}
};

var npmove = function() {
	randomDir();
	console.log(npdirection);
	if(npdirection == 0) {
		for(var i = npsnake.length - 1; i > 0; i--) {
			npsnake[i].position.x = npsnake[i - 1].position.x;
			npsnake[i].position.y = npsnake[i - 1].position.y;
		}
		npsnake[0].position.x += 1;
	} else if (npdirection == 1) {
		for(var i = npsnake.length - 1; i > 0; i--) {
			npsnake[i].position.x = npsnake[i - 1].position.x;
			npsnake[i].position.y = npsnake[i - 1].position.y;
		}
		npsnake[0].position.x -= 1;
	} else if (npdirection == 2) {
		for(var i = npsnake.length - 1; i > 0; i--) {
			npsnake[i].position.x = npsnake[i - 1].position.x;
			npsnake[i].position.y = npsnake[i - 1].position.y;
		}
		npsnake[0].position.y += 1
	} else if (npdirection == 3) {
		for(var i = npsnake.length - 1; i > 0; i--) {
			npsnake[i].position.x = npsnake[i - 1].position.x;
			npsnake[i].position.y = npsnake[i - 1].position.y;
		}
		npsnake[0].position.y -= 1
	}
}

var reborn = function() {
	var temp1 = snake[0].position.x;
	var temp2 = snake[0].position.y;
	if(temp1 <= -10 || temp1 >= 10 || temp2 <= -10 || temp2 >= 10 ) {
		for(var i = 0; i < snake.length; i++) {
			scene.remove(snake[i]);
		}
		direction = 0;
		createUserSnake();
		return;
	}
	for(var i = 1; i < snake.length; i++) {
		if (temp1 == snake[i].position.x && temp2 == snake[i].position.y) {
			for(var i = 0; i < snake.length; i++) {
				scene.remove(snake[i]);
			}
			direction = 0;
			createUserSnake();
			return;
		}
	}
	for(var j = 1; j < npsnake.length; j++) {
		if(temp1 == npsnake[j].position.x && temp2 == npsnake[j].position.y) {
			for(var i = 0; i < snake.length; i++) {
				scene.remove(snake[i]);
			}
			direction = 0;
			createUserSnake();
			return;
		}
	}
	if(temp1 == npsnake[0].position.x && temp2 == npsnake[0].position.y){
		for(var i = 0; i < snake.length; i++) {
				scene.remove(snake[i]);
			}
			direction = 0;
			createUserSnake();
			return;
	}

};

var rebornnp = function() {
	var temp1 = npsnake[0].position.x;
	var temp2 = npsnake[0].position.y;
	if(temp1 <= -10 || temp1 >= 10 || temp2 <= -10 || temp2 >= 10 ) {
		for(var i = 0; i < npsnake.length; i++) {
			scene.remove(npsnake[i]);
		}
		npdirection = 0;
		npSnake();
		return;
	}
	for(var i = 1; i < npsnake.length; i++) {
		if (temp1 == npsnake[i].position.x && temp2 == npsnake[i].position.y) {
			for(var i = 0; i < npsnake.length; i++) {
				scene.remove(npsnake[i]);
			}
			npdirection = 0;
			npSnake();
			return;
		}
		
	}

	for(var j = 1; j < snake.length; j++) {
		if(temp1 == snake[j].position.x && temp2 == snake[j].position.y) {
			for(var i = 0; i < npsnake.length; i++) {
				scene.remove(npsnake[i]);
			}
			npdirection = 0;
			npSnake();
			return;
		}
	}
	if(temp1 == snake[0].position.x && temp2 == snake[0].position.y){
		for(var i = 0; i < npsnake.length; i++) {
			scene.remove(npsnake[i]);
		}
		npdirection = 0;
		npSnake();
	}
};


var eaten = function() {
	if( snake[0].position.x == apple.position.x && snake[0].position.y == apple.position.y ) {
		apple.position.x = Math.round(Math.random() * 17 - 9);
		apple.position.y = Math.round(Math.random() *-17 + 9);
		// Lengthen the snake
		snake.push(snakePiece(snake[snake.length - 1].position.x, snake[snake.length - 1].position.y));

	}
};

var npeaten = function() {
	if( npsnake[0].position.x == apple.position.x && npsnake[0].position.y == apple.position.y ) {
		apple.position.x = Math.round(Math.random() * 17 - 9);
		apple.position.y = Math.round(Math.random() *-17 + 9);
		// Lengthen the snake
		npsnake.push(npsnakePiece(npsnake[npsnake.length - 1].position.x, npsnake[npsnake.length - 1].position.y));

	}
};
var animate = function () {

	window.setTimeout(function(){

		requestAnimationFrame( animate );
		move();
		eaten();
		reborn();
		npmove();
		npeaten();
		rebornnp();
		renderer.render( scene, camera );	
	}, 500)


};
createFood();
createUserSnake();
npSnake();
animate();
