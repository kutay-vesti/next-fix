import { Star } from "@components/icons";
import { productPageQuery } from "graphql/__generated__/productPageQuery";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface IProductHeader {
  productData: productPageQuery | undefined;
}

const ProductHeader: FC<IProductHeader> = ({ productData }) => {
  return (
    <div className="">
      <h1 className="font-semibold text-xl">
        <span>{productData?.getProduct.product?.name}</span>
      </h1>

      <div>
        <h2 className="text-base font-normal mb-1">
          <Link href="/">
            <a>{productData?.getProduct.product?.brand?.name}</a>
          </Link>
        </h2>
      </div>
      <div>
        {/* <span>
      {productData?.getProduct.product?.brand?.map(
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
            <p className="sr-only">{5} out of 5 stars</p>
          </div>
        </div>
      </div>
      <div>
        <span className="text-gray-600 text-base font-normal">
          Satış Fiyatı ₺ {productData?.getProduct.product?.marketValue}
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;
