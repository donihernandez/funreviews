/** @type {import('next-sitemap').IConfig} */
module.exports = {
    changefreq: 'daily',
    generateRobotsTxt: true,
    priority: 0.7,
    sitemapSize: 20000,
    siteUrl: process.env.SITE_URL || 'https://funreviews.org',
};
