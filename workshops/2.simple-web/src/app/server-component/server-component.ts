import { KeyBinding, ServerKeyCode } from "./types.ts";
import { parseServerCode } from "./utils.ts";
import { ServerKeyMap } from "./values.ts";


class ServerScreen extends HTMLElement {
    private bindings: KeyBinding[] = [];
  
    connectedCallback() {
      const endpoint = this.getAttribute('data-keys-url');
      if (endpoint) {
        this.loadServerKeyMap(endpoint);
      }
      window.addEventListener('keydown', this.handleKey);
    }
  
    disconnectedCallback() {
      window.removeEventListener('keydown', this.handleKey);
    }
  
    async loadServerKeyMap(endpoint: string) {
      try {
        const response = await fetch(endpoint);
        const codes: string[] = await response.json();
        this.setServerKeyMap(codes);
      } catch (err) {
        console.error('[ServerScreen] Failed to load server key map:', err);
      }
    }
  
    setServerKeyMap(codes: string[]) {
      this.bindings = [];
      for (const code of codes) {
        this.bindServerKey(code, () => {
          this.dispatchEvent(
            new CustomEvent('server-key-matched', {
              detail: { code },
              bubbles: true,
            })
          );
          if (typeof this.onServerKeyMatched === 'function') {
            this.onServerKeyMatched(code);
          }
        });
      }
    }
  
    public onServerKeyMatched?: (code: string) => void;
  
    bindServerKey(code: string, callback: () => void) {
      this.bindings.push({
        serverCode: parseServerCode(code),
        callback,
      });
    }
  
    public matchesServerCode(serverCode: ServerKeyCode, event: KeyboardEvent): boolean {
      return (
        serverCode.alt === event.altKey &&
        serverCode.shift === event.shiftKey &&
        serverCode.ctrl === event.ctrlKey &&
        this.translateKey(serverCode.key) === event.code
      );
    }
  
    private handleKey = (e: KeyboardEvent) => {
      for (const binding of this.bindings) {
        if (this.matchesServerCode(binding.serverCode, e)) {
          e.preventDefault();
          binding.callback();
        }
      }
    };
  
    private translateKey(serverKey: string): string {
      return ServerKeyMap[serverKey] ?? '';
    }
  }
  
  customElements.define('server-screen', ServerScreen);
  


