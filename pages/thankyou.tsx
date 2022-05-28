import { useQuery } from "@apollo/client";
import CheckoutHeader from "@components/checkout/CheckoutHeader/CheckoutHeader";
import { Check } from "@components/icons";
import { getMyOrders } from "graphql/queries";
import { myOrders } from "graphql/__generated__/myOrders";
import * as lodash from "lodash";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
interface IParams {
  orderId: string;
}
const ThankYou = () => {
  // const [_, orderId] = location.search.split("order=");

  //   const [_, or] = window.location.href.split("order=");

  const router = useRouter();

  console.log("router", router);
  // const orderz = orderId.toString() || null;

  const { data, loading, error } = useQuery<myOrders>(getMyOrders);
  const order = lodash.find(data?.myOrders.orders, { id: router.query.order });

  // const local = _.find(selectionAttributes, function (local) {
  //   return local.attributeName === attributeName;
  // });

  const numberOfItems = () => {
    let number = 0;
    lodash.forEach(order?.items, function (o) {
      return (number = number + 1 * o.quantity);
    });
    return number;
  };

  if (!order) {
    return <div>loading</div>;
  }
  return (
    <div>
      <CheckoutHeader />
      <div className="flex  justify-center">
        <div className="flex flex-col w-[520px]  ">
          <div className="flex flex-row gap-x-2 mt-10 items-center ">
            <div>
              <span className="border border-black w-11 h-11 rounded-full flex justify-center items-center">
                <Check className="w-8 h-8 stroke-black" />
              </span>
            </div>
            <div>
              <span>
                <span>Order #</span>
                <span>{order?.id}</span>
              </span>
              <h2 className="text-3xl font-black"> Teşekkür ederiz, Berna! </h2>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-black">Siparişiniz onaylandı!</h3>
            <span>
              Siparişinizi sizin için hazırlamaya başladık. En özel deneyimi
              yaşamayız için elimizden geleni yapıyoruz.
            </span>
          </div>
          {/* TODO:Doğum günü formu bekle */}
          {/* TODO:telefonla bilgilendime formu ekle */}
          {/* TODO:bizi nereden duydunuz formu ekle */}
          <div></div>

          <div>
            <div className="header mb-12">
              <div className="text-xs mb-1">
                <span>Order Date </span>
                <span>{moment(order?.createdAt).format("LL")}</span>
              </div>
              {/* <div className="text-xs">
              <span>Total </span>
              <span>{order?.totalPrice} TL</span>
            </div> */}
            </div>
          </div>
          <div>
            <div className="Main ">
              <div className="flex flex-row  w-full justify-between">
                <div className="-300 w-full">
                  <h3 className="text-xl font-black py-4">Bilgileriniz</h3>
                  <div>
                    <div className="flex flex-row   ">
                      <div className="mb-12 w-full">
                        <div>
                          <h5 className=" text-base font-semibold mb-1">
                            Teslimat Adresi
                          </h5>
                          <p className="text-xs">
                            {order?.shippingAddress.firstname}{" "}
                            {order?.shippingAddress.lastname}
                          </p>
                          <p className="text-xs">
                            {order?.shippingAddress.addressLine1}
                          </p>
                          <p className="text-xs">
                            {order?.shippingAddress.addressLine2}
                          </p>
                          <p className="text-xs">
                            {" "}
                            {order?.shippingAddress.state}
                          </p>
                          <p className="text-xs">
                            {" "}
                            {order?.shippingAddress.city}
                          </p>
                          <p className="text-xs">
                            {order?.shippingAddress.zipCode}
                          </p>
                          <p className="text-xs">
                            {order?.shippingAddress.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <div className="w-full">
                        <div>
                          <h5 className="font-semibold text-base  mb-1">
                            Kargo
                          </h5>
                          <p className="text-xs">3-5 days shipping</p>
                          <p className="text-xs">
                            Tuesday, Feb 15 - Thursday, Feb 17
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12">
                      <div>
                        <h5 className=" text-base font-semibold mb-1">
                          Fatura Adresi
                        </h5>
                        <p className="text-xs">
                          {order?.billingAddress.firstname}{" "}
                          {order?.billingAddress.lastname}
                        </p>
                        <p className="text-xs">
                          {order?.billingAddress.addressLine1}
                        </p>
                        <p className="text-xs">
                          {order?.billingAddress.addressLine2}
                        </p>
                        <p className="text-xs">
                          {" "}
                          {order?.billingAddress.state}
                        </p>
                        <p className="text-xs"> {order?.billingAddress.city}</p>
                        <p className="text-xs">
                          {order?.billingAddress.zipCode}
                        </p>
                        <p className="text-xs">
                          {order?.billingAddress.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/collections/collection">
              <span className="bg-black text-white py-4 px-6 rounded-full hover:bg-gray-900">
                Alışverişe devam et
              </span>
            </Link>
          </div>
        </div>

        <div className=" flex flex-col tablet:stickey add to cart  w-full  tablet:w-fit   h-fit   bg-red-600 ">
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
                    <span>₺{order?.totalPrice}</span>
                  </td>
                </tr>
                <tr className="flex justify-between ">
                  <th className="text-xs font-normal">
                    <span>Kiralama Sigortası</span>
                  </th>
                  <td className="text-xs font-semibold">
                    <span>₺120.05</span>
                  </td>
                </tr>
                <tr className="flex justify-between ">
                  <th className="text-xs font-normal">
                    <span>Ücretsiz Kargo!</span>
                  </th>
                  <td className="text-xs font-semibold">
                    <span>₺0</span>
                  </td>
                </tr>
                <tr className="flex justify-between ">
                  <th className="text-xs font-normal">
                    <span>Anlaşmalı Kargo Dönüş ücreti</span>
                  </th>
                  <td className="text-xs font-semibold">
                    <span>₺84.00</span>
                  </td>
                </tr>
                <tr className="flex justify-between ">
                  <th className="text-xs font-normal">
                    <span>Vergiler</span>
                  </th>
                  <td className="text-xs font-semibold">
                    <span>₺124.00</span>
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
                    <span>₺6,232.02</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className=" w-full  tablet:w-[420px] bg-[#f8f8f8]  px-5">
            <div className="border-b border-gray-200 my-2 w-full h-0"></div>
            {order?.items?.map((product) => (
              <tr className="flex gap-x-2 py-1  w-full ">
                <td className=" ">
                  <Link href={`/products/${product.id}`}>
                    <a className="h-fit">
                      <img
                        src={product.image !== null ? product.image : undefined}
                        alt=""
                        className="border w-24"
                      />
                    </a>
                  </Link>
                </td>
                <td className="flex flex-row  w-full justify-between ">
                  <div>
                    <Link href={`/products/${product.id}`}>
                      {/* TODO:ID PRODUCT ID */}
                      <div className="flex flex-col gap-y-0.5">
                        <span className="font-medium text-xs">
                          {product.productName}
                        </span>
                        <span className="font-normal text-xs">
                          {product.brandName}
                        </span>
                      </div>
                    </Link>
                    {product.itemType === "rental" && (
                      <div>
                        <p className="text-sm font-light">
                          {moment(product.rentalStartDate).format("LL")} -{" "}
                          {moment(product.rentalEndDate).format("LL")}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs">Renk: {product.sku.color}</span>
                      <span className="text-xs">Size: {product.sku.size}</span>
                      <span className="text-xs">Adet: {product.quantity}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="priceline flex flex-col gap-x-2 mb-4 items-end justify-start  ">
                        <div className="font-semibold text-sm text-[#9d2226] ">
                          {product.rentalPeriod === "fourDays"
                            ? `${product.sku.rentalPrice4Days}`
                            : `${product.sku.rentalPrice8Days}`}
                          TL
                        </div>
                        <div className="line-through text-xs">1500 TL</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <div className="border-b border-gray-200 my-2 w-full h-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThankYou;
