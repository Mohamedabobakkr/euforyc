import { Link } from '@remix-run/react';
import { Image } from '@shopify/hydrogen';
import wrapTopsImg from '~/assets/wrap-tops.png';
import leggingsImg from '~/assets/leggings.png';
import flareYogaPantsImg from '~/assets/flare-yoga-pants.png';

const CATEGORIES = [
    {
        id: 'wrap-tops',
        title: 'Wrap Tops',
        handle: 'wrap-tops',
        image: wrapTopsImg,
    },
    {
        id: 'leggings',
        title: 'Leggings',
        handle: 'leggings',
        image: leggingsImg,
    },
    {
        id: 'flare-yoga-pants',
        title: 'Flare Yoga Pants',
        handle: 'flare-yoga-pants',
        image: flareYogaPantsImg,
    },
];

export function ShopByCategory() {
    return (
        <section className="py-12 bg-cream">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
                <h2 className="font-serif text-3xl md:text-4xl text-dark-brown italic mb-8">/ Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CATEGORIES.map((category) => (
                        <Link key={category.id} to={`/collections/${category.handle}`} className="group block">
                            <div className="relative aspect-[3/4] overflow-hidden bg-primary/5 mb-4">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-dark-brown uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4">
                                {category.title}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
