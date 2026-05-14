// PM2 ecosystem config — VPS production deployment
// Usage: pm2 start ecosystem.config.js
//        pm2 reload ecosystem.config.js   (zero-downtime reload)

module.exports = {
  apps: [
    {
      name: "bdc-app",
      script: "npm",
      args: "start",
      cwd: "/root/building-digital-career",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      // Next.js reads .env.local at startup — no need to list vars here
      error_file: "/root/.pm2/logs/bdc-app-error.log",
      out_file: "/root/.pm2/logs/bdc-app-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
