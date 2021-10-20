function setDamage(max, min) {
    return Math.floor(Math.random() * (max-min) + min)
}
function setHeal(max, min) {
    return Math.floor(Math.random() * (max-min) + min)
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }

    },
    watch: {
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <=0) {
                //draw
                this.winner = 'draw';
            } else if (value <=0) {
                //player lost
                this.winner = 'monster';

            }

        },
        monsterHealth(value){
            if(value <=0 && this.playerHealth <=0) {
                //draw
                this.winner = 'draw';

            } else if (value <=0) {
                //monster lost
                this.winner = 'player';

            }
        }
    },
    computed: {
        monsterBarSyles() {
            if(this.monsterHealth < 0) {
                return {width: '0%'}
            } else {
                return {width: this.monsterHealth + '%'}
            }
        },
        playerBarSyles() {
            if(this.playerHealth < 0) {
                return {width: '0%'}
            } else {
                return {width: this.playerHealth + '%'}
            }
        },
        specialAttackEnabled() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
          const damage =  setDamage(12,5);
             this.monsterHealth = this.monsterHealth - damage;
            this.addLogMessage('player', 'attack', damage);
             this.attackPlayer();
        },
        attackPlayer() {
            const damage = setDamage(15,8)
            this.playerHealth = this.playerHealth - damage;
            this.addLogMessage('monster', 'attack', damage);
        },
        specialAttackMonster(){
            this.currentRound++;
            const damage = setDamage(25,10);
            this.monsterHealth -= damage;
            this.addLogMessage('player', 's-attack', damage);
            this.addLogMessage('player', 's-attack', damage);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = setHeal(20,8);
           if(this.playerHealth + healValue > 100) {
               this.playerHealth = 100
           } else {
               this.playerHealth += healValue;
           }

            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
        },
        startGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }

    }
}).mount('#game')
