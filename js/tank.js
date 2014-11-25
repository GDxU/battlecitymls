//坦克对象
function tank(opts){	
	this.id=tank_ident++;
	this.img = "img/p1tankU.gif";
	this.position_x =0;
	this.position_y =0;
	this.ismain=0;
	if(opts){
		for(var o in opts){
			this[o] = opts[o];
		}
	}
}

//绘制坦克
tank.prototype.drwa = function(){  
	var beauty = new Image();
	beauty.src = this.img
	cvx.drawImage(beauty, this.position_x, this.position_y,tank_size,tank_size);
}
tank.prototype.move_U=function(){
	this.img =this.img.substring(0, this.img.length-5)+"U.gif"
	this.position_y-=move_px;
	if(this.position_y<0){
		//超出边界
		this.position_y=0;
	}
}
tank.prototype.move_D=function(){
	this.img =this.img.substring(0, this.img.length-5)+"D.gif"
	this.position_y+=move_px;
	if(this.position_y>cvx_height-tank_size){
		//超出边界
		this.position_y=cvx_height-tank_size;
	}
}
tank.prototype.move_L=function(){
	this.img =this.img.substring(0, this.img.length-5)+"L.gif"
	this.position_x-=move_px;
	if(this.position_x<0){
		//超出边界
		this.position_x=0;
	}
}
tank.prototype.move_R=function(){
	this.img =this.img.substring(0, this.img.length-5)+"R.gif"
	this.position_x+=move_px;
	if(this.position_x>cvx_width-tank_size){
		//超出边界
		this.position_x=cvx_width-tank_size;
	}
}

//获得主机控制的坦克
function get_main_tank(){
	for(var i=0;i<tanks.length;i++){
			if(tanks[i].ismain){
				return tanks[i];
			}
	}
}
//移动
function move_timer(){
	move_timer=setInterval(function(){
		var t=get_main_tank();
		if(press_key.L){
			t.move_L();
		}else if(press_key.R){
			t.move_R();
		}else if(press_key.U){
			t.move_U();
		}else if(press_key.D){
			t.move_D();
		}
	},move_speed)
}