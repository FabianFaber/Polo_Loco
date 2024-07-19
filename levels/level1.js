const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],

    [
        new Cloud(),
    ],

    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

    ],

    [
        new Coin('img/8_coin/coin_1.png', 700, 200),
        new Coin('img/8_coin/coin_1.png', 1650, 150),
        new Coin('img/8_coin/coin_1.png', 1200, 130),
        new Coin('img/8_coin/coin_1.png', 1420, 150),
        new Coin('img/8_coin/coin_1.png', 830, 170),
        new Coin('img/8_coin/coin_1.png', 2040, 136),
        new Coin('img/8_coin/coin_1.png', 1990, 190),
        new Coin('img/8_coin/coin_1.png', 500, 130),
        new Coin('img/8_coin/coin_1.png', 900, 160),
        new Coin('img/8_coin/coin_1.png', 1700, 170),
    ],

    [
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 250, 150),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 390, 120),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 500, 170),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 780, 140),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 930, 170),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1190, 130),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1320, 160),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1600, 150),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 1850, 100),
        new Bottles('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 2000, 180),

    ],
);