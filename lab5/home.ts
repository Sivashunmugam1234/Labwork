class Device {
  id: string;
  name: string;
  location: string;
  isOn: boolean;

  constructor(id: string, name: string, location: string) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.isOn = false;
  }

  turnOn() {
    this.isOn = true;
    console.log(`${this.name} turned ON`);
  }

  turnOff() {
    this.isOn = false;
    console.log(`${this.name} turned OFF`);
  }

  getStatus() {
    return `${this.name} (${this.location}): ${this.isOn ? 'ON' : 'OFF'}`;
  }
}

class Light extends Device {
  brightness: number;
  color: string;

  constructor(id: string, name: string, location: string) {
    super(id, name, location);
    this.brightness = 100;
    this.color = "white";
  }

  setBrightness(level: number) {
    if (level < 0 || level > 100) {
      console.log("Brightness must be between 0 and 100");
      return;
    }
    this.brightness = level;
    console.log(`${this.name} brightness set to ${level}%`);
  }

  setColor(color: string) {
    this.color = color;
    console.log(`${this.name} color set to ${color}`);
  }

  getStatus() {
    return `${super.getStatus()} | Brightness: ${this.brightness}% | Color: ${this.color}`;
  }
}

class Thermostat extends Device {
  currentTemp: number;
  targetTemp: number;

  constructor(id: string, name: string, location: string) {
    super(id, name, location);
    this.currentTemp = 22;
    this.targetTemp = 22;
    this.isOn = true; 
  }

  setTargetTemp(temp: number) {
    this.targetTemp = temp;
    console.log(`${this.name} target temperature set to ${temp}°C`);
  }

  getCurrentTemp() {
    return this.currentTemp;
  }

  updateTemp(temp: number) {
    this.currentTemp = temp;
    console.log(`${this.name} current temperature updated to ${temp}°C`);
  }

  getStatus() {
    return `${super.getStatus()} | Current: ${this.currentTemp}°C | Target: ${this.targetTemp}°C`;
  }
}

class SecuritySensor extends Device {
  isTriggered: boolean;

  constructor(id: string, name: string, location: string) {
    super(id, name, location);
    this.isTriggered = false;
    this.isOn = true; // Security sensors are typically always on
  }

  triggerAlarm() {
    this.isTriggered = true;
    console.log(`ALARM! ${this.name} in ${this.location} has been triggered!`);
  }

  reset() {
    this.isTriggered = false;
    console.log(`${this.name} has been reset`);
  }

  getStatus() {
    return `${super.getStatus()} | ${this.isTriggered ? 'TRIGGERED' : 'Not triggered'}`;
  }
}

class Camera extends Device {
  isRecording: boolean;

  constructor(id: string, name: string, location: string) {
    super(id, name, location);
    this.isRecording = false;
  }

  startRecording() {
    if (!this.isOn) {
      console.log(`Cannot record - ${this.name} is turned off`);
      return;
    }
    this.isRecording = true;
    console.log(`${this.name} is now recording`);
  }

  stopRecording() {
    this.isRecording = false;
    console.log(`${this.name} stopped recording`);
  }

  getStatus() {
    return `${super.getStatus()} | ${this.isRecording ? 'Recording' : 'Not recording'}`;
  }
}

class SecuritySystem {
  name: string;
  sensors: SecuritySensor[];
  cameras: Camera[];
  isArmed: boolean;

  constructor(name: string) {
    this.name = name;
    this.sensors = [];
    this.cameras = [];
    this.isArmed = false;
  }

  addSensor(sensor: SecuritySensor) {
    this.sensors.push(sensor);
  }

  addCamera(camera: Camera) {
    this.cameras.push(camera);
  }

  arm() {
    this.isArmed = true;
    console.log(`${this.name} security system armed`);
  }

  disarm() {
    this.isArmed = false;
    console.log(`${this.name} security system disarmed`);
  }

  triggerAlarm() {
    if (!this.isArmed) {
      console.log("Cannot trigger alarm - system is not armed");
      return;
    }
    
    console.log("🚨 ALARM TRIGGERED 🚨");
    this.cameras.forEach(camera => {
      if (!camera.isOn) camera.turnOn();
      camera.startRecording();
    });
  }

  getStatus() {
    return `Security System: ${this.isArmed ? 'ARMED' : 'DISARMED'} | ${this.sensors.length} sensors | ${this.cameras.length} cameras`;
  }
}

class SmartHome {
  name: string;
  devices: Device[];
  securitySystem: SecuritySystem | null;

  constructor(name: string) {
    this.name = name;
    this.devices = [];
    this.securitySystem = null;
  }

  addDevice(device: Device) {
    this.devices.push(device);
  }

  setSecuritySystem(system: SecuritySystem) {
    this.securitySystem = system;
  }

  getDevicesByLocation(location: string) {
    return this.devices.filter(device => device.location === location);
  }

  turnOffAllDevices() {
    this.devices.forEach(device => device.turnOff());
    console.log("All devices turned off");
  }

  activateScene(sceneName: string) {
    if (sceneName === "away") {
      this.turnOffAllDevices();
      if (this.securitySystem) {
        this.securitySystem.arm();
      }
      console.log("Away scene activated");
    } 
    else if (sceneName === "home") {
      if (this.securitySystem) {
        this.securitySystem.disarm();
      }
      
      this.getDevicesByLocation("living room").forEach(device => {
        if (device instanceof Light) {
          device.turnOn();
        }
      });
      console.log("Home scene activated");
    }
    else {
      console.log(`Unknown scene: ${sceneName}`);
    }
  }

  generateStatusReport() {
    let report = `=== ${this.name} Status Report ===\n\n`;
    
    this.devices.forEach(device => {
      report += `${device.getStatus()}\n`;
    });
    
    if (this.securitySystem) {
      report += `\n${this.securitySystem.getStatus()}\n`;
    }
    
    return report;
  }
}

function runSmartHomeDemo() {
  const myHome = new SmartHome("My First Smart Home");
  
  const livingRoomLight = new Light("l1", "Living Room Light", "living room");
  const kitchenLight = new Light("l2", "Kitchen Light", "kitchen");
  const bedroomLight = new Light("l3", "Bedroom Light", "bedroom");
  
  const livingRoomThermostat = new Thermostat("t1", "Living Room Thermostat", "living room");
  
  const frontDoorSensor = new SecuritySensor("s1", "Front Door Sensor", "entrance");
  const livingRoomCamera = new Camera("c1", "Living Room Camera", "living room");
  
  myHome.addDevice(livingRoomLight);
  myHome.addDevice(kitchenLight);
  myHome.addDevice(bedroomLight);
  myHome.addDevice(livingRoomThermostat);
  myHome.addDevice(frontDoorSensor);
  myHome.addDevice(livingRoomCamera);
  
  const homeSecurity = new SecuritySystem("Home Security");
  homeSecurity.addSensor(frontDoorSensor);
  homeSecurity.addCamera(livingRoomCamera);
  myHome.setSecuritySystem(homeSecurity);
  
  console.log("=== Smart Home Demo ===");
  
  livingRoomLight.turnOn();
  livingRoomLight.setBrightness(75);
  livingRoomLight.setColor("warm white");
  
  livingRoomThermostat.setTargetTemp(23);
  
  console.log(myHome.generateStatusReport());
  
  homeSecurity.arm();
  frontDoorSensor.triggerAlarm();
  homeSecurity.triggerAlarm();
  
  myHome.activateScene("away");
}

runSmartHomeDemo();