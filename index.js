// const Si7021 = require('si7021-sensor')
let Service, Characteristic;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory(
    'homebridge-pi-si7021',
    'Temp',
    temperatureSensorAccessory
  );
};

function temperatureSensorAccessory(log, config) {
  this.log = log;
  this.config = config;
}


temperatureSensorAccessory.prototype = {
  getServices: function () {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "My switch manufacturer")
      .setCharacteristic(Characteristic.Model, "My switch model")
      .setCharacteristic(Characteristic.SerialNumber, "123-456-789");

    let temperatureService = new Service.TemperatureSensor("PiTemp")

    temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .on('get', this.getCurrentTemperature.bind(this));

    this.informationService = informationService;
    this.temperatureService = temperatureService;
    return [informationService, temperatureService];
  },

  getCurrentTemperature: function (callback) {
    callback(null, 10.0);
  }

};
// class TemperatureSensorAccessory {
//   constructor(log, config) {
//     this.log = log
//     this.name = config.name
//     // this.sensor = new Si7021({ i2cBusNo: 1 })

//     this.service = new Service.TemperatureSensor(this.name)

//     this.service
//       .getCharacteristic(Characteristic.CurrentTemperature)
//       .on('get', this.getCurrentTemperature.bind(this))
//   }

//   getCurrentTemperature(callback) {
//     callback(null, 10.0)
//   }

//   getServices() {
//     return [this.service]
//   }
// }

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
