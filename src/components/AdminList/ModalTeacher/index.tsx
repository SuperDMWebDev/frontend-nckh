import React, { useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
const { Option } = Select;
import './style.css'

type SizeType = Parameters<typeof Form>[0]['size'];

export default function ModalTeacher() {
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
        console.log(size);
    };

    return (
        <Form
            className='modalTeacher'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'large' }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 700 }}
        >
            <Form.Item label="Fullname">
                <Input />
            </Form.Item>
            <Form layout='inline' style={{ maxWidth: 700, marginLeft: "27px", marginBottom: "10px" }}>
                <Form.Item label="Date of birth">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Age">
                    <InputNumber />
                </Form.Item>
            </Form>
            <Form.Item label="University">
                <Input />
            </Form.Item>
            <Form.Item label="Address">
                <Input />
            </Form.Item>

            <Form.Item label="Email">
                <Input />
            </Form.Item>
            <Form.Item label="Gender">
                <Select>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
};