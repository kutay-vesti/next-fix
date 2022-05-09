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

export function RefinementListSize(props: RefinementListProps) {
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

  return (
    <div className={cx("ais-RefinementList", props.className)}>
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

      <ul className="ais-RefinementList-list flex gap-2 flex-wrap  tablet:grid tablet:grid-cols-2 tablet:gap-2">
        {items.map((item) => (
          <li
            key={item.value}
            className={cx(
              "ais-RefinementList-item  select-none flex tablet:w-full tablet:h-11 tablet:py-0  font-semibold rounded-md text-xs   text-black border cursor-pointer  transition-colors  bg-white  justify-center items-center  border-[#e6e6e6] hover:border-gray-400",
              item.isRefined &&
                "ais-RefinementList-item--selected bg-black text-white border border-black"
            )}
          >
            <label
              className={`ais-RefinementList-label 
              w-full flex items-center justify-center h-full text-center font-bold py-2 px-4
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

              <span className="sr-only">{item.count}</span>
              <span>{item.value}</span>
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
{
  /* <RefinementList
  attribute="size.values"
  placeholder="Renkler"
  classNames={{
    list: "flex gap-2 flex-wrap  tablet:grid tablet:grid-cols-2 tablet:gap-2 ",
    item: "select-none flex tablet:w-full tablet:h-11 tablet:py-0 font-semibold rounded-md text-xs  bg-white text-black border cursor-pointer  transition-colors    justify-center items-center  border-[#e6e6e6] hover:border-gray-400",
    label:
      " w-full flex items-center justify-center h-full text-center font-bold py-2 px-4 ",
    checkbox: "hidden",
    count: "hidden",
    selectedItem: "bg-black text-white border border-black  ",
  }}
/>; */
}
