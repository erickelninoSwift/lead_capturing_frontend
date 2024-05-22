import React from "react";

const TableRow = ({
  lead,
  buttonModal,
  modalUpdateorView,
  setOpenModal,
  setDatatodelete,
  setDatatoview,
  setDatatoUpdate,
}) => {
  const { createdAt, name, email, phone, _id } = lead;

  const handleEdit = () => {
    buttonModal(true);
    modalUpdateorView(true);
    setDatatoUpdate(lead);
  };

  const handleView = () => {
    buttonModal(true);
    modalUpdateorView(false);
    setDatatoview(lead);
  };

  const handleDelete = () => {
    setOpenModal(true);
    setDatatodelete(_id);
  };
  return (
    <>
      <tr className="">
        <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
          {_id.slice(0, 10)}
        </td>

        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
          {name}
        </td>

        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
          {email}
        </td>
        <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
          {phone}
        </td>
        <td className="whitespace-no-wrap hidden py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
          {createdAt}
        </td>
        <td className="whitespace-no-wrap hidden py-3 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
          <button
            type="button"
            className="px-2 py-2.5 rounded w-[100px] text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
            onClick={() => handleView()}
          >
            View
          </button>
        </td>
        <td className="whitespace-no-wrap py-3 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
          <button
            type="button"
            className="px-2 py-2 rounded w-[100px] text-white text-sm tracking-wider font-medium outline-none border-2 border-[#333] bg-[#222] hover:bg-transparent hover:text-black transition-all duration-300"
            onClick={() => handleEdit()}
          >
            Update
          </button>
        </td>

        <td className="whitespace-no-wrap hidden py-3 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
          <button
            type="button"
            className="px-6 py-2 w-[100px] rounded ml-2 text-white text-sm tracking-wider font-medium outline-none border-2 border-red-600 bg-red-600 hover:bg-transparent hover:text-black transition-all duration-300"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
