import { IconArrow } from '~/components/Icon';

const REVIEWS = [
    {
        id: 1,
        text: "I literally live in Euforyc - as a Pilates instructor I am in Euforyc activewear all day and now I sleep in Euforyc too! Obsessed with everything about this brand - the quality is unmatched.",
        author: "Celine L"
    },
    {
        id: 2,
        text: "Just buy them. Honestly, they're that good! The wide leg Pjs fit in such a comfy, floaty, dreamy way without being shapeless.",
        author: "Isabella B"
    },
    {
        id: 3,
        text: "Adore the DayFlex twist sports bra, it fits so well and is supportive for my (admittedly small) boobs! Looks great and the fabric is so soft!",
        author: "Megan B"
    },
    {
        id: 4,
        text: "Love it! I'm a newbie to the brand, bought 2 sets within 2 weeks. IN LOVE.",
        author: "Caroline W"
    }
];

function Star() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" fill="#1F1F1F" />
        </svg>
    );
}

export function CustomerReviews() {
    return (
        <section className="py-16 bg-[#F5F0E6] text-dark-brown overflow-hidden">
            <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
                <h2 className="font-bold text-3xl md:text-4xl mb-12 tracking-tight">Customer Reviews</h2>

                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0 gap-8 pb-8">
                    {REVIEWS.map((review) => (
                        <div
                            key={review.id}
                            className="snap-center flex-shrink-0 w-[85vw] md:w-[25vw] flex flex-col gap-4"
                        >
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} />
                                ))}
                            </div>
                            <p className="font-serif text-xl md:text-2xl leading-relaxed">
                                "{review.text}"
                            </p>
                            <span className="text-xs font-bold uppercase tracking-widest mt-2">
                                {review.author}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
