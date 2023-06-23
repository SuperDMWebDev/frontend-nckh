import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import moment from 'moment';
import StyledExportExcelModal from './style';
const { Option } = Select;
interface ExportExcelModalProps {
  visible: boolean;
  onClose: () => void;
  onExport: (selectedYear: string) => void;
}

const ExportExcelModal: React.FC<ExportExcelModalProps> = ({ visible, onClose, onExport }) => {
  const [selectedYear, setSelectedYear] = useState('1990');

  const handleYearChange = (value: any) => {
    setSelectedYear(value);
  };

  const years = [];
  const currentYear = moment().year();
  for (let year = 1990; year <= currentYear; year++) {
    years.push(year);
  }

  const handleExport = () => {
    // Call API with the selected year
    onExport(selectedYear);
  };

  return (
    <StyledExportExcelModal>
      <Modal
        title="Xuất Excel"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Thoát
          </Button>,
          <Button key="export" type="primary" disabled={!selectedYear} onClick={handleExport}>
            Bắt đầu xuất file
          </Button>
        ]}>
        <div className="year-select" style={{ minWidth: '100px' }}>
          <p>Chọn năm bắt đầu:</p>
          <Select
            value={selectedYear}
            style={{ minWidth: '100px' }}
            defaultValue={selectedYear}
            onChange={handleYearChange}>
            {years.map((year) => (
              <Option key={year} value={year.toString()}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </StyledExportExcelModal>
  );
};

export default ExportExcelModal;
