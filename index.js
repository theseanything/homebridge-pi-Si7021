// const Si7021 = require('si7021-sensor')
let Service, Characteristic

module.export = homebridge => {
  Service = homebridge.hap.Service
  Characteristic = homebridge.hap.Characteristic

  homebridge.registerAccessory(
    'homebridge-pi-si7021',
    'Temp',
    TemperatureSensorAccessory
  )
}

class TemperatureSensorAccessory {
  constructor(log, config) {
    this.log = log
    this.name = config.name
    // this.sensor = new Si7021({ i2cBusNo: 1 })

    this.service = new Service.TemperatureSensor(this.name)

    this.service
      .getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', this.getCurrentTemperature.bind(this))
  }

  getCurrentTemperature(callback) {
    callback(null, 10.0)
  }

  getServices() {
    return [this.service]
  }
}

// function TemperatureSensorAccessory(log, config) {
//   this.log = log
//   this.name = config['name']
//   this.sensor = new Si7021({ i2cBusNo: 1 })

//   this.service = new Service.TemperatureSensor(this.name)

//   this.service
//     .getCharacteristic(Characteristic.CurrentTemperature)
//     .on('get', this.getState.bind(this))
// }

// TemperatureSensorAccessory.prototype.getState = function(callback) {
//   callback(null, 10.0)
//   // this.log('Getting current state...')
//   // this.sensor
//   //   .readSensorData()
//   //   .then(data => {
//   //     callback(null, data['temperature_C'])
//   //   })
//   //   .catch(err => {
//   //     callback(err)
//   //   })
// }

// TemperatureSensorAccessory.prototype.getServices = function() {
//   return [this.service]
// }
