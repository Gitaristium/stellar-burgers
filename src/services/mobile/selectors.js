import { createSelector } from "reselect";

// общие
export const getIsMobile = createSelector(
    (store) => store.mobile,
    (data) => data
);
