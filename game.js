class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    preload() {
        this.load.image('slug', 'assets/slug.png');
        this.load.image('button', 'assets/button.png');
    }

    create() {
        let background = this.add.rectangle(960,540,1920,1080, '0x000000');
        let slug = this.add.image(2000, 300, 'slug');
        let button = this.add.image(960, 800, 'button');
        button.setScale(0.8);
        let text = this.add.text(700, 300, 'Banana Slug Bounce');
        text.setAlpha(0);
        text.setFontSize(50);

        this.tweens.add({
            targets: slug,
            x: -500,
            duration: 2000
        });

        this.tweens.add({
            targets: text,
            alpha: {from: 0, to: 1},
            delay: 2000,
            duration: 500
        })

        //this doesn't work for some reason?
        background.on('pointerdown', ()=> {this.scene.start('Victory')});
        button.on('pointerdown', ()=> {this.scene.start('Victory')});
        button.on('pointerdown', ()=> {console.log("Button pressed")});

        //until i get that to work this will be a placeholder
        this.time.addEvent({
            delay: 4500,
            loop: false,
            callback: () => {
                this.scene.start('Victory');
            }
        });

    }

}

class Victory extends Phaser.Scene {
    constructor() {
        super('Victory');
    }

    preload() {
        this.load.image('slug', 'assets/slug.png');
        this.load.image('confetti', 'assets/confetti.png');
    }

    create() {
        let background = this.add.rectangle(960,540,1920,1080, '0x000000');
        let slug = this.add.image(960, 300, 'slug');
        let confetti1 = this.add.image(500, 800, 'confetti');
        let confetti2 = this.add.image(1420, 800, 'confetti');
        confetti2.setFlip(true, false);
        
        let text = this.add.text(750, 300, 'You win!');
        text.setAlpha(0);
        text.setFontSize(50);


        this.tweens.add({
            targets: slug,
            angle: slug.angle + 360,
            scale: {from: 1, to: 0.01},
            alpha: {from: 1, to: 0},
            delay: 250
        })

        this.tweens.add({
            targets: text,
            alpha: {from: 0, to: 1},
            scale: {from: 1, to: 1.50},
            delay: 1250,
            duration: 500
        })

        background.on('pointerdown', ()=> {this.scene.start('Title')});

        //until i get that to work this will be a placeholder
        this.time.addEvent({
            delay: 4500,
            loop: false,
            callback: () => {
                this.scene.start('Title');
            }
        });

    }

}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Title, Victory],
    title: "Banana Slug Bounce",
});