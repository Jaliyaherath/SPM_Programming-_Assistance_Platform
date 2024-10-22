"use client";
import React, { useEffect, useState } from "react";
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Statistic } from 'antd';

export default function Dashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const[allInstructors, setAllinstructors] = useState([]);
  const[allStudents, setAllStudents] = useState([]);
  const[allAdmins, setAllAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/users/");
        if (res.ok) {
          const allUsers = await res.json();

          const students = allUsers.filter(user => user.role === "student");
          const Instructors = allUsers.filter(user => user.role === "instructor");
          const admins = allUsers.filter(user => user.role === "admin");
          setAllUsers(allUsers);
          setAllStudents(students);
          setAllinstructors(Instructors);
          setAllAdmins(admins);
          setLoading(false);
        } else {
          console.log("Error fetching data from the server");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getAllUsers();
  }, []);


  return (
    <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6} style={{boxShadow: "5px 5px 5px #F2F2F2"}}>
          <Statistic title="Total Users" value={allUsers.length} prefix={<UserOutlined />} />
        </Col>
        <Col className="gutter-row" span={6} style={{boxShadow: "5px 5px 5px #F2F2F2"}}>
          <Statistic title="Total Student Accounts" value={allStudents.length} prefix={<UserOutlined />} />
        </Col>
        <Col className="gutter-row" span={6} style={{boxShadow: "5px 5px 5px #F2F2F2"}}>
          <Statistic title="Total Instructor Accounts" value={allInstructors.length} prefix={<UserOutlined />} />
        </Col>
        <Col className="gutter-row" span={6} style={{boxShadow: "5px 5px 5px #F2F2F2"}}>
          <Statistic title="Admin Accounts" value={allAdmins.length} prefix={<UserOutlined />} />
        </Col>
      </Row>
      
      
    </div>
  );
}