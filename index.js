var Service, Characteristic;

module.export = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	
	homebridge.registerAccessory("homebridge-temp", "Temp", TempSensor);
}

