import Link from "next/link";
import { Logo } from "@components/ui";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { getAddressQuery, getMyCartQuery } from "graphql/queries";
import {
  addressQuery,
  addressQuery_myAddresses,
} from "graphql/__generated__/addressQuery";
import { useEffect, useState } from "react";
import {
  createAddressMutation,
  setDefaultShippingAddressMutation,
} from "graphql/mutation";
import * as _ from "lodash";
import {
  createAddress,
  createAddressVariables,
} from "graphql/__generated__/createAddress";
import {
  setCartAddress,
  setCartAddressVariables,
} from "graphql/__generated__/setCartAddress";
import Input from "@components/ui/Input";
import { Listbox, RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { myCart_myCart_cart } from "graphql/__generated__/myCart";
import {
  createOrder,
  createOrderVariables,
} from "graphql/__generated__/createOrder";
import BillingAddressForm from "../BillingAddressForm/BillingAddressForm";
interface IPaymentFormProps {
  creditCartNumber: string;
  nameOnCart: string;
  expirationDate: string;
  securityCode: string;
}

const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orders {
        id
      }
    }
  }
`;
interface IPaymentForm {
  addressId: string;
  cart: myCart_myCart_cart;
  billingAddressId: string;
}
function PaymentForm({ addressId, cart, billingAddressId }: IPaymentForm) {
  const { data: addressData, loading: addressLoading } =
    useQuery<addressQuery>(getAddressQuery);

  const router = useRouter();
  const {
    register,
    getValues,
    formState,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IPaymentFormProps>();

  const data = cart;

  const completedPurchase = (data: createOrder) => {
    const { ok, error } = data.createOrder;
    if (ok) {
      router.push(`thankyou?order=${data.createOrder?.orders?.[0].id}`);
    }
  };

  const [createOrder, { loading: orderLoading, data: orderData, error }] =
    useMutation<createOrder, createOrderVariables>(CREATE_ORDER, {
      onCompleted: completedPurchase,
      refetchQueries: [{ query: getMyCartQuery }],
    });

  const selectedAddressDefault: any = _.find(
    _.concat(
      addressData?.myAddresses.otherAddresses,
      addressData?.myAddresses.defaultShippingAddress
    ),
    { id: cart?.shippingAddressId }
  );

  console.log("selectedAddressDefault", selectedAddressDefault);

  const [shipping, setShipping] = useState("standart");
  const [billingAddress, setBillingAddress] = useState("same");

  const [selectedAddress, setSelectedAddress] = useState<any>("newAddress");

  const onSubmitBuy = () => {
    const { creditCartNumber } = getValues();

    if (creditCartNumber === "4444444444444444") {
      if (billingAddress === "same") {
        createOrder({
          variables: {
            input: {
              shippingAddressId: addressId,
              billingAddressId: addressId,
              currency: "TRY",
            },
          },
        });
      } else {
        createOrder({
          variables: {
            input: {
              shippingAddressId: addressId,
              billingAddressId: selectedAddress.id,
              currency: "TRY",
            },
          },
        });
      }
    }
  };

  if (orderLoading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="w-full px-4 py-4 tablet:px-0  tablet:w-480">
      <div className="w-full  flex justify-start items-start gap-x-4">
        <div className="pt-2">
          <svg width="25" height="24" fill="none">
            <circle cx="12.5" cy="12" r="11.5" stroke="#000"></circle>
            <g clipPath="url(#clip0)">
              <path
                d="M9.924 16.714a1.705 1.705 0 01-1.331-.67l-1.88-2.136a.857.857 0 011.286-1.132l1.761 2.005a.214.214 0 00.316.007l6.942-7.236a.856.856 0 111.243 1.181l-7.03 7.4a1.664 1.664 0 01-1.307.58z"
                fill="#000"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <path
                  fill="#fff"
                  transform="translate(6.5 6)"
                  d="M0 0h12v12H0z"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="w-full flex flex-row items-start justify-between">
          <div>
            <h2 className="text-lg font-black">Teslimat adresi</h2>
            {selectedAddressDefault?.firstname && (
              <div className="text-sm font-normal">
                <div>
                  {selectedAddressDefault.firstname}{" "}
                  {selectedAddressDefault.lastname}
                </div>
                <address>
                  {selectedAddressDefault.addressLine1},{" "}
                  {selectedAddressDefault.addressLine2},{" "}
                  {selectedAddressDefault.state}, {selectedAddressDefault.city},
                  <p>Türkiye</p>
                </address>
              </div>
            )}
          </div>
          <button
            className="underline font-normal text-sm text-[#4d4d4d]"
            onClick={() =>
              router.push({
                pathname: "/checkout",
                query: { state: "shipping-back" },
              })
            }
          >
            change
          </button>
        </div>
      </div>
      <div className="divvider border-b border-gray-200 my-6 w-full h-0"></div>

      <div className="w-full  flex justify-start items-start gap-x-4">
        <div className="pt-2">
          <svg width="25" height="24" fill="none">
            <circle cx="12.5" cy="12" r="11.5" stroke="#000"></circle>
            <g clipPath="url(#clip0)">
              <path
                d="M9.924 16.714a1.705 1.705 0 01-1.331-.67l-1.88-2.136a.857.857 0 011.286-1.132l1.761 2.005a.214.214 0 00.316.007l6.942-7.236a.856.856 0 111.243 1.181l-7.03 7.4a1.664 1.664 0 01-1.307.58z"
                fill="#000"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <path
                  fill="#fff"
                  transform="translate(6.5 6)"
                  d="M0 0h12v12H0z"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="w-full flex flex-row items-start justify-between">
          <div>
            <h2 className="text-lg font-black">Kargo</h2>
            <div className="text-sm font-normal">
              <span>{shipping ? shipping : null}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="divvider border-b border-gray-200 mt-6 w-full h-0"></div>

      <div>
        <div className="mt-11 pb-4">
          <h2 className="font-black text-lg">Ödeme Yöntemi</h2>
          <p className="font-normal text-sm">
            Bütün ödemeler şifreli ve güvenli
          </p>
        </div>
        <div>
          <form
            id="hook-form"
            onSubmit={handleSubmit(onSubmitBuy)}
            className="flex flex-col gap-2"
          >
            <span>test cartı: 4444444444444444</span>
            <Input
              register={register}
              defaultValue={null}
              inputValue="creditCartNumber"
              placeHolder="Kredi Kartı"
            />
            <Input
              register={register}
              defaultValue={null}
              inputValue="nameOnCart"
              placeHolder="Kredın üzerindeki ism"
            />
            <div className="flex flex-row gap-2">
              <Input
                register={register}
                defaultValue={null}
                inputValue="expirationDate"
                placeHolder="MM / YY"
              />
              <Input
                register={register}
                defaultValue={null}
                inputValue="securityCode"
                placeHolder="CVS"
              />
            </div>
          </form>
        </div>
        <div>
          <div className="mt-11 pb-4">
            <h2 className="font-black text-lg">BILLING ADDRESS</h2>
            <p className="font-normal text-sm">
              Select the address that matches your card or payment method.
            </p>
          </div>
          <div className=" w-full  tablet:w-480">
            <RadioGroup value={billingAddress} onChange={setBillingAddress}>
              {/* <div>
              <RadioGroup.Label className="">
                <h2 className="text-lg font-black">Kargo</h2>
              </RadioGroup.Label>
            </div> */}
              <div className="border rounded-md">
                <RadioGroup.Option
                  value="same"
                  className={({ checked }) =>
                    `${
                      checked ? "bg-[#f8f8f8]" : ""
                    } flex w-full items-center gap-x-3 px-4 py-6 border-b border-[#e6e6e6] `
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className="w-4 h-4">
                        <div
                          className={`${
                            checked ? "bg-black" : "bg-white"
                          } w-4 h-4 border border-black rounded-full flex items-center justify-center transition-colors   `}
                        >
                          <div className="w-1 h-1 border bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between  w-full">
                        <span
                          className={`${
                            checked ? "" : ""
                          } text-base font-semibold`}
                        >
                          Same as shipping address
                        </span>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="different"
                  className={({ checked }) =>
                    `${
                      checked ? "bg-[#f8f8f8]" : ""
                    } flex w-full items-center gap-x-3 px-4 py-6 border-b border-[#e6e6e6] `
                  }
                >
                  {({ checked }) => (
                    <div className="flex flex-col w-full  tablet:w-480">
                      <div className="flex w-full items-center gap-x-3 ">
                        <div className="w-4 h-4">
                          <div
                            className={`${
                              checked ? "bg-black" : "bg-white"
                            } w-4 h-4 border border-black rounded-full flex items-center justify-center transition-colors   `}
                          >
                            <div className="w-1 h-1 border bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex justify-between  w-full">
                          <span
                            className={`${
                              checked ? "" : ""
                            } text-base font-semibold`}
                          >
                            Use a different billing address
                          </span>
                        </div>
                      </div>
                      {checked && (
                        <div className="py-4 ">
                          <BillingAddressForm
                            shipping={true}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            billingAddressId={billingAddressId}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col items-end py-6">
          <p className="text-xs font-normal">
            By submitting your order, you agree to our Terms of Service, Privacy
            Policy, and Returns Policy
          </p>
          <button
            type="submit"
            form="hook-form"
            className="bg-black text-white  font-semibold text-base py-5 px-8 w-[280px] rounded-3xl"
          >
            Ödeme
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
