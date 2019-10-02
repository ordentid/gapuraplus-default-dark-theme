// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Powered by Gapura+',
  plugins: [
    {
      use: 'gridsome-source-tomatto-data',
      options: {
        config: 'config.json',
        projectId: process.env.PROJECT_ID,
        apiUrl: process.env.API_URL
      }
    }
  ]
}
