/**
 * Utility for tracking custom events with Crumbless.
 * Safely checks for the window object and the crumbless global.
 */
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.crumbless) {
    try {
      window.crumbless.track(eventName, properties);
    } catch (error) {
      console.error('Crumbless tracking error:', error);
    }
  }
};
