import { ContextualKeys, KeyCode, KeyName, ServerCodes, ValueKeyCode } from "./type";


export class ServerScreen extends HTMLElement {

  private serverScreenCodes:ServerCodes[] = []

  constructor(private mountScreenId: string = 'server-screen') {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(this.template);

    this.loadServerScreenCodes()
      .then(this.mount);
  }

  connectedCallback(){
    window.addEventListener('keyup', this.handleKeyboardEvents, true);
  }

  disconnectedCallback(){
    window.removeEventListener('keyup',this.handleKeyboardEvents, true)
  }

  private get template() {
    return document.querySelector<HTMLTemplateElement>(`template[data-for-screen=${this.mountScreenId}]`)?.content.cloneNode(true) || document.createTextNode('Unable to load template');
  }

  private handleKeyboardEvents = ({altKey,ctrlKey,shiftKey,code}:KeyboardEvent) => {

    if(!this.isValidKeyName(code)) return;
    
    //const eventCode : ServerCodes = `${ValueKeyCode[code as KeyName]}${altKey ? '1' : '0'}${ctrlKey ? '1' : '0'}${shiftKey ? '1' : '0'}`;
    const eventCode = this.serverCode`${code}${altKey}${ctrlKey}${shiftKey}`;
    
    if (!this.isValidServerCode(eventCode)) {
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

  private async loadServerScreenCodes() {
    const data = await fetch(`/${this.mountScreenId}.json`)
      .then<ServerCodes[]>(response => response.json())
      .catch(error => {
        console.error('Error loading server screen codes:', error);
        return [];
      });

    const sanitizedData = data.filter( this.isValidServerCode );
    console.log(`Loaded server screen code for ${this.mountScreenId} \n`, sanitizedData, `\nfrom\n`, data);
    
    this.serverScreenCodes = sanitizedData;
    this.dispatchEvent(new CustomEvent('server-screen-codes-loaded', { detail: { codes: this.serverScreenCodes } }));
  }

  private isValidServerCode = (code: string): code is ServerCodes => {
    const [key, context] = code.split(/(?=(?:.{3})+$)/) as [KeyCode, ContextualKeys];
    
    return Object.values(ValueKeyCode).includes(key) && this.isValidContext(context);
  }
  
  private isValidContext= (context: string): context is ContextualKeys => {
    return  /^[01]{3}$/.test(context);
  }

  private isValidKeyName = (key: string): key is KeyName =>{
    return Object.keys(ValueKeyCode).includes(key)
  }

  private serverCode = (strings: TemplateStringsArray, ...values:[KeyboardEvent['code'],KeyboardEvent['altKey'],KeyboardEvent['ctrlKey'],KeyboardEvent['shiftKey']]):ServerCodes=>{
    return `${ValueKeyCode[values[0] as KeyName]}${values[1] ? '1' : '0'}${values[2] ? '1' : '0'}${values[3] ? '1' : '0'}` as ServerCodes;
  }

  private mount = async () => {

    const mountPoint = document.querySelector(`[data-screen-id=${this.mountScreenId}]`);

    if (mountPoint) {
      mountPoint.appendChild(this);
    } else {
      console.error('Mount point not found for ServerScreen');
    }
  }

}

customElements.define('server-screen', ServerScreen);