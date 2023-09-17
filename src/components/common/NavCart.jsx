import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineShoppingCart} from "react-icons/ai";
import {useSelector} from "react-redux";

const NavCart = () => {
    const {totalItems} = useSelector((state) => state.cart);
    
    return (
        <Link to={"/dashboard/cart"} className="relative rounded-full">
            <AiOutlineShoppingCart className={"text-3xl text-richblack-50"}/>

            {
                totalItems > 0 && (
                <div className="absolute font-semibold text-sm -top-1 -right-[4px] flex justify-center items-center w-[21px] h-[21px] p-2 rounded-full bg-white text-caribbeangreen-400 animate-bounce">
                    {totalItems}
                </div>
                )
            }
        </Link>
    )
}

export default NavCart;