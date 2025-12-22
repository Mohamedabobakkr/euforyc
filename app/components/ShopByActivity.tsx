import { Link } from '@remix-run/react';
import { IconArrow } from '~/components/Icon';
import pilatesImg from '~/assets/pilates.png';
import strengthImg from '~/assets/strength.png';
import cardioImg from '~/assets/cardio.png';
// Reusing images due to generation limit, can be replaced later
import loungewearImg from '~/assets/pilates.png';
import runningImg from '~/assets/strength.png';

const ACTIVITIES = [
    {
        id: 'pilates',
        title: 'The Pilates Edit',
        handle: 'pilates',
        image: pilatesImg,
    },
    {
        id: 'strength',
        title: 'Strength & Lifting',
        handle: 'strength',
        image: strengthImg,
    },
    {
        id: 'cardio',
        title: 'Cardio',
        handle: 'cardio',
        image: cardioImg,
    },
    {
        id: 'loungewear',
        title: 'Loungewear',
        handle: 'loungewear',
        image: loungewearImg,
    },
    {
        id: 'running',
        title: 'Running',
        handle: 'running',
        image: runningImg,
    },
];

export function ShopByActivity() {
    return (
        <section className="py-12 bg-cream overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mb-8 flex justify-between items-center">
                <h2 className="font-serif text-3xl md:text-4xl text-dark-brown italic">/ Shop By Activity</h2>
                <Link to="/collections/all" className="group">
                    <IconArrow direction="right" className="w-8 h-8 text-dark-brown group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 md:mx-0 px-4 md:px-0 gap-1 md:gap-2">
                {ACTIVITIES.map((activity) => (
                    <Link
                        key={activity.id}
                        to={`/collections/${activity.handle}`}
                        className="group relative flex-shrink-0 w-[85vw] md:w-[25vw] snap-center first:pl-0 last:pr-4 md:last:pr-0"
                    >
                        <div className="aspect-[3/5] overflow-hidden bg-primary/5 relative">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <h3 className="mt-4 text-lg font-serif text-dark-brown">
                            {activity.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}
