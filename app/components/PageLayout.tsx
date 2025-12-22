import { useParams, Form, Await, useRouteLoaderData } from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import { Disclosure } from '@headlessui/react';
import { Suspense, useEffect, useMemo } from 'react';
import { CartForm } from '@shopify/hydrogen';
import { Footer } from '~/components/Footer';
import { type LayoutQuery } from 'storefrontapi.generated';
import { Text, Heading, Section } from '~/components/Text';
import { Link } from '~/components/Link';
import logo from '~/assets/logo.png';
import { Cart } from '~/components/Cart';
import { CartLoading } from '~/components/CartLoading';
import { Input } from '~/components/Input';
import { Drawer, useDrawer } from '~/components/Drawer';
import { CountrySelector } from '~/components/CountrySelector';
import {
  IconMenu,
  IconCaret,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
} from '~/components/Icon';
import { AnnouncementBar } from '~/components/AnnouncementBar';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import type { RootLoader } from '~/root';

type LayoutProps = {
  children: React.ReactNode;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({ children, layout }: LayoutProps) {
  const { headerMenu, footerMenu } = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

function Header({ title, menu }: { title: string; menu?: EnhancedMenu }) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 flex flex-col">
        <AnnouncementBar />
        <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
        {menu && (
          <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
        )}
        <DesktopHeader
          isHome={isHome}
          title={title}
          menu={menu}
          openCart={openCart}
        />
        <MobileHeader
          isHome={isHome}
          title={title}
          openCart={openCart}
          openMenu={openMenu}
        />
      </div>
    </>
  );
}

function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => {
        const title = item.title === 'Products' ? 'Shop' : item.title;
        return (
          <span key={item.id} className="block">
            <Link
              to={item.to}
              target={item.target}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
              }
            >
              <Text as="span" size="copy">
                {title}
              </Text>
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();
  const { y } = useWindowScroll();
  const isScrolled = y > 50;
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      role="banner"
      className={`${isTransparent
        ? 'bg-transparent text-white'
        : 'bg-cream/90 text-dark-brown shadow-sm backdrop-blur-md'
        } flex lg:hidden items-center h-nav w-full justify-between leading-none gap-4 px-4 md:px-8 transition-colors duration-300`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isTransparent
                ? 'focus:border-white/20 border-white/20 text-white placeholder:text-white/60'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <img
          src={logo}
          alt={title}
          className={`h-14 w-auto object-contain transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
        />
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} isTransparent={isTransparent} />
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const { y } = useWindowScroll();

  const isScrolled = y > 50;
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      role="banner"
      className={`${isTransparent
        ? 'bg-transparent text-white'
        : 'bg-cream/90 text-dark-brown shadow-sm backdrop-blur-md'
        } hidden h-nav lg:flex items-center transition-all duration-300 w-full justify-between leading-none px-12 py-2`}
    >
      {/* Left: Logo */}
      <div className="flex items-center z-10">
        <Link className="font-bold" to="/" prefetch="intent">
          <img
            src={logo}
            alt={title}
            className={`h-[13rem] w-auto object-contain transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
          />
        </Link>
      </div>

      {/* Center: Navigation */}
      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
        {(menu?.items || []).map((item) => {
          const title = item.title === 'Products' ? 'Shop' : item.title;
          return (
            <Link
              key={item.id}
              to={item.to}
              target={item.target}
              prefetch="intent"
              className={({ isActive }) =>
                isActive
                  ? `pb-1 border-b -mb-px ${isTransparent ? 'border-white' : 'border-dark-brown'}`
                  : `pb-1 hover:border-b transition-all ${isTransparent ? 'hover:border-white/50' : 'hover:border-dark-brown/50'}`
              }
            >
              <span className="uppercase tracking-widest text-sm font-medium font-serif">{title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center gap-6 z-10">
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-6 h-6 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form>
        <AccountLink className="relative flex items-center justify-center w-6 h-6 focus:ring-primary/5" />
        <CartCount isHome={isHome} openCart={openCart} isTransparent={isTransparent} />
      </div>
    </header>
  );
}

function AccountLink({ className }: { className?: string }) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const isLoggedIn = rootData?.isLoggedIn;

  return (
    <Link to="/account" className={className}>
      <Suspense fallback={<IconLogin />}>
        <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
          {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
        </Await>
      </Suspense>
    </Link>
  );
}

function CartCount({
  isHome,
  openCart,
  isTransparent,
}: {
  isHome: boolean;
  openCart: () => void;
  isTransparent?: boolean;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
            isTransparent={isTransparent}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
  isTransparent,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
  isTransparent?: boolean;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${isTransparent
            ? 'text-dark-brown bg-white'
            : 'text-cream bg-dark-brown'
            } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark, isTransparent],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}


