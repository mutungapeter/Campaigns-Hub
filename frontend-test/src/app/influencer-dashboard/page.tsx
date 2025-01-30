'use client';

import DashboardData from "@/src/components/influencer-dashboard/dashboard/DashboardContent";
import DefaultLayout from "@/src/components/influencer-dashboard/Layouts/DefaultLayout";


const DashboardPage=()=>{
 

  return(
    
    <DefaultLayout>
    <DashboardData />
    </DefaultLayout>
  )
}
export default DashboardPage;