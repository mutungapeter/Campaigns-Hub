'use client';

import DashboardData from "@/src/components/brand-dashboard/dashboard/DashboardContent";
import DefaultLayout from "@/src/components/brand-dashboard/Layouts/DefaultLayout";

const DashboardPage=()=>{
 

  return(
    
    <DefaultLayout>
    <DashboardData />
    </DefaultLayout>
  )
}
export default DashboardPage;