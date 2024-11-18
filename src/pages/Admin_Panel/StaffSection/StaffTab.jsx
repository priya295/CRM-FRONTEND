import React, { useEffect, useState } from 'react'
import Search from '../../../Assets/Images/search.svg'
import Filter from '../../../Assets/Images/filter.svg'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../../Context/GlobalContext';
import ClipLoader from "react-spinners/ClipLoader";



const StaffTab = () => {
  const { baseUrl, setSelectedStaff } = useGlobalContext();

  const [toggleDrop, setToggleDrop] = useState(false);

  function handledrop() {
    setToggleDrop(!toggleDrop)
  }

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle function to show/hide dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const [staffDetail, setStaffDetail] = useState();
  const fetchRoles = async () => {
    const result = await fetch(baseUrl + "staff")
    console.log("reuslt---", result)
    if (result.status == 200) {
      const res = await result.json();
      console.log(res);
      setStaffDetail(res)
      // console.log("---",res.name)
    }
    else {
      alert("An Error Occured")
    }

  }



  useEffect(() => {
    fetchRoles()
  }, [])

  return (
    <div className='staff-tab mt-[20px]'>
      <div className='flex justify-between flex-col xl:flex-row lg:flex-col md:flex-col gap-[15px] lg:gap-[0px]'>
        <div className='flex lg:gap-[20px] mb-[20px] flex-col gap-[10px] lg:flex lg:flex-row '>
          <div className='searching-input relative'>
            <img src={Search} className='absolute left-2 top-3' />
            <input type="text" className='border rounded-md bg-[#F4F5F9] p-[8px] pl-[30px] w-[100%] lg:w-[225px] focus-visible:outline-none' placeholder='Search' />

          </div>

          <select className='border rounded-md bg-[#F4F5F9] p-[8px] lg:w-[240px] w-[100%] focus-visible:outline-none text-sm'>
            <option>All Departments</option>
          </select>


          <div className='relative'>
            <button className='flex gap-[10px] whitespace-nowrap justify-end items-center cursor-pointer' onClick={toggleDropdown}>
              <img src={Filter} className='w-[40px] h-[40px] bg-[#F4F5F9] rounded-full p-[10px]' />
              <h2 className='text-[14px] font-normal	'>More Filters</h2>
            </button>
            {isDropdownOpen && (
              <div className="absolute w-[325px]  mt-2 md:w-[400px] xl:w-[400px] lg:w-[400px] lg:left-[0px] p-[20px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <h2 className='border-b '>More Filters</h2>
                <div className='flex gap-[10px] mt-2 items-center'>
                  <label className='text-[13px] whitespace-nowrap w-[81px]'>Staff Status:</label>
                  <select className='border rounded-md bg-[#F4F5F9] p-[8px]  w-[100%] focus-visible:outline-none text-sm'>
                    <option>All Staff</option>
                    <option>Active</option>
                    <option>InActive</option>
                  </select>
                </div>
                <div className='flex gap-[10px] mt-2 items-center'>
                  <label className='text-[13px] whitespace-nowrap w-[102px]'>Gender:</label>
                  <select className='border rounded-md bg-[#F4F5F9] p-[8px] w-full  focus-visible:outline-none text-sm'>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className='flex gap-[10px] mt-2 items-center'>
                  <label className='text-[13px] whitespace-nowrap w-[102px]'>Employee<br/> Type:</label>
                  <select className='border rounded-md bg-[#F4F5F9] p-[8px] w-full  focus-visible:outline-none text-sm'>
                    <option>All</option>
                    <option>Full Time</option>
                    <option>Pemanent</option>
                    <option>Part Time</option>
                    <option>Consultant</option>
                    <option>Temporary</option>
                    <option>Probation</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div className='text-center mt-2'>
                  <button className='second-btn'>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-[15px] justify-between lg:justify-start'>
          <button className='border border-1 rounded-md text-sm p-2 h-[43px]'>Update Staff</button>
          <div>
            <div className="relative inline-block text-left">
              <div>
                <button type="button" onClick={handledrop} className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md second-btn  text-sm  text-white shadow-sm" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  Add Staff
                  <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              {
                toggleDrop &&

                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <div className="py-1" role="none">
                    <Link to="/add-one-staff" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Add One Staff</Link>
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Add Mulitple Staff</Link>
                  </div>

                </div>
              }
            </div>


          </div>
        </div>
      </div>


      <div className='w-[100%] p-0 h-[300px] overflow-y-auto flex rounded-md shadow overflow-scroll border border-1 mt-4 '>
        <div className='   '>
          <table className='table-section '>
            <thead className='border border-1 sticky bg-[#fff] set-shadow top-[-1px]'>
              <th>#</th>
              <th>Name</th>
              <th>Job Title</th>
              <th>Employee Id</th>
              <th>Employee Type</th>
              <th>Date of Joining</th>
              <th>Date of Birth</th>
              <th>Mobile Number</th>
              <th>Personal Email ID</th>
              <th>Marital Status</th>
              <th>Gender</th>
              <th>Current Address</th>
              <th>Aadhaar</th>
              <th>Pan</th>
              <th>Guardian Name</th>
              <th>Emergency Contact Name</th>


            </thead>
            <tbody >
              {
                staffDetail?.map((staff, index) => {
                  return <tr key={index} onClick={() => { setSelectedStaff(staff) }} className='border'>
                    <td><input type='checkbox' className='border border-1 rounded-md ' /></td>
                    <td>
                      <Link to={`/personal-detail/${staff.id}`} className='text-[#8A25B0] font-medium'>{staff.name}</Link>
                    </td>
                    <td>{staff.staffDetails.job_title ? staff.staffDetails.job_title : "N/A"}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{staff.staffDetails.date_of_joining ? new Date(staff.date_of_joining).toLocaleDateString() : "N/A"}</td>
                    <td>{staff.date_of_birth ? new Date(staff.date_of_birth).toLocaleDateString() : "N/A"}</td>
                    <td>{staff.mobile}</td>
                    <td>{staff.staffDetails.official_email}</td>
                    <td>N/A</td>
                    <td>{staff.staffDetails.gender ? staff.staffDetails.gender : "N/A"}</td>
                    <td>{staff.staffDetails.current_address ? staff.staffDetails.current_address : "N/A"}</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>N/A</td>
                    <td>{staff.staffDetails.emergency_contact_name ? staff.staffDetails.emergency_contact_name : "N/A"}</td>
                  </tr>

                })
              }



            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StaffTab