import { apiSlice } from "@/redux/api/apiSlice";

export const classesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCampaigns: builder.query({
      query: () => {
     

        return {
          url: `campaigns/all-campaigns`,
          method: "GET",
       
        };
      },
    }),
    getMyCampaigns: builder.query({
      query: () => {
     

        return {
          url: `campaigns/my-campaigns`,
          method: "GET",
       
        };
      },
    }),

  }),
});

export const {
  useGetAllCampaignsQuery,
  useGetMyCampaignsQuery
} = classesApi;
