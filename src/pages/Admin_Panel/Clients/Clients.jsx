


import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import { useGlobalContext } from "../../../Context/GlobalContext";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
// import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import Select from "react-select";
import { MdOutlineDone } from "react-icons/md";
import CustomDialog from "./DialougeBox";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import ClipLoader from 'react-spinners/ClipLoader';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const Clients = () => {


  const [allStaff, setAllStaff] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([])
  const [companyName, setCompanyName] = useState("");
  const [searchedClients, setSearchClients] = useState(null);
  const [rowsToShow, setRowsToShow] = useState(25);


  const [taskStatus, setTaskStatus] = useState({
    name: "",
    color: "#000000",
    order: "",
    isHiddenFor: [],
    canBeChangedTo: [],
  })



  const fetchAllStaff = async () => {
    const response = await fetch(baseUrl + 'staff');
    const data = await response.json();
    setAllStaff(data?.map((staff) => {
      return {
        id: staff?.id,
        label: staff?.name
      }
    }));
  }
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#F4F5F9',
      borderColor: '#E2E8F0',
      minHeight: '38px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#E2E8F0',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#4A5568',
      ':hover': {
        backgroundColor: '#CBD5E0',
        color: '#2D3748',
      },
    }),
  };





  const [isOpen15, setIsOpen15] = useState(false);

  const toggleModal15 = () => {
    setIsOpen15(!isOpen15);
  };

  const addNewDiv = () => {
    setDivs([...divs, {}]); // Add a new empty object to the state array
  };
  const [divs, setDivs] = useState([{}]); // Start with one empty object

  const { baseUrl, openToast } = useGlobalContext();
  const [openIndex, setOpenIndex] = useState(0);
  let subtitle;
  // Function to handle accordion toggling
  const handleToggle = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close the accordion if clicked again
    } else {
      setOpenIndex(index); // Open the accordion
    }
  };
  //salary dropdown
  const [isOpen1, setIsOpen1] = useState(false);



  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  //salary dropdown

  //Toggle swich off on btn
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  //Toggle swich off on btn

  //Toggle swich off on btn
  const [isOn1, setIsOn1] = useState(false);

  const toggleSwitch1 = () => {
    setIsOn1(!isOn1);
  };

  //

  const handleSelectChange = (event) => {
    setRowsToShow(Number(event.target.value));
  };

  const [exportFormat, setExportFormat] = useState("");

  const handleExport = () => {
    if (exportFormat === "CSV") exportCSV();
    else if (exportFormat === "PDF") exportPDF();
    else if (exportFormat === "Print") printDepartments();
  };

  const exportCSV = () => {
    const csvData = departments
      .map((dep) => `${dep.department_name}, Total Users: 1`)
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "departments.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Department List", 20, 10);
    departments.forEach((dep, index) => {
      doc.text(
        `${index + 1}. ${dep.department_name} (Total Users: 1)`,
        10,
        20 + index * 10
      );
    });
    doc.save("departments.pdf");
  };

  const printDepartments = () => {
    const printContent = departments
      .map((dep) => `${dep.department_name} (Total Users: 1)`)
      .join("\n");
    const newWindow = window.open();
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  //Toggle swich off on btn

  const [clientData, setClientData] = useState([]);

  const fetchDetail = async () => {
    const result = await fetch(baseUrl + "client");
    if (result.status == 200) {
      const res = await result.json();
      console.log(res);
      setClientData(res);
      if (res && res.length > 0) {
        setIsOpen(true);
      }
    } else {
      alert("An Error Occured");
    }
  };
  //   handle search company
  const handleSearchCompany = async () => {
    const queryParams = new URLSearchParams({
      company: companyName,
    }).toString();
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}staff/search?${queryParams}`);
      console.log(response);
      if (response.status === 200) {
        const result = await response.json();
        console.log(result);
        setSearchClients(result);

      } else {
        console.log("data is not filtered");
      }
    } catch (error) {
      console.error("Error searching staff:", error);
    }
    finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (companyName) {
        handleSearchCompany();
      }
    }, 3000);
  
    return () => clearTimeout(debounceTimer);
  }, [companyName]);

  useEffect(() => {
    fetchDetail();
    if (clientData) {
      setIsOpen(true);
    }
  }, []);

  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  function openModal2() {
    setIsOpen2(true);
  }
  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal2() {
    setIsOpen2(false);
  }
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState([]);
  const [defaultLanguages, setDefaultLanguages] = useState([
    "portuguese",
    "German",
    "indonesia",
    "catlan",
    "Spanish",
    "Turkish",
    "Slovak",
    "Vitnamese",
    "Swedish",
    "Portguese_br",
    "ukrainian",
    "polish",
  ]);
  const [language, setLanguage] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const groups = [
    "ASTROPITAH SMM PROJECT",
    "digital",
    "HONEY TOUR & TRAVELS",
    "vevge",
    "webs",
  ];
  const [selectedGroups, setSelectedGroups] = useState([]);
  const toggleGroupSelection = (group) => {
    setSelectedGroups((prevSelected) =>
      prevSelected.includes(group)
        ? prevSelected.filter((g) => g !== group)
        : [...prevSelected, group]
    );
  };
  const handleGroupSelection = (selectAll) => {
    if (selectAll) {
      setSelectedGroups(groups); //select all group
      setSelectAll(true);
    } else {
      setSelectedGroups([]); //deselect all group
      setSelectAll(false);
    }
  };
  const [selectedClient, setSelectedClient] = useState(null);

  // function to toggle the accordian
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  console.log("---", selectedClient?.company);

  useEffect(() => {
    if (selectedClient) {
      setCompany(selectedClient.company || "");
      setVatNumber(selectedClient.vat_number || "");
      setPhone(selectedClient.phone || "");
      setWebsite(selectedClient.website || "");
      setAddress(selectedClient.address || "");
      setCity(selectedClient.city || "");
      setState(selectedClient.state || "");
      setZipCode(selectedClient.zip_code || "");
      setCountry(selectedClient.country || "");
      setSelectedGroups(selectedClient.groups);
      setCurrency(selectedClient.currency);
      setLanguage(selectedClient.default_language);
      // Add any other fields like groups, language, etc.
    }
  }, [selectedClient]);

  const [company, setCompany] = useState(
    selectedClient?.clientDetails?.company
  );
  const [vatNumber, setVatNumber] = useState(
    selectedClient?.clientDetails?.vat_number
  );
  const [phone, setPhone] = useState(selectedClient?.phone);
  const [website, setWebsite] = useState(
    selectedClient?.clientDetails?.website
  );
  const [address, setAddress] = useState(
    selectedClient?.clientDetails?.address
  );
  const [city, setCity] = useState(selectedClient?.clientDetails?.city);
  const [state, setState] = useState(selectedClient?.clientDetails?.state);
  const [zipCode, setZipCode] = useState(
    selectedClient?.clientDetails?.zip_code
  );
  const [country, setCountry] = useState(
    selectedClient?.clientDetails?.country
  );
  const [clientGroup, setClientGroup] = useState([]);

  useEffect(() => {
    if (selectedClient && selectedClient.clientDetails) {
      setCompany(selectedClient.clientDetails.company)
      setVatNumber(selectedClient.clientDetails.vat_number)
      setPhone(selectedClient.mobile)
      setWebsite(selectedClient.clientDetails.website)
      setAddress(selectedClient.clientDetails.address)
      setCity(selectedClient.clientDetails.city)
      setState(selectedClient.clientDetails.state)
      setZipCode(selectedClient.clientDetails.zip_code)
      setCountry(selectedClient.clientDetails.country)
      setClientGroup(selectedClient.clientDetails.groups)


    }
  }, [selectedClient])

  const [deleteClient, setDeleteClient] = useState();
  const updateData = async (e) => {
    e.preventDefault();
    const result = await fetch(baseUrl + "/client/" + selectedClient.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ company: company, vat_number: vatNumber, phone: phone, website: website, groups: selectedGroups, currency: currency, default_language: language, address: address, country: country, state: state, city: city, zip_code: zipCode })
    })
    if (result.status == 200) {
      fetchDetail()
      openToast("Details Update Successfully")
    }
    else (
      openToast("An Error Occured")
    )
  }

  async function deleteData(id) {
    const result = await fetch(baseUrl + "/client/" + id, {
      method: "DELETE",
    });
    if (result.status === 200) {
      openToast("Delete Record Successfully");
      fetchDetail();
    } else {
      openToast("An Error Occurred");
    }
  }
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <div className=" w-full  top-[95px] right-[5px] ">
      <div className="bg-[#fff] p-[10px] ml-[10px]">
        <div className="mb-[14px] flex gap-[10px] items-center import-customers">
          <Link
            to="/addnewclient"
            className="text-[#fff] client-add text-[14px] newcustomers  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  p-[8px] text-center dark:bg-[#27004a] dark:hover:bg-[#27004a] dark:focus:ring-bg-[#27004a]"
          >
            <AddIcon className="newadd" /> New Clients
          </Link>

          <Link
            to="/contact-information"
            className="text-[#000] text-[14px] client-add focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  p-[8px] text-center dark:bg-[#27004a] dark:hover:bg-[#27004a] dark:focus:ring-bg-[#27004a]"
          >
            <PersonIcon className="newadd mr-[5px]" />
            Contacts
          </Link>
        </div>


        <div className="border border-[#dbdbdb] shadow-cs rounded-lg p-[20px]">
          <h2 className="font-medium mb-[10px] flex gap-[6px] items-center">
            {" "}
            <LibraryBooksIcon />
            Clients
          </h2>

          <div className="flex justify-between items-center mb-[14px] betwe-cent">
            <div className="flex mb-4 justify-between p-3 flex-col gap-2  sm:flex-row sm:gap-0">
              <div className="left-side ">
                <select
                  onChange={handleSelectChange}
                  className=" border border-[#e5e7eb] p-[7px] text-[14px]  shadow-sm mr-2 rounded-md  focus:outline-none"
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="120">120</option>
                </select>

                <select
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="border border-[#e5e7eb] p-[7px]  text-[14px] shadow-sm rounded-md  focus:outline-none"
                >
                  <option value="CSV">CSV</option>
                  <option value="PDF">PDF</option>
                  <option value="Print">Print</option>
                </select>

                <button
                  onClick={handleExport}
                  className='ml-2 bg-[#27004a] text-white p-[7px] text-[14px] rounded-md cursor-pointer'
                >
                  Export File
                </button>


                <button className="border border-[#e5e7eb] text-[14px] ml-[10px] rounded-lg shadow-sm p-[7px] " onClick={onOpenModal} >Bulk Action  <CachedIcon className="newsidebar-icon" /> </button>
                <Modal open={open} onClose={onCloseModal} center>
                  <div className="border-b border-[#dbdbdb] pb-[20px]">
                    <h2>Bulk Actions</h2>
                  </div>
                  <div className="flex items-center gap-[8px] mt-[32px] mb-[32px]">
                    <input type="checkbox" />
                    <p className="text-[14px]">Mass Delete</p>
                  </div>
                  <div className="w-[100%]">





                    <Select
                      isMulti
                      name="isHiddenFor"
                      options={allStaff?.map(({ id, label }) => ({ label: label, value: id }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={taskStatus.isHiddenFor || []}
                      onChange={(selectedOptions) =>
                        setTaskStatus((prev) => ({
                          ...prev,
                          isHiddenFor: selectedOptions || [] // ensures an array even if no options are selected
                        }))
                      }
                      styles={customStyles}
                    />
                  </div>
                  <p className="text-[red] text-[14px] mt-[10px]">if you do not select any groups assigned to the selected customers will be removed.</p>

                  <div className='pr-[10px] pb-3 flex gap-[10px] justify-end mt-[24px]'>
                    {/* Button to close the modal */}
                 
                    <button className='second-btn'>Confirm </button>
                  </div>

                </Modal>
                {/* <button className="border border-[#e5e7eb] text-[14px] ml-[10px] rounded-lg shadow-sm p-[7px] " onClick={onOpenModal}>Bulk Action <CachedIcon className="newsidebar-icon" /> </button>
                                <Modal open={open} onClose={onCloseModal} center>
                                    <div className="border-b border-[#dbdbdb] pb-[20px]">
                                        <h2>Bulk Actions</h2>
                                    </div>
                                    <div className="flex items-center gap-[8px] mt-[32px] mb-[32px]">
                                        <input type="checkbox" />
                                        <p className="text-[14px]">Mass Delete</p>
                                    </div>
                                    <div className="w-[100%]">
                                    </div>
                                    <p className="text-[red] text-[14px]">if you do not select any groups assigned to the selected customers will be removed.</p>

                                    <div className='pr-[10px] pb-3 flex gap-[10px] justify-end mt-[24px]'>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={toggleModal15}
                                        >
                                            Close
                                        </button>
                                        <button className='second-btn'>Confirm </button>
                                    </div>

                                </Modal> */}







              </div>


            </div>
            <div className="relative client-add">
              <input
                className="p-[6px] client-add rounded-2xl  summary-border text-[13px] "
                type="text"
                placeholder=" Search......."
                value={companyName}
                onChange={(e) => {
                  const value = e.target.value;
                  setCompanyName(value);
                  if (value === "") {
                    setSearchClients(null);
                    fetchDetail(); // Fetch all clients when the input is cleared
                  }
                }}

              />
              <SearchIcon className="absolute newadd2 right-[8px] top-[8px]" />
            </div>
          </div>

          <div className="bg-white  w-full overflow-x-auto">
            <table className="w-full table-auto border border-[#dbdbdb] border-collapse">
              {/* Header with Toggle */}
              <thead
                className="cursor-pointer bg-[white] shadow-lg border border-gray-300"
                onClick={toggleAccordion}
              >
                <tr>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    <input type="checkbox" className="text-xs h-4" />
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    #
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Name
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Company
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Primary Contact
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Primary Email
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Phone
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Active
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Groups
                  </th>
                  <th className="border-r p-2 text-xs font-medium text-center">
                    Date Created
                  </th>
                  <th className="p-2 text-xs font-medium text-center">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Conditionally Rendered Table Body */}
              {isOpen && (
                <tbody>
                  {
                    isLoading && clientData.length === 0 ? (<tr className="h-[100px]">
                      <td colSpan="9" className="text-center text-gray-600 text-sm font-semibold py-4">
                        <ClipLoader isLoading={isLoading} size={50} color="#000" />
                      </td>
                    </tr>
                    ) :
                      clientData && clientData.length > 0 ? (
                        clientData.map((item, index) => (
                          <tr key={item.id} className="border-b border-gray-300">
                            <td className="p-2 text-center">
                              <input type="checkbox" className="text-xs h-4" />
                            </td>
                            <td className="p-2 text-xs text-center">{index + 1}</td>
                            <td className="p-2 text-xs text-center">{item.name}</td>
                            <td className="p-2 text-xs text-center">
                              {item.clientDetails?.company}
                            </td>
                            <td className="p-2 text-xs text-center">
                              {item.mobile}
                            </td>
                            <td className="p-2 text-xs text-center">
                              {item.email}
                            </td>
                            <td className="p-2 text-xs text-center">
                              {item.mobile}
                            </td>
                            <td className="text-[11px] font-medium p-[10px]    whitespace-nowrap	">
                              <div className="flex items-center justify-center gap-[6px]">
                                {/* Toggle Switch */}
                                <div
                                  className={`${item.status ? "bg-[#8a25b0]" : "bg-gray-300"
                                    } relative inline-block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
                                  onClick={toggleSwitch1}
                                >
                                  <span
                                    className={`${item.status == "active"
                                      ? "translate-x-6"
                                      : "translate-x-0"
                                      } inline-block w-6 h-6 bg-[#f3ecec] rounded-full transform transition-transform duration-300 ease-in-out`}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="p-2 text-xs text-center">
                              {item.groups}
                            </td>
                            <td className="p-2 text-xs text-center">
                              {new Date(
                                item.clientDetails?.created_at
                              ).toDateString()}
                            </td>
                            <td className="p-2 flex justify-center gap-2">
                              <BorderColorIcon
                                className="text-purple-600 cursor-pointer"
                                onClick={() => setSelectedClient(item)}
                              />
                              <DeleteIcon
                                className="text-red-500 cursor-pointer"
                                onClick={() => deleteData(item.id)}
                              />
                            </td>
                          </tr>
                        ))
                      )
                        :  // No Data State
                        (<tr className="h-[100px]">
                          <td
                            colSpan="9"
                            className="text-center text-gray-900 text-sm font-semibold py-4"
                          >
                            No client found.
                          </td>
                        </tr>)}
                </tbody>
              )}
            </table>
            <div className='flex justify-between p-3 pt-5 w-[100%] items-center  flex-col gap-2  sm:flex-row sm:gap-0'>
              <p className=' text-[#a5a1a1] text-[14px]'>Showing 1 to {rowsToShow} of {departments.length} entries</p>
              <div className='pagination flex gap-2 border pt-0 pl-4 pb-0 pr-4 rounded-md'>
                <Link to="#" className='text-[12px]  pt-2 pb-[8px]'>Previous</Link>
                <span className='text-[12px] bg-[#27004a] flex items-center  text-white pl-3 pr-3 '>1</span>
                <Link to="#" className='text-[12px]  pt-2 pb-[8px] '>Next</Link>

              </div>
            </div>
          </div>
        </div>


      </div>

      <Modal
        isOpen={selectedClient ? true : false}
        onAfterOpen={afterOpenModal2}
        onRequestClose={closeModal2}
        // style={customStyles}
        contentLabel="Example Modal"
        className="w-[96%] xl:w-[40%] absolute top-[50%] left-[50%] bottom-auto p-0 bg-[#fff]  shadow-md rounded-[10px] translate-x-[-50%] translate-y-[-50%]"
      >
        <h2
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="border-b-1 p-3 text-[13px] xl:text-[15px] "
        >
          Update Clients
        </h2>
        <button
          onClick={() => {
            setSelectedClient(null);
          }}
          className="absolute right-[5px] top-[3px] font-semibold	  bg-[#511992] rounded-full"
        >
          <CloseIcon className="text-white" />
        </button>
        <div className="pb-2 modal-field p-[10px] border border-t">
          <form>
            <div className="grid grid-cols-1 gap-6">
              {/* <!-- Company --> */}
              <div>
                <label
                  for="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  id="company"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              {/* <!-- VAT Number --> */}
              <div>
                <label
                  for="vat"
                  className="block text-sm font-medium text-gray-700"
                >
                  VAT Number
                </label>
                <input
                  type="text"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  id="vat"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- Phone --> */}
              <div>
                <label
                  for="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- Website --> */}
              <div>
                <label
                  for="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="url"
                  value={website}
                  id="website"
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- Groups --> */}
              <div className="relative">
                <label
                  for="groups"
                  className="block text-sm font-medium text-gray-700"
                >
                  Groups
                </label>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  defaultValue={groups
                    ?.filter((opt) => clientGroup.includes(opt))
                    .map((opt) => ({ label: opt, value: opt }))}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    setSelectedGroups(selectedValues);
                  }}
                  options={groups?.map((opt) => ({
                    label: opt,
                    value: opt,
                  }))}
                />
              </div>

              {/* <!-- Currency and Default Language in one row --> */}
              <div className="flex flex-row justify-between items-center space-x-2 w-full ">
                {/* <!-- Currency --> */}

                <div className="relative inline-block text-left w-1/2">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 "
                  >
                    currency
                  </label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    defaultValue={[
                      { label: "USD", value: "$" },
                      { label: "INR", value: "₹" },
                    ].filter((opt) =>
                      selectedClient?.clientDetails?.currency.includes(
                        opt.value
                      )
                    )}
                    onChange={(o) => {
                      const arr = o.map((op) => op.value);
                      setCurrency(arr);
                    }}
                    options={[
                      { label: "USD", value: "$" },
                      { label: "INR", value: "₹" },
                    ]}
                  />
                </div>

                {/* <!-- Default Language --> */}
                <div className="w-1/2">
                  <label
                    for="language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Default Language
                  </label>
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    onChange={(o) => {
                      const arr = o.map((op) => op.value);
                      setLanguage(arr);
                    }}
                    defaultValue={defaultLanguages
                      .filter((lang) =>
                        selectedClient?.clientDetails?.default_language.includes(
                          lang
                        )
                      )
                      .map((op) => {
                        return { label: op, value: op };
                      })}
                    options={defaultLanguages.map((op) => {
                      return { label: op, value: op };
                    })}
                  />
                </div>
              </div>

              {/* <!-- Address --> */}
              <div>
                <label
                  for="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- City --> */}
              <div>
                <label
                  for="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  id="city"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- State --> */}
              <div>
                <label
                  for="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- Zip Code --> */}
              <div>
                <label
                  for="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  id="zip"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* <!-- Country --> */}
              <div>
                <label
                  for="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  id="country"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* <!-- Submit Button --> */}
            <div className="mt-6  w-full md:w-[45%] flex justify-between md:justify-end  md:float-right">
              <button
                type="submit"
                className=" second-btn "
                onClick={updateData}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>





    </div>
  );
};
export default Clients