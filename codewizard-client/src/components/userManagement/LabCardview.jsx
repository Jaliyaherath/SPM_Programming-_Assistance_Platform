"use client";

import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Row, Statistic, Card } from "antd";
import Link from "next/link";

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  return `${year}/${month}/${day}`;
}

export default function LabCardview() {
  const [allLabs, setAllLabs] = useState([]);

  useEffect(() => {
    async function getAllLabs() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/admin/reports/labattendance");
        if (res.ok) {
          const allLabs = await res.json();
          setAllLabs(allLabs);
        } else {
          console.log("Error fetching data from the server");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getAllLabs();
  }, []);

  const cardsPerRow = 4; // Change this to the number of cards per row

  const renderCards = () => {
    const cardRows = [];
    for (let i = 0; i < allLabs.length; i += cardsPerRow) {
      const rowCards = allLabs.slice(i, i + cardsPerRow);
      cardRows.push(
        <Row gutter={16} key={i}>
          {rowCards.map((lab, index) => (
            <Col key={index} span={24 / cardsPerRow}>
              <Card
                title={lab.name}
                // extra={<h1>name: {lab.name} year : {lab.year} sem : {lab.semester} date : {formatDate(lab.startDate)}</h1>}
              >
                <h1>Date : {formatDate(lab.startDate)}  </h1>
                <h1 >Year : {lab.year} Semester : {lab.semester}</h1>
                <span></span>
                <h1></h1>
                <Link href={`/admin/reports/labattendance/${lab._id}`}>
          <Button type="primary" style={{float:"right", marginTop:"30px"}}>View Attendance</Button>
        </Link>
              </Card>
            </Col>
          ))}
        </Row>
      );
    }
    return cardRows;
  };

  return (
    <div>
      {renderCards()}
      <Row gutter={16}>
        <Col className="gutter-row" span={6} style={{ boxShadow: "5px 5px 5px #F2F2F2" }}>
          {/* <Statistic title="Total Users" value={allLabs.length} prefix={<UserOutlined />} /> */}
        </Col>
      </Row>
    </div>
  );
}
