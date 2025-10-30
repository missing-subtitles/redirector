// config.js
const configs = {
  main: {
    redirectBase: 'https://github.com/missing-subtitles/archive/tree/master',
    buildTargetUrl: (shortcode) => `${configs.main.redirectBase}/${shortcode}`
  },
  raw: {
    redirectBase: 'https://raw.githubusercontent.com/missing-subtitles/archive/refs/heads/master',
    buildTargetUrl: (shortcode) => `${configs.raw.redirectBase}/${shortcode}/${shortcode}.vtt`
  }
}

export default configs
