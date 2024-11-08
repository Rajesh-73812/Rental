import React from 'react';

const Login2 = () => {
  return (
    <div className="h-screen grid grid-cols-2"> 
        {/* Left Side */}
        <div className="h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(141.69deg, #25064C 0%, rgba(32, 40, 59, 0.6) 100%)'  }}>
            <div className="">
                <img src="/image/logo frame.svg" alt="" className='w-[337px] h-[291px]' />
            </div>
            <div className='text-center gap-5'>
                <span className="text-white" style={{fontFamily: 'Arial',fontWeight: '400',fontSize: '64px',lineHeight: '102px',letterSpacing: '0.1rem', color: '#FFFFFF'}} > DENTIIFY </span>
            </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center bg-white p-6"> 
            <div 
                className="w-full max-w-md bg-white rounded-xl p-8"
                style={{
                    boxShadow: `
                        0px 2px 5px 0px #0000001A,
                        0px 10px 10px 0px #00000017,
                        0px 22px 13px 0px #0000000D,
                        0px 39px 15px 0px #00000003,
                        0px 60px 17px 0px #00000000
                    `
                }}
            >
                <h2  style={{fontFamily:'poppins',fontWeight:'700px' ,fontSize:'40px',lineHeight:'64px',float:'left'}}>Welcome Back</h2>
                <p  style={{color:'#439BFF',float:'left'}} >please login to your account</p>
                
                <form className="space-y-4">
                    <div>
                        
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            placeholder=" email"
                        />
                    </div>
                    
                    <div>
                        
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" 
                            placeholder=" password"
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center"> </div>
                        
                        <div>
                            <a href="#" className="text-sm text-[#131313]">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#439BFF] "
                        >
                            Login
                        </button>
                    </div>
                </form>
                
                
            </div>
        </div>
    </div>
  );
}

export default Login2;