import React from 'react';
import { Layout, Menu } from 'antd';
import Styled from './style';
import { ItemType } from 'antd/es/menu/hooks/useItems';
const { Sider } = Layout;
type SidebarProps = {
  collapsed: boolean;
  setCollapsed: Function;
  items: ItemType[];
  currentKey: string;
  setCurrentKey: Function;
};
export default function Sidebar(props: SidebarProps) {
  const { collapsed, setCollapsed, items, currentKey, setCurrentKey } = props;

  return (
    <Styled>
      <Sider
        width="225"
        className="sidebar"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div className="sidebar__logo" style={{ height: 32, margin: 16 }}>
          <span className="logo">
            <img src="/assets/images/logo.png" alt="logo" />
          </span>
          <span className="sidebar__title">Dashboard</span>
        </div>
        <Menu
          className="sidebar__menu"
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          selectedKeys={[currentKey]}
          onClick={(e) => {
            setCurrentKey(e.key);
          }}
        />
      </Sider>
    </Styled>
  );
}
