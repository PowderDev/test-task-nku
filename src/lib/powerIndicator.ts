import { writable } from 'svelte/store';

const PowerIndicatorStore = writable(0);

const connect = () => {
	const port = import.meta.env.PORT || 4000;
	const socket = new WebSocket(`ws://localhost:${port}`);

	socket.addEventListener('message', (event) => {
		const value = JSON.parse(event.data) as number;
		PowerIndicatorStore.set(value);
	});

	return socket;
};

export default {
	subscribe: PowerIndicatorStore.subscribe,
	connect
};
