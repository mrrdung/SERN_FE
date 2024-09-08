export const adminMenu = [

    { //Quản lý người d
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud', link: '/system/user-crud'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/user-clinic'
            },

        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/user-specialty'
            },

        ]
    },
    { //Quản lý cẩm nang
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/user-handbook'
            },

        ]
    },
];