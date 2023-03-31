import { createSelector } from "reselect";

// общие
const storeIsMobile = (store) => store.mobile;
export const getIsMobile = createSelector(storeIsMobile, (data) => data);
