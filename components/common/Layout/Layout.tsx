import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export type Category = {
  id: string;
  name: string;
  slug: string;
  path: string;
};

// TODO: define this type
export type Page = {
  // ID of the Web page.
  id: string;
  // Page name, as displayed on the storefront.
  name: string;
  // Relative URL on the storefront for this page.
  url?: string;
  // HTML or variable that populates this page’s `<body>` element, in default/desktop view. Required in POST if page type is `raw`.
  body: string;
  // If true, this page appears in the storefront’s navigation menu.
  is_visible?: boolean;
  // Order in which this page should display on the storefront. (Lower integers specify earlier display.)
  sort_order?: number;
};

interface Props {
  pageProps: {
    pages?: Page[];
    categories: Category[];
  };
  children: ReactNode;
}

const Layout: React.FC<Props> = ({
  children,
  pageProps: { categories = [], ...pageProps },
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="  min-h-screen  ">
        <div className="">
          <Navbar open={open} setOpen={setOpen} navigation={navigation} />
        </div>
        <main className="-z-0"> {children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

export const navigation = {
  categories: [
    {
      id: "discover",
      name: "Discover",
      featured: [
        {
          name: "Trending",
          href: "a",
          imageSrc:
            "https://cdn.rtrcdn.com/assets/imgs/02022022_MegaMenu_Discover.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
      ],
      sections: [
        {
          id: "trending",
          name: "Trending",
          items: [
            { name: "Best Sellers", href: "/collections/best-sellers" },
            { name: "Most Popular", href: "/collections/collection" },
            { name: "Community Top Picks", href: "a" },
            { name: "Top Rated", href: "a" },
          ],
        },
        {
          id: "discover",
          name: "Discover",
          items: [
            { name: "Spring Fashion Preview", href: "a" },
            { name: "Cozy Essentails", href: "a" },
            { name: "Matching Sets", href: "a" },
            { name: "Must-Rent Outerwear", href: "a" },
            { name: "Statement Sweaters", href: "a" },
            { name: "The Ski Edit", href: "a" },
          ],
        },
        {
          id: "morefromus",
          name: "More from Vestiyer",
          items: [
            { name: "Membership Perks", href: "a" },
            { name: "Sustainability at Vestiyer", href: "a" },
            { name: "Buying on Vestiyer", href: "a" },
            { name: "Vestiyer + Benjamins", href: "a" },
            { name: "Vestiyer + Şeyma Subaşı", href: "a" },
          ],
        },
      ],
    },
    {
      id: "clothing",
      name: "Clothing",
      featured: [
        {
          name: "Clothing",
          href: "a",
          imageSrc:
            "https://cdn.rtrcdn.com/assets/imgs/02022022_MegaMenu_Clothing.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Dresses", href: "a" },
            { name: "Tops", href: "a" },
            { name: "Sweaters", href: "a" },
            { name: "Pants", href: "a" },
            { name: "Skirts", href: "a" },
            { name: "Gowns", href: "a" },
            { name: "Jumpsuits & Rompers", href: "a" },
            { name: "Activewear", href: "a" },
            { name: "Maternity", href: "a" },
            { name: "View All", href: "a" },
          ],
        },
        {
          id: "whatToWear",
          name: "What to Wear",
          items: [
            { name: "Wedding", href: "a" },
            { name: "Gala", href: "a" },
            { name: "Night Out", href: "a" },
            { name: "Out to Dinner", href: "a" },
            { name: "At the Office", href: "a" },
            { name: "WFH Essentials", href: "a" },
            { name: "Weekend", href: "a" },
            { name: "Vacation", href: "a" },
          ],
        },
        {
          id: "trending",
          name: "Trending",
          items: [
            { name: "Most Popular", href: "a" },
            { name: "Commuity Top Picks", href: "a" },
            { name: "Winter Coats", href: "a" },
            { name: "Denim & Jeans", href: "a" },
            { name: "Cozy Sweaters", href: "a" },
            { name: "Home", href: "a" },
            { name: "Kids", href: "a" },
          ],
        },
        {
          id: "sampleSale",
          name: "Sample Sale",
          items: [{ name: "%90 indirimle al", href: "a" }],
        },
      ],
    },
    {
      id: "designers",
      name: "Designers",
      featured: [
        {
          name: "Clothing",
          href: "a",
          imageSrc:
            "https://cdn.rtrcdn.com/assets/imgs/02022022_MegaMenu_Designer.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
      ],
      sections: [
        {
          id: "discover",
          name: "DISCOVER",
          items: [
            { name: "On Our Radar", href: "a" },
            { name: "Designer Collective", href: "a" },
            { name: "The Designer Download", href: "a" },
            { name: "Designer Spotlight: Black Designers", href: "a" },
            { name: " Sweet Baby Jamie", href: "a" },
          ],
        },
        {
          id: "brandsWeLove",
          name: "BRANDS WE LOVE",
          items: [
            { name: "Autumn Adeigbo", href: "a" },
            { name: "K.NGSLEY", href: "a" },
            { name: "Mossi", href: "a" },
            { name: "Soko", href: "a" },
            { name: "Thebe Magugu", href: "a" },
            { name: "View All", href: "a" },
          ],
        },
        {
          id: "trending",
          name: "Trending Now",
          items: [
            { name: "  FARM Rio", href: "a" },
            { name: " HVN", href: "a" },
            { name: " Staud", href: "a" },
            { name: "Ulla Johnson", href: "a" },
            { name: "Veronica Beard", href: "a" },
            { name: " View All", href: "a" },
          ],
        },
      ],
    },
    {
      id: "occasions",
      name: "Occasions",
      featured: [
        {
          name: "Occasions",
          href: "a",
          imageSrc:
            "https://cdn.rtrcdn.com/assets/imgs/02022022_MegaMenu_Occasions.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
      ],
      sections: [
        {
          id: "weddings",
          name: "WEDDINGS",
          items: [
            { name: "Guest", href: "a" },
            { name: "Bride", href: "a" },
            { name: "Bridesmaid", href: "a" },
            { name: "Rehearsal Dinner", href: "a" },
            { name: "Bridal Shower", href: "a" },
            { name: "Bachelorette", href: "a" },
          ],
        },
        {
          id: "party",
          name: "Party",
          items: [
            { name: "Gala", href: "a" },
            { name: "Cocktail Party", href: "a" },
            { name: "Birthday Party", href: "a" },
            { name: "Daytime Soifee", href: "a" },
          ],
        },
        {
          id: "goingPlaces",
          name: "Going Places",
          items: [
            { name: "Out to Dinner", href: "a" },
            { name: "Date Night", href: "a" },
            { name: "Weelemd Adventures", href: "a" },
            { name: "Beachbound Vacation", href: "a" },
            { name: "Cold Weather Getaway", href: "a" },
          ],
        },
      ],
    },
    {
      id: "sale",
      name: "Sale",
      featured: [
        {
          name: "Sales",
          href: "a",
          imageSrc:
            "https://cdn.rtrcdn.com/assets/imgs/20211229_MegaMenu_Clearance.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
      ],
      sections: [
        {
          id: "shopbyprice",
          name: "SHOP BY PRICE",
          items: [
            { name: "Under $50", href: "a" },
            { name: "Under $75", href: "a" },
            { name: "Under $100", href: "a" },
            { name: "Under $150", href: "a" },
            { name: "Splurge-Worthy ($150+)", href: "a" },
            { name: "View All", href: "a" },
          ],
        },
        {
          id: "shopbycategory",
          name: "SHOP BY CATEGORY",
          items: [
            { name: "Dresses", href: "a" },
            { name: "Clothing", href: "a" },
            { name: "Jewelry", href: "a" },
            { name: "Soko", href: "a" },
            { name: "Handbags", href: "a" },
            { name: "View All", href: "a" },
          ],
        },
      ],
    },
  ],
  pages: [{ name: "Company", href: "a" }],
};
