// Note: .env, .env.development, and .env.production files should be included in your repository as they define defaults. 
// .env*.local should be added to .gitignore, as those files are intended to be ignored. .env.local is where secrets can be stored.
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? '/fcc-front-end-libraries' : ''
}