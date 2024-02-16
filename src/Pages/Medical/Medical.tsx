import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { ChangeEvent } from 'react';

const Medical = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const handleOk = () => {
    onFinish({ username: name, lastname: lastName, email });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  type FieldType = {
    username?: string;
    lastname?: string;
    email?: string;
  };
  return (
    <div>
      <Button onClick={openModal} type="primary">
        Primary Button
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={handleChangeName} placeholder="Name" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: 'Please input your lastname!' }]}
          >
            <Input onChange={handleChangeLastName} placeholder="Lastname" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input onChange={handleChangeEmail} placeholder="Email" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Medical;
