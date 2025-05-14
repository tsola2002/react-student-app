import { useEffect, useState } from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getStudents, deleteStudent } from '../api/studentApi';

function StudentList() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await getStudents();
      setStudents(data);
    } catch {
      message.error('Failed to fetch students');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      message.success('Student deleted');
      fetchData();
    } catch {
      message.error('Failed to delete');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'studentId' },
    { title: 'Name', dataIndex: 'studentName' },
    { title: 'DOB', dataIndex: 'dateOfBirth' },
    { title: 'Address', dataIndex: 'studentAddress' },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => navigate(`/edit/${record.studentId}`)}>Edit</Button>
          <Popconfirm title="Delete student?" onConfirm={() => handleDelete(record.studentId)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={() => navigate('/add')} style={{ marginBottom: 16 }}>
        Add Student
      </Button>
      <Table rowKey="studentId" columns={columns} dataSource={students} />
    </div>
  );
}

export default StudentList;
