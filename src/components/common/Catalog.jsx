import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import toast from "react-hot-toast";
import { IoIosListBox } from "react-icons/io";

const Catalog = ({ loading, setLoading }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const fetchSubLinks = async () => {
    try {
      setLoading(true);
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log(response.data.data);
      setSubLinks(response.data.data);
      setLoading(false);
    } catch (err) {
      toast.error("An error occured while fetching categories list");
      console.log(err);
      // console.log(err.response.data);
    }
  };

  return (
    <div className="transition-all duration-200">
      <div
        onClick={() => setIsCatalogOpen(!isCatalogOpen)}
        className="flex relative group cursor-pointer items-center gap-2 ml-2"
      >
        <IoIosListBox size={20} />
        Catalog
        <FaChevronDown />
      </div>

      {isCatalogOpen && (
        <ul className="transition-all duration-200">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : subLinks.length ? (
            <>
              {subLinks
                ?.filter((subLink) => subLink?.courses?.length > 0)
                ?.map((subLink, i) => (
                  <li className="pt-1 pl-9 border-b pb-1 border-richblack-600">
                    <Link
                      to={`/catalog/${subLink.name
                        .split(" ")
                        .join("-")
                        .toLowerCase()}`}
                      className="rounded-lg bg-transparent hover:bg-richblack-50"
                      key={i}
                    >
                      <p>{subLink.name}</p>
                    </Link>
                  </li>
                ))}
            </>
          ) : (
            <p className="text-center">No Courses Found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Catalog;
