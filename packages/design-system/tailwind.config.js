module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(61, 56, 47)',
        light: 'rgb(159, 156, 149)',
        point: 'rgb(255, 166, 0)',
        sub: 'rgb(255, 255, 255)',
        'point-dark': 'rgb(241, 149, 0)',
        'sub-dark': 'rgb(255, 245, 225)',
        normal: 'rgb(255, 255, 255)',
        'normal-dark': 'rgb(248, 248, 248)',
        lock: 'rgb(245, 244, 241)',
        toggle: 'rgb(234, 230, 220)',
      },
      fontSize: {
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },
      boxShadow: {
        inner: 'inset 1.5px 1.5px 1.5px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
  important: true,
};
