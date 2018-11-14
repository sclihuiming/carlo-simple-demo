class init {
    constructor(document, echarts, monit) {
        this.document = document;
        this.echarts = echarts;
        this.monit = monit;
        this.echart_1();
        this.echart_2();
        this.echart_3();
        this.echart_4();
        this.serieData = [];
        this.netUploadData = [];
        this.netDownloadData = [];


        // this.processDataX = [];
        // this.processSeriesData = [{
        //     name: 'xxx',
        //     type: 'bar',
        //     data: []
        // }];

        this.cronTask();
    }

    echart_1() {
        // 基于准备好的dom，初始化echarts实例
        this.cpuChart = this.echarts.init(this.document.getElementById('chart_1'));
        let legendData = ['cpu'];
        let title = "cpu";//标题
        let colors = ["#036BC8", "#FFF", "#5EBEFC", "#2EF7F3"];
        let option = {
            // backgroundColor: '#0f375f',
            // title: {
            //     text: title,
            //     textAlign: 'left',
            //     textStyle: {
            //         color: "#fff",
            //         fontSize: "12",
            //         fontWeight: "bold"
            //     }
            // },
            legend: {
                show: false,
                left: "center",
                data: legendData,
                y: "5%",
                itemWidth: 18,
                itemHeight: 12,
                textStyle: {
                    color: "#fff",
                    fontSize: 14
                },
            },
            toolbox: {
                orient: 'vertical',
                right: '1%',
                top: '20%',
                iconStyle: {
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                }
            },
            color: colors,
            grid: {
                left: '2%',
                top: "15%",
                bottom: "2%",
                right: "5%",
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                // formatter: function (params) {
                //     // params = params[0];
                //     // var date = new Date(params.name);
                //     return params[0] + ' : ' + params.value[1] + '%';
                // },
                axisPointer: {
                    type: 'shadow',
                    animation: false
                }
            },
            xAxis: [{
                type: 'time',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false
                },
                // data: xAxisData,
            },],
            yAxis: [{
                type: 'value',
                name: '百分比',
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
            },],
            series: [{
                name: 'cpu',
                type: 'line',
                symbol: "none",
                symbolSize: 2,
                data: this.serieData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.cpuChart.setOption(option);
        window.addEventListener("resize", function () {
            this.cpuChart.resize();
        });
    }

    echart_2() {
        // 基于准备好的dom，初始化echarts实例
        this.memoryChart = this.echarts.init(this.document.getElementById('chart_2'));

        this.memoryOption = {
            // tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {
            //         type: 'shadow'
            //     }
            // },
            tooltip: {
                formatter: "{a}<br/> {c}{b}"
            },
            legend: {
                data: ['ex'],
                left: '27%'
            },
            grid: {
                left: '1%',
                right: '60%',
                top: '10%',
                bottom: '10%',
                containLabel: true,
            },

            series: [
                {
                    name: '已使用',
                    type: 'gauge',
                    z: 3,
                    min: 0,
                    max: 220,
                    splitNumber: 10,
                    radius: '95%',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                            width: 1,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 10,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 16,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {           // 分隔线
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 20,
                            fontStyle: 'italic',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        backgroundColor: 'rgba(30,144,255,0.8)',
                        // borderWidth: 1,
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        offsetCenter: [0, '50%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            color: '#fff'
                        }
                    },
                    data: [{ value: 40, name: 'GB' }]
                },
                {
                    name: '活跃内存',
                    type: 'gauge',
                    center: ['20%', '55%'],    // 默认全局居中
                    radius: '75%',
                    min: 0,
                    max: 16,
                    endAngle: 45,
                    splitNumber: 8,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 9,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 14,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: 5,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        offsetCenter: [0, '-30%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontStyle: 'italic',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        //backgroundColor: 'rgba(30,144,255,0.8)',
                        // borderWidth: 1,
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        width: 80,
                        height: 30,
                        offsetCenter: [25, '20%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            color: '#fff'
                        }
                    },
                    data: [{ value: 1.5, name: 'GB' }]
                }
            ]
        }
        this.memoryChart.setOption(this.memoryOption);
    }

    echart_3() {
        // 基于准备好的dom，初始化echarts实例
        this.netChart = this.echarts.init(this.document.getElementById('chart_3'));

        let legendData = ['upload', 'download'];
        let colors = ["#036BC8", "#FFF", "#5EBEFC", "#2EF7F3"];
        this.netOption = {
            legend: {
                show: false,
                left: "center",
                data: legendData,
                y: "5%",
                itemWidth: 18,
                itemHeight: 12,
                textStyle: {
                    color: "#fff",
                    fontSize: 14
                },
            },
            toolbox: {
                orient: 'vertical',
                right: '1%',
                top: '20%',
                iconStyle: {
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                }
            },
            color: colors,
            grid: {
                left: '2%',
                top: "15%",
                bottom: "2%",
                right: "5%",
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let uploadInfo = params[0];
                    let downloadInfo = params[1];
                    var date = new Date(uploadInfo.name);

                    let uploadSpeed = uploadInfo.value[1];
                    let downloadSpeed = downloadInfo.value[1];
                    if (uploadSpeed > 1024) {
                        uploadSpeed = (uploadSpeed / 1024).toFixed(2) + 'Mb/s';
                    } else {
                        uploadSpeed += 'kb/s';
                    }

                    if (downloadSpeed > 1024) {
                        downloadSpeed = (downloadSpeed / 1024).toFixed(2) + 'Mb/s';
                    } else {
                        downloadSpeed += 'kb/s';
                    }
                    return moment(date).format('HH:mm:ss') + ' <br/> ' + '上传速度：' + uploadSpeed
                        + ' <br/> ' + '下载速度：' + downloadSpeed;

                },
                axisPointer: {
                    type: 'shadow',
                    animation: false
                }
            },
            xAxis: [{
                type: 'time',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false
                },
            },],
            yAxis: [{
                type: 'value',
                name: 'kb/s',
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
            },],
            series: [{
                name: '上传',
                type: 'line',
                symbol: "none",
                symbolSize: 2,
                data: this.netUploadData
            },
            {
                name: '下载',
                type: 'line',
                symbol: "none",
                symbolSize: 2,
                data: this.netDownloadData
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.netChart.setOption(this.netOption);
        window.addEventListener("resize", function () {
            this.netChart.resize();
        });
    }

    echart_4() {
        // 基于准备好的dom，初始化echarts实例
        this.processChart = this.echarts.init(this.document.getElementById('chart_4'));
        let legendData = ['cpu', 'mem'];
        let title = "进程";//标题
        let colors = ["#036BC8", "#FFF", "#5EBEFC", "#2EF7F3"];
        this.processOption = {
            // backgroundColor: '#0f375f',
            // title: {
            //     text: title,
            //     textAlign: 'left',
            //     textStyle: {
            //         color: "#fff",
            //         fontSize: "12",
            //         fontWeight: "bold"
            //     }
            // },
            legend: {
                show: true,
                left: "center",
                data: legendData,
                y: "5%",
                itemWidth: 18,
                itemHeight: 12,
                textStyle: {
                    color: "#fff",
                    fontSize: 14
                },
            },
            toolbox: {
                orient: 'vertical',
                right: '1%',
                top: '20%',
                iconStyle: {
                    color: '#fff',
                    borderColor: '#fff',
                    borderWidth: 1,
                }
            },
            color: colors,
            grid: {
                left: '2%',
                top: "13%",
                bottom: "2%",
                right: "5%",
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    animation: false
                }
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    rotate: 15,
                    formatter: function (value, index) {
                        if(value.length>10){
                            return value.substr(0,10);
                        }
                        return value;
                    },
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisTick: {
                    show: false
                },
                data: [],
            }],
            yAxis: [{
                type: 'value',
                name: '百分比',
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea7c4',
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#6173A3'
                    }
                },
                axisLabel: {
                    formatter: '{value} %'
                }
            }],
            series: [{
                name: 'cpu使用',
                type: 'bar',
                data: [],
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%',
                        textStyle: {
                            color: 'white'
                        }
                    }
                }
            }, {
                name: '内存使用',
                type: 'bar',
                data: [],
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c}%',
                        textStyle: {
                            color: 'white'
                        }
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.processChart.setOption(this.processOption);
        window.addEventListener("resize", function () {
            this.processChart.resize();
        });
    }

    cronTask() {
        //定时任务
        setInterval(async () => {
            let now = new Date().getTime();
            let sysInfo = await this.monit();
            let cpuCurrentLoadInfo = sysInfo.currentLoad || {};
            let cpuCurrentload = (cpuCurrentLoadInfo.currentload || 0).toFixed(1);
            // console.log(cpuCurrentload)

            //cpuchart data change 
            if (this.serieData.length > 120) {
                this.serieData.shift();
            }
            this.serieData.push({
                name: now,
                value: [now, cpuCurrentload]
            });
            if (this.cpuChart) {
                this.cpuChart.setOption({
                    series: [{
                        data: this.serieData
                    }]
                });
            }

            //memory chart
            let memInfo = sysInfo.mem;
            let total = (memInfo.total / (1024 * 1024 * 1024)).toFixed(0);
            let used = (memInfo.used / (1024 * 1024 * 1024)).toFixed(2);
            let active = (memInfo.active / (1024 * 1024 * 1024)).toFixed(2);
            if (this.memoryChart) {
                let splitNumber = Math.floor(total / 2);
                this.memoryOption.series[0].max = total;
                this.memoryOption.series[0].splitNumber = splitNumber;
                this.memoryOption.series[0].data[0].value = used;
                this.memoryOption.series[1].max = total;
                this.memoryOption.series[1].splitNumber = splitNumber;
                this.memoryOption.series[1].data[0].value = active;
                this.memoryChart.setOption(this.memoryOption, true);
            }



            //net chart
            let networkStats = sysInfo.networkStats;
            let upload = Math.ceil(networkStats.tx_sec / 1024);
            let download = Math.ceil(networkStats.rx_sec / 1024);

            if (this.netUploadData.length > 120) {
                this.netUploadData.shift();
            }
            if (this.netDownloadData.length > 120) {
                this.netDownloadData.shift();
            }
            this.netUploadData.push({
                name: now,
                value: [now, upload]
            });
            this.netDownloadData.push({
                name: now,
                value: [now, download]
            });

            if (this.netChart) {
                this.netChart.setOption({
                    series: [{
                        data: this.netUploadData
                    }, {
                        data: this.netDownloadData
                    }]
                });
            }

            //process chart
            let processInfo = sysInfo.processes || [];
            let _len = processInfo.length;
            let processDataX = [];
            let cpuData = [];
            let menData = [];
            //构造echart数据
            for (let i = 0; i < _len; i++) {
                let processName = processInfo[i].name;
                processDataX.push(processName);
                cpuData.push(processInfo[i].pcpu);
                menData.push(processInfo[i].pmem);
            }
            this.processOption.xAxis[0].data = processDataX;
            this.processOption.series[0].data = cpuData;
            this.processOption.series[1].data = menData;

            console.log(processDataX)
            if (this.processChart) {
                //重新渲染表格
                this.processChart.setOption(this.processOption);
            }

            //other info
            let osInfo = sysInfo.osInfo || {};
            let system = sysInfo.system || {};
            let battery = sysInfo.battery || {};


            let otherMsg = '本机信息：' + system.model + ' 序列号：' + system.serial + ' 电池电量剩余：' + battery.percent
                + '%   ' + '充电状态：' + (battery.ischarging ? '正在充电' : '没有充电') + ' 电池厂商：' + battery.manufacturer;
            let hostname = osInfo.hostname;
            let model = system.model;
            if (!this.title) {
                this.document.getElementById('containTitle').innerHTML = hostname;
                this.title = true;
            }
            this.document.getElementById('otherInfo').innerHTML = otherMsg;

        }, 1000);
    }



    // randomData() {
    //     let now = new Date().getTime();
    //     let value = Math.random() * 1000 - 10;
    //     return {
    //         name: now,
    //         value: [
    //             now,
    //             Math.round(value)
    //         ]
    //     }
    // }

}

window.onload = function () {
    new init(document, echarts, monit);
} 