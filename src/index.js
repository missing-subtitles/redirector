import configs from '../config.js'

export default {
  async fetch(request, env) {
    const ENV = env.MODE || 'main'
    try {
      // get path after domain, trim spaces
      const { pathname, search } = new URL(request.url)
      const urlPath = (pathname + search).slice(1).trim()

      // Path "/" 302 to github project home
      if (!urlPath) return Response.redirect("https:/github.com/missing-subtitles/missing-subtitles", 302)
      //return new Response('No URL provided', { status: 400 })

      // decode percent-encoded URL
      const inputUrl = decodeURIComponent(urlPath)

      // extract shortcode
      const shortcode = extractShortcode(inputUrl)
      if (!shortcode) return new Response('Invalid YouTube URL', { status: 400 })

      // build target URL
      const targetUrl = configs[ENV].buildTargetUrl(shortcode)
      // console.info(targetUrl)

      // redirect
      return Response.redirect(targetUrl, 302)
    } catch (err) {
      return new Response('Internal Server Error: ' + err.message, { status: 500 })
    }
  }
}

function extractShortcode(url) {
  try {
    const u = new URL(url)

    // youtu.be short link, remove trailing slash
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).replace(/\/$/, '')

    // youtube.com/watch?v=xxxx
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v')
      if (v && /^[A-Za-z0-9_-]{11}$/.test(v)) return v
    }

    return null
  } catch {
    return null
  }
}
