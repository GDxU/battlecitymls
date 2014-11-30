function bullet(opts) {
    this.id = bullet_ident++;
    this.tankid = 0;
    this.ismain = 1;
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
                    if ($t.position_y < 0) {
                        //超出边界
                        $t.del();
                    }
                    break;
                case "D":
                    $t.position_y += $t.move_px;
                    if ($t.position_y > cvx_height) {
                        //超出边界
                        $t.del();
                    }
                    break;
                case "L":
                    $t.position_x -= $t.move_px;
                    if ($t.position_x < 0) {
                        //超出边界
                        $t.del();
                    }
                    break;
                case "R":
                    $t.position_x += $t.move_px;
                    if ($t.position_x > cvx_width) {
                        //超出边界
                        $t.del();
                    }
                    break;
            }
            $t.collision_judge();
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
bullet.prototype.del = function () {
    clearInterval(this.bullet_run_timer);
    bullets = arr_removebyid(bullets, this.id);
}
bullet.prototype.collision_judge = function () {
    //当前移动的坦克四个角所在位置
    var x1 = this.position_x,
    x2 = this.position_x + bullet_size,
    y1 = this.position_y,
    y2 = this.position_y + bullet_size;
    for (var i = 0; i < tanks.length; i++) {
        var t = tanks[i];
        if (this.ismain != t.ismain) {
            var t_x1 = t.position_x,
            t_x2 = t.position_x + tank_size,
            t_y1 = t.position_y,
            t_y2 = t.position_y + tank_size;
            if ((t_x1 < x1 && x1 < t_x2) && (t_y1 < y1 && y1 < t_y2)) {
                t.del();
                this.del();
            } else if ((t_x1 < x2 && x2 < t_x2) && (t_y1 < y1 && y1 < t_y2)) {
                t.del();
                this.del();
            } else if ((t_x1 < x1 && x1 < t_x2) && (t_y1 < y2 && y2 < t_y2)) {
                t.del();
                this.del();
            } else if ((t_x1 < x2 && x2 < t_x2) && (t_y1 < y2 && y2 < t_y2)) {
                t.del();
                this.del();
            }
        }
    }
}

bullet.prototype.get_tank = function () {
    for (var i = 0; i < tanks.length; i++) {
        if (this.tankid == tanks[i].id)
            return tanks[i];
    }
}