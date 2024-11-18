import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../../../Context/GlobalContext';


const ContactInformation = () => {

const [clientData,setClientData] = useState([])
const {baseUrl , openToast} = useGlobalContext()
    const fetchDetail = async () => {
        const result = await fetch(baseUrl + "client");
        if (result.status == 200) {
            const res = await result.json();
            console.log(res)
            setClientData(res)
        }
        else {
            openToast("An Error Occured")
        }
    }

    useEffect(() => {
        fetchDetail();
    }, [])
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(!isOn);
    }
    const [isOn2, setIsOn2] = useState(false);

    const toggleSwitch2 = () => {
        setIsOn2(!isOn2);
    }
    const [isOn3, setIsOn3] = useState(false);

    const toggleSwitch3 = () => {
        setIsOn3(!isOn3);
    }
    return (
        <div className='table-section mt-5  shadow-cs p-[20px] rounded-lg pr-0 '>



            <div className='w-[100%] p-0 h-[auto]  rounded-md shadow  border border-1 mt-4 '>


                <div className='flex mb-4 justify-between p-3 flex-col gap-2  sm:flex-row sm:gap-0'>
                    <div className='left-side '>
                        <select className=' border border-[#e5e7eb] p-[8px]  shadow-sm mr-2 rounded-md pl-0 pr-3 focus:outline-none'>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                            <option>120</option>

                        </select>

                        <select className=' border border-[#e5e7eb]  p-[8px] shadow-sm rounded-md pl-0 pr-3 focus:outline-none'>
                            <option>Export</option>
                            <option>CSV</option>
                            <option>PDF</option>
                            <option>Print</option>
                        </select>
                        <CachedIcon className='border border-[#e5e7eb] shadow-sm ml-2 rounded-md cursor-pointer refresh' />




                    </div>

                    <div className='right-side relative  w-[200px]'>
                        <input type='text' placeholder='Search' className='border border-1 pl-3 h-[43px] pr-7
] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]' />
                        <SearchIcon className='absolute right-[10px] search-icon    text-[#aeabab]  font-thin text-[#dddddd;
]'/>
                    </div>
                </div>

                <div className='w-full rounded-xl'>
                    <div className='w-full overflow-x-auto  '>
                    <table className='table-section new-worth p-[10px]  w-full  !border-0 !border-spacing-0 '>
                        <thead className=' sticky bg-gray-200 set-shadow top-[-1px] !border-0'>
                            <th className='  p-2 text-xs font-medium text-center !border-0 !bg-white'>First Name</th>
                            <th className=' p-2 text-xs font-medium text-center !border-0 !bg-white'>Last Name </th>
                            <th className='p-2 text-xs font-medium text-center !border-0 bg-white'>Email</th>
                            <th className='p-2 text-xs font-medium text-center !border-0 bg-white'>Company</th>
                            <th className='p-2 text-xs font-medium text-center !border-0 bg-white'>Phone</th>
                            <th className='p-2 text-xs font-medium text-center !border-0 bg-white'>Positon</th>
                            <th className='p-2 text-xs font-medium text-center !border-0 bg-white'>Last Login</th>
                            <th className='p-2 text-xs font-medium text-center !border-0 bg-white'>Active</th>

                        </thead>
                        <tbody>
                           
                           {clientData.map((client,index)=>{
                            return  <tr className='border'>

                            <td>{client.name}</td>
                            <td>pa</td>
                            <td>{client.email}</td>
                            <td>brandpa</td>
                            <td>{client.mobile}</td>
                            <td>Demo</td>
                            <td>4 Weeks ago</td>
                            <td> 
                                  <div
                                className={`${isOn3 ? 'bg-[#27004a]' : 'bg-[#e6e0e0]'
                                    } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
                                onClick={toggleSwitch3}
                            >
                                <span
                                    className={`${isOn3 ? 'translate-x-6 mr-[21px] '  : 'translate-x-0 mr-[21px]'
                                        } inline-block w-6 h-6 bg-[#d5cdcd] rounded-full transform transition-transform duration-300 ease-in-out`}
                                />
                            </div>
                            </td>
                        </tr>
                           })}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
                <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to 7 of 7 entries </p>
                <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                    <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                    <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
                    <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

                </div>
            </div>
        </div>
    )
}

export default ContactInformation