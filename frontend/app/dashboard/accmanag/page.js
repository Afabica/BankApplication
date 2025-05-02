"use client";
//
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import AccountManagement from "../../../components/dashcomp/AccManag/AManag";

import FetchDataPage from "../../../components/tools/TestPage.js";
import "../../../styles/NavDash.css";
import "../../../styles/global.css";

const Account = () => {
  return (
    <div>
      <AccountManagement />
    </div>
  );
};

export default Account;
//
