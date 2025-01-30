"use client";

import { useSearchParams } from "next/navigation";

import { useGetAllCampaignsQuery } from "@/redux/queries/campaigns/campaignsApi";
import ContentSpinner from "../layouts/contentSpinner";

// import "../style.css";

const Campaigns = () => {
 
  const searchParams = useSearchParams();
 
  const {
    isLoading: loadingCampaigns,
    data,
    refetch,
    error,
  } = useGetAllCampaignsQuery({}, { refetchOnMountOrArgChange: true });
  

    const refetchCampaigns = () => {
    refetch();
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="text-xs text-green-500 bg-green-100 rounded-md px-1 py-1">Active</span>;
      case "completed":
        return <span className="text-xs text-blue-500 bg-blue-100 rounded-md px-1 py-1">Completed</span>;
      case "cancelled":
        return <span className="text-xs text-red-500 bg-red-100 rounded-md px-1 py-1">Cancelled</span>;
      default:
        return <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">Unknown</span>;
    }
  };
//    if (loadingPermissions) {
//     return <PageLoadingSpinner />;
//   }
  console.log("data", data);
  return (
    <div className=" space-y-5   px-3 py-4   ">
    <div className=" p-3  flex flex-col md:flex-row md:items-center lg:items-center md:gap-0 lg:gap-0 gap-4 lg:justify-between md:justify-between">
        <h2 className="font-semibold text-black md:text-xl text-md lg:text-xl">
          All Ongoing Campaigns
        </h2>
        <div className="flex flex-col md:flex-row lg:flex-row lg:items-center md:items-center gap-4 md:gap-4 lg:gap-4 w-full md:w-auto">
        <div className="flex items-center self-end gap-4 ">
          
          {/* {hasAdminPermissions() && (
            <div>
              <CreateClassLevel refetchClasses={refetchClasses} />
            </div>
          )} */}
            </div>
         
        </div>
       
      </div>
      
    {loadingCampaigns ? (
      <div>
        <ContentSpinner />
      </div>
    ) : error ? (
      <span>{(error as any)?.data?.error || "Internal Server Error"}</span>
    ) : (
        
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-4 mt-4">
        {data?.map((campaign: any) => (
          <div key={campaign._id} className="bg-white cursor-pointer shadow-md rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{campaign.title}</h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold">deadline:</span>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Date(campaign.deadline).toLocaleDateString()}
              </span>
              </div>
              
            </div>

            <p className="text-sm text-gray-400 mt-1">{campaign.description}</p>

            <div className="mt-2">
              {getStatusBadge(campaign.status)}
            </div>
          </div>
        ))}
      </div>
    )}
      
    </div>
  );
};
export default Campaigns;
