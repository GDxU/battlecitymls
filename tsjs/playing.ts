module game {
    //游戏场景
    export class playing {
        //Spirits
        private spirits: spirit[] = [];
        //添加Spirit
        addSpirit = (tank: spirit) => {
            this.spirits.push(tank);
        };
        //删除Spirit
        removeSpirit = (tank: spirit) => {
            this.spirits.filter(function (value) {
                if (value.id === tank.id) {
                    return false;
                }
                return true;
            });
        };
        //添加事件
        addEventListener = (name: string, handler: Function) => {
            switch (name) {


            }
        };

        private canvas: HTMLCanvasElement;
        width: number;
        height: number;
        fps = 10000 / 60;
        lasttime = new Date()
        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
        }
    }
}