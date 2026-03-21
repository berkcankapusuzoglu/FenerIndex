export const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

export const AD_SLOTS = {
  RUMORS_FEED_INLINE: "rumors-feed-inline",
  SIDEBAR: "sidebar",
  ARTICLE_BOTTOM: "article-bottom",
  HEADER_BANNER: "header-banner",
} as const;

export function isAdsEnabled(): boolean {
  return ADSENSE_PUB_ID.length > 0 && ADSENSE_PUB_ID.startsWith("ca-pub-");
}
