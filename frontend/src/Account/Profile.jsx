import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import SidebarMenu from '../components/SideBar'

const Profile = () => {
    const [formData,setFormData]=useState({username:'',password:''})

  const handleFocus=()=>{

  }

  const handleBlur=()=>{

  }

  const handleChange=async(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(formData)
  }
  return (
    <div>
      <div className="flex bg-[#f7fbff]">
      {/* Sidebar */}
      <SidebarMenu />
      
      <main className="flex-grow">
        <Header />
        <div className="container mx-auto">
          <div className="flex items-center mt-6  mb-4">
            <h2 className="text-lg font-semibold ml-4 " style={{color:'#000000',fontSize:'24px',fontFamily:'Montserrat'}}>Profile Management</h2>
          </div>

          {/* Form Container */}
          <div className="h-full px-6 max-w-5xl" style={{paddingTop:'24px'}}> 
            <div className="bg-white w-full rounded-xl border border-[#EAE5FF] py-4 px-6">
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 w-full sm:grid-cols-1 md:grid-cols-1  mt-6">
                  {/* country name */}
                  <div className="flex flex-col">
                      <label  htmlFor="username"  className="text-sm font-medium text-start text-[12px] font-[Montserrat]"> Profile name </label>
                      <input id="username" name="username" type="text" required className="border rounded-lg p-3 mt-1 w-full h-14" style={{  borderRadius: '8px',border: '1px solid #EAEAFF'}}
                        onFocus={() => handleFocus('username')}
                        onBlur={() => handleBlur('username')}
                        onChange={handleChange}
                        placeholder="Enter User name or email address" 
                      />
                    </div>
                </div>
                <div className="grid gap-4 w-full sm:grid-cols-1 md:grid-cols-1  mt-6">
                  {/* country name */}
                  <div className="flex flex-col">
                      <label  htmlFor="Password"  className="text-sm font-medium text-start text-[12px] font-[Montserrat]"> Password </label>
                      <input id="Password" name="Password" type="text" required className="border rounded-lg p-3 mt-1 w-full h-14" style={{  borderRadius: '8px',border: '1px solid #EAEAFF'}}
                        onFocus={() => handleFocus('Password')}
                        onBlur={() => handleBlur('Password')}
                        onChange={handleChange}
                        placeholder="********************************"
                      />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start mt-6 gap-3">
                  <button  type="submit" className=" py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-[150px] h-12 font-[Montserrat] font-bold" style={{ borderRadius: "8px", }} >Edit Profile </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default Profile