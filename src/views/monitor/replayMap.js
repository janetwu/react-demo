
import remoteLoad from '@/utils/remoteLoad'
import { data } from './data'

const MAP_KEY = '75116f653f3b2e4568116dad8cd9b899'

export default class ReplayMap {
  constructor(ele){
    this.map = null;
    this.ele = ele;
    this.initMap()
  }

  loadAMap = async () => {
    await remoteLoad(`https://webapi.amap.com/maps?v=1.4.2&key=${MAP_KEY}`)
    await remoteLoad(`https://webapi.amap.com/ui/1.0/main.js?v=1.0.11`)
  }

  initMap = () => {
    this.loadAMap().then(()=>{
      this.ele && (this.map = new window.AMap.Map(this.ele))

    })
  }

  initReplay = () => {
    if(!this.pathSPromise){
      this.pathSPromise = new Promise((resolve, reject)=>{
        window.AMapUI.load(['ui/misc/PathSimplifier'], (PathSimplifier) => {

          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
          }

          this.PathS = PathSimplifier;
          resolve()
        });
      })
      
    }

    this.pathSPromise.then(()=>{
      if(this.PathS){
        this.pathSimplifierIns = new this.PathS({
          zIndex: 100,
          map: this.map, //所属的地图实例
          getPath: function(pathData, pathIndex) {
            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
            return pathData.path;
          },
          getHoverTitle(){
            return ''
          },
          clickToSelectPath: false,
          renderOptions: {
            //轨迹线的样式
            pathLineStyle: {
                strokeStyle: '#0b94db',
                lineWidth: 6,
                dirArrowStyle: true
            }
          }
        });

        var replayData = []

        data.data.forEach(function(item){
            var arr = [];
            arr.push(item.elng)
            arr.push(item.elat)
            replayData.push(arr)
        });

        this.pathSimplifierIns.setData([{
          path: replayData
        }]);
        this.pathSimplifierIns.show();

        //创建一个巡航器
        this.navg = this.pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
          {
            loop: false, //循环播放
            speed: 2000,
            pathNavigatorStyle: {
              width: 36,
              height: 22,
              //使用图片
              content: this.PathS.Render.Canvas.getImageContent(require('@/assets/images/icon_car.png').default),
              initRotateDegree: -90
            }
          });

        this.navg.start();
      }
    })
  }

  destroy = () => {
    this.map && this.map.destroy()
    this.ele = null
    this.map = null
  }
}