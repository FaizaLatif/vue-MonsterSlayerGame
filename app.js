function setDamage(max, min) {
    return Math.floor(Math.random() * (max-min) + min)
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
        }

    },
    computed: {
        monsterBarSyles() {
            return {width: this.monsterHealth + '%'}
        },
        playerBarSyles() {
            return {width: this.playerHealth + '%'}
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
             this.attackPlayer();
        },
        attackPlayer() {
            const damage = setDamage(15,8)
            this.playerHealth = this.playerHealth - damage;
        },
        specialAttackMonster(){
            this.currentRound++;
            const damage =  setDamage(25,10);
            this.monsterHealth -= damage;
            this.attackPlayer();

        }

    }
}).mount('#game')
