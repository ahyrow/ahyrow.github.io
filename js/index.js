// 缩放主体内容尺寸
function flexScreen() {
  var windowWidth = $(window).width()
  var pageWidth = $(".screen-main").outerWidth()
  var ratio = windowWidth / pageWidth
  $(".screen-main").css("transform","scale("+ ratio +")");
  var ratioHeight = $(".screen-main").outerHeight() * ratio
  var windowHeight = $(window).height()
  var ih = windowHeight - ratioHeight
  $(".screen-main").css({ marginTop: (ih / 2) });
}
flexScreen()

// 列表滚动
$("#reportTrafficFlow > ul").i5Scroll({
  cssSpeed: 20,
  mode: 'CSS'
});

// 获取前几个月的月份
function createDateDate(monthNum) {
  let dateList = []
  let date = new Date()
  let M = date.getMonth() + 1
  if (M - monthNum < 0) {
    let begin = 12 + (M - monthNum)
    for (let i = begin + 1; i <= begin + monthNum; i++) {
      if (i > 12) {
        dateList.push(`${i % 12}月`)
      } else {
        dateList.push(`${i}月`)
      }
    }
  } else {
    let begin = M - monthNum
    for (let i = begin + 1; i <= begin + monthNum; i++) {
      dateList.push(`${i}月`)
    }
  }
  return dateList
}

// 园区车流量统计
function trafficFlowChart () {
  var myChart = echarts.init(document.getElementById("trafficFlowChart"));
  var xData = createDateDate(5)
  var option = {
    legend: {
      show: false
    },
    color: ["#00D5FF"],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '25%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        margin: 15,
        color: "#FFFFFF",
        fontSize: 12,
      },
    },
    yAxis: {
      name: '人数',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLabel: {
        margin: 15,
        color: "#FFFFFF",
        fontSize: 12,
      },
    },
    series: [
      {
        data: [300, 350, 340, 310, 137],
        type: 'bar',
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0, color: '#00A7FF'},
                  {offset: 1, color: '#1978E5'}
              ]
            )
          },
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      {
        data: [320, 312, 320, 327, 152],
        type: 'bar',
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0, color: '#14C5E7'},
                  {offset: 1, color: '#14C5E7'}
              ]
            )
          },
        },
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  // 轮流显示数据
  let timer = null;
  const showTips = (index) => {
    timer = setTimeout(() => {
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
    }, 2000);
  };
  showTips(0);
  myChart.on("highlight", (args) => {
    let index = args.batch[0].dataIndex + 1;
    if (index >= option.series[0].data.length) {
      index = 0;
    }
    clearTimeout(timer);
    showTips(index);
  });
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}


// 商品库存类别占比情况
function inventoryClass () {
  var myChart = echarts.init(document.getElementById("inventoryClass"));
  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: '商品库存类别占比情况',
        type: 'pie',
        radius: ['55%', '70%'],
        color: ['#BECDD0','#60B45E','#EAB966','#05CFF7','#1978E5'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 36.5, name: '其他' },
          { value: 79.1, name: '奶制品' },
          { value: 120.9, name: '冷冻水产品' },
          { value: 952.3, name: '冰冻畜肉' },
          { value: 431.2, name: '冰冻禽肉' }
        ]
      }
    ]
  };
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

// 分时流量
function timeSharingFlow () {
  var myChart = echarts.init(document.getElementById('timeSharingFlow'));
  const data = [
      { value: 80, date: "00:00" },
      { value: 120, date: "3:00" },
      { value: 180, date: "6:00" },
      { value: 200, date: "9:00" },
      { value: 200, date: "12:00" },
      { value: 180, date: "15:00" },
      { value: 152, date: "18:00" },
      { value: 70, date: "23:00" },
    ];
    const data1 = [
      { value: 90, date: "00:00" },
      { value: 140, date: "3:00" },
      { value: 210, date: "6:00" },
      { value: 210, date: "9:00" },
      { value: 160, date: "12:00" },
      { value: 120, date: "15:00" },
      { value: 160, date: "18:00" },
      { value: 80, date: "23:00" },
    ];
    const option = {
      grid: {
          top: "20%",
          bottom: "20%",
          left: "10%",
          right: "5%",
      },
      tooltip: {
        trigger: "axis",
        formatter: "{a0}: {c0}<br />{a1}: {c1}",
        backgroundColor: "rgba(4,16,40, 0.5)",
        padding: [5, 10, 5, 10],
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.map((item) => {
          return item.date;
        }),
        axisLabel: {
          margin: 15,
          color: "#93D0FF",
          fontSize: 12,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          // symbol: ["none", "arrow"],
          // symbolSize: [5, 10],
          // symbolOffset: [0, 10],
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed",
            dashOffset: 100,
          },
        },
      },
      yAxis: {
        type: "value",
        splitNumber: 3,
        axisLabel: {
          margin: 10,
          color: "#93D0FF",
          fontSize: 12,
        },
        axisLine: {
          show: false,
          // symbol: ["none", "arrow"],
          // symbolSize: [5, 10],
          // symbolOffset: [0, 10],
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed",
            dashOffset: 100,
          },
        },
      },
      series: [
        {
          name: "车流量",
          type: "line",
          symbol: "circle",
          showSymbol: false,
          color: "#00F5FA",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(0,245,250, 0.5)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(0,245,250, 0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth: true,
          emphasis: {
            itemStyle: {
              type: "solid",
              width: 5,
            },
          },
          data: data,
        },
        {
          name: "人流量",
          type: "line",
          symbol: "circle",
          showSymbol: false,
          color: "#F7B500",
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(247,181,0, 0.5)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(247,181,0, 0)", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth: true,
          emphasis: {
            itemStyle: {
              type: "solid",
              width: 5,
            },
          },
          data: data1,
        },
      ],
  };
  // 轮流显示数据
  let timer = null;
  const showTips = (index) => {
    timer = setTimeout(() => {
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
    }, 2000);
  };
  showTips(0);
  myChart.on("highlight", (args) => {
    let index = args.batch[0].dataIndex + 1;
    if (index >= option.series[0].data.length) {
      index = 0;
    }
    clearTimeout(timer);
    showTips(index);
  });
  myChart.setOption(option);
  window.addEventListener("resize",function(){
      myChart.resize();
  });
}

// 园区车辆入场报备
var app2 = new Vue({
  el: '#reportTrafficFlow',
  data: {
    vehicleList: []
  },
  mounted() {    
    for (let i = 0; i < 50 ; i++) {
      this.vehicleList.push({
        date: this.getDate(),
        plateNumber: this.randomData(['粤*VV0**','浙*XB7**', '甘*GL8**', '苏*XZ5**', '闽*JJ6**', '粤*JG1**', "粤*FW7**", "晋*MU5**", "湘*YK9**", "湘*WX7**", "苏*UZ6**", "甘*HX5**"]),
        motorcycleType: this.randomData(['黄牌（单轿大车）','黄牌（单轿大车）', '黄牌（单轿大车）']),
      })
    }
  },
  methods: {
    randomData(arr) {
      const i = Math.floor(Math.random() * arr.length)
      return arr[i]
    },
    setBeforeData(str) {
      var date= new Date(str);     // js获取当前时间
      var min= date.getHours();  // 获取当前小时，  如果是计算到分钟， 此处要写 getMinutes
      date.setHours(min - 1);  // 8小时处理，  如果是计算到分钟， 此处要写 小时数 * 分钟数
      var y = date.getFullYear();
      var m = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMinutes() + 1);
      var d = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
      var h = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()
      var formatdate = h + ":30:00"
      return formatdate
    },
    getDate ()  {
      var time = new Date();
      var year = time.getFullYear(); //年
      var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
      var day = ("0" + time.getDate()).slice(-2); //日
      var mydate = month + "-" + day;
      return mydate;
    },
    randomNum (min = 8000, max = 12000) { 
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
})

trafficFlowChart() // 园区车流量统计
timeSharingFlow() // 分时流量
inventoryClass() // 商品库存类别占比情况





