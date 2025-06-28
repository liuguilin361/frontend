
export default class ReopeningWebSocket {
  public href: string;
  private ws: null | WebSocket;
  private closing: boolean;
  private opening: boolean;
  private backoff: number;
  private listeners:{open:any[],message:Function[]};

  constructor(href:string) {
    this.href = href;
    this.ws = null;
    this.closing = false;
    this.opening = false;
    this.backoff = 0;

    this.onOpen = this.onOpen.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.reopen = this.reopen.bind(this);
    this.closePermanently = this.closePermanently.bind(this);

    this.listeners = {
      open: [],
      message: [],
    };

    this.open();
  }

  open() {
    if (this.closing) {
      return;
    }

    this.opening = true;
    this.ws = new WebSocket(this.href);
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('close', this.reopen);
    this.ws.addEventListener('error', this.reopen);
  }

  /**
   * @param {string} name - Name of event to listen for
   * @param {Function} listener - Called when underlying websocket emits event
   */
  addEventListener(name:"open"| "message", listener:Function) {

    if (name === 'open' && !this.opening) {
      // readyState would cause race condition
      listener();
    }

    this.listeners[name].push(listener);
  }

  onOpen() {
    this.backoff = 1000;
    this.opening = false;
    for (const listener of this.listeners.open) {
      listener();
    }
  }

  onMessage(event:any) {
    for (const listener of this.listeners.message) {
      listener(event);
    }
  }

  reopen() {
    this.ws?.removeEventListener('open', this.onOpen);
    this.ws?.removeEventListener('message', this.onMessage);
    this.ws?.removeEventListener('close', this.reopen);
    this.ws?.removeEventListener('error', this.reopen);
    this.ws?.close();
    this.ws = null;
    window.removeEventListener('beforeunload', this.closePermanently);

    setTimeout(() => {
      this.backoff *= 2;
      if (this.backoff > 30000) {
        this.backoff = 30000;
      }
      this.open();
    }, this.backoff);
  }

  /**
   * Sends a message through the WebSocket.
   * @param msg Message to send.
   */
  send(msg: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log('WebSocket send:', msg);
      this.ws.send(msg);
    } else {
      console.warn('WebSocket is not open');
    }
  }

  closePermanently() {
    this.closing = true;
    this.listeners = {open:[],message: []};
      this.ws?.removeEventListener('open', this.onOpen);
      this.ws?.removeEventListener('message', this.onMessage);
      this.ws?.removeEventListener('close', this.reopen);
      this.ws?.removeEventListener('error', this.reopen);
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      this.ws.close();
    }
      this.ws = null;
  }
}


