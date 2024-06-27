import { useContext } from "react";
import UserAuthContext from "../contexts/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { AccessDenied } from "../pages/notPermitted";

const getPagePaths = (accessObject) => {
    const paths = ["dashboard/tracking"];
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
    if(!user){
        return (
            <Navigate to={"/login"}/>
        )
    }
    const pathArr = [...user?.permissions?.pageAccess?.access]
    const paths = getPagePaths(pathArr)
    const location = useLocation()
    const isRoutePermitted = paths.some(path => location.pathname.toLowerCase().startsWith(`/${path.toLowerCase()}`)) || location.pathname.toLowerCase()=="/dashboard";

    return isRoutePermitted?children:<AccessDenied/>
}