import { ApolloClient, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { NextComponentType, NextPage } from "next/types";
import React, { useState } from "react";
import * as _ from "lodash";
import { getMyOrders } from "graphql/queries";
import useUser from "@lib/hooks/useUser";
import { myOrders } from "graphql/__generated__/myOrders";
import Link from "next/link";
import EmptyMark from "@components/icons/EmptyMark";
import { Arrow, Check } from "@components/icons";
import moment from "moment";
import { Layout } from "@components/common";
import Router from "next/router";
import { useSession } from "next-auth/react";

const OrderId: NextComponentType = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: userData, loading: userLoading, error: userError } = useUser();
  const { data, loading, error } = useQuery<myOrders>(getMyOrders);
  const orderId = router.query.orderId;
  const order = _.find(data?.myOrders.orders, { id: orderId });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className=" w-full tablet:w-[520px] ">
        <div>
          <div>
            <Link href="/account/orders">
              <a className="flex items-center gap-x-2 text-sm font-semibold py-3 mb-5">
                <Arrow className="w-8 h-8" />
                <span>All Order</span>
              </a>
            </Link>
          </div>
          <div className="h2s  mb-12 pb-12 border-b ">
            <h2 className=" text-xs font-black mb-1">Tahmini Varış Süresi</h2>
            <h3 className=" text-5xl font-black  mb-6">Hazırlanıyor</h3>
            <div className="relative mb-[10px]">
              <div className="h-3 w-full bg-gray-200 rounded-lg"></div>
              <div className=" absolute top-0 w-[80px] h-3 bg-green-800 rounded-lg"></div>
            </div>
            <div className="track-order__steps flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-green-800 flex items-center justify-center rounded-full">
                  <Check />
                </div>
                <div>Sipariş verildi</div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-inherit border flex items-center justify-center rounded-full">
                  <EmptyMark />
                </div>
                <div>Yakında ulş</div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-inherit border flex items-center justify-center rounded-full">
                  <EmptyMark />
                </div>
                <div>Arriving soon</div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="w-4 h-4 bg-inherit border flex items-center justify-center rounded-full">
                  <EmptyMark />
                </div>
                <div>Delivered</div>
              </div>
            </div>
          </div>
          <div className="header mb-12">
            <div className="mb-1 text-base font-semibold">
              <span>Order #</span>
              <span>{order?.id}</span>
            </div>
            <div className="text-xs mb-1">
              <span>Order Date </span>
              <span>{moment(order?.createdAt).format("LL")}</span>
            </div>
            <div className="text-xs">
              <span>Total </span>
              <span>{order?.totalPrice} TL</span>
            </div>
          </div>

          <div className="Main ">
            <div className="flex flex-row  w-full justify-between">
              <div className="-300 w-full">
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
                        <h5 className="font-semibold text-base  mb-1">Kargo</h5>
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
                      <p className="text-xs"> {order?.billingAddress.state}</p>
                      <p className="text-xs"> {order?.billingAddress.city}</p>
                      <p className="text-xs">{order?.billingAddress.zipCode}</p>
                      <p className="text-xs">
                        {order?.billingAddress.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-4 text-lg font-semibold w-full bg-gray-200 my-4">
            <div className=" ">
              <span>
                Bize deneyimini anlat! Bu ürünü değerlendirerek 5000 TL
                değerinde hediye kartı kazanama fırsatı yakala
              </span>
            </div>
          </div>

          <div className="border-t pt-1">
            {order?.items.map((item) => (
              <div
                className="pt-3 pb-2 border-b flex border-[#f0f0f0] "
                key={item.id}
              >
                <Link
                  href={`/products/${
                    _.split(
                      data?.myOrders.orders?.[0].items?.[0].sku.sku,
                      "-N/A-"
                    )[0]
                  }`}
                >
                  <a>
                    <img
                      className="w-32 h-atuo object-cover mr-3"
                      src={item.image !== null ? item.image : undefined}
                      alt="ohoo"
                    ></img>
                  </a>
                </Link>
                <Link
                  href={`/products/${
                    _.split(
                      data?.myOrders.orders?.[0].items?.[0].sku.sku,
                      "-N/A-"
                    )[0]
                  }`}
                >
                  <a>
                    <p className="text-xs font-normal mb-[1px]">
                      {item.productName}
                    </p>
                    <p className="text-xs font-normal  mb-[1px]">
                      {item.brandName}
                    </p>
                    <p className="text-sm font-semibold  mb-[1px]">
                      {item.sku.size}
                    </p>
                    <p className="text-sm font-semibold   mb-[8px]">
                      {item.sku.color}
                    </p>
                    <p className="text-sm font-semibold  mb-[1px]">
                      {item.itemType === "retail"
                        ? "Satın alma"
                        : "Kiralama Tarihleri: "}
                    </p>

                    <p className="text-xs font-norma  mb-[1px]">
                      {item.itemType === "retail"
                        ? null
                        : moment(item.rentalStartDate).format("LL") +
                          " " +
                          moment(item.rentalEndDate).format("LL")}
                    </p>

                    <p className="text-sm font-light"></p>
                  </a>
                </Link>
                <div className="flex ml-auto pl-8 text-right flex-col text-xs font-semibold">
                  <div></div>
                  {item.itemType === "retail" ? (
                    <div>
                      <span className="line-through text-xs font-normal">
                        {item.sku.comparisonRetailPrice}TL
                      </span>
                      <span className="text-xs font-semibold">
                        {item.sku.retailPrice}TL
                      </span>
                    </div>
                  ) : item.rentalPeriod === "fourDays" ? (
                    <div>
                      <span className="line-through text-xs font-normal">
                        {item.sku.comparisonRentalPrice4Days}TL
                      </span>
                      <span>{item.sku.rentalPrice4Days}TL </span>
                    </div>
                  ) : (
                    <div>
                      <span className="line-through text-xs font-normal">
                        {item.sku.comparisonRentalPrice8Days} TL
                      </span>
                      <span>{item.sku.rentalPrice8Days} </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="py-9 mb-10 border-b ">
            <div className="ml-auto max-w-full w-[320px] ">
              <table className="w-full font-normal text-xs">
                <tbody className="w-full  ">
                  <tr className=" flex  justify-between mb-2 ">
                    <th className="font-normal text-xs">subtotal</th>
                    <td>{order?.subTotal}</td>
                  </tr>
                  <tr className=" flex  justify-between  mb-2  ">
                    <th className="font-normal text-xs">shipping</th>
                    {/* TODO:FREEE */}
                    <td>Bedava</td>
                  </tr>
                  <tr className=" flex  justify-between   mb-2 ">
                    <th className="font-normal text-xs">vergiler</th>

                    <td>{order?.tax}</td>
                  </tr>
                </tbody>
                <tfoot className="w-full ">
                  <tr className=" flex  justify-between font-semibold text-xl">
                    <th>Toplam</th>
                    <td>{order?.totalPrice}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (status === "unauthenticated") {
    Router.replace("/auth/login");
  }
  return <div className="h-screen">Hesabınızı açınız</div>;
};

export default OrderId;
// orderId.Layout = Layout;

OrderId.Layout = Layout;
