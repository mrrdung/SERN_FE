export const adminMenu = [
    {
        //Quản lý người d
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.crud",
                link: "/system/user-manage",
            },
            // {
            //     name: "menu.admin.crud",
            //     link: "/system/user-crud",
            // },
            {
                name: "menu.admin.crud-redux",
                link: "/system/user-redux",
            },
            {
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
            {
                name: "menu.doctor.manage-doctor",
                link: "/system/manage-doctor",
            },
        ],
    },
    {
        //Quản lý phòng khám
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/user-clinic",
            },
        ],
    },
    {
        //Quản lý chuyên khoa
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
    {
        //Quản lý cẩm nang
        name: "menu.admin.handbook",
        menus: [
            {
                name: "menu.admin.manage-handbook",
                link: "/system/user-handbook",
            },
        ],
    },
];
export const doctorMenu = [
    {
        //Quản lý ke hoạch khám bênh bác sỹ
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
            {
                name: "menu.doctor.manage-patient",
                link: "/doctor/manage-patient",
            },
        ],
    },
];
