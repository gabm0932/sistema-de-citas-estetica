import React from 'react';
import { Toast } from 'primereact/toast';

const NotificationToast = ({ toastRef }) => {
  return <Toast ref={toastRef} />;
};

export default NotificationToast; 