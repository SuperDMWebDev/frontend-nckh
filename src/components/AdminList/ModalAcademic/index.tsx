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

export default function ModalAcademic() {
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
        console.log(size);
    };

    return (
        <Form
            className='modalAcademic'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'large' }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 700 }}
        >
            <Form.Item label="ID">
                <Input disabled={true} value={'id'} />
            </Form.Item>
            <Form.Item label="ID Teacher">
                <Input />
            </Form.Item>
            <Form.Item label="Name of academic rank">
                <Input />
            </Form.Item>
            <Form.Item label="Name of academic title">
                <Input />
            </Form.Item>
            <Form.Item label="Create rank at">
                <Input disabled={true} value={'1/1/1990'} />
            </Form.Item>
            <Form.Item label="Update rank at">
                <Input disabled={true} value={'1/1/1990'} />
            </Form.Item>
            <Form.Item label="Create title at">
                <Input disabled={true} value={'1/1/1990'} />
            </Form.Item>
            <Form.Item label="Update title at">
                <Input disabled={true} value={'1/1/1990'} />
            </Form.Item>
        </Form>
    );
};