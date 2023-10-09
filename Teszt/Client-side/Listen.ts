import { } from './Models/index.js'

interface ListenerInterface {
    wireEventListeners(): void;
}

class Listener implements ListenerInterface {
    wireEventListeners(): void {
        // TODO this is where all of these will be implemented:
        // document.querySelector('#hello').addEventListener('click', hello)
    }
}