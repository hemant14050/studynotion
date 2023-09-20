import React from 'react';
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    return (
        <NavLink 
        to={link.path}
        className={`relative px-8 py-2 text-base font-medium ${matchRoute(link.path)? "bg-yellow-800 text-yellow-50":"bg-opacity-0"}`}
        >
            <div className='flex items-center gap-x-2'>
                <Icon className={"text-lg"} />
                <span>{link.name}</span>
            </div>

            <span className={`absolute left-0 top-0 w-[0.2rem] h-full
            ${matchRoute(link.path)? "bg-yellow-50":"opacity-0"}
            `}>
            </span>
        </NavLink>
    )
}

export default SidebarLink;