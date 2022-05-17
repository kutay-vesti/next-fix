import Link from "next/link";
import { Logo } from "@components/ui";
import {
  myCart_myCart_cart,
  myCart_myCart_cart_cartItems,
} from "graphql/__generated__/myCart";
import CheckoutSummaryProduct from "../CheckoutSummaryProduct/CheckoutSummaryProduct";

interface ISummary {
  numberOfItems: () => number;
  cart: myCart_myCart_cart | null | undefined;
  products: myCart_myCart_cart_cartItems[] | null | undefined;
}

function CheckoutSummary({ cart, numberOfItems, products }: ISummary) {
  return (
    <div className=" flex flex-col tablet:stickey add to cart  w-full  tablet:w-fit   h-fit  ">
      <div className=" w-full  tablet:w-[420px] py-5 px-6 bg-[#f8f8f8]">
        <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
        <div className="border-b border-gray-200 my-2 w-full h-0"></div>
        <table className="w-full">
          <tbody className=" flex flex-col gap-y-1.5 ">
            <tr className="flex justify-between ">
              <th className="text-xs font-normal">
                <span>Ara toplam</span>
                <span> ({numberOfItems()})</span>
              </th>
              <td className="text-xs font-semibold">
                <span>₺{cart?.totalPrice}</span>
              </td>
            </tr>
            {/* <tr className="flex justify-between ">
              <th className="text-xs font-normal">
                <span>Kiralama Sigortası</span>
              </th>
              <td className="text-xs font-semibold">
                <span>₺120.05</span>
              </td>
            </tr> */}
            <tr className="flex justify-between ">
              <th className="text-xs font-normal">
                <span>İndirim</span>
              </th>
              <td className="text-xs font-semibold">
                <span>₺{cart?.totalDiscount}</span>
              </td>
            </tr>
            <tr className="flex justify-between ">
              Berna
              <th className="text-xs font-normal">
                <span>Kiralama Sigortası</span>
              </th>
              <td className="text-xs font-semibold">
                <span>{cart?.totalInsuranceFee}₺</span>
              </td>
            </tr>
            <tr className="flex justify-between ">
              <th className="text-xs font-normal">
                <span>Hizmet bedeli</span>
              </th>
              <td className="text-xs font-semibold">
                <span>{cart?.totalServiceFee}₺</span>
              </td>
            </tr>
            <tr className="flex justify-between ">
              <th className="text-xs font-normal">
                <span>Vergiler</span>
              </th>
              <td className="text-xs font-semibold">
                <span>{cart?.totalTax}₺</span>
              </td>
            </tr>
            <tr className="flex justify-between ">
              <td className="border-b border-gray-200 my-2 w-full h-0"></td>
            </tr>
            <tr className="flex justify-between ">
              <th className="text-2xl font-normal ">
                <span>Toplam</span>
              </th>
              <td className="text-2xl font-semibold">
                <span>{cart?.totalPriceAfterDiscount}₺</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" w-full  tablet:w-[420px] bg-[#f8f8f8]  px-5">
        <div className="border-b border-gray-200 my-2 w-full h-0"></div>
        {products?.map((product) => (
          <CheckoutSummaryProduct product={product} key={product.id} />
        ))}
        <div className="border-b border-gray-200 my-2 w-full h-0"></div>
      </div>
      <div className=" w-full  tablet:w-[420px]  px-6">
        <div className="relative group border">
          <form onSubmit={() => console.log("submit form discound")}>
            <input
              name="discount"
              id="discount"
              className="pt-7 pb-2  w-full rounded px-4 peer"
            ></input>
            <label
              htmlFor="discount"
              className="absolute top-9 left-4 text-sm text-gray-600 peer-focus-visible:text-gray-500  peer-focus-visible:-translate-y-7 transition-all peer-valid:-translate-y-7  peer-valid:text-gray-500 peer-empty:-translate-y-4 peer-empty:text-gray-600"
            >
              İndirim Kodu Giriniz
            </label>
            <button
              type="submit"
              className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg absolute top-2.5 right-3 hover:bg-gray-300"
            >
              {">"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSummary;
