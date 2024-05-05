import { useContext, useState } from "react";
import UserAuthContext from "../contexts/authContext";
import { useLocation } from "react-router-dom";
import { AccessDenied } from "../pages/notPermitted";

const getPagePaths = (accessObject) => {
    const paths = [];
    accessObject.forEach(section => {
        if (section.allowed) {
            if(section.dropdown.length<=0)
                paths.push(section.title.toLowerCase().replace(/\s/g, ''));
            section.dropdown.forEach(item => {
                if (item.allowed) {
                    paths.push("dashboard/"+item.path.toLowerCase());
                }
            });
        }
    });
    return paths;
};

export default function IsRoutePermitted({children}){
    const {user} = useContext(UserAuthContext)
    const pathArr = useState(user?.permissions?.pageAccess?.access)
    const paths = getPagePaths(pathArr[0])
    const location = useLocation()
    console.log(location)
    const isRoutePermitted = paths.some(path => location.pathname.toLowerCase().startsWith(`/${path.toLowerCase()}`)) || location.pathname.toLowerCase()=="/dashboard";

    return isRoutePermitted?children:<AccessDenied/>
}