import useUser from "@lib/hooks/useUser";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import Footer from "../Footer";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navbar from "../Navbar";

import algoliasearch from "algoliasearch/lite";
import { Hit as AlgoliaHit } from "instantsearch.js";
import {
  DynamicWidgets,
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  InstantSearchServerState,
  SortBy,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
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
const client = algoliasearch("2S3Q24UHG3", "2479538bbf6bfdcdf3c5e7103b18b1cb");
interface Props {
  pageProps: {
    pages?: Page[];
    categories: Category[];
  };
  children: ReactNode;
}
import { history } from "instantsearch.js/es/lib/routers/index.js";

const Layout: React.FC<Props> = ({
  children,
  pageProps: { categories = [], ...pageProps },
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { data, loading, error } = useUser();
  return (
    <>
      <div className="  min-h-screen  ">
        <div className="">
          <Navbar open={open} setOpen={setOpen} navigation={navigation} />
        </div>
        <MobileMenu
          data={data}
          navigation={navigation}
          open={open}
          setOpen={setOpen}
        />
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
          href: "/",
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
            { name: "Community Top Picks", href: "/" },
            { name: "Top Rated", href: "/" },
          ],
        },
        {
          id: "discover",
          name: "Discover",
          items: [
            { name: "Spring Fashion Preview", href: "/" },
            { name: "Cozy Essentails", href: "/" },
            { name: "Matching Sets", href: "/" },
            { name: "Must-Rent Outerwear", href: "/" },
            { name: "Statement Sweaters", href: "/" },
            { name: "The Ski Edit", href: "/" },
          ],
        },
        {
          id: "morefromus",
          name: "More from Vestiyer",
          items: [
            { name: "Membership Perks", href: "/" },
            { name: "Sustainability at Vestiyer", href: "/" },
            { name: "Buying on Vestiyer", href: "/" },
            { name: "Vestiyer + Benjamins", href: "/" },
            { name: "Vestiyer + Şeyma Subaşı", href: "/" },
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
          href: "/",
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
            { name: "Dresses", href: "/" },
            { name: "Tops", href: "/" },
            { name: "Sweaters", href: "/" },
            { name: "Pants", href: "/" },
            { name: "Skirts", href: "/" },
            { name: "Gowns", href: "/" },
            { name: "Jumpsuits & Rompers", href: "/" },
            { name: "Activewear", href: "/" },
            { name: "Maternity", href: "/" },
            { name: "View All", href: "/" },
          ],
        },
        {
          id: "whatToWear",
          name: "What to Wear",
          items: [
            { name: "Wedding", href: "/" },
            { name: "Gala", href: "/" },
            { name: "Night Out", href: "/" },
            { name: "Out to Dinner", href: "/" },
            { name: "At the Office", href: "/" },
            { name: "WFH Essentials", href: "/" },
            { name: "Weekend", href: "/" },
            { name: "Vacation", href: "/" },
          ],
        },
        {
          id: "trending",
          name: "Trending",
          items: [
            { name: "Most Popular", href: "/" },
            { name: "Commuity Top Picks", href: "/" },
            { name: "Winter Coats", href: "/" },
            { name: "Denim & Jeans", href: "/" },
            { name: "Cozy Sweaters", href: "/" },
            { name: "Home", href: "/" },
            { name: "Kids", href: "/" },
          ],
        },
        {
          id: "sampleSale",
          name: "Sample Sale",
          items: [{ name: "%90 indirimle al", href: "/" }],
        },
      ],
    },
    {
      id: "designers",
      name: "Designers",
      featured: [
        {
          name: "Clothing",
          href: "/",
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
            { name: "On Our Radar", href: "/" },
            { name: "Designer Collective", href: "/" },
            { name: "The Designer Download", href: "/" },
            { name: "Designer Spotlight: Black Designers", href: "/" },
            { name: " Sweet Baby Jamie", href: "/" },
          ],
        },
        {
          id: "brandsWeLove",
          name: "BRANDS WE LOVE",
          items: [
            { name: "Autumn Adeigbo", href: "/" },
            { name: "K.NGSLEY", href: "/" },
            { name: "Mossi", href: "/" },
            { name: "Soko", href: "/" },
            { name: "Thebe Magugu", href: "/" },
            { name: "View All", href: "/" },
          ],
        },
        {
          id: "trending",
          name: "Trending Now",
          items: [
            { name: "  FARM Rio", href: "/" },
            { name: " HVN", href: "/" },
            { name: " Staud", href: "/" },
            { name: "Ulla Johnson", href: "/" },
            { name: "Veronica Beard", href: "/" },
            { name: " View All", href: "/" },
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
          href: "/",
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
            { name: "Guest", href: "/" },
            { name: "Bride", href: "/" },
            { name: "Bridesmaid", href: "/" },
            { name: "Rehearsal Dinner", href: "/" },
            { name: "Bridal Shower", href: "/" },
            { name: "Bachelorette", href: "/" },
          ],
        },
        {
          id: "party",
          name: "Party",
          items: [
            { name: "Gala", href: "/" },
            { name: "Cocktail Party", href: "/" },
            { name: "Birthday Party", href: "/" },
            { name: "Daytime Soifee", href: "/" },
          ],
        },
        {
          id: "goingPlaces",
          name: "Going Places",
          items: [
            { name: "Out to Dinner", href: "/" },
            { name: "Date Night", href: "/" },
            { name: "Weelemd Adventures", href: "/" },
            { name: "Beachbound Vacation", href: "/" },
            { name: "Cold Weather Getaway", href: "/" },
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
          href: "/",
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
            { name: "Under $50", href: "/" },
            { name: "Under $75", href: "/" },
            { name: "Under $100", href: "/" },
            { name: "Under $150", href: "/" },
            { name: "Splurge-Worthy ($150+)", href: "/" },
            { name: "View All", href: "/" },
          ],
        },
        {
          id: "shopbycategory",
          name: "SHOP BY CATEGORY",
          items: [
            { name: "Dresses", href: "/" },
            { name: "Clothing", href: "/" },
            { name: "Jewelry", href: "/" },
            { name: "Soko", href: "/" },
            { name: "Handbags", href: "/" },
            { name: "View All", href: "/" },
          ],
        },
      ],
    },
  ],
  pages: [{ name: "Company", href: "/" }],
};
