//坦克对象
function tank(opts) {
    this.id = tank_ident++;
    this.img = "img/p1tankU.gif";
    this.position_x = 0;
    this.position_y = 0;
    this.move_px = 0.7;
    this.ismain = 0;    //是否是主机控制
    this.attack_interval = 500; //攻击间隔
    this.attack_timer = null;   //攻击计时器
    this.direction = "U";    //所朝方向
    if (opts) {
        for (var o in opts) {
            this[o] = opts[o];
        }
    }

    //智能电脑
    if (!this.ismain) {
        setInterval((function ($t) {
            return function () {
                var mn = get_main_tank();
                //自动行走 走 x 或 y
                if (Math.abs($t.position_x - mn.position_x) > tank_size / 3) {
                    //走x
                    if ($t.position_x < mn.position_x) {
                        $t.move_R();
                    } else {
                        $t.move_L();
                    }
                } else {
                    //y
                    if ($t.position_y < mn.position_y) {
                        $t.move_D();
                    } else {
                        $t.move_U();
                    }
                }

                //攻击
                $t.attack();
            }
        })(this), 1)
    }


}

//绘制坦克
tank.prototype.drwa = function () {
    var beauty = new Image();
    beauty.src = this.img
    cvx.drawImage(beauty, this.position_x, this.position_y, tank_size, tank_size);
}
tank.prototype.move_U = function () {
    var temp_positon = this.position_y;
    this.img = this.img.substring(0, this.img.length - 5) + "U.gif";
    this.direction = "U";
    this.position_y -= this.move_px;
    if (this.position_y < 0) {
        //超出边界
        this.position_y = 0;
    }
    //判断碰撞
    if (move_collision_judge.call(this)) {
        this.position_y = temp_positon;
    }
}
tank.prototype.move_D = function () {
    var temp_positon = this.position_y;
    this.img = this.img.substring(0, this.img.length - 5) + "D.gif"
    this.direction = "D";
    this.position_y += this.move_px;
    if (this.position_y > cvx_height - tank_size) {
        //超出边界
        this.position_y = cvx_height - tank_size;
    }
    //判断碰撞
    if (move_collision_judge.call(this)) {
        this.position_y = temp_positon;
    }
}
tank.prototype.move_L = function () {
    var temp_positon = this.position_x;
    this.img = this.img.substring(0, this.img.length - 5) + "L.gif"
    this.direction = "L";
    this.position_x -= this.move_px;
    if (this.position_x < 0) {
        //超出边界
        this.position_x = 0;
    }
    //判断碰撞
    if (move_collision_judge.call(this)) {
        this.position_x = temp_positon;
    }
}
tank.prototype.move_R = function () {
    var temp_positon = this.position_x;
    this.img = this.img.substring(0, this.img.length - 5) + "R.gif"
    this.direction = "R";
    this.position_x += this.move_px;
    if (this.position_x > cvx_width - tank_size) {
        //超出边界
        this.position_x = cvx_width - tank_size;
    }
    //判断碰撞
    if (move_collision_judge.call(this)) {
        this.position_x = temp_positon;
    }
}

//攻击
tank.prototype.attack = function () {
    //判断攻击间隔
    if (this.attack_timer)
        return;
    function attack_gauge($t) {
        return function () {
            clearTimeout($t.attack_timer)
            $t.attack_timer = null;
        }
    }
    this.attack_timer = setTimeout(attack_gauge(this), this.attack_interval);

    var x = this.position_x;
    var y = this.position_y;
    switch (this.direction) {
        case "U":
            x += tank_size / 2 - bullet_size / 2;
            break;
        case "D":
            x += tank_size / 2 - bullet_size / 2;
            y += tank_size - bullet_size;
            break;
        case "L":
            y += tank_size / 2 - bullet_size / 2;
            break;
        case "R":
            y += tank_size / 2 - bullet_size / 2;
            x += tank_size - bullet_size;
            break;
    }
    bullets.push(new bullet({
        tankid: this.id,
        direction: this.direction,
        position_x: x,
        position_y: y
    }));
}

//获得主机控制的坦克
function get_main_tank() {
    for (var i = 0; i < tanks.length; i++) {
        if (tanks[i].ismain) {
            return tanks[i];
        }
    }
}
//移动
function move_timer() {
    move_timer = setInterval(function () {
        var t = get_main_tank();
        if (press_key.L) {
            t.move_L();
        } else if (press_key.R) {
            t.move_R();
        } else if (press_key.U) {
            t.move_U();
        } else if (press_key.D) {
            t.move_D();
        }
    }, move_speed);
}
//坦克移动时碰撞判定
function move_collision_judge() {
    //当前移动的坦克四个角所在位置
    var x1 = this.position_x,
    x2 = this.position_x + tank_size,
    y1 = this.position_y,
    y2 = this.position_y + tank_size,
    collision = false;//是否发生碰撞

    for (var i = 0; i < tanks.length; i++) {
        var t = tanks[i];
        if (t.id != this.id) {
            //坦克四个角所在位置
            var t_x1 = t.position_x,
            t_x2 = t.position_x + tank_size,
            t_y1 = t.position_y,
            t_y2 = t.position_y + tank_size;

            //在坦克的x中间 判断y是不是也在坦克的y中间，是则发生碰撞
            //判断四个角
            if ((t_x1 < x1 && x1 < t_x2) && (t_y1 < y1 && y1 < t_y2)) {
                collision = true;
            } else if ((t_x1 < x2 && x2 < t_x2) && (t_y1 < y1 && y1 < t_y2)) {
                collision = true;
            } else if ((t_x1 < x1 && x1 < t_x2) && (t_y1 < y2 && y2 < t_y2)) {
                collision = true;
            } else if ((t_x1 < x2 && x2 < t_x2) && (t_y1 < y2 && y2 < t_y2)) {
                collision = true;
            }
        }
    }
    return collision;
}

//长按攻击
function attack_start() {
    if (attack_timer)
        return;
    get_main_tank().attack();
    attack_timer = setInterval(function () {
        if (!press_key.Attack)
            return;
        get_main_tank().attack();
    }, 100);
}
//松开攻击
function attck_stop() {
    clearInterval(attack_timer);
    attack_timer = null;
}