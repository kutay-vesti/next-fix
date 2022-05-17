import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import {
  OperationVariables,
  QueryResult,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  myCart,
  myCart_myCart_cart_cartItems,
} from "graphql/__generated__/myCart";
import {
  productPageQuery,
  productPageQueryVariables,
  productPageQuery_getProduct_product_option1_color,
} from "graphql/__generated__/productPageQuery";
import {
  addItemToCartMutation,
  deleteItemFromCartMutation,
} from "graphql/mutation";
import {
  addItemToCart,
  addItemToCartVariables,
} from "graphql/__generated__/addItemToCart";
import moment from "moment";
import { CartItemType, RentalPeriod } from "graphql/__generated__/globalTypes";
import * as _ from "lodash";
import {
  deleteItemFromCart,
  deleteItemFromCartVariables,
} from "graphql/__generated__/deleteItemFromCart";
import { getMyCartQuery, getProductQuery } from "graphql/queries";
import { Star, XIcon } from "@components/icons";
import Link from "next/link";
import { ProductRentOption } from "@components/product";
import ProductBuyOption from "@components/product/ProductBuyOption";

interface CartSlideProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: QueryResult<myCart, OperationVariables>;
  productID: string;
  color: string;
  size: string;
  rentalPeriod: number;
  rentalStartDate: string | null;
  cartItem: myCart_myCart_cart_cartItems;
}

interface ISelectedProduct {
  SelectedProducts:
    | productPageQuery_getProduct_product_option1_color
    | undefined;
}

function ProductSlideOver({
  open,
  setOpen,
  cart,
  productID,
  color,
  size,
  rentalPeriod,
  rentalStartDate,
  cartItem,
}: CartSlideProps) {
  // console.log("cart in cart", cart.data);

  const [date, setDate] = useState<Date | undefined>(
    rentalStartDate ? new Date(rentalStartDate) : undefined
  );
  const [selected, setSelected] = useState("rentit");

  const onError = () => {};
  const [sizeError, setSizeError] = useState<boolean>(false);

  const [defaultColor, setDefaultColor] = useState<string | undefined>(color);
  const [defaultSize, setDefaultSize] = useState<string | undefined>(size);
  const [dateError, setDateError] = useState<boolean>(false);
  const [isNullRent, setIsNullRent] = useState(false);
  const [lengthOfRent, setLengthOfRent] = useState<number>(rentalPeriod);

  const [mutationLoading, setMutationLoading] = useState(false);
  const [buttonDiasbled, setbuttonDiasbled] = useState(true);

  const addToCartOnComplete = (mutationData: addItemToCart) => {};

  const [
    addToCartMutation,
    {
      loading: addToCartMutationLoading,
      data: addToCartMutationData,
      error: addToCartmutationError,
    },
  ] = useMutation<addItemToCart, addItemToCartVariables>(
    addItemToCartMutation,
    {
      onCompleted: addToCartOnComplete,
      refetchQueries: [{ query: getMyCartQuery }],
    }
  );

  // rental date calculator
  const rentalPeriodCalculator = () => {
    if (isNullRent) {
      return null;
    } else if (!isNullRent) {
      return lengthOfRent == 4 ? RentalPeriod.fourDays : RentalPeriod.eightDays;
    } else {
      return undefined;
    }
  };

  const onCompleteDeleteItemFromCart = (data: deleteItemFromCart) => {
    //If we deleted existing
    if (selected === "rentit") {
      //add new rental product
      console.log({
        rentalPeriod: rentalPeriodCalculator(),
        rentalStartDate: moment(date).format("YYYY-MM-DD"),
        rentalEndDate: moment(date)
          .add(lengthOfRent, "days")
          .format("YYYY-MM-DD"),
      });
      addToCartMutation({
        variables: {
          input: {
            sku: `${productID}-N/A-${defaultColor}-${defaultSize}`,
            quantity: 1,
            rentalPeriod: rentalPeriodCalculator(),
            itemType: CartItemType[CartItemType.rental],
            rentalStartDate: moment(date).format("YYYY-MM-DD"),
            rentalEndDate: moment(date)
              .add(lengthOfRent, "days")
              .format("YYYY-MM-DD"),
            isExpressShipping: false, //TODO add express shipping choose option
          },
        },
      });
    } else if (selected === "butit") {
      //add new retail product
      addToCartMutation({
        variables: {
          input: {
            sku: `${productID}-N/A-${defaultColor}-${defaultSize}`,
            quantity: 1,
            itemType: CartItemType[CartItemType.retail],
            isExpressShipping: false, //TODO add express shipping choose option
          },
        },
      });
    }
  };

  const [
    deleteItemFromCart,
    {
      loading: deleteItemFromCartLoading,
      data: deleteItemFromCartData,
      error: deleteItemFromCartError,
    },
  ] = useMutation<deleteItemFromCart, deleteItemFromCartVariables>(
    deleteItemFromCartMutation,
    { onCompleted: onCompleteDeleteItemFromCart }
  );

  useEffect(() => {
    setMutationLoading(addToCartMutationLoading || deleteItemFromCartLoading);
  }, [deleteItemFromCartLoading, addToCartMutationLoading]);

  useEffect(() => {
    if (color === defaultColor && size === defaultSize) {
      if (
        cartItem.itemType === CartItemType.rental &&
        rentalStartDate !== null &&
        date !== undefined
      ) {
        //product is rental
        const dateToCompare = new Date(rentalStartDate);
        if (date.getTime() == dateToCompare.getTime()) {
          setbuttonDiasbled(true);
        } else {
          console.log("PRODUCT IS RENTAL AND WE ARE HERE");
          setbuttonDiasbled(false);
        }
      } else {
        //product is retail end color size not updated
        setbuttonDiasbled(true);
      }
    } else {
      setbuttonDiasbled(false);
    }
  }, [defaultColor, defaultSize, cartItem, date]);

  //rental
  const HandleAddToCart = () => {
    console.log("running");
    if (defaultSize === "Select") {
      setSizeError(true);
      return;
    }
    //first remove old item
    if (cartItem) {
      deleteItemFromCart({
        variables: {
          input: {
            sku: cartItem.sku.sku, //TODO input is going to change to sku
            itemType: cartItem.itemType,
          },
        },
      });
    }
  };

  //retail
  const HandleAddToCartRetail = () => {
    if (defaultSize === "Select") {
      setSizeError(true);
      return;
    }
    //first remove old item
    if (cartItem) {
      deleteItemFromCart({
        variables: {
          input: {
            sku: cartItem.sku.sku, //TODO input is going to change to sku
            itemType: cartItem.itemType,
          },
        },
      });
    }
  };

  const onCompleted = () => {};
  const {
    data: productData,
    loading: productLoading,
    error: productError,
  } = useQuery<productPageQuery, productPageQueryVariables>(getProductQuery, {
    onCompleted,
    variables: { input: { id: productID } },
  });

  const SelectedProducts = _.find(
    productData?.getProduct?.product?.option1?.[0].color,
    {
      colorValue: defaultColor,
    }
  );
  const CurrentProductSizes = SelectedProducts?.size;

  const CurrentRetailPrice = _.find(CurrentProductSizes, {
    sizeValue: defaultSize,
  })?.skus?.[0].retailPrice;
  const Current4DaysRentalPrice = _.find(CurrentProductSizes, {
    sizeValue: defaultSize,
  })?.skus?.[0].rentalPrice4Days;
  const Current8DaysRentalPrice = _.find(CurrentProductSizes, {
    sizeValue: defaultSize,
  })?.skus?.[0].rentalPrice8Days;

  const ProductData = SelectedProducts;
  // console.log("SelectedProducts", SelectedProducts);

  // useLockBodyScroll();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-hidden  "
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden ">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute  inset-0  bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 w-[710px]  max-w-full flex  ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-[710px] ">
                <div className="h-full flex flex-col bg-white shadow-xl  ">
                  <div className="flex items-center py-4 px-5  justify-between border-b ">
                    <Dialog.Title className="text-base font-semibold text-gray-900 ">
                      Ürünü düzenle
                    </Dialog.Title>
                    <div className="ml-3 h-7 flex items-center">
                      <button
                        type="button"
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1  overflow-y-auto  overflow-x-hidden ">
                    <div className=" flex h-full ">
                      <div className="  h-full">
                        <ul className="flex  flex-col gap-y-0.5">
                          {SelectedProducts?.images?.map((image) => (
                            <li key={image.x70} className="w-80">
                              <img src={image.x1080} alt={image.label} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="   w-full h-full ">
                        <div className="-space-y-px flex flex-col gap-y-4 fixed">
                          <div>
                            <div className="">
                              <h1 className="font-semibold text-xl">
                                <span>
                                  {productData?.getProduct.product?.name}
                                </span>
                              </h1>

                              <div>
                                <h2 className="text-base font-normal mb-1">
                                  <Link href="/123">
                                    <span>
                                      {
                                        productData?.getProduct.product?.brand
                                          ?.name
                                      }
                                    </span>
                                  </Link>
                                </h2>
                              </div>
                              <div>
                                {/* <span>
        {ProductData?.getProduct.product?.brand?.map(
          (merchant) => (
            <span>{merchant.displayName}</span>
          )
        )}
      </span> */}

                                <div className="mt-3">
                                  <h3 className="sr-only">Reviews</h3>
                                  <div className="flex items-center">
                                    <div className="flex items-center">
                                      {[0, 1, 2, 3, 4].map((rating) => (
                                        <Star
                                          key={rating}
                                          className={`
             ${4 > 3 ? "text-black" : "text-gray-300"}
              "h-5 w-5 flex-shrink-0"
              `}
                                          aria-hidden="true"
                                        />
                                      ))}
                                    </div>
                                    <p className="sr-only">
                                      {5} out of 5 stars
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600 text-base font-normal">
                                  Satış Fiyatı ₺{" "}
                                  {productData?.getProduct.product?.marketValue}
                                </span>
                              </div>
                            </div>
                          </div>
                          <RadioGroup
                            value={
                              cartItem.itemType === "rental"
                                ? "rentit"
                                : "butit"
                            }
                            onChange={setSelected}
                            className=""
                          >
                            <RadioGroup.Label className="sr-only">
                              Satınalma Seçenekleri
                            </RadioGroup.Label>
                            {cartItem.itemType === "rental" ? (
                              <>
                                <ProductRentOption
                                  lengthOfRent={lengthOfRent}
                                  Current4DaysRentalPrice={
                                    Current4DaysRentalPrice
                                  }
                                  Current8DaysRentalPrice={
                                    Current8DaysRentalPrice
                                  }
                                  productData={productData}
                                  defaultColor={defaultColor}
                                  setDefaultColor={setDefaultColor}
                                  defaultSize={defaultSize}
                                  setDefaultSize={setDefaultSize}
                                  setLengthOfRent={setLengthOfRent}
                                  setDate={setDate}
                                  date={date}
                                  HandleAddToCart={HandleAddToCart}
                                  mutationLoading={mutationLoading}
                                  sizeError={sizeError}
                                  dateError={dateError}
                                  buttonDisabled={buttonDiasbled}
                                  setOpen={setOpen}
                                />
                              </>
                            ) : (
                              <>
                                <>
                                  <ProductBuyOption
                                    productData={productData}
                                    defaultColor={defaultColor}
                                    setDefaultColor={setDefaultColor}
                                    defaultSize={defaultSize}
                                    setDefaultSize={setDefaultSize}
                                    mutationLoading={mutationLoading}
                                    CurrentRetailPrice={CurrentRetailPrice}
                                    HandleAddToCartRetail={
                                      HandleAddToCartRetail
                                    }
                                    sizeError={sizeError}
                                    dateError={dateError}
                                    buttonDisabled={buttonDiasbled}
                                    setOpen={setOpen}
                                  />
                                </>
                              </>
                            )}
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6 hidden">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total Fiyat</p>
                      <p>{cart.data?.myCart.cart?.totalPrice} TL</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      {/* <button
                          disabled={mutationLoading}
                          className="flex w-full justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        > */}
                      <Link href={mutationLoading ? "" : "/cart"}>
                        <a
                          onClick={() =>
                            setOpen(mutationLoading ? true : false)
                          }
                          className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          {mutationLoading
                            ? "İşlem sürüyor"
                            : "Siparişi Tamamla"}
                        </a>
                      </Link>
                      {/* </button> */}
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                          disabled={mutationLoading}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ProductSlideOver;
