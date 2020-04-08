var config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 576,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300},
			debug: false
		}
	},
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
}

var game = new Phaser.Game(config);

function init(){
	var platforms;
	var player;
	var cursors;
	var ration;
	var arme;
}

function preload(){
	this.load.image('arr','assets/main_background.png');
	this.load.image('sol','assets/ground.png');
	this.load.spritesheet('perso','assets/Pistol.png', {frameWidth: 15, frameHeight: 31});
	this.load.image('ration', 'assets/brownie.png');
	this.load.image('arme', 'assets/Carbine.png');

}


function create(){
	this.add.image(512,288, 'arr');
	platforms = this.physics.add.staticGroup();
	platforms.create(35,570, 'sol').refreshBody();
	platforms.create(989,570, 'sol').refreshBody();
	platforms.create(512,570, 'sol').refreshBody();
	platforms.create(200,545, 'sol').refreshBody();
	platforms.create(350,545, 'sol').refreshBody();
	platforms.create(660,545, 'sol').refreshBody();
	platforms.create(780,525, 'sol').refreshBody();
	player = this.physics.add.sprite(15,500,'perso');
	player.setCollideWorldBounds(false);
	cursors = this.input.keyboard.createCursorKeys();
	this.physics.add.collider(player,platforms);
	player.body.setGravityY(1);
	cursors = this.input.keyboard.createCursorKeys();
	arme = this.physics.add.image(990 , 500,'arme');
	this.physics.add.collider(arme,platforms);
	ration = this.physics.add.group({
		key: 'ration',
		repeat: 5,
		setXY: { x: 100, y: 0, stepX: 155 }
	});
	ration.children.iterate(function(child){
		child.setBounceY(Phaser.Math.FloatBetween(0.5, 0.8));
	});
	this.physics.add.collider(ration,platforms);
	this.physics.add.overlap(player, ration, collectRation, null, this);
	function collectRation (player, ration){
		ration.disableBody(true, true);
	};	
} 

function update(){
	if(cursors.left.isDown){
		player.setVelocityX(-200);
		player.setFlipX(true);
	}
	else if (cursors.right.isDown){
		player.setVelocityX(200);
		player.setFlipX(false);
	}
	else{
		player.setVelocityX(0);
	}
	if(cursors.up.isDown && player.body.touching.down){
		player.setVelocityY(-150)
	}
}