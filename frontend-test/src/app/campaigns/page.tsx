'use client'


import PageLoadingSpinner from "@/src/components/layouts/PageLoadingSpinner"
influencerLayout
import dynamic from "next/dynamic"
import { Suspense } from "react"

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import influencerLayout from "@/src/components/influencer-dashboard/Layouts/DefaultLayout"
import DefaultLayout from "@/src/components/brand-dashboard/Layouts/DefaultLayout"
import Campaigns from "@/src/components/campaigns/allCampaigns"
const MarksPage=()=>{
const{ user, loading } = useAppSelector((state: RootState) => state.auth);
const Layout = user?.role === "influencer" ? influencerLayout : DefaultLayout;
 
  
  return (
 
      <Layout>
        <Suspense fallback={<PageLoadingSpinner />}>
         <Campaigns />
        </Suspense>
      </Layout>

  )
}
export default MarksPage