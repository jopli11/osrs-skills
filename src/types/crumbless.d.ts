declare global {
  interface Window {
    crumbless?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

export {};
