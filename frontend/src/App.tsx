import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  return (
    <div>
      <header style={{ padding: 12, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
        {!isHome && (
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/') } />
        )}
      </header>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
