export const GET = async ({ url }) => {
  const robots = `
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/

Sitemap: ${url.origin}/sitemap.xml
`.trim();

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
