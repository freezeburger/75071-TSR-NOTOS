import { isValidKeyName, isValidServerCode, serverCode } from "./guards";
import { loadServerScreenCodes } from "./loader";
import { Altkey, ControlKey, KeyCode, ServerCodes, ShiftKey } from "./type";

export class ServerScreen extends HTMLElement {

  private serverScreenCodes:ServerCodes[] = [];
  private mounted = false;

  static get observedAttributes() {
    return ["data-screen-id"];
  }

  constructor(private mountScreenId: string = 'server-screen') {
    super();
    this.attachShadow({ mode: 'open' });
    this.initialize();
  }

  listen( eventName: `screen-event-${keyof WindowEventMap}`, to: {code:KeyCode,alt:Altkey,ctrl:ControlKey, shift:ShiftKey} ) {
    if (!this.mounted) {
      console.warn(`ServerScreen is not mounted yet. Event ${eventName} will not be registered.`);
      return;
    }
    this.querySelectorAll(`[${eventName}]`)
      .forEach( el => {
      el.addEventListener(eventName.replace('screen-event-',''), (event: Event) => {
        console.log(`Event ${eventName} triggered on`, el, 'with data:', to);
      });
    })
  }

  connectedCallback(){
    window.addEventListener('keyup', this.handleKeyboardEvents, true);
    this.mounted = true;
  }

  disconnectedCallback(){
    window.removeEventListener('keyup',this.handleKeyboardEvents, true)
    this.mounted = false;
  }

  attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    console.log('ServerScreen attribute changed:', name, oldValue, newValue);
    if( name === 'data-screen-id' && oldValue !== newValue && oldValue !== null) {
      this.mountScreenId = newValue;
      this.shadowRoot!.innerHTML = ''; // Clear previous content
      this.initialize();
    }
  }

  private initialize() {
    this.shadowRoot!.appendChild(this.template);

    loadServerScreenCodes(this.mountScreenId)
      .then(codes => {
        console.log(`Loaded server screen code for ${this.mountScreenId} \n`, codes);
        this.serverScreenCodes = codes;
        this.dispatchEvent(new CustomEvent('server-screen-codes-loaded', { detail: { codes: this.serverScreenCodes } }));
      })
      .then(() =>{
        this.setAttribute('data-screen-id', this.mountScreenId);
      })
      .finally(this.mount);
  }

  private get template() {
    return document.querySelector<HTMLTemplateElement>(`template[data-for-screen=${this.mountScreenId}]`)?.content.cloneNode(true) || document.createTextNode('Unable to load template');
  }

  private handleKeyboardEvents = ({altKey,ctrlKey,shiftKey,code}:KeyboardEvent) => {

    if(!isValidKeyName(code)) return;
    
    const eventCode = serverCode`${code}${altKey}${ctrlKey}${shiftKey}`;
    
    if (!isValidServerCode(eventCode)) {
      console.warn(`Invalid server code: ${eventCode}`);
      return;
    }
    
    console.log(`Key pressed: ${code}, Event Code: ${eventCode}`);
    
    if (this.serverScreenCodes.includes(eventCode)) {
      console.log(`Executing action for code: ${eventCode}`);
      this.dispatchEvent(new CustomEvent('server-screen-action', { detail: { code: eventCode } }));

    }else {

      console.warn(`No action defined for code: ${eventCode}`);
      
    }
  }

  private mount = async () => {

    const mountPoint = document.querySelector(`[data-screen-id=${this.mountScreenId}]`);

    if (this.mounted === false && mountPoint) {
      mountPoint.appendChild(this);
    } else if(!mountPoint) {
      console.error('Mount point not found for ServerScreen');
    }
    
  }

}

customElements.define('server-screen', ServerScreen);