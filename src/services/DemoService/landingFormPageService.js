import axios from "axios";

const BASE_URL = "https://164.52.203.34.nip.io/api/v1";

export const fetchEmirates = async () => {
  return await axios
    .get(`${BASE_URL}/quotation/emirates/`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
};

export const fetchFreezones = async (emirateId) => {
  return await axios
    .get(`${BASE_URL}/quotation/freezones/${emirateId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export const fetchBusinesses = async (emirateId, freezoneId) => {
  return await axios
    .get(`${BASE_URL}/quotation/businesses/${emirateId}/${freezoneId}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export const fetchPackages = async (emirateId, freezoneId, businessId) => {
  console.log(emirateId, freezoneId, businessId);
  return await axios
    .get(
      `${BASE_URL}/quotation/packages/${emirateId}/${freezoneId}/${businessId}`
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));
};
const handlePdfResponse = (pdfData) => {
  // Create a Blob object from the binary data
  const pdfBlob = new Blob([pdfData], { type: "application/pdf" });

  // Create a temporary URL for the Blob object
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Open the PDF in a new tab
  window.open(pdfUrl, "_blank");

  // Clean up the temporary URL after some delay
  setTimeout(() => {
    URL.revokeObjectURL(pdfUrl);
  }, 10000); // Adjust the delay as necessary
};

export const calculateQuotation = async (
  emirateId,
  freezoneId,
  businessId,
  packageId
) => {
  try {
    console.log(localStorage.getItem("token"));
    const response = await axios.get(
      `${BASE_URL}/quotation/generate/?emirate_id=${emirateId}&freezone_id=${freezoneId}&business_activity_id=${businessId}&visa_package_id=${packageId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "text",
      }
    );
    console.log(response);
    handlePdfResponse(response.data);
  } catch (error) {
    console.error(error);
  }
};
