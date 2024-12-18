import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { FaPen, FaTrash } from "react-icons/fa";
import { searchFunction } from '../Entity/SearchEntity';
import axios from 'axios';
import FaqHeader from './FaqHeader';
import { useNavigate } from 'react-router-dom';
import { DeleteEntity } from '../utils/Delete';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { handleSort } from '../utils/sorting';

const FaqList = () => {
    const navigate = useNavigate();
    const [faq, setfaq] = useState([]);
    const [filteredfaq, setFilteredfaq] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchfaq = async () => {
            try {
                const response = await axios.get("http://localhost:5000/faqs/all");
                console.log(response.data)
                setfaq(response.data);
                setFilteredfaq(response.data);
            } catch (error) {
                console.error("Error fetching faq:", error);
            }
        };
        fetchfaq();
    }, []);

    // Search functionality
    const handleSearch = (event) => {
        const querySearch = event.target.value.toLowerCase();
        const filteredData = faq.filter(item =>
            Object.values(item).some(value =>
                typeof value === 'object' && value !== null
                    ? Object.values(value).some(nestedValue =>
                        String(nestedValue).toLowerCase().includes(querySearch)
                    )
                    : String(value).toLowerCase().includes(querySearch)
            )
        );
        setFilteredfaq(filteredData);
        setCurrentPage(1);
    };

    const sortData = (key) => {
        handleSort(filteredfaq, key, sortConfig, setSortConfig, setFilteredfaq)
    };

    const indexOfLastFaq = currentPage * itemsPerPage;
    const indexOfFirstFaq = indexOfLastFaq - itemsPerPage;
    const currentfaq = filteredfaq.slice(indexOfFirstFaq, indexOfLastFaq);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(filteredfaq.length / itemsPerPage);

    const updateFAQ = (id) => {
        navigate('/create-faq', { state: { id: id } })
    }

    // for delete
    const handledelete = async (id) => {
        const success = await DeleteEntity("Faq", id);
        if (success) {
            const updatedFaq = faq.filter((faq) => faq.id !== id);
            setfaq(updatedFaq);
            setFilteredfaq(updatedFaq);
        }
    };
    return (
        <div>
            <div className="h-screen flex">

                <div className="flex flex-1 flex-col bg-[#f7fbff]">
                    <Header />
                    <FaqHeader onSearch={handleSearch} />
                    <div className="py-6 px-6 h-full w-[1000px] overflow-scroll scrollbar-none">
                        <div className="bg-white w-full rounded-xl border border-[#EAE5FF] py-4 px-3 overflow-x-auto scrollbar-none">
                            <div className="relative sm:rounded-lg">
                                <table className="min-w-full text-sm text-left text-gray-700">
                                    <thead className="bg-gray-50 text-xs uppercase font-medium text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3 min-w-[150px]">
                                                Sr. No
                                                <div className="inline-flex items-center ml-2">
                                                    <GoArrowUp className='cursor-pointer' onClick={() => sortData('slno')} />
                                                    <GoArrowDown className='cursor-pointer' onClick={() => sortData('slno')} />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 min-w-[250px]">
                                                Faq Question
                                                <div className="inline-flex items-center ml-2">
                                                    <GoArrowUp className='cursor-pointer' onClick={() => sortData('question')} />
                                                    <GoArrowDown className='cursor-pointer' onClick={() => sortData('question')} />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 min-w-[250px]">
                                                Faq Answer
                                                <div className="inline-flex items-center ml-2">
                                                    <GoArrowUp className='cursor-pointer' onClick={() => sortData('answer')} />
                                                    <GoArrowDown className='cursor-pointer' onClick={() => sortData('answer')} />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 min-w-[150px]">
                                                Status
                                                <div className="inline-flex items-center ml-2">
                                                    <GoArrowUp className='cursor-pointer' onClick={() => sortData('status')} />
                                                    <GoArrowDown className='cursor-pointer' onClick={() => sortData('status')} />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 min-w-[150px]">

                                                Action

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentfaq.length > 0 ? (
                                            currentfaq.map((faq, index) => (
                                                <tr key={faq.id}>
                                                    <td className="px-4 py-3">{index + 1 + indexOfFirstFaq}</td>
                                                    <td className="px-4 py-3">{faq?.question || "N/A"}</td>

                                                    <td className="px-4 py-3">{faq?.answer || "N/A"}</td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`px-3 py-1 text-sm rounded-full ${faq.status === 1 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                                                        >
                                                            {faq.status === 1 ? "publish" : "unpublish"}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition mr-2" onClick={() => { updateFAQ(faq.id) }}>
                                                            <FaPen />
                                                        </button>
                                                        <NotificationContainer />
                                                        <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition" onClick={() => { handledelete(faq.id) }}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* for pagination */}
                        <div className="bottom-0 left-0 w-full bg-[#f7fbff] py-4 flex justify-between items-center">
                            <span className="text-sm font-normal text-gray-500">
                                Showing <span className="font-semibold text-gray-900">{indexOfFirstFaq + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(indexOfLastFaq, filteredfaq.length)}</span> of <span className="font-semibold text-gray-900">{filteredfaq.length}</span>
                            </span>
                            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                <li>
                                    <button
                                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                                        className={`previous-button ${filteredfaq.length === 0 ? 'cursor-not-allowed' : ''}`}
                                        disabled={currentPage === 1 || filteredfaq.length === 0}
                                        title={filteredfaq.length === 0 ? 'No data available' : ''}
                                    >
                                        <img src="/image/action/Left Arrow.svg" alt="Left" /> Previous
                                    </button>
                                </li>
                                <li>
                                    <span className="current-page">
                                        Page {filteredfaq.length > 0 ? currentPage : 0} of {filteredfaq.length > 0 ? totalPages : 0}
                                    </span>
                                </li>
                                <li>
                                    <button
                                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                                        className={`next-button ${filteredfaq.length === 0 ? 'cursor-not-allowed' : ''}`}
                                        disabled={currentPage === totalPages || filteredfaq.length === 0}
                                        title={filteredfaq.length === 0 ? 'No data available' : ''}
                                    >
                                        Next <img src="/image/action/Right Arrow (1).svg" alt="Right" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqList;
