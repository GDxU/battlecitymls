var ctr_key={   //对应键盘按钮
	L:37,
	D:40,
	U:38,
	R:39
},
press_key={		//长按状态的按钮
	L:0,
	D:0,
	U:0,
	R:0
}
Hz=1000/30, //刷新频率
tanks=[],	//当前游戏的坦克数量
Hz_timer=null,	//刷新定时器
move_timer=null,	//移动定时器
move_speed=1,	//移动频率
move_px=2;		//每次移动像素
cv = null,
cvx = null,
cvx_width=1000, //canvas宽度
cvx_height=700,	//canvas高度
tank_size=60,	//坦克大小
tank_ident=1;	//C

