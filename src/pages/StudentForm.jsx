import { useEffect } from 'react';
import { Form, Input, DatePicker, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { createStudent, getStudent, updateStudent } from '../api/studentApi';

function StudentForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      getStudent(id)
        .then(res => {
          const student = res.data;
          form.setFieldsValue({
            ...student,
            dateOfBirth: dayjs(student.dateOfBirth),
          });
        })
        .catch(() => message.error('Failed to fetch student'));
    }
  }, [id, form, isEdit]);

  const onFinish = async (values) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
    };

    try {
      if (isEdit) {
        await updateStudent(id, payload);
        message.success('Student updated');
      } else {
        await createStudent(payload);
        message.success('Student created');
      }
      navigate('/');
    } catch {
      message.error('Operation failed');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{isEdit ? 'Edit Student' : 'Add Student'}</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="studentId" label="studentId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="studentName" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="studentAddress" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">{isEdit ? 'Update' : 'Create'}</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default StudentForm;
