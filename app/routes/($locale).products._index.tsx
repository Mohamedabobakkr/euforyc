import { json, type MetaArgs } from '@shopify/remix-oxygen';
import { Link } from '~/components/Link';
import { PageHeader, Section } from '~/components/Text';
import { getSeoMeta } from '@shopify/hydrogen';
import { seoPayload } from '~/lib/seo.server';
import { routeHeaders } from '~/data/cache';

import wrapTopImg from '~/assets/wrap-top-green.png';
import leggingsImg from '~/assets/leggings-green.png';
import wideLegImg from '~/assets/wide-leg-green.png';

export const headers = routeHeaders;

const PRODUCTS = [
  {
    id: 'wrap-top',
    title: 'Soft Jersey Wrap Crop Top',
    price: '£38.00',
    image: wrapTopImg,
    handle: 'soft-jersey-wrap-crop-top',
    color: 'Dark Racing Green'
  },
  {
    id: 'leggings',
    title: 'Sculpt Seamless Scrunch Legging',
    price: '£54.00',
    image: wrapTopImg, // Using wrapTopImg temporarily as per previous instruction
    handle: 'sculpt-seamless-scrunch-legging',
    color: 'Slate Green'
  },
  {
    id: 'wide-leg',
    title: 'SoftMotion™ Flared Bottoms',
    price: '£64.00',
    image: wrapTopImg, // Using wrapTopImg temporarily as per previous instruction
    handle: 'softmotion-flared-bottoms',
    color: 'Dark Racing Green'
  }
];

export async function loader({ request }: { request: Request }) {
  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'Shop',
      handle: 'products',
      descriptionHtml: 'Euforyc Essentials',
      description: 'Euforyc Essentials',
      seo: {
        title: 'Shop | Euforyc',
        description: 'Euforyc Essentials Collection',
      },
      metafields: [],
      products: { nodes: [] },
      updatedAt: '',
    },
  });

  return json({
    seo,
  });
}

export const meta = ({ matches }: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function AllProducts() {
  return (
    <>
      <PageHeader heading="Shop" variant="allCollections" />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group">
              <Link to={`/products/${product.handle}`} className="block overflow-hidden relative aspect-[4/5] mb-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 shadow-sm">
                    Quick Add
                  </button>
                </div>
              </Link>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-lg text-dark-brown">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.color}</p>
                <p className="text-sm font-bold text-dark-brown">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
