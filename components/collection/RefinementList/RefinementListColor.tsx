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

export function RefinementListColor(props: RefinementListProps) {
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

      <ul className="ais-RefinementList-list grid grid-cols-5 tablet:grid-cols-3 gap-2">
        {items.map((item) => {
          const [color, hex] = item.value.split(";");
          return (
            <li
              key={color}
              className={cx(
                "ais-RefinementList-item flex w-full h-14 rounded-md font-semibold text-xs   text-black  cursor-pointer  justify-center items-center group",
                item.isRefined &&
                  "ais-RefinementList-item--selected  flex w-full h-14 rounded-md font-semibold text-xs   text-black  cursor-pointer  justify-center items-center group"
              )}
            >
              <label className="ais-RefinementList-label  pt-0.5 w-full h-full flex flex-col-reverse items-center group ">
                <input
                  className="ais-RefinementList-checkbox hidden "
                  type="checkbox"
                  value={color}
                  checked={item.isRefined}
                  onChange={() => {
                    refine(color);
                    setQuery("");
                  }}
                />
                {/* <span
                  className="ais-RefinementList-labelText "
                  dangerouslySetInnerHTML={{ __html: item.highlighted! }}
                /> */}
                <span>{color}</span>
                <span
                  style={{ backgroundColor: `${hex ? hex : "#FFF"}` }}
                  className="ais-RefinementList-count  text-black py-1 group-hover:underline
                   font-normal text-xs border block relative  w-7 h-7  rounded-full group-hover:ring-1 
                    group-hover:ring-gray-400 group-hover:ring-offset-2 text-transparent text-center"
                >
                  <span className="text-black ">
                    {item.isRefined ? (
                      color === "black" ? (
                        <Check className="w-6 h-6 absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      ) : (
                        <Check className="w-6 h-6 absolute text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )
                    ) : null}
                  </span>
                </span>
              </label>
            </li>
          );
        })}
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
