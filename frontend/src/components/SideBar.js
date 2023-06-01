import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SideBar.css";
import SideBarNav from "./SidebarNav";
import SidebarNavToggle from "./SidebarNavToggle";
import { Icon } from "@aws-amplify/ui-react";

import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
} from "react-icons/md";




export const appNavs = [
    {
      eventKey: "dashboard",
      icon: <Icon as={MdDashboard} />,
      title: "Dashboard",
      to: "/",
    },
    {
        eventKey: "login",
        icon: <Icon as={MdAccountBox} />,
        title: "Login",
        to: "/login",
      }
  ];


export default function SideBar() {
    const [expand, setExpand] = useState(false);

    let location = useLocation();
  
    useEffect(() => {
      setExpand(false);
    }, [location]);
   
    return (
        <>
          <div className="btn-sidebar-nav">
            <SidebarNavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </div>
          <div className={"sidebar " + (expand ? "visible" : "")}>
            <SideBarNav navs={appNavs} />
          </div>
        </>
      );
};

