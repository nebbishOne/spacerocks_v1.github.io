SpaceRocks.HighScores = function(game) {
  this.highscoretitle;
  this.yourscoretitle;
  this.newhighmessage;
  this.overmessage;
  this.timer;
  this.control;
};

SpaceRocks.HighScores.prototype = {
    
    create: function () {
      this.bg = this.add.sprite(0,0,'bg');
      this.bg.z = 0;
      
      if (!this.game.device.localStorage) {
        console.log('!!!!!!!!!! Cannot set high score - no local storage !!!!!!!!!!');   
      } else {
        var phs = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : '0';
        var ns = localStorage.getItem('newestScore') ? localStorage.getItem('newestScore') : 0;
        
    		this.highscoretitle = this.add.bitmapText(200,50, 'eightbitwonder', 'Previous High Score: ' + phs, 20);
    		this.yourscoretitle = this.add.bitmapText(200,100, 'eightbitwonder', 'Your Score: ' + ns, 20);
        phs = parseInt(phs, 10);
        ns = parseInt(ns, 10);
        if (ns > phs) {
                console.log('HighScores: replacing high score with newest score');
                localStorage.setItem('highScore', ns);
                this.newhighmessage = this.add.bitmapText(200,150, 'eightbitwonder', 'You got the new high score!!!', 15);
    		} else { 
            //alert('ns ' + ns + ' is less than phs ' + phs + ' so not a new high score');
            this.newhighmessage = this.add.bitmapText(200,150, 'eightbitwonder', 'Try again...', 15);
    		}
      }
  		
  		this.overmessage = this.add.bitmapText(200, 300, 'eightbitwonder', 'Press Space to Play Again', 20);
          this.overmessage.align = 'center';
          this.overmessage.inputEnabled = true;
          this.overmessage.events.onInputDown.addOnce(this.quitGame, this);
          this.timer = this.time.now + 3000;
	},
	
	quitGame: function(pointer) {
        this.state.start('StartMenu');
    },

	update: function () {
	    if (this.timer < this.time.now) {
            this.control = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.control.onDown.add(this.quitGame, this);
            this.timer = null;
        }
	}
};
