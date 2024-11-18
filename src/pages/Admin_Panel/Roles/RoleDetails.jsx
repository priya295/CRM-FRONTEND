import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import { useGlobalContext } from '../../../Context/GlobalContext';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import ClipLoader from "react-spinners/ClipLoader";


const Main = () => {

  const { baseUrl, setRoleName, setRoleId, setEditPermissions } = useGlobalContext();
  const [roles, setRoles] = useState([])
  const [exportFormat, setExportFormat] = useState('');
  const [rowsToShow, setRowsToShow] = useState(25);
  const [searchRoleName , setSearchRoleName] = useState('');
  const [isLoading , setIsLoading] = useState(false);

  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };


  const handleExport = () => {
    if (exportFormat === 'CSV') exportCSV();
    else if (exportFormat === 'PDF') exportPDF();
    else if (exportFormat === 'Print') printRoles();
  };

  const exportCSV = () => {
    const csvData = roles.map(role => `${role.role_name}, Total Users: 1`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'roles.csv');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Role List", 20, 10);
    roles.forEach((role, index) => {
      doc.text(`${index + 1}. ${role.role_name} (Total Users: 1)`, 10, 20 + index * 10);
    });
    doc.save('roles.pdf');
  };

  const printRoles = () => {
    const printContent = roles.map(role => `${role.role_name} (Total Users: 1)`).join('\n');
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };




  const fetchRoles = async () => {
    setIsLoading(true);
   
    try{
      const result = await fetch(baseUrl + "role")
      if (result.status == 200) {
        const res = await result.json();
        setRoles(res.data)
      }
      else {
        alert("An Error Occured")
      }
    }
  catch(error){
    console.log("error:" , error);
  } 
   finally{
    setIsLoading(false);
   }

  }


  const deleteRole = async (id) => {
    try {
      const result = await fetch(`${baseUrl}/role/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json", // Corrected the header spelling for consistency
        }
      });
      if (result.ok) { // Use result.ok instead of checking the status directly
        alert("Record deleted successfully.");
        fetchRoles()
      } else {
        alert("An error occurred while deleting the record.");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("An error occurred during the delete request.");
    }
  };

  useEffect(() => {
    fetchRoles()
  }, [])

  const handleSearchRole = async () => {
    const queryParams = new URLSearchParams({
    role_name : searchRoleName
     
    }).toString();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}role/search?${queryParams}`);
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setRoles(result);
      } else {
         console.log("error while fetching Roles")
      }
    } catch (error) {
      console.error('Error searching Roles:', error);
    }
    finally{
      setIsLoading(false);
    }
  };
  
  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchRoleName.trim()) {
        handleSearchRole();
      } else {
        fetchRoles(); // Fetch all projects if search input is cleared
      }
    }, 3000); 
  
    return () => clearTimeout(delayDebounceFn); // Cleanup function to clear the timeout
  }, [searchRoleName]);
  
  return (
    <div className=' pl-[10px] w-[100%] pr-2 mb-3 pb-4 pt-[10px]'>
      <Link to="/addrole" className='bg-[#27004a]  p-2 pr-3 rounded-lg text-white '> <AddIcon /> New Role</Link>

      <div className='table-section mt-5 bg-white shadow p-4 pl-0 rounded-sm pr-0'>

        <div className='flex mb-4 justify-between p-3 flex-col gap-2  sm:flex-row sm:gap-0'>
          <div className='left-side '>
            <select onChange={handleSelectChange} className=' border border-[#e5e7eb] p-[8px]  shadow-sm mr-2 rounded-md pl-0 pr-3 focus:outline-none'>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="120">120</option>

            </select>

            <select onChange={(e) => setExportFormat(e.target.value)} className=' border border-[#e5e7eb]  p-[8px] shadow-sm rounded-md pl-0 pr-3 focus:outline-none'>
              <option value="CSV">CSV</option>
              <option value="PDF">PDF</option>
              <option value="Print">Print</option>
            </select>

            <button
              onClick={handleExport}
              className='ml-2 bg-[#511992] text-white p-2 rounded-md cursor-pointer'
            >
              Export File
            </button>
            <CachedIcon className='border border-[#e5e7eb] shadow-sm ml-2 rounded-md cursor-pointer refresh' />




          </div>

          <div className='right-side relative  w-[200px]'>
            <input type='text' placeholder='Search' className='border border-1 pl-3 h-[43px] pr-7
] rounded-md focus:outline-none w-[100%] text-[15px] text-[#aeabab]' onChange={(e)=>{setSearchRoleName(e.target.value)}}/>
            <SearchIcon className='absolute right-[10px] search-icon    text-[#aeabab]  font-thin text-[#dddddd;
]'/>
          </div>
        </div>

        <table class="table-auto w-[100%] border-collapse">
          <thead className='bg-gray-300 '>
            <tr>
              <th className=' p-4 text-center font-medium text-[12px]'>Roll Name</th>
              <th className='text-center p-4 text-sm font-medium text-[12px]'>Options</th>
            </tr>
          </thead>
          <tbody>


          {
    isLoading && roles.length === 0 ? (
      <tr className="h-[100px]">
          <td colSpan="9" className="text-center text-gray-600 text-xl font-semibold py-4">
          <ClipLoader color="#4A90E2" size={50} />
          </td>
        </tr>
    ) : roles.length > 0 ? (
      roles.slice(0, rowsToShow).map((role, index) => {
        return (
          <tr key={role.id} className="border-b pb-2 border-[#f1f5f9]">
            <td className="pt-4 pb-3 pl-3">
              <Link to="/" className="text-[#27004a] text-[14px]">{role.role_name}</Link>
              <h6 className="text-[13px] pt-2 text-[#a5a1a1]">Total Users: <span>1</span></h6>
            </td>
            <td className="flex pt-4 gap-2 justify-center">
              <Link to="/editrole" onClick={() => {
                setRoleId(role.id)
                setRoleName(role.role_name)
                setEditPermissions(role.permissions)
              }}>
                <BorderColorIcon className="text-[#511992] font-light cursor-pointer text-[10px]]" />
              </Link>
              <DeleteOutlineIcon className="text-red-500 font-light cursor-pointer text-[10px]]" onClick={() => { deleteRole(role.id) }} />
            </td>
          </tr>
        )
      })
    ) : (
      <tr className="h-[100px]">
        <td colSpan="2" className="text-center text-red-500 text-xl font-semibold py-4">
          No roles found.
        </td>
      </tr>
    )
  }

</tbody>
        </table>
        <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
          <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {roles.length} entries </p>
          <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
            <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
            <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
            <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Main;