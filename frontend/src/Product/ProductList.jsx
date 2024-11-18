import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Sidebar from '../components/SideBar';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import ProductHeader from './ProductHeader';

// Dummy data
const initialRows = [
  { id: 1, name: 'Product 1', category: 'Category 1', source: 'Source 1', price: '₹2000', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 2, name: 'Product 2', category: 'Category 2', source: 'Source 2', price: '₹1500', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 3, name: 'Product 3', category: 'Category 3', source: 'Source 3', price: '₹3000', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 4, name: 'Product 4', category: 'Category 4', source: 'Source 4', price: '₹2500', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 5, name: 'Product 5', category: 'Category 5', source: 'Source 5', price: '₹3500', fromDate: '30-09-2024', toDate: '30-09-2024' },
  { id: 6, name: 'Product 6', category: 'Category 6', source: 'Source 6', price: '₹4000', fromDate: '30-09-2024', toDate: '30-09-2024' },
];

const ProductList = () => {
    const navigate=useNavigate();

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Implement the delete functionality here
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    }

    // navigation to add new role 
    const navigateToCreateUser=()=>{
      // alert(1)
      navigate('/create-product')
    }
    return (
        <div className='h-screen flex'>
        {/* sidebar */}
            <Sidebar />
            
            <div className="flex flex-1 flex-col bg-[#f7fbff]">
            {/* header */}
                <Header />
                {/* searching sorting  and main content area*/}
                {/* <div className='h-screen overflow-y-auto' style={{scrollbarWidth:'none'}}> */}
                <ProductHeader />
                    {/* card */}
                    <div className="h-full py-6 px-6 w-[1000px] overflow-auto scrollbar-none">
                        <div className="bg-white w-[100%] rounded-xl border border-[#EAE5FF] py-4 px-3 overflow-x-auto scrollbar-none">
                            <div className="relative  sm:rounded-lg">
                                <table className="table table-divided">
                                    <thead className="text-xs text-gray-700  bg-gray-50">
                                        <tr>
                                            <th scope="col" className="min-w-[64px]   table-header" >Sr.</th>
                                            <th scope="col" className="min-w-[205px]  table-header" >Product Name</th>
                                            <th scope="col" className="min-w-[205px]  table-header" >Product Category</th>
                                            <th scope="col" className="min-w-[205px]  table-header" >Product Source</th>
                                            <th scope="col" className="min-w-[205px]  table-header" >Product Price</th>
                                            <th scope="col" className="min-w-[205px]  table-header" >Form Date </th>
                                            <th scope="col" className="min-w-[205px]  table-header" >To Date </th>
                                            <th scope="col" className="min-w-[180px]  table-header" >Action</th>
                                            <th scope="col" className="min-w-[100px]  table-header" >View</th>
                                        </tr>
                                    </thead>
                                    <tbody className='divide-y divide-gray-200'>
                                        {initialRows.map((role, index) => (
                                            <tr key={role.id} className="bg-white hover:bg-gray-50">
                                                <td className="table-data">{index + 1}</td>
                                                <td className="table-data">{role.name}</td>
                                                <td className="table-data">{role.category}</td>
                                                <td className="table-data">{role.source}</td>
                                                <td className="table-data">{role.price}</td>
                                                <td className="table-data">{role.fromDate}</td>
                                                <td className="table-data">{role.toDate}</td>
                                                <td className="table-data ">
                                                    <div className='flex gap-2  '>
                                                        <div className="relative group">
                                                            <div className="action-button">
                                                                <img src="/image/action/Frame 33573.svg" alt="Edit" className='size-6' />
                                                            </div>
                                                            <span className="tooltip-text">
                                                                View
                                                                <span className="tooltip-arrow"></span>
                                                            </span>   
                                                        </div>
                                                        <div className="relative group">
                                                            <div className="action-button">
                                                                <img src="/image/action/Frame 33572 (2).svg" alt="Delete" className='size-6' onClick={() => handleDelete(role.id)} />
                                                            </div>
                                                            <span className="tooltip-text">
                                                                Delete
                                                                <span className="tooltip-arrow"></span>
                                                            </span>  
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 border-b border-[#EAE5FF]">
                                                    <div className='flex gap-2'>
                                                        <div className="relative group">
                                                            <div className="action-button">
                                                                <img src="/image/action/Frame 33574 (2).svg" alt="View" className='size-6' />
                                                            </div>
                                                            <span className="tooltip-text">
                                                                View
                                                                <span className="tooltip-arrow"></span>
                                                            </span> 
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className=" bottom-0 left-0 w-full bg-[#f7fbff] py-4 flex justify-between items-center">
                                <span className="text-sm font-normal text-gray-500">
                                    Showing <span className="font-semibold text-gray-900">01</span> of <span className="font-semibold text-gray-900">{initialRows.length}</span>
                                </span>
                                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                                    <li>
                                        <a href="#" className="previous-button" >
                                            <img src="/image/action/Left Arrow.svg" alt="Left" /> Previous
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="current-page">
                                            Page 01 of 01
                                        </a>
                                    </li>
                                    <li>
                                        <a  href="#"  className="next-button">
                                            Next <img src="/image/action/Right Arrow (1).svg" alt="Right" />
                                        </a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default ProductList;