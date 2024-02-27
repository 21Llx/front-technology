import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';

import RouteDom7 from "./routerDom7"
import RouteDom8 from "./routerDom8"
import RouteDom9 from "./routerDom9"
import {Outlet,useNavigate} from "react-router-dom"
import "./route.css"
const { Header, Sider, Content } = Layout;
function RouterHome(props){
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let navigate = useNavigate()
  function chooseMenu(menu){
    navigate(`/routehome/${menu.key}`)
  }
  return(
    <div>
     <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={chooseMenu}
          items={[
            {
              key: 'route7',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: 'route8',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: 'route9',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
          

        </Content>
      </Layout>
    </Layout>
    </div>
  )
}

export default RouterHome