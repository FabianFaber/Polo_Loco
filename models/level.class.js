class Level{
    enemies;
    clouds;
    backgroundObjects;
    coin;
    bottles;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coin, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.bottles = bottles;
    }
}