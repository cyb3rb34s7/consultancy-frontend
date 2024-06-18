// services.js
import {
  dummyEmirates,
  dummyFreezones,
  dummyBusinesses,
  dummyPackages,
  dummyQuotation,
} from "./dummyData";

export const fetchEmirates = () => {
  return Promise.resolve(dummyEmirates);
};

export const fetchFreezones = (emirateId) => {
  // You can filter the freezones based on the emirateId if needed
  return Promise.resolve(dummyFreezones);
};

export const fetchBusinesses = (freezoneId) => {
  // You can filter the businesses based on the freezoneId if needed
  return Promise.resolve(dummyBusinesses);
};

export const fetchPackages = (businessId) => {
  // You can filter the packages based on the businessId if needed
  return Promise.resolve(dummyPackages);
};

export const calculateQuotation = (
  emirateId,
  freezoneId,
  businessId,
  packageId
) => {
  // You can calculate the quotation based on the selected values if needed
  return Promise.resolve(dummyQuotation);
};
