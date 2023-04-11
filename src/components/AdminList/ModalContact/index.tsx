import React, { useState } from 'react';
import {
    Form,
    Input
} from 'antd';
import './style.css'

type SizeType = Parameters<typeof Form>[0]['size'];
const listLabel = [
    {
        label: 'ID',
        disabled: true,
        value: 'id',
    },
    {
        label: 'Tên',
        disabled: false,
        value: undefined
    },
    {
        label: 'Được tạo vào lúc',
        disabled: true,
        value: '1/1/1990'
    },
    {
        label: 'Cập nhật vào lúc',
        disabled: true,
        value: '1/1/1990'
    }
];
const listItems = listLabel.map((item, index) =>
    <Form.Item key={index} label={item.label}>
        <Input disabled={item.disabled} value={item.value} />
    </Form.Item>
);

export default function ModalContact() {
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
        console.log(size);
    };

    return (
        <Form
            className='modalContact'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'large' }}
            onValuesChange={onFormLayoutChange}
            size={componentSize as SizeType}
            style={{ maxWidth: 700 }}
        >
            {listItems}
        </Form>
    );
}