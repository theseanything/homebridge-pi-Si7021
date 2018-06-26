const Si7021 = require('si7021-sensor')
var Service, Characteristic

module.export = function(homebridge) {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory(
    'homebridge-temp',
    'Temp',
    TemperatureSensorAccessory
  )
}

function TemperatureSensorAccessory(log, config) {
  this.log = log
  this.name = config['name']
  this.sensor = new Si7021({ i2cBusNo: 1 })

  this.service = new Service.TemperatureSensor(this.name)

  this.service
    .getCharacteristic(Characteristic.CurrentTemperature)
    .on('get', this.getState.bind(this))
}

TemperatureSensorAccessory.prototype.getState = function(callback) {
  this.log('Getting current state...')
  si7021
    .readSensorData()
    .then(data => {
      callback(null, data['temperature_C'])
    })
    .catch(err => {
      callback(err)
    })
}

TemperatureSensorAccessory.prototype.getServices = function() {
  return [this.service]
}
