import { Link } from '~/components/Link';
import wrapTopImg from '~/assets/wrap-top-green.png';
import leggingsImg from '~/assets/leggings-green.png';
import wideLegImg from '~/assets/wide-leg-green.png';

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
        image: wrapTopImg,
        handle: 'sculpt-seamless-scrunch-legging',
        color: 'Slate Green'
    },
    {
        id: 'wide-leg',
        title: 'SoftMotion™ Flared Bottoms',
        price: '£64.00',
        image: wrapTopImg,
        handle: 'softmotion-flared-bottoms',
        color: 'Dark Racing Green'
    }
];

export function EuforycEssentials() {
    return (
        <section className="py-12 bg-cream">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-serif text-3xl md:text-4xl text-dark-brown italic">/ Euforyc Essentials</h2>
                    <Link to="/collections/all" className="text-sm font-bold uppercase tracking-widest hover:underline">
                        View All
                    </Link>
                </div>

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
                                    <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-100">
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
            </div>
        </section>
    );
}
