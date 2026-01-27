/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/app.html'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)'
      },
      textColor: {
        foreground: 'var(--color-foreground)',
        'muted-foreground': 'var(--color-muted-foreground)',
      },
      backgroundColor: {
        background: 'var(--color-background)',
        muted: 'var(--color-muted)',
      },
      borderColor: {
        border: 'var(--color-border)',
        muted: 'var(--color-border)',
        'muted-foreground': 'var(--color-muted-foreground)',
      }
    }
  },
  plugins: []
};
