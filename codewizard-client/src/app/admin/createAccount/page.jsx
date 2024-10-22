"use client";
import { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
const { Option } = Select;

const AccountCreationForm = () => {
  const [loading, setLoading] = useState(false);
  const [registrationNumberExists, setRegistrationNumberExists] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const [form] = useForm();

  const [formValues, setFormValues] = useState({
    userRegNo: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const onFinish = async (values) => {
    setLoading(true);

    // Check if registration number has been confirmed as available
    if (registrationNumberExists) {
      notification.error({
        message: 'Registration Number Not Checked',
        description: 'Please check the registration number before submitting the form.',
      });
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'Passwords do not match. Please re-enter your password and confirmation.',
      });
      setLoading(false);
      return;
    }

    // Proceed with form submission
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        notification.success({
          message: 'Account Created',
          description: 'Account has been created successfully.',
          duration: 10,
        });

        // Reset form values after successful account creation
        form.resetFields();

        setLoading(false);
      } else {
        notification.error({
          message: 'Account Creation Failed',
          description: 'There was an error creating your account. Please try again later.',
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      notification.error({
        message: 'API Error',
        description: 'There was an error connecting to the server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const validateRegistrationNumber = async (_, value) => {
    // Check if registration number follows the specified pattern
    const pattern = /^[A-Za-z]{2}\d{1,8}$/;
    if (!pattern.test(value)) {
      return Promise.reject('Invalid registration number');
    }

    // Check if registration number is already taken
    try {
      const response = await fetch(`http://localhost:5000/api/v1/users/checkregistration/${value}`);
      if (response.status === 200) {
        setRegistrationNumberExists(true);
        return Promise.reject('Registration number already in use');
      } else {
        setRegistrationNumberExists(false);
      }
    } catch (error) {
      console.error('API Error:', error);
      return Promise.reject('Error checking registration number');
    }

    return Promise.resolve();
  };

  // Validate that passwords match
  const validatePasswordMatch = async (_, value) => {
    if (value !== form.getFieldValue('password')) {
      setPasswordMatchError(true);
      return Promise.reject('Passwords do not match');
    } else {
      setPasswordMatchError(false);
      return Promise.resolve();
    }
  };

  // Update form values when input fields change
  const handleInputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Form
      name="account-creation"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ height: 580 }}
      form={form}
    >
      <h1 style={{fontSize:"30px",marginBottom:"30px"}}>Account creation for : {formValues.role}</h1>
      <Form.Item
        name="userRegNo"
        label="Registration Number"
        rules={[
          {
            required: true,
            message: 'Please enter your registration number!',
          },
          {
            validator: validateRegistrationNumber,
          },
        ]}
      >
        <Input
          value={formValues.userRegNo}
          onChange={(e) => handleInputChange('userRegNo', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please enter your first name!',
          },
        ]}
      >
        <Input
          value={formValues.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please enter your last name!',
          },
        ]}
      >
        <Input
          value={formValues.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please enter your email address!',
            type: 'email',
          },
        ]}
      >
        <Input
          value={formValues.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please enter your password!',
          },
          {
            min: 5,
            message: 'Password must be at least 5 characters long',
          },
        ]}
      >
        <Input.Password
          value={formValues.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            validator: validatePasswordMatch,
          },
        ]}
      >
        <Input.Password
          value={formValues.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Please select your role!',
          },
        ]}
      >
        <Select
          placeholder="Select a role"
          value={formValues.role}
          onChange={(value) => handleInputChange('role', value)}
        >
          <Option value="student">Student</Option>
          <Option value="instructor">Instructor</Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button style={{ marginTop: 50}} className='bg-custom-site-color' type="primary" htmlType="submit" loading={loading}>
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountCreationForm
