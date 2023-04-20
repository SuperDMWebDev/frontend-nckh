import React, { useState } from 'react';
import {
    Form,
    Input
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './style.css';

type SizeType = Parameters<typeof Form>[0]['size'];
const listLabel = [
    {
        label: 'Email',
        disabled: false,
        value: 'email'
    },
    {
        label: 'Password',
        disabled: false,
        value: 'password'
    }
];
const listItems = listLabel.map((item, index) =>
    <Form.Item key={index} label={item.label}>
        {item.label === 'Password' ? (
            <Input.Password
                disabled={item.disabled}
                defaultValue={item.value}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
        ) : (
            <Input
                disabled={item.disabled}
                defaultValue={item.value}
            />
        )}
    </Form.Item>
);

export default function ModalAccount() {
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
    };

    return (
        <Form
            className='modalAccount'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'large' }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 550 }}
        >
            {listItems}
        </Form>
    );
}
