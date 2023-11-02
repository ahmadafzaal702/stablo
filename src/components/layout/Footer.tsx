import Link from "next/link";

// Footer FC
const Footer = () => {
  // Footer FC return
  return (
    <>
      <footer className="bg-black text-white px-20 py-10 mt-5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-x-5">
          {/* Mission Column */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-sm">
              Empowering Curiosity, Inspiring Innovation: Navigating the
              Boundless Horizons of Knowledge Together.
            </p>
          </div>

          {/* Menu Columns */}
          <div className="w-full md:w-1/4 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link href="/" className="text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-sm">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/pages/about-us" className="text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pages/contact-us" className="text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Menu Columns */}
          <div className="w-full md:w-1/4 flex flex-col">
            <h2 className="text-xl font-semibold mb-2">Policies</h2>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link href="/policies/privacy-policy" className="text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/refund-policy" className="text-sm">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping-policy" className="text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms-of-service" className="text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Columns */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-sm">
              If you have any question, kindly reach us through the{" "}
              <Link href="/pages/contact-us" className="underline">
                contact us
              </Link>{" "}
              page.
            </p>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="text-center mt-10">
          <p className="text-sm">&copy; 2023 Stablo. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
