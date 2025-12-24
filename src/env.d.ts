/// <reference types="vite/client" />

/* Shims */
declare global {

  interface HTMLElement {
    showPopover(): void,
    hidePopover(): void,
    togglePopover(): void,
  }

  interface ToggleEvent extends Event {
    readonly newState: 'open' | 'close',
    readonly oldState: 'open' | 'close',
  }

}

export {}
