import { useQuery, gql, ApolloClient } from "@apollo/client";

import { initializeApollo } from "@lib/apollo";
import { getShopEventTypeQuery } from "graphql/queries";
import { shopEventTypeQuery } from "graphql/__generated__/shopEventTypeQuery";

import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import { FC } from "react";

interface IEventType {
  eventTypeQuery: shopEventTypeQuery;
}
const EventType: FC<IEventType> = ({ eventTypeQuery }) => {
  return (
    <>
      <div className="max-w-screen-2xl  mx-auto mt-8">
        <h1 className="font-medium text-4xl text-center">Event'ini seç</h1>
        <div className="flex tablet:flex-nowrap gap-x-4 flex-wrap justify-center  mx-auto pb-8 max-w-2xl w-full ">
          {eventTypeQuery?.getAllEventTypes?.eventTypes?.map((event) => (
            <Link key={event.id} href={`/collections/${event.slug}`}>
              <a className=" group  rounded-3xl pb-4 px-2 bg-white hover:drop-shadow-lg">
                <div className="flex flex-col  items-center cursor-pointer  justify-start align-center">
                  <div className=" w-28 h-28  rounded-full">
                    {event.imageURL ? (
                      <img
                        src={event.imageURL}
                        alt={event.name}
                        className="rounded-full"
                      />
                    ) : null}
                  </div>
                  <span className="mt-1 text-xs text-center font-medium uppercase">
                    {event.name}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventType;
