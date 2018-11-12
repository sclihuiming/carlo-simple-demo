const carlo = require('carlo');
const os = require('os');
const path = require('path');
const si = require('systeminformation');

class systemMonit {
  constructor() {
    this.launch().catch(err=>{console.log(err)});
    this.monit();
  }

  async launch() {
    this.app = await carlo.launch(
      {
        bgcolor: '#2b2e3b',
        width: 1000,
        height: 650,
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
      si.currentLoad().then(r => info.currentLoad = r),
      si.cpu().then(r => info.cpu = r),
      si.osInfo().then(r => info.osInfo = r),
    ]);
    console.log(info);
  }
}


new systemMonit();