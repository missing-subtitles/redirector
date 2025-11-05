// config.js
const configs = {
  main: {
    redirectBase: 'https://github.com/missing-subtitles/archive/tree/master',
    buildYTTargetUrl: (shortcode) => `${configs.main.redirectBase}/youtube/${shortcode}`
  },
  raw: {
    redirectBase: 'https://raw.githubusercontent.com/missing-subtitles/archive/refs/heads/master',
    buildYTTargetUrl: (shortcode) => `${configs.raw.redirectBase}/youtube/${shortcode}/${shortcode}.vtt`
  }
}

export default configs
