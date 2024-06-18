// dummyData.js
export const dummyEmirates = [
  { id: 1, name: "Dubai" },
  { id: 2, name: "Abu Dhabi" },
  { id: 3, name: "Sharjah" },
  { id: 4, name: "Ajman" },
  { id: 5, name: "Umm Al Quwain" },
  { id: 6, name: "Ras Al Khaimah" },
  { id: 7, name: "Fujairah" },
];

export const dummyFreezones = [
  { id: 1, name: "Dubai Multi Commodities Centre (DMCC)" },
  { id: 2, name: "Dubai Airport Free Zone (DAFZA)" },
  { id: 3, name: "Jebel Ali Free Zone (JAFZA)" },
  { id: 4, name: "Dubai Silicon Oasis (DSO)" },
  { id: 5, name: "Dubai Design District (D3)" },
];

export const dummyBusinesses = [
  { id: 1, name: "Trading" },
  { id: 2, name: "Consulting" },
  { id: 3, name: "Manufacturing" },
  { id: 4, name: "Information Technology" },
  { id: 5, name: "Media and Marketing" },
];

export const dummyPackages = [
  { id: 1, name: "Basic Package" },
  { id: 2, name: "Standard Package" },
  { id: 3, name: "Premium Package" },
  { id: 4, name: "Enterprise Package" },
];

export const dummyQuotation = {
  packageName: "Premium Package",
  totalCost: 15000,
  breakdown: {
    SetupFee: 5000,
    AnnualFee: 7500,
    VisaFee: 2500,
  },
};
