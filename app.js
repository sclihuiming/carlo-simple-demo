const carlo = require('carlo');
const os = require('os');
const path = require('path');
const si = require('systeminformation');
const _ = require('lodash');

let networkStats = {};

class systemMonit {
  constructor() {
    this.launch().catch(err => { console.log(err) });
    this.cronTask();
    // this.monit();
  }

  async launch() {
    this.app = await carlo.launch(
      {
        bgcolor: '#2b2e3b',
        width: 1100,
        height: 730,
        userDataDir: path.join(os.homedir(), '.carlosysinfo'),
        args: process.env.DEV === 'true' ? ['--auto-open-devtools-for-tabs'] : []
      });

    this.app.on('exit', () => process.exit());
    this.app.serveFolder(__dirname + '/views');
    await this.app.exposeFunction('monit', this.monit);
    await this.app.load('index.html');
  }

  async monit() {
    const info = {};
    await Promise.all([
      si.mem().then(r => info.mem = r),
      si.fullLoad().then(r => info.fullLoad = r),
      si.currentLoad().then(r => info.currentLoad = r),
      si.osInfo().then(r => info.osInfo = r),
      si.battery().then(r => info.battery = r),
      si.system().then(r => info.system = r),
      si.processes().then(r => info.processes = _.slice(_.orderBy(r.list, 'pcpu', 'desc'), 0, 6)),
    ]);
    // info.networkStats = this.networkStats || {};
    info.networkStats = networkStats
    return info;
  }

  async cronTask() {
    let osInfo = si.osInfo();
    let targetIface = null;
    let rx = 0;

    let arr  = await si.networkInterfaces();
    for (let i=0;i<arr.length;i++){
      let iface = arr[i].iface;
      let netInfo = await si.networkStats(iface)||{};
      let _rx = netInfo.rx||0;
      if(_rx>rx){
        rx = _rx;
        targetIface = iface;
      }
    }

    setInterval(async () => {
      networkStats = await si.networkStats(targetIface);
    }, 1000)
  }
}


new systemMonit();