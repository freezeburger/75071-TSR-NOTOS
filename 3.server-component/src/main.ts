import { ServerScreen } from './server-screen';
import './style.css'

const screen1 = new ServerScreen('screen-1');
screen1.listen('screen-event-click', {code:'013', alt:'1', ctrl:'0', shift:'0'});


// const screen2 = new ServerScreen('screen-2');
console.log(screen1)