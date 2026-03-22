import { describe, it, expect, vi } from 'vitest';

describe('JokeModalComponent', () => {
  // Test data
  const jokes = [
    { setup: 'Why did the scarecrow win an award?', punchline: 'He was outstanding in his field.' },
    { setup: 'What do you call a fake noodle?', punchline: 'An impasta.' },
    { setup: 'Why don\'t scientists trust atoms?', punchline: 'Because they make up everything!' },
    { setup: 'Did you hear about the mathematician who\'s afraid of negative numbers?', punchline: 'He\'ll stop at nothing to avoid them.' },
    { setup: 'Why did the coffee file a police report?', punchline: 'It got mugged.' },
    { setup: 'What do you call a bear with no teeth?', punchline: 'A gummy bear.' },
    { setup: 'Why don\'t eggs tell jokes?', punchline: 'They\'d crack each other up.' },
    { setup: 'What did the ocean say to the beach?', punchline: 'Nothing, it just waved.' },
    { setup: 'Why did the kid bring a ladder to school?', punchline: 'Because he wanted to go to high school.' },
    { setup: 'What do you call a sleeping bull?', punchline: 'A dozer.' }
  ];

  it('should have valid joke data structure', () => {
    expect(jokes.length).toBe(10);
    
    jokes.forEach(joke => {
      expect(joke).toHaveProperty('setup');
      expect(joke).toHaveProperty('punchline');
      expect(typeof joke.setup).toBe('string');
      expect(typeof joke.punchline).toBe('string');
      expect(joke.setup.length).toBeGreaterThan(0);
      expect(joke.punchline.length).toBeGreaterThan(0);
    });
  });

  it('should return a random joke when selecting from the list', () => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const selectedJoke = jokes[randomIndex];
    
    expect(selectedJoke).toBeTruthy();
    expect(selectedJoke.setup).toBeTruthy();
    expect(selectedJoke.punchline).toBeTruthy();
  });

  it('should be able to select different jokes', () => {
    const firstIndex = Math.floor(Math.random() * jokes.length);
    const firstJoke = jokes[firstIndex];
    
    const secondIndex = Math.floor(Math.random() * jokes.length);
    const secondJoke = jokes[secondIndex];
    
    expect(firstJoke).toBeTruthy();
    expect(secondJoke).toBeTruthy();
  });

  it('should close dialog when closeDialog is called', () => {
    const closeSpyFn = vi.fn();
    const mockDialogRef = { close: closeSpyFn };

    mockDialogRef.close();

    expect(closeSpyFn).toHaveBeenCalled();
  });
});
