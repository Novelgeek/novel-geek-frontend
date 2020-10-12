import { RouteInfo } from './sidebar.metadata';

export const ADMIN_ROUTES: RouteInfo[] = [
    { path: '/admin/home', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/admin/posts', title: 'Posts', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/admin/admins', title: 'Admins', icon: 'icon-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    { path: '/admin/profile', title: 'Profile', icon: 'icon-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
];
