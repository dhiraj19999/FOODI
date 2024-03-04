import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
const Users = () => {
  const [data, setData] = useState([]);

  const getAlluser = async () => {
    await axios
      .get("http://localhost:4000/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAlluser();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users:{data.length}</h5>
      </div>
      {/*  Table  */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[800px] ">
            {/* head */}
            <thead className=" bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data.map((el, ind) => {
                return (
                  <tr key={ind}>
                    <th>{ind + 1}</th>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>
                      {el.role == "admin" ? (
                        "Admin"
                      ) : (
                        <button className="btn btn-xs btn-circle text-white bg-indigo-500">
                          <FaUsers />
                        </button>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-xs bg-orange-500 text-white">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
