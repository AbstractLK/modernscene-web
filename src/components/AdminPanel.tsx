import { AdminProvider, useAdmin } from '../contexts/AdminContext';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';

function AdminPanelContent() {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}

export function AdminPanel() {
  return (
    <AdminProvider>
      <AdminPanelContent />
    </AdminProvider>
  );
}