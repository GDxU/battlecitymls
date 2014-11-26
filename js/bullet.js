function bullet(opts) {
    this.tankid = 0;
    this.direction = "";
    this.img = "img/tankmissile.gif";
    this.position_x = 0;
    this.position_y = 0;
    this.move_px = 2;
    if (opts) {
        for (var o in opts) {
            this[o] = opts[o];
        }
    }
    //移动定时器    此处有内存泄漏--后面修改
    var timerfun = function ($t) {
        return function () {
            switch ($t.direction) {
                case "U":
                    $t.position_y -= $t.move_px;
                    break;
                case "D":
                    $t.position_y += $t.move_px;
                    break;
                case "L":
                    $t.position_x -= $t.move_px;
                    break;
                case "R":
                    $t.position_x += $t.move_px;
                    break;
            }
        }
    }
    this.bullet_run_timer = setInterval(timerfun(this), bullet_move_speed);
}
//绘制子弹
bullet.prototype.drwa = function () {
    var beauty = new Image();
    beauty.src = this.img;
    cvx.drawImage(beauty, this.position_x, this.position_y, bullet_size, bullet_size);
}
