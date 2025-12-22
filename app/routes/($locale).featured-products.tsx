import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import wrapTopImg from '~/assets/wrap-top-green.png';

export async function loader({ context: { storefront } }: LoaderFunctionArgs) {
  return json(await getFeaturedData(storefront));
}

export async function getFeaturedData(
  storefront: LoaderFunctionArgs['context']['storefront'],
  variables: { pageBy?: number } = {},
) {
  // Hardcoded Euforyc products to replace snowboards
  const hardcodedProducts = {
    nodes: [
      {
        id: 'wrap-top',
        title: 'Soft Jersey Wrap Crop Top',
        publishedAt: new Date().toISOString(),
        handle: 'soft-jersey-wrap-crop-top',
        variants: {
          nodes: [
            {
              id: 'var-1',
              image: {
                url: wrapTopImg,
                altText: 'Soft Jersey Wrap Crop Top',
                width: 1000,
                height: 1250,
              },
              price: {
                amount: '38.00',
                currencyCode: 'GBP',
              },
              compareAtPrice: null,
              availableForSale: true,
            },
          ],
        },
      },
      {
        id: 'leggings',
        title: 'Sculpt Seamless Scrunch Legging',
        publishedAt: new Date().toISOString(),
        handle: 'sculpt-seamless-scrunch-legging',
        variants: {
          nodes: [
            {
              id: 'var-2',
              image: {
                url: wrapTopImg, // Using wrapTopImg temporarily
                altText: 'Sculpt Seamless Scrunch Legging',
                width: 1000,
                height: 1250,
              },
              price: {
                amount: '54.00',
                currencyCode: 'GBP',
              },
              compareAtPrice: null,
              availableForSale: true,
            },
          ],
        },
      },
      {
        id: 'wide-leg',
        title: 'SoftMotion™ Flared Bottoms',
        publishedAt: new Date().toISOString(),
        handle: 'softmotion-flared-bottoms',
        variants: {
          nodes: [
            {
              id: 'var-3',
              image: {
                url: wrapTopImg, // Using wrapTopImg temporarily
                altText: 'SoftMotion™ Flared Bottoms',
                width: 1000,
                height: 1250,
              },
              price: {
                amount: '64.00',
                currencyCode: 'GBP',
              },
              compareAtPrice: null,
              availableForSale: true,
            },
          ],
        },
      },
    ],
  };

  return {
    featuredCollections: { nodes: [] },
    featuredProducts: hardcodedProducts,
  };
}

export type FeaturedData = Awaited<ReturnType<typeof getFeaturedData>>;

