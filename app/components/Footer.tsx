import { Link } from '~/components/Link';

function TrustpilotStars() {
    return (
        <div className="flex items-center gap-1">
            <div className="bg-[#00b67a] p-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" fill="white" />
                </svg>
            </div>
            <div className="bg-[#00b67a] p-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" fill="white" />
                </svg>
            </div>
            <div className="bg-[#00b67a] p-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" fill="white" />
                </svg>
            </div>
            <div className="bg-[#00b67a] p-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" fill="white" />
                </svg>
            </div>
            <div className="bg-[#00b67a] p-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" fill="white" />
                </svg>
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="bg-white text-black pt-16 pb-8 px-4 md:px-12 overflow-hidden">
            <div className="max-w-screen-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    {/* Account */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg mb-2">Account</h3>
                        <Link to="/account" className="text-sm hover:underline">Track My Order</Link>
                        <Link to="/account" className="text-sm hover:underline">My Account</Link>
                        <Link to="/wishlist" className="text-sm hover:underline">Wishlist</Link>
                        <Link to="/pages/size-guide" className="text-sm hover:underline">Size Guide</Link>
                        <Link to="/products/gift-card" className="text-sm hover:underline">Gift Cards</Link>
                    </div>

                    {/* About Euforyc */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg mb-2">About Euforyc</h3>
                        <Link to="/pages/sustainability" className="text-sm hover:underline">Sustainability</Link>
                        <Link to="/pages/clothing-bank" className="text-sm hover:underline">Online clothing bank</Link>
                        <Link to="/pages/community" className="text-sm hover:underline">Community</Link>
                    </div>

                    {/* Information */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg mb-2">Information</h3>
                        <Link to="/pages/faq" className="text-sm hover:underline">FAQ</Link>
                        <Link to="/pages/delivery" className="text-sm hover:underline">Delivery</Link>
                        <Link to="/pages/returns" className="text-sm hover:underline">Returns</Link>
                        <Link to="/pages/contact" className="text-sm hover:underline">Contact Us</Link>
                        <Link to="/pages/policies" className="text-sm hover:underline">Our Policies</Link>
                        <Link to="/pages/klarna-faq" className="text-sm hover:underline">Klarna FAQ</Link>
                    </div>

                    {/* Join The Club */}
                    <div className="flex flex-col gap-4">
                        <h3 className="font-bold text-lg mb-2">Join The Club</h3>
                        <form className="flex bg-gray-100 p-1">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-transparent px-4 py-2 w-full text-sm outline-none placeholder:text-gray-500"
                            />
                            <button type="submit" className="font-bold text-xs px-4 tracking-widest hover:text-gray-600">
                                SUBSCRIBE
                            </button>
                        </form>

                        <div className="mt-4">
                            <Link to="/app" className="text-sm underline decoration-1 underline-offset-4 block mb-1">
                                Download The Euforyc App
                            </Link>
                            <p className="text-xs text-gray-600">for exclusive access to every collection</p>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <span className="font-bold text-sm underline decoration-1 underline-offset-2">Excellent</span>
                            <TrustpilotStars />
                            <span className="text-sm font-bold flex items-center gap-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="#00b67a" xmlns="http://www.w3.org/2000/svg"><path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" /></svg>
                                Trustpilot
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="bg-[#00b67a] px-1 py-0.5 text-[10px] text-white font-bold">Trustpilot</div>
                            <span className="text-[10px] text-gray-500">4.1K reviews</span>
                        </div>
                    </div>
                </div>

                {/* Massive Logo */}
                <div className="w-full text-center border-b border-transparent">
                    <h1 className="text-[15vw] leading-none font-bold tracking-tighter">
                        EUFORYC
                    </h1>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-xs text-gray-400 uppercase tracking-wider">
                    &copy; {new Date().getFullYear()} EUFORYC. ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
}
