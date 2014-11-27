window.onload = function () {
    cv = document.getElementById("cv");
    cvx = cv.getContext("2d");
    cv.setAttribute("width", cvx_width);
    cv.setAttribute("height", cvx_height);
    for (var i = 0; i < 20; i++) {
        setTimeout(function () {
            tanks.push(new tank({
                img: "img/enemy2D.gif",
                attack_interval: 1000
            }));
        },i*1000)
       
    }
    tanks.push(new tank({
        ismain: 1,
        move_px: 1.5,
        position_y: cvx_height - tank_size,
        position_x: cvx_width / 2 - tank_size / 2
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
                break;
            case ctr_key.R:
                press_key.R = 1;
                break;
            case ctr_key.U:
                clear_press_key();
                press_key.U = 1;
                break;
            case ctr_key.D:
                clear_press_key();
                press_key.D = 1;
                break;
            case ctr_key.Attack:    //发射子弹
                press_key.Attack = 1;
                attack_start();
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