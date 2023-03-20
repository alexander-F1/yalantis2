function MyEventEmitter() {
    // Initialize an empty object to store the event handlers
    this.handlers = {};
  }
  
  // Define the registerHandler method
  MyEventEmitter.prototype.registerHandler = function (eventName, callback) {
    // Check if the event name already exists in the object
    if (this.handlers[eventName]) {
      // Push the callback function to the existing array of handlers
      this.handlers[eventName].push(callback);
    } else {
      // Create a new array with the callback function as the first element
      this.handlers[eventName] = [callback];
    }
  };
  
  // Define the emitEvent method
  MyEventEmitter.prototype.emitEvent = function (eventName) {
    // Check if the event name exists in the object
    if (this.handlers[eventName]) {
      // Loop through the array of handlers and invoke each one
      for (let handler of this.handlers[eventName]) {
        handler();
      }
    } else {
      // Throw an error if the event name is not found
      throw new Error(`No handlers for ${eventName}`);
    }
  };
  
  // Create a new instance of MyEventEmitter class
  const emitter = new MyEventEmitter();
  
  // Register a handler for 'userUpdated' event
  emitter.registerHandler("userUpdated", () => console.log("User was updated"));
  
  // Emit the 'userUpdated' event
  emitter.emitEvent("userUpdated"); // User was updated