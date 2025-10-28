// config.js
const configs = {
  main: {
    redirectBase: 'https://github.com/missing-subtitles/missing-subtitles/tree/master',
    buildTargetUrl: (shortcode) => `${configs.main.redirectBase}/${shortcode}`
  },
  raw: {
    redirectBase: 'https://raw.githubusercontent.com/missing-subtitles/missing-subtitles/refs/heads/master',
    buildTargetUrl: (shortcode) => `${configs.raw.redirectBase}/${shortcode}/${shortcode}.vtt`
  }
}

export default configs
