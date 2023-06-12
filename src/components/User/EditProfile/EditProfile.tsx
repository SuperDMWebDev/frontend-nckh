import React, { useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select
} from 'antd';
const { Option } = Select;
import Styled from './style';

type SizeType = Parameters<typeof Form>[0]['size'];

export default function EditProfile() {
  const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  return (
    <Styled>
      <Form
        className="modalTeacher"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: 'large' }}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 700 }}>
        <Form.Item label="Họ tên">
          <Input />
        </Form.Item>
        <Form layout="inline" style={{ maxWidth: 700, marginLeft: '27px', marginBottom: '10px' }}>
          <Form.Item label="Ngày sinh">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Tuổi">
            <InputNumber />
          </Form.Item>
        </Form>
        <Form.Item label="Trường đại học">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input />
        </Form.Item>

        <Form.Item label="Email">
          <Input />
        </Form.Item>
        <Form.Item label="Giới tính">
          <Select>
            <Select.Option value="male">Nam</Select.Option>
            <Select.Option value="female">Nữ</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className="group">
        <input type="text" className="input" />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Tên</label>
      </div>
    </Styled>
  );
}
