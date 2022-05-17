import { useQuery } from "@apollo/client";
import AccountLayout from "@components/account/AccountLayout/AccountLayout";
import { Layout } from "@components/common";
import useUser from "@lib/hooks/useUser";
import { getMyOrders } from "graphql/queries";
import { myOrders } from "graphql/__generated__/myOrders";
import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Orders: NextPage = () => {
  const router = useRouter();

  const { data: userData, loading: userLoading, error: userError } = useUser();
  const { data, loading, error } = useQuery<myOrders>(getMyOrders);
  return (
    <>
      <AccountLayout>
        <div className="w-full h-full">
          {/* header */}

          <h1 className="text-5xl font-black  ">Siparişlerim</h1>
          {(data?.myOrders?.orders?.length === 0 ||
            data?.myOrders?.orders === null) && (
            <div className="pt-2">
              <span className="mt-8">Henüz siparişin yok 😔</span>
              <Link href="collections/collection">
                <div className="bg-black text-white text-lg font-semibold py-4 px-5 rounded-full w-fit mt-4 ">
                  <span>Hemen Alışverişe Başla</span>
                </div>
              </Link>
            </div>
          )}

          {/* orders list */}
          <div>
            {/* order component */}

            {data?.myOrders?.orders?.map((order) => {
              return (
                <div
                  id={order.id}
                  className="bg-white m-4 rounded-md border border-gray-200 hover:border-gray-300"
                >
                  <div className="body  pb-1  ">
                    <div className="flex flex-col  items-start  p-8  ">
                      <div className="mb-4">
                        <p className="text-xs font-normal first-letter:uppercase">
                          {order.status}
                        </p>
                        <h3 className="text-xl font-black">
                          {moment(order.createdAt)
                            .lang("tr")
                            .format("DD MMMM YYYY")}
                        </h3>
                      </div>

                      <div className="flex flex-col-reverse items-start justify-start w-full">
                        {/* 
textler */}
                        <div className="flex  flex-row  gap-x-4 mt-4 ">
                          <div className="flex flex-col">
                            <span className="text-gray-600 text-sm font-normal ">
                              Sipariş Numarası
                            </span>
                            <span className="text-xs font-light">#5162351</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-600 text-sm  font-normal">
                              Toplam Tutar
                            </span>
                            <span className="text-xs font-light">
                              {order.totalPrice} TL
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-600 text-sm  font-normal">
                              Tahmini Teslimat Süresi
                            </span>
                            <span className="text-xs font-light">
                              17 Aralık 2022
                            </span>
                          </div>
                        </div>
                        {/* resimler */}
                        <div className="flex  gap-x-1 ">
                          {order.items.map((product: any) => (
                            <div
                              key={product.id}
                              className="orderwrapper flex flex-row items-start   "
                            >
                              {/* image */}
                              <div className="orderImages  ">
                                <Link href="product">
                                  {/* TODO: object cover vs object contain */}
                                  <img
                                    className="w-fit h-28  object-cover  rounded-sm hover:ring-1 ring-gray-100 ring-offset-0 "
                                    src={product.image}
                                    alt="order product"
                                  />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* button */}
                      <div className="flex items-center justify-center mt-8">
                        <Link href={`/account/orders/${order.id}`}>
                          <a className="flex ">
                            <span className=" text-sm font-semibold bg-black text-white py-2 text-center px-3 rounded-full w-full">
                              Detayları göster
                            </span>
                          </a>
                          {/* <span className="">
                            <ChevronRightIcon className="h-4 w-4  pt-0.5" />
                          </span> */}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AccountLayout>
    </>
  );
};

export default Orders;

Orders.Layout = Layout;
