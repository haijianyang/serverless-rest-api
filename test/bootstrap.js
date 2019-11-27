const { spawn } = require('child_process');

before(function (done) {
  this.timeout(30000);

  console.log('[Test Bootstrap] Start');

  this.slsOfflineProcess = spawn('sls', ['offline', 'start']);
  console.log(`Serverless: Offline started with PID : ${this.slsOfflineProcess.pid}`);

  this.slsOfflineProcess.stdout.on('data', (data) => {
    if (data.includes('Offline listening on')) {
      console.log(data.toString().trim());

      console.log('[Test Bootstrap] Done');
      done();
    } else {
      console.log(data.toString());
    }
  });

  this.slsOfflineProcess.stderr.on('data', (data) => {
    console.error(`Error starting Serverless Offline:\n${data}`);
    console.error('[Test Bootstrap] Done');

    done(data);
  });
});

after(function () {
  console.log('[Test Teardown] Start');

  this.slsOfflineProcess.kill();
  console.log('Serverless Offline stopped');

  console.log('[Test Teardown] Done');
});
