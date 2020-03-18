import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  {
    title: true,
    name: 'Questions'
  },
  {
    name: 'Sets',
    url: '/sets',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'List',
        url: '/sets',
        icon: 'icon-list'
      },
      {
        name: 'Create',
        url: '/sets/create',
        icon: 'icon-plus'
      }
    ]
  },
  {
    name: 'Sponsors',
    url: '/sponsors',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'List',
        url: '/sponsors',
        icon: 'icon-list'
      },
      {
        name: 'Create',
        url: '/sponsors/create',
        icon: 'icon-plus'
      }
    ]
  },
];
