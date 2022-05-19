import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import {
  useRefinementList,
  UseRefinementListProps,
} from "react-instantsearch-hooks";
import { RefinementListWidgetParams } from "instantsearch.js/es/widgets/refinement-list/refinement-list";

import { ControlledSearchBox } from "./ControlledSearchBox";
import { cx } from "@lib/Utils/cx";
import { Check } from "@components/icons";

export type RefinementListProps = React.ComponentProps<"div"> &
  UseRefinementListProps &
  Pick<RefinementListWidgetParams, "searchable" | "searchablePlaceholder">;

export function RefinementList(props: RefinementListProps) {
  const {
    canToggleShowMore,
    isFromSearch,
    isShowingMore,
    items,
    refine,
    searchForItems,
    toggleShowMore,
  } = useRefinementList(props);
  const [query, setQuery] = useState("");
  const previousQueryRef = useRef(query);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previousQueryRef.current !== query) {
      previousQueryRef.current = query;
      searchForItems(query);
    }
  }, [query, searchForItems]);

  // if (items === "color.values" || items === "color.values") {
  //   return null;
  // }

  if (items.length < 1) return null;

  return (
    <div className={cx("ais-RefinementList", props.className)}>
      <div>{props.attribute}</div>
      {props.searchable && (
        <div className="ais-RefinementList-searchBox">
          <ControlledSearchBox
            inputRef={inputRef}
            placeholder={props.searchablePlaceholder}
            isSearchStalled={false}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setQuery(event.currentTarget.value);
            }}
            onReset={() => {
              setQuery("");
            }}
            onSubmit={() => {
              if (items.length > 0) {
                refine(items[0].value);
                setQuery("");
              }
            }}
            value={query}
          />
        </div>
      )}
      {props.searchable && isFromSearch && items.length === 0 && (
        <div className="ais-RefinementList-noResults">No results.</div>
      )}
      {/* <span>{JSON.stringify(items, null, 2)}</span> */}
      <ul className="ais-RefinementList-list">
        {items.map((item) => (
          <li
            key={item.value}
            // className={cx(
            //   "ais-RefinementList-item  flex  w-fit tablet:w-full group mt-1 font-semibold text-xs  text-black  cursor-pointer justify-start  items-center",
            //   item.isRefined && "ais-RefinementList-item--selected select-none"
            // )}
            className={`
              "ais-RefinementList-item  flex  w-fit tablet:w-full group mt-1 font-semibold text-xs  text-black  cursor-pointer justify-start  items-center",
              ${
                item.isRefined &&
                "ais-RefinementList-item--selected select-none"
              }
            `}
          >
            <label
              className={`ais-RefinementList-label py-2 px-4
                  transition-colors  border-[#e6e6e6] hover:border-gray-400
                  border  rounded-md tablet:border-none bg-red 
                    flex tablet:gap-x-2  tablet:py-1 tablet:px-0
                     w-full text-sm font-normal cursor-pointer
                     ${
                       item.isRefined
                         ? "bg-black text-white tablet:bg-white tablet:text-[#272727]"
                         : "text-[#272727] "
                     }
                     
                     `}
            >
              <input
                className="ais-RefinementList-checkbox 
                w-0 h-0  accent-[#272727] 
                "
                type="checkbox"
                value={item.value}
                checked={item.isRefined}
                onChange={() => {
                  refine(item.value);
                  setQuery("");
                }}
              />
              {/* <span
                className="ais-RefinementList-labelText"
                dangerouslySetInnerHTML={{ __html: item.highlighted! }}
              /> */}

              <span
                className="hidden tablet:block tablet:w-5 tablet:h-5  tablet:bg-white border
              border-gray-300 rounded-md cursor-pointer tablet:group-hover:border-gray-600
              
              
              "
              >
                {item.isRefined ? <Check className="stroke-black" /> : null}
              </span>
              <span>{item.value}</span>
              <span className="ais-RefinementList-count">{item.count}</span>
            </label>
          </li>
        ))}
      </ul>

      {props.showMore && (
        <button
          className={cx(
            "ais-RefinementList-showMore",
            !canToggleShowMore && "ais-RefinementList-showMore--disabled"
          )}
          disabled={!canToggleShowMore}
          onClick={toggleShowMore}
        >
          {isShowingMore ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}
