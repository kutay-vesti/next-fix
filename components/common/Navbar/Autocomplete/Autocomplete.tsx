import type { SearchClient } from "algoliasearch/lite";
import type { BaseItem } from "@algolia/autocomplete-core";
import type { AutocompleteOptions, Render } from "@algolia/autocomplete-js";

import {
  createElement,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { render } from "react-dom";

import {
  useHierarchicalMenu,
  usePagination,
  useSearchBox,
} from "react-instantsearch-hooks";
import { autocomplete } from "@algolia/autocomplete-js";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import * as _ from "lodash";
import "@algolia/autocomplete-theme-classic";
import { createCategoriesPlugin } from "../CreateCategoriesPlugin/CreateCategoriesPlugin";
// import {
//   INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES,
//   INSTANT_SEARCH_INDEX_NAME,
//   INSTANT_SEARCH_QUERY_SUGGESTIONS,
// } from "../constants";

export const INSTANT_SEARCH_INDEX_NAME = "instant_search";
export const INSTANT_SEARCH_QUERY_SUGGESTIONS =
  "instant_search_demo_query_suggestions";
export const INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES = [
  "hierarchicalCategories.lvl0",
  "hierarchicalCategories.lvl1",
];

// import "@algolia/autocomplete-theme-classic";

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  searchClient: SearchClient;
  className?: string;
};

type SetInstantSearchUiStateOptions = {
  query: string;
  category?: string;
};

export function Autocomplete({
  searchClient,
  className,
  ...autocompleteProps
}: AutocompleteProps) {
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  const { query, refine: setQuery } = useSearchBox();
  const { items: categories, refine: setCategory } = useHierarchicalMenu({
    attributes: INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES,
  });
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] =
    useState<SetInstantSearchUiStateOptions>({ query });
  const debouncedSetInstantSearchUiState = _.debounce(
    setInstantSearchUiState,
    500
  );

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    instantSearchUiState.category && setCategory(instantSearchUiState.category);
    setPage(0);
  }, [instantSearchUiState]);

  const currentCategory = useMemo(
    () => categories.find(({ isRefined }) => isRefined)?.value,
    [categories]
  );

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: "instantsearch",
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.label,
              category: item.category,
            });
          },
        };
      },
    });

    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: "multi-datasets-with-headers-example",
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          templates: {
            ...source.templates,
            header() {
              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">Your searches</span>
                  <div className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
          },
        };
      },
    });
    const querySuggestionsInCategory = createQuerySuggestionsPlugin({
      searchClient,
      indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
      getSearchParams() {
        return recentSearches.data!.getAlgoliaSearchParams({
          hitsPerPage: 3,
          facetFilters: [
            `${INSTANT_SEARCH_INDEX_NAME}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:${currentCategory}`,
          ],
        });
      },
      transformSource({ source }) {
        return {
          ...source,
          sourceId: "querySuggestionsInCategoryPlugin",
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.query,
              category: item.__autocomplete_qsCategory,
            });
          },
          getItems(params) {
            if (!currentCategory) {
              return [];
            }

            return source.getItems(params);
          },
          templates: {
            ...source.templates,
            header({ items }) {
              if (items.length === 0) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">
                    In {currentCategory}
                  </span>
                  <span className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
          },
        };
      },
    });
    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient,
      indexName: "instant_search_demo_query_suggestions",
      getSearchParams() {
        return recentSearchesPlugin.data.getAlgoliaSearchParams({
          hitsPerPage: 5,
        });
      },
      transformSource({ source }) {
        return {
          ...source,
          templates: {
            ...source.templates,
            header({ state }) {
              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">
                    {state.query ? "Suggested searches" : "Popular searches"}
                  </span>
                  <div className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
          },
        };
      },
    });
    const categoriesPlugin = createCategoriesPlugin({ searchClient });
    const querySuggestions = createQuerySuggestionsPlugin({
      searchClient,
      indexName: INSTANT_SEARCH_QUERY_SUGGESTIONS,
      getSearchParams() {
        if (!currentCategory) {
          return recentSearches.data!.getAlgoliaSearchParams({
            hitsPerPage: 6,
          });
        }

        return recentSearches.data!.getAlgoliaSearchParams({
          hitsPerPage: 3,
          facetFilters: [
            `${INSTANT_SEARCH_INDEX_NAME}.facets.exact_matches.${INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0]}.value:-${currentCategory}`,
          ],
        });
      },
      categoryAttribute: [
        INSTANT_SEARCH_INDEX_NAME,
        "facets",
        "exact_matches",
        INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES[0],
      ],
      transformSource({ source }) {
        return {
          ...source,
          sourceId: "querySuggestionsPlugin",
          onSelect({ item }) {
            setInstantSearchUiState({
              query: item.query,
              category: item.__autocomplete_qsCategory || "",
            });
          },
          getItems(params) {
            if (!params.state.query) {
              return [];
            }

            return source.getItems(params);
          },
          templates: {
            ...source.templates,
            header({ items }) {
              if (!currentCategory || items.length === 0) {
                return <Fragment />;
              }

              return (
                <Fragment>
                  <span className="aa-SourceHeaderTitle">
                    In other categories
                  </span>
                  <span className="aa-SourceHeaderLine" />
                </Fragment>
              );
            },
          },
        };
      },
    });

    return [recentSearchesPlugin, querySuggestionsPlugin, categoriesPlugin];
  }, [currentCategory]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query },
      plugins,
      onReset() {
        setInstantSearchUiState({ query: "", category: currentCategory });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          debouncedSetInstantSearchUiState({
            query: state.query,
          });
        }
      },
      renderer: { createElement, Fragment, render: render as Render },
    });

    return () => autocompleteInstance.destroy();
  }, [plugins]);

  return <div className={className} ref={autocompleteContainer} />;
}
