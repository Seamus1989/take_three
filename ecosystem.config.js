module.exports = {
  apps: [{
    name: 'take_three',
    script:'./testServer.js'
  }],
  deplot: {
    production: {
        user:'ubuntu',
        host:'http://ec2-34-216-73-32.us-west-2.compute.amazonaws.com',
        key:'~/.ssh/formulaPapaya.pem',
        ref:'origin/master',
        repo:'https://github.com/Seamus1989/take_three.git',
        path:'/home/ubuntu/formulaPapaya',
        'post-deploy':'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
}
