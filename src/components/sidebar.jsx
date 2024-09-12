import React from 'react';

const Sidebar = () => {
    return (
        <aside className="left-panel nicescroll-box">
            <nav className="navigation">
                <ul className="list-unstyled main-menu">
                    <li className="has-submenu active">
                        <a href="index.html">
                            <i className="fas fa-th-large"></i>
                            <span className="nav-label">Dashboard</span>
                        </a>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fa fa-table"></i>
                            <span className="nav-label">Layouts</span>
                            <span className="badge bg-danger rounded-pill ms-2">New</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="index-dark.html">Dark Dashboard</a></li>
                            <li><a href="index-rtl.html">RTL Dashboard</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fas fa-user-md"></i>
                            <span className="nav-label">Doctors</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="add-doctor.html">Add Doctor</a></li>
                            <li><a href="doctor-list.html">All Doctors</a></li>
                            <li><a href="doctor-profile.html">Doctors Profile</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fas fa-users"></i>
                            <span className="nav-label">Patients</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="new-patient.html">New Patient</a></li>
                            <li><a href="all-patients.html">All Patients</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="new-appointment.html">
                            <i className="fas fa-calendar-plus"></i>
                            <span className="nav-label">Appointment</span>
                        </a>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fas fa-book-medical"></i>
                            <span className="nav-label">Prescriptions</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="new-prescription.html">New Prescription</a></li>
                            <li><a href="all-prescriptions.html">All Prescriptions</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="add-drug.html">
                            <i className="fas fa-pills"></i>
                            <span className="nav-label">Add Drug</span>
                        </a>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fas fa-heartbeat"></i>
                            <span className="nav-label">Tests</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="add-test.html">Add Test</a></li>
                            <li><a href="all-tests.html">All Tests</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="calendar.html">
                            <i className="fas fa-calendar-alt"></i>
                            <span className="nav-label">Calendar</span>
                        </a>
                    </li>
                    <li className="has-submenu">
                        <a href="reports.html">
                            <i className="fas fa-chart-pie"></i>
                            <span className="nav-label">Reports</span>
                        </a>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fas fa-file-invoice"></i>
                            <span className="nav-label">Billing</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="create-invoice.html">Create Invoice</a></li>
                            <li><a href="billing-list.html">Billing List</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fas fa-cog"></i>
                            <span className="nav-label">Settings</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="doctor-settings.html">Doctor Settings</a></li>
                            <li><a href="prescription-settings.html">Prescription Settings</a></li>
                        </ul>
                    </li>
                    <li className="has-submenu">
                        <a href="javascript:void(0)" className="has-arrow mm-collapsed">
                            <i className="fa fa-tag"></i>
                            <span className="nav-label">Authentication</span>
                        </a>
                        <ul className="list-unstyled mm-collapse">
                            <li><a href="empty-page.html">Empty Page</a></li>
                            <li><a href="page-login.html">Login Simple</a></li>
                            <li><a href="page-login-one.html">Login with Bg Image</a></li>
                            <li><a href="page-register.html">Register Simple</a></li>
                            <li><a href="page-register-one.html">Register with Bg Image</a></li>
                            <li><a href="page-lock-screen.html">Lock Screen</a></li>
                            <li><a href="page-forgot-password.html">Forgot Password</a></li>
                            <li><a href="page-error-404.html">Error 404</a></li>
                            <li><a href="page-error-500.html">Error 500</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="sidebar-widgets">
                <div className="top-sidebar box-shadow mx-25 m-b-30 p-b-20 text-center">
                    <a href="new-appointment.html">
                        <img src="https://via.placeholder.com/215/f8f8f8/2b2b2b" className="side-img" alt="img" />
                    </a>
                    <a href="#">
                        <h4 className="text-primary mb-0">Make an Appointment</h4>
                    </a>
                </div>
                <div className="copyright text-center">
                    <p className="mb-0">Tabib Dashboard</p>
                    <p className="mb-0">© 2022</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
