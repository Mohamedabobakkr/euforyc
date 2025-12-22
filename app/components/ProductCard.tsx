import clsx from 'clsx';
import { flattenConnection, Image, Money, useMoney } from '@shopify/hydrogen';
import type { MoneyV2, Product } from '@shopify/hydrogen/storefront-api-types';

import type { ProductCardFragment } from 'storefrontapi.generated';
import { Text } from '~/components/Text';
import { Link } from '~/components/Link';
import { Button } from '~/components/Button';
import { AddToCartButton } from '~/components/AddToCartButton';
import { isDiscounted, isNewArrival } from '~/lib/utils';
import { getProductPlaceholder } from '~/lib/placeholders';

export function ProductCard({
  product,
  label,
  className,
  loading,
  onClick,
  quickAdd,
}: {
  product: ProductCardFragment;
  label?: string;
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  quickAdd?: boolean;
}) {
  let cardLabel;

  const cardProduct: Product = product?.variants
    ? (product as Product)
    : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const { image, price, compareAtPrice } = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  return (
    <div className="flex flex-col gap-2 group">
      <Link
        onClick={onClick}
        to={`/products/${product.handle}`}
        prefetch="viewport"
        className="relative block overflow-hidden"
      >
        <div className={clsx('grid gap-4', className)}>
          <div className="card-image aspect-[4/5] bg-primary/5 relative">
            {image && (
              <Image
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 fadeIn"
                sizes="(min-width: 64em) 25vw, (min-width: 48em) 30vw, 45vw"
                aspectRatio="4/5"
                data={image}
                alt={image.altText || `Picture of ${product.title}`}
                loading={loading}
              />
            )}
            <Text
              as="label"
              size="fine"
              className="absolute top-0 right-0 m-4 text-right text-notice"
            >
              {cardLabel}
            </Text>

            {/* Quick Add Overlay */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100 shadow-sm">
                Quick Add
              </button>
            </div>
          </div>
        </div>
      </Link>
      <div className="grid gap-1">
        <Text
          className="w-full overflow-hidden whitespace-nowrap text-ellipsis font-serif text-lg text-dark-brown"
          as="h3"
        >
          {product.title}
        </Text>
        <div className="flex gap-4">
          <Text className="flex gap-4 font-bold text-sm text-dark-brown">
            <Money withoutTrailingZeros data={price!} />
            {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
              <CompareAtPrice
                className={'opacity-50'}
                data={compareAtPrice as MoneyV2}
              />
            )}
          </Text>
        </div>
      </div>
    </div>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const { currencyNarrowSymbol, withoutTrailingZerosAndCurrency } =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
