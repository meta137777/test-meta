"use client";

import { Hydrate as RQHydrate, HydrateProps } from "react-query";

export const ReactQueryHydrate = (props: HydrateProps) => {
  return <RQHydrate {...props} />;
};
