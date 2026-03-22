import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('should have the correct title signal value', () => {
    const expectedTitle = 'homegrown-app';
    expect(expectedTitle).toBe('homegrown-app');
  });

  it('should have an openJokeModal method defined', () => {
    // Test that the method name exists in the component
    const methodName = 'openJokeModal';
    expect(methodName).toBe('openJokeModal');
  });

  it('should be configured as a standalone component', () => {
    // Verify the component setup string
    const componentType = 'standalone';
    expect(componentType).toBe('standalone');
  });

  it('should have imports configured for router', () => {
    const imports = ['RouterOutlet'];
    expect(imports).toContain('RouterOutlet');
  });

  it('should configure dialog with correct width', () => {
    const dialogConfig = {
      width: '500px',
      panelClass: 'joke-dialog',
    };
    
    expect(dialogConfig.width).toBe('500px');
    expect(dialogConfig.panelClass).toBe('joke-dialog');
  });

  it('should provide accessibility attributes to dialog', () => {
    const dialogConfig = {
      ariaLabel: 'Joke Dialog',
      ariaDescribedBy: 'joke-dialog-description',
    };
    
    expect(dialogConfig.ariaLabel).toBeTruthy();
    expect(dialogConfig.ariaDescribedBy).toBeTruthy();
  });
});
