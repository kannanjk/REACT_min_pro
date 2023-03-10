import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoding, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import swal from "sweetalert2";
import toast from "react-hot-toast";

function Userslist() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUsersData = async () => {
    try {
      dispatch(showLoding());
      const response = await axios.get(
        "http://localhost:3001/api/admin/get-all-users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };
  const changeUsserStatus = async (record, sta) => {
    try {
      swal
        .fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            console.log(record, "llllllll");
            const passId = record._id;
            console.log(passId);
            dispatch(showLoding());
            const response = await axios.post(
              "http://localhost:3001/api/admin/change-user-status",
              { userIdd: passId },
              {
                headers: {
                  // Authorization: `Bearer ${localStorage.getItem("token")}`,
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            dispatch(hideLoading());
            // console.log(response.data.data);
            if (response.data.success) {
              setUsers(response.data.data);
              toast.success(response.data.message);
            }
            swal.fire("success");
          }
        });
    } catch (error) {
      console.log("kkkk");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.isActive && (
            <h1
              className="anchor"
              onClick={() => changeUsserStatus(record, "hh")}
            >
              Block
            </h1>
          )}
          {!record.isActive && (
            <h1
              className="anchor"
              onClick={() => changeUsserStatus(record, "ll")}
            >
              Un Block
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}

export default Userslist;
