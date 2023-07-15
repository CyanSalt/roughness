/// <reference types="vite/client" />
/// <reference types="@vue-macros/reactivity-transform/macros-global" />

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
