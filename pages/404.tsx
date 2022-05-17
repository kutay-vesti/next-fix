import { Layout } from "@components/common";
import Link from "next/link";

// export async function getStaticProps({
//     preview,
//     locale,
//     locales,
//   }: GetStaticPropsContext) {
//     const config = { locale, locales }
//     const { pages } = await commerce.getAllPages({ config, preview })
//     const { categories, brands } = await commerce.getSiteInfo({ config, preview })
//     return {
//       props: {
//         pages,
//         categories,
//         brands,
//       },
//       revalidate: 200,
//     }
//   }

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="font-semibold text-2xl m-3">Page NotFound</h2>
      <h4 className="font-medium text-base mb-5">
        page you are looking for does noet expists
      </h4>
      <Link href="/">
        <a className="hover:underline bg-lime-600">Go back home &rarr;</a>
      </Link>
    </div>
  );
}
NotFound.Layout = Layout;
