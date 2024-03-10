import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, userInfo } = useContext(AuthContext);
  {
    /*  Get All users   */
  }
  console.log(user.email);
  const getAlluser = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:4000/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err), setLoading(false));
  };

  {
    /*  Update role of user   */
  }

  const makeAdmin = async (id) => {
    await axios
      .patch(`http://localhost:4000/users/admin/${id}`, {
        email: userInfo.email,
      })
      .then((res) => {
        console.log(res);
        getAlluser();
      });
  };

  {
    /*   delete User   */
  }
  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:4000/users/${id}`, { email: userInfo.email })
      .then((res) => {
        console.log(res);
        getAlluser();
      });
  };

  useEffect(() => {
    setLoading(true);
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
                        <button
                          onClick={() => makeAdmin(el._id)}
                          className="btn btn-xs btn-circle text-white bg-indigo-500"
                        >
                          <FaUsers />
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteUser(el._id)}
                        className="btn btn-xs bg-orange-500 text-white"
                      >
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
      {loading ? (
        <span className="loading  loading-bars loading-lg w-[60px]"></span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Users;
