import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import moment from 'moment';
import StyledExportExcelModal from './style';
const { Option } = Select;
interface ExportExcelModalProps {
  visible: boolean;
  onClose: () => void;
  onExport: (selectedYear: string) => void;
  onExportBrief?: (selectedYear: string) => void;
}

const ExportExcelModal: React.FC<ExportExcelModalProps> = ({
  visible,
  onClose,
  onExport,
  onExportBrief
}) => {
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

  const handleExportBrief = () => {
    onExportBrief(selectedYear);
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
          <Button
            key="brief-export"
            type="primary"
            disabled={!selectedYear}
            onClick={handleExportBrief}>
            Xuất tóm tắt
          </Button>,
          <Button key="export" type="primary" disabled={!selectedYear} onClick={handleExport}>
            Xuất đầy đủ
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
