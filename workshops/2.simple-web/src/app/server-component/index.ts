import './server-component.ts'

const serverScreen = document.createElement('server-screen');
serverScreen.setAttribute('server-key-url', 'server-keys.json');

document.body.appendChild(document.createElement('server-screen'));