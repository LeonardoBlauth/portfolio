export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=UTF-8')

  const { public: publicConfig } = useRuntimeConfig(event)
  const isProduction = publicConfig.siteEnvironment === 'production'

  if (!isProduction) {
    return 'User-agent: *\nDisallow: /\n'
  }

  return [
    'User-agent: *',
    'Allow: /',
    'Sitemap: https://leonardoblauth.dev/sitemap.xml',
    '',
  ].join('\n')
})
