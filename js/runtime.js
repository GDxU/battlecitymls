function run_animate() {
    Hz_timer = setInterval(function() {
        cvx.clearRect(0, 0, cvx_width, cvx_height);
        for (var i = 0; i < tanks.length; i++) {
            tanks[i].drwa();
        }
        for (i = 0; i < bullets.length; i++) {
            bullets[i].drwa();
        }
    }, Hz);
}

function arr_removebyid(arr,id) {
    var temp_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id != id) {
            temp_arr.push(arr[i]);
        } else {
            arr[i] = null;
        }
    }
    return temp_arr
}