function run_animate(){
	Hz_timer =setInterval(function(){
		cvx.clearRect(0, 0,cvx_width,cvx_height);
		for(var i=0;i<tanks.length;i++){
			tanks[i].drwa();
		}
	},Hz)
}

