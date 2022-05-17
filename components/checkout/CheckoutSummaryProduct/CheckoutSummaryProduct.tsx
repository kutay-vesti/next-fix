import Link from "next/link";
import { Logo } from "@components/ui";
import {
  myCart_myCart_cart,
  myCart_myCart_cart_cartItems,
} from "graphql/__generated__/myCart";
import moment from "moment";

interface ICheckoutSummaryProduct {
  product: myCart_myCart_cart_cartItems;
}

function CheckoutSummaryProduct({ product }: ICheckoutSummaryProduct) {
  return (
    <>
      <tr className="flex gap-x-2 py-1  w-full ">
        <td className=" ">
          <Link href={`/products/${product.productId}`}>
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
            <Link href={`/products/${product.productId}`}>
              {/* TODO:ID PRODUCT ID */}
              <div className="flex flex-col gap-y-0.5">
                <span className="font-medium text-xs">
                  {product.productName}
                </span>
                <span className="font-normal text-xs">{product.brandName}</span>
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
                    ? `${product.sku.discountedRentalPrice4Days}`
                    : `${product.sku.discountedRentalPrice8Days}`}
                  ₺
                </div>
                <div className="line-through">
                  {product.rentalPeriod === "fourDays"
                    ? product.sku.comparisonRentalPrice4Days
                    : product.sku.comparisonRentalPrice8Days}
                  ₺
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

export default CheckoutSummaryProduct;
