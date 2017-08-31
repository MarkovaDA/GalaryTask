class EventEmitter {
	constructor() {
		this.events = {};
	}
	subscribe(eventName, fn) {
		if(!this.events[eventName]) {
		 this.events[eventName] = [];
		}
		this.events[eventName].push(fn);
	}
	emit(eventName, data) {
		const event = this.events[eventName];
		if(event) {
			event.forEach(fn => {
				fn.call(null, data);
			});
		}
	}
	subscribe(eventName, fn) {
		if(!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(fn);
		return () => {
			this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
		}
	}
}
let emitter = new EventEmitter();
/*
button.addEventListener('click', () => {
  emitter.emit('event:name-changed', {name: input.value});
});
let emitter = new EventEmitter();
emitter.subscribe('event:name-changed', data => {
  h1.innerHTML = `Your name is: ${data.name}`;
});
*/