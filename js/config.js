var ctr_key = {   //对应键盘按钮
    L: 37,
    D: 40,
    U: 38,
    R: 39,
    Attack: 65
},
press_key = {		//长按状态的按钮
    L: 0,
    D: 0,
    U: 0,
    R: 0,
    Attack: 0
}
Hz = 1000 / 30, //刷新频率
tanks = [],	//当前游戏所有坦克
bullets = [], //当前游戏所有子弹
Hz_timer = null,	//刷新定时器
move_timer = null,	//移动定时器
attack_timer = null,	//攻击定时器
move_speed = 1,	//坦克移动频率
cv = null,
cvx = null,
cvx_width = 1000, //canvas宽度
cvx_height = 700, //canvas高度
tank_size = 60, //坦克大小
bullet_size = 15, //坦克大小
bullet_ident=1,  //子弹自增标识
tank_ident = 1, //坦克自增标识
bullet_move_speed = 5;	//子弹移动频率
