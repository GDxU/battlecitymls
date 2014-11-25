window.onload=function(){
	cv =  document.getElementById("cv");
	cvx = cv.getContext("2d");
	cv.setAttribute("width", cvx_width);
    cv.setAttribute("height",cvx_height);


	tanks.push(new tank({ismain:1}));
	run_animate();
	move_timer();

	function clear_press_key(){ //松开方向键
		press_key.L=0;
		press_key.R=0;
		press_key.U=0;
		press_key.D=0;
	}

	 document.getElementsByTagName("html")[0].addEventListener("keydown", function (e) {
        var keycode = e.keyCode;
        switch(keycode){
        	case ctr_key.L:
        		clear_press_key();
        		press_key.L=1;
        	break;
        	case ctr_key.R:
        		press_key.R=1;
        	break;
        	case ctr_key.U:
        		clear_press_key();
        		press_key.U=1;
        		break;
        	case ctr_key.D:
        		clear_press_key();
        		press_key.D=1;
        	break;
        }
    }, false);
	  document.getElementsByTagName("html")[0].addEventListener("keyup", function (e) {
	  	 var keycode = e.keyCode;
        switch(keycode){
        	case ctr_key.L:
        		press_key.L=0;
        	break;
        	case ctr_key.R:
        		press_key.R=0;
        	break;
        	case ctr_key.U:
        		press_key.U=0;
        	break;
        	case ctr_key.D:
        		press_key.D=0;
        	break;
        }
	  },false);
}