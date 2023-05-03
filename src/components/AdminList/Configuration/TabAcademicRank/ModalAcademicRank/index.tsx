import React, { useState } from 'react';
import { Form, Input } from 'antd';
import './style.css';

type SizeType = Parameters<typeof Form>[0]['size'];

interface ModalProps {
    formType: 'create' | 'update';
}

const ModalAcademicRank: React.FC<ModalProps> = ({ formType }) => {
    const [componentSize, setComponentSize] = useState<SizeType | 'large'>('large');

    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
        setComponentSize(size);
        console.log(size);
    };

    const listLabel = [
        {
            label: 'ID',
            disabled: true,
            value: formType === 'update' ? 'id' : undefined,
        },
        {
            label: 'ID Giảng viên',
            disabled: true,
            value: formType === 'update' ? 'id' : undefined,
        },
        {
            label: 'Tên',
            disabled: false,
            value: formType === 'update' ? 'name' : undefined,
        },
        {
            label: 'Được tạo vào lúc',
            disabled: true,
            value: formType === 'update' ? '1/1/1990' : undefined,
        },
        {
            label: 'Cập nhật vào lúc',
            disabled: true,
            value: formType === 'update' ? '1/1/1990' : undefined,
        }
    ];
    const listItems = listLabel.map((item, index) =>
        <Form.Item key={index} label={item.label}>
            <Input disabled={item.disabled} defaultValue={item.value} />
        </Form.Item>
    );

    return (
        <Form
            className='modalAcademicRank'
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
};

export default ModalAcademicRank;
