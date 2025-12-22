import { Link } from '@remix-run/react';
import promoImg from '~/assets/promo-banner.png';

export function PromotionalBanner() {
    return (
        <section className="w-full bg-cream pb-12">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
                <Link to="/collections/all" className="group block relative overflow-hidden aspect-[21/9] w-full">
                    <img
                        src={promoImg}
                        alt="Promotional Banner"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-8">
                        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4 italic tracking-tight">
                            The New Collection
                        </h2>
                        <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-8">
                            Limited Time Offer — 20% Off Everything
                        </p>
                        <span className="bg-white text-dark-brown px-8 py-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-cream transition-colors duration-300">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    );
}
