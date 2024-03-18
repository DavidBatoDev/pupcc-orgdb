import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Card from "./org_card";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";

const Database = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(event.target.value);
        const filteredItems = data.filter(
            (item) =>
                item.name.toLowerCase().includes(value) ||
                item.description.toLowerCase().includes(value)
        );
        setFilteredData(filteredItems);
        setCurrentPage(0);
    };

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <m.div className="bg-[url(https://cdn.discordapp.com/attachments/813768653761806366/1218410348223139921/Untitled_design_13.png?ex=6607900f&is=65f51b0f&hm=814f08f6efce005ec35044dc541a092a54a3d9ef455f7b8d9816941ca8e9514f&)] bg-cover bg-center w-screen h-screen overflow-x-hidden">
            <div className="navbar p-2 m-2">
                <div className="flex-1">
                    <Link to={'/'} className="btn btn-ghost text-xl">Organization Database</Link>
                </div>
                <div className="flex-none gap-3">
                    <div className="form-control w-96">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input input-bordered w-24 md:w-auto"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentItems.map((item, index) => (
                    <div key={index}>
                        <Card
                            image={item.image}
                            title={item.name}
                            description={item.description}
                            social={item.social}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center p-2">
                <m.div
                    className="pagination"
                    variants={paginationVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <ReactPaginate
                        previousLabel={<i className="material-icons">chevron_left</i>}
                        nextLabel={<i className="material-icons">chevron_right</i>}
                        breakLabel={<button className="join-item btn">...</button>}
                        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageChange}
                        containerClassName={"flex space-x-2"}
                        pageLinkClassName={"join-item btn"}
                        activeLinkClassName={"join-item btn btn-active"}
                        previousLinkClassName={"join-item btn"}
                        nextLinkClassName={"join-item btn"}
                        disabledClassName={"join-item btn-disabled"}
                    />
                </m.div>
            </div>
        </m.div>
    );
};

export default Database;
