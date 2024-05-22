import React, { useEffect, useState } from "react";
import TableRow from "../components/Table/TableRow";
import { useCookies } from "react-cookie";
import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import AddModal from "../components/AddModal";
import Datepicker from "react-tailwindcss-datepicker";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import { FaCalendarAlt } from "react-icons/fa";
// import { formatDate } from "../utils/dateformater";

export const formatDate = (value) => {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "-" + month + "-" + year;
};
const AdminPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const Authtoken = cookies.AuthToken;
  const [openModal, setOpenmodal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataTodelete, setDatatodelete] = useState(null);
  const [dataToview, setDatatoview] = useState(null);
  const [dataToupdate, setDatatoUpdate] = useState(null);
  const [leads, setAllLeads] = useState([]);
  const [addLeadModal, setAddleadModal] = useState(false);
  // const [dateValue, setDateValue] = useState(new Date());
  const [customError, setCustomErro] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = value;
  const handleValueChange = (newValue) => {
    setValue(() => {
      return newValue;
    });
  };

  const fetchAllLeads = async () => {
    const response = await fetch(`http://localhost:8080/leads`);
    const allDataFetched = await response.json();
    if (allDataFetched.detail) {
      setCustomErro(allDataFetched.detail);
      setTimeout(() => setCustomErro(null), 3000);
    } else {
      setAllLeads(allDataFetched.data);
    }
  };

  // const handleFilteringDatabyDate = async () => {
  //   if (!dateValue) {
  //     return;
  //   }
  //   const response = await fetch(
  //     `http://localhost:8080/leads?startDate=${formatDate(dateValue)}`
  //   );
  //   const allDataFetched = await response.json();
  //   if (allDataFetched.detail) {
  //     setCustomErro(allDataFetched.detail);
  //   } else {
  //     setAllLeads(allDataFetched.data);
  //   }
  // };

  const handleFilteringDatabyDate = async () => {
    if (!value.startDate || !value.endDate) {
      console.log("we not good");
      return;
    }
    const response = await fetch(
      `http://localhost:8080/leads?startDate=${formatDate(
        startDate
      )}&endOfDate=${formatDate(endDate)}`
    );
    const allDataFetched = await response.json();
    if (allDataFetched.detail) {
      setCustomErro(allDataFetched.detail);
    } else {
      setAllLeads(allDataFetched.data);
    }
  };

  useEffect(() => {
    if (Authtoken) {
      fetchAllLeads();
    }
  }, [openModal, modalUpdate, openDeleteModal, addLeadModal]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl bg-white">
        <h1 className="mt-20 mb-10 ml-5 text-2xl font-bold text-gray-900">
          Leads Management
        </h1>
        <div className="bg-white py-2 px-3">
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setAddleadModal(true)}
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM12 8.25C12.4142 8.25 12.75 8.58579 12.75 9V11.25H15C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75H12.75L12.75 15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V12.75H9C8.58579 12.75 8.25 12.4142 8.25 12C8.25 11.5858 8.58579 11.25 9 11.25H11.25L11.25 9C11.25 8.58579 11.5858 8.25 12 8.25Z"
              fill="#1C274C"
            />
          </svg>
        </div>
      </div>
      <div className="w-screen bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-2 py-10">
          <div className="mt-4 w-full">
            <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <div className="relative flex w-[300px] max-w-2xl items-center">
                <Datepicker value={value} onChange={handleValueChange} />
                {/* <label className="flex gap-1 justify-center items-center">
                  <ReactDatePicker
                    selected={dateValue}
                    onChange={(date) => setDateValue(date)}
                  />
                  <FaCalendarAlt size={24} />
                </label> */}
              </div>
              <div className="flex gap-3 justify-center items-center">
                <button
                  type="button"
                  className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                  onClick={() => handleFilteringDatabyDate()}
                >
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  <svg
                    className="mr-2 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>
                <button
                  onClick={() => {
                    // setDateValue(null);
                    setValue({ startDate: null, endDate: null });
                    fetchAllLeads();
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead className="hidden border-b lg:table-header-group">
                <tr className="">
                  <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    id
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Name
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Email
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Phone
                  </td>

                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Date
                  </td>
                  <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Actions
                  </td>
                </tr>
              </thead>

              <tbody className="bg-white lg:border-gray-300">
                {leads &&
                  leads.map((currentLead) => {
                    const { _id } = currentLead;

                    return (
                      <TableRow
                        key={_id}
                        lead={currentLead}
                        buttonModal={setOpenmodal}
                        modalUpdateorView={setModalUpdate}
                        setOpenModal={setOpenDeleteModal}
                        setDatatodelete={setDatatodelete}
                        setDatatoview={setDatatoview}
                        setDatatoUpdate={setDatatoUpdate}
                      />
                    );
                  })}
              </tbody>
            </table>
            {!leads && (
              <p className="text-sm h-[60px] w-full mx-auto flex justify-center items-center rounded-md bg-red-400 text-red-900">
                "No record found at this moments"
              </p>
            )}
            {customError && (
              <p className="text-sm h-[60px] w-full mx-auto flex justify-center items-center rounded-md bg-red-400 text-red-900">
                {customError} on this specific date
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center mt-[10px] h-[700px] mx-auto w-[1040px] overflow-hidden">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Name
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Email
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Mobile
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Date
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Name
                </span>
                KnobHome
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Email
                </span>
                German
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Mobile
                </span>
                0812119429
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Date
                </span>
                2007-08-31
              </td>
              <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                  Actions
                </span>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 underline"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 underline pl-6"
                >
                  Remove
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      {/* <div className="flex justify-center items-center mt-[10px] h-[700px] mx-auto w-[1040px] overflow-hidden">
        <table className="min-w-full bg-white font-[sans-serif]">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Joined At
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-base">John Doe</td>
              <td className="px-6 py-4 text-base">john@example.com</td>
              <td className="px-6 py-4 text-base">Admin</td>
              <td className="px-6 py-4 text-base">2022-05-15</td>
              <td className="px-6 py-4">
                <button className="mr-4" title="Edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 fill-blue-500 hover:fill-blue-700"
                    viewBox="0 0 348.882 348.882"
                  >
                    <path
                      d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                      data-original="#000000"
                    />
                    <path
                      d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                      data-original="#000000"
                    />
                  </svg>
                </button>
                <button className="mr-4" title="Delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 fill-red-500 hover:fill-red-700"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                      data-original="#000000"
                    />
                    <path
                      d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                      data-original="#000000"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
      {openModal && (
        <Modal
          buttonModal={setOpenmodal}
          mode={modalUpdate}
          data={dataToview}
          dataToupdate={dataToupdate}
          setDatatoUpdate={setDatatoUpdate}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          setOpenModal={setOpenDeleteModal}
          data={dataTodelete}
          setDatatodelete={setDatatodelete}
        />
      )}
      {addLeadModal && <AddModal setAddleadModal={setAddleadModal} />}
    </>
  );
};

export default AdminPage;
