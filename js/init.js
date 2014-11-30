var resource_length = 0;
var resource_img = {};
window.onload = function () {

    var imgs = [];
    for (var i = 1; i < 12; i++) {
        imgs.push("img/blast" + i + ".gif");
    }
    var tanks_imgs = ["img/p1tank$.gif", "img/enemy2D.gif"];
    for (i = 0; i < tanks_imgs.length; i++) {
        imgs.push(tanks_imgs[0].replace("$", "D"));
        imgs.push(tanks_imgs[0].replace("$", "U"));
        imgs.push(tanks_imgs[0].replace("$", "R"));
        imgs.push(tanks_imgs[0].replace("$", "L"));
    }

    resource_length = imgs.length;
    loadimg(imgs);
    gamerun();
    var gameover_timer = setInterval(function () {
        if (!get_main_tank()) {
            alert("game over!!");
            clearInterval(gameover_timer);
        }
    }, 500)

}
function loadimg(arr_src) {

    for (var i = 0; i < arr_src.length; i++) {
        var imgnode = document.createElement('img');
        imgnode.setAttribute('src', arr_src[i]);
        document.getElementById("resource_img").appendChild(imgnode);
    }
}
function gamerun() {
    cv = document.getElementById("cv");
    cvx = cv.getContext("2d");
    cv.setAttribute("width", cvx_width);
    cv.setAttribute("height", cvx_height);

    tank.new_tank({
        img: "img/enemy2D.gif",
        direction: "D",
        attack_interval: 1000,
        position_x: 700
    });
    tank.new_tank({
        img: "img/enemy2D.gif",
        direction: "D",
        attack_interval: 1000,
        position_x: 170
    });
    tank.new_tank({
        img: "img/enemy2D.gif",
        direction: "D",
        attack_interval: 1000,
        position_x: 300
    });
    tank.new_tank({
        img: "img/enemy2D.gif",
        direction: "D",
        attack_interval: 1000,
        position_x: 300,
        position_y: 300
    });
    tank.new_tank({
        img: "img/enemy2D.gif",
        direction: "D",
        attack_interval: 1000,
        position_y: 600
    });
    setInterval(function () {
        tank.new_tank({
            img: "img/enemy2D.gif",
            direction: "D",
            attack_interval: 1000
        });
    }, 2400);
    tanks.push(new tank({
        ismain: 1,
        move_px: 0.9,
        position_y: cvx_height - tank_size,
        position_x: cvx_width / 2 - tank_size / 2,

    }));
    run_animate();
    move_timer();

    function clear_press_key() { //松开方向键
        press_key.L = 0;
        press_key.R = 0;
        press_key.U = 0;
        press_key.D = 0;
    }

    document.getElementsByTagName("html")[0].addEventListener("keydown", function (e) {
        var keycode = e.keyCode;
        switch (keycode) {
            case ctr_key.L:
                clear_press_key();
                press_key.L = 1;
                e.preventDefault();
                break;
            case ctr_key.R:
                press_key.R = 1;
                e.preventDefault();
                break;
            case ctr_key.U:
                clear_press_key();
                press_key.U = 1;
                e.preventDefault();
                break;
            case ctr_key.D:
                clear_press_key();
                press_key.D = 1;
                e.preventDefault();
                break;
            case ctr_key.Attack:    //发射子弹
                press_key.Attack = 1;
                attack_start();
                e.preventDefault();
                break;
        }
    }, false);
    document.getElementsByTagName("html")[0].addEventListener("keyup", function (e) {
        var keycode = e.keyCode;
        switch (keycode) {
            case ctr_key.L:
                press_key.L = 0;
                break;
            case ctr_key.R:
                press_key.R = 0;
                break;
            case ctr_key.U:
                press_key.U = 0;
                break;
            case ctr_key.D:
                press_key.D = 0;
                break;
            case ctr_key.Attack:    //松开发射子弹
                press_key.Attack = 0;
                attck_stop();
                break;
        }
    }, false);
}