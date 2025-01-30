"use client";

import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useGetClassesQuery } from "@/redux/queries/classes/classesApi";
import dynamic from "next/dynamic";
import { useState } from "react";
import { BsBarChart, BsShop } from "react-icons/bs";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentLight } from "react-icons/pi";
import PageLoadingSpinner from "../../layouts/PageLoadingSpinner";
import DefaultLayout from "../Layouts/DefaultLayout";
import Campaigns from "../../campaigns/allCampaigns";

const DashboardData = () => {
  const { user, loading } = useAppSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="mx-auto w-full md:max-w-screen-2xl lg:max-w-screen-2xl p-3 md:p-4 2xl:p-5">
        <PageLoadingSpinner />
      </div>
    );
  }
  return (
    <>
 
  <Campaigns />
    </>
  );
};

export default DashboardData;
