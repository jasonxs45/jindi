<template>
  <div class="project-map">
    <div class="map" ref="map"></div>
  </div>
</template>
<script>
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
// 引入地图
require('echarts/lib/chart/map')
require('echarts/lib/chart/scatter')
require('echarts/map/js/china')
const geoCoordMap = {
  '岳阳': [113.09, 29.37],
  '长沙': [113, 28.21],
  '衢州': [118.88, 28.97],
  '廊坊': [116.7, 39.53],
  '菏泽': [115.480656, 35.23375],
  '合肥': [117.27, 31.86],
  '武汉': [114.31, 30.52],
  '大庆': [125.03, 46.58]
}
let convertData = data => {
  let res = []
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
      // res.source.push(geoCoord.concat(data[i].value))
    }
  }
  return res
}
let data = convertData([
  {name: '长沙', value: 175},
  {name: '衢州', value: 177},
  {name: '廊坊', value: 193},
  {name: '菏泽', value: 194},
  {name: '合肥', value: 229},
  {name: '武汉', value: 273},
  {name: '大庆', value: 279}
])
console.log(data)
const regions = [
  {
    name: '湖北',
    silent: false,
    label: {
      show: true,
      position: [10, 10]
    },
    itemStyle: {
      areaColor: '#ea5532'
    },
    emphasis: {
      label: {
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#ea5532',
        shadowBlur: 8,
        shadowColor: 'rgba(255,255,255,1)'
      }
    }
  },
  {
    name: '湖南',
    silent: false,
    label: {
      show: true
    },
    itemStyle: {
      areaColor: '#ea5532'
    },
    emphasis: {
      label: {
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#ea5532',
        shadowBlur: 8,
        shadowColor: 'rgba(255,255,255,1)'
      }
    }
  },
  {
    name: '河南',
    label: {
      show: true
    },
    itemStyle: {
      areaColor: '#ea5532'
    },
    emphasis: {
      label: {
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#ea5532',
        shadowBlur: 8,
        shadowColor: 'rgba(255,255,255,1)'
      }
    }
  }
]
export default {
  name: 'ProjectMap',
  data () {
    return {
      mapEchart: null
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter (params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        geo: {
          map: 'china',
          roam: true,
          scaleLimit: {
            min: 1.2,
            max: 4
          },
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#f7d9d2',
              borderColor: '#fff'
            },
            emphasis: {
              areaColor: '#f7d9d2'
            }
          },
          regions
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: 12,
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                position: 'top',
                textStyle: {
                  color: '#333'
                }
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(30, 255, 0, .8)',
                shadowBlur: 10,
                shadowColor: '#333'
              },
              emphasis: {
                borderColor: '#fff',
                borderWidth: 0.5
              }
            },
            data
          }
        ]
      }
      this.mapEchart = echarts.init(this.$refs.map)
      this.mapEchart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.project-map {
  .map {
    width: 100vw;
    height: 100vh;
  }
}
</style>
