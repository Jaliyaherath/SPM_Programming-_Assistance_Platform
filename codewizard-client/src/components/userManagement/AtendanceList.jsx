import { useEffect, useState } from 'react';
import { Button, Card, Table } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import html2PDF from 'jspdf-html2canvas';
import { format } from 'date-fns';


function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  return `${year}/${month}/${day}`;
}

export default function AttendanceList({ sid }) {
  const [studentData, setStudentData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAttendance() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/admin/reports/labattendance/${sid}`);
        if (res.ok) {
          const allUsers = await res.json();

          setStudentData(allUsers.enrolledStudents);
          setLoading(false);
        } else {
          console.log("Error fetching data from the server");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getAttendance();
  }, []);


  useEffect(() => {
    async function getOneLab() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/admin/reports/${sid}`);
        if (res.ok) {
          const onelab = await res.json();

          setLabData(onelab);
          setLoading(false);
        } else {
          console.log("Error fetching data from the server");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    getOneLab();
  }, []);

  async function downloadPDF() {
    const pages = document.getElementById('page-content-lab-att');
    if (!pages) return;
    await html2PDF(pages, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: './pdf',
      html2canvas: {
        scrollX: 0,
        scrollY: -window.scrollY,
      },
    });
  }

  const columns = [
    {
      title: 'Student Number',
      dataIndex: 'userRegNo',
      key: 'userRegNo',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Time Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => format(new Date(createdAt), 'yyyy-MM-dd HH:mm:ss'),
    },
  ];

  const tableData = studentData.map((student) => {
    return {
      userRegNo: student.user.userRegNo,
      name: student.user.firstName + ' ' + student.user.lastName,
      createdAt: student.createdAt,
    };
  });

  return (
    <>
      <center>
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 'bolder',
            textDecoration: 'underline',
          }}
        >
          Attendance Report
        </h1>
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          style={{ marginRight: '25px', float: 'right' }}
          onClick={downloadPDF}
        >
          DOWNLOAD
        </Button>
      </center>
      <br />
      <br />
      <br />

      <div id="page-content-lab-att">
      <Card
      title="Lab Details"
          style={{
            marginLeft: "25px",
            marginRight: "25px",
            overflow: "auto",
            height: "200px",
          }}
        >
          <h1>Lab Name : {labData.name}</h1>
          
          <h1 >Module : {labData.module}</h1>
          <h1 style={{float:'right'}}>Start Date : {formatDate(labData.startDate)}</h1>
          <h1>Year : {labData.year} Semester :{labData.semester}</h1>
          
        </Card>

        <br />
        <Card
          title="Participants Details"
          style={{
            marginLeft: '25px',
            marginRight: '25px',
            marginTop:'25px',
            overflow: 'auto',
            height: '500px',
          }}
          extra={<h1>Total Participants : {studentData.length}</h1>}
        >
          <Table
            columns={columns}
            dataSource={tableData}
            bordered={true}
            pagination={false}
            loading={loading}
          />
        </Card>

        <div style={{ marginBottom: '50px' }}></div>
      </div>
    </>
  );
}
