// Import the systeminformation module
const si = require("systeminformation");

// Import the os module
const os = require("os");

// Get the frequency parameter from the command line in seconds
const frequency = process.argv[2];

// Convert the frequency to milliseconds
const delay = frequency * 1000;

// Define a function that prints system information
function printSystemInfo() {
  // Get the operating system
  const osType = os.type();

  // Get the architecture
  const arch = os.arch();

  // Get the current user name
  const userName = os.userInfo().username;

  // Get the CPU cores models using async/await and try/catch
  async function getCpuModels() {
    try {
      const data = await si.cpu();
      return data.cores.map((core) => core.model).join("\n");
    } catch (err) {
      console.error(err);
    }
  }

  // Get the CPU temperature using async/await and try/catch
  async function getCpuTemp() {
    try {
      const data = await si.cpuTemperature();
      return data.main;
    } catch (err) {
      console.error(err);
    }
  }

  // Get the graphic controllers vendors and models using async/await and try/catch
  async function getGraphicsInfo() {
    try {
      const data = await si.graphics();
      return data.controllers.map((controller) => `${controller.vendor} ${controller.model}`).join("\n");
    } catch (err) {
      console.error(err);
    }
  }

  // Get the total memory, used memory and free memory in GBs using async/await and try/catch
  async function getMemoryInfo() {
    try {
      const data = await si.mem();
      return `Total: ${data.total / (1024 ** 3)} GB\nUsed: ${data.used / (1024 ** 3)} GB\nFree: ${data.free / (1024 **3)} GB`;
    } catch (err) {
      console.error(err);
    }
  }

   // Get the battery info if system has using async/await and try/catch
   async function getBatteryInfo() {
     try {
       const data = await si.battery();
       if (data.hasbattery) { 
         return `Charging: ${data.ischarging}\nPercent: ${data.percent}%\nRemaining time: ${data.timeremaining} minutes`;
       } else { 
         return "No battery";
       }
     } catch (err) {
       console.error(err);
     }
   }

   // Print all the information using Promise.all and template literals
   Promise.all([getCpuModels(), getCpuTemp(), getGraphicsInfo(), getMemoryInfo(), getBatteryInfo()])
     .then((values) => { 
       console.log(`Operating system: ${osType}\nArchitecture: ${arch}\nCurrent user name: ${userName}\nCPU cores models:\n${values[0]}\nCPU temperature: ${values[1]}°C\nGraphic controllers vendors and models:\n${values[2]}\nMemory info:\n${values[3]}\nBattery info:\n${values[4]}`);
     })
     .catch((err) => { 
       console.error(err);
     });
}

// Call the printSystemInfo function every tick based on the delay
setInterval(printSystemInfo, delay);