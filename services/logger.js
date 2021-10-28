const colors = require('colors')
const { colorConsole } = require('tracer')


const logger = colorConsole({
  format: [
    '{{timestamp}} << {{title}} >> {{message}} (in {{file}}:{{line}})', //default format
    {
      error:
        '{{timestamp}} << {{title}} >> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}' // error format
    }
  ],

  dateformat: 'HH:MM:ss.L',
  
  preprocess: function(data) {
    data.title = data.title.toUpperCase()
  },

  filters: [
    colors.green,
    colors.bold,
    {
      warn: [colors.yellow, colors.bold],
      error: [colors.red, colors.bold]
    } 
  ]
})


module.exports = logger