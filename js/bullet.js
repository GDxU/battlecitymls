function bullet(opts) {
    this.tankid = 0;
    this.direction = ""
    this.img = "img/tankmissile.gif";

    if (opts) {
        for (var o in opts) {
            this[o] = opts[o];
        }
    }
}
