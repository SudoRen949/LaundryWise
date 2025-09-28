import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "./route/HomePage"
import AboutPage from './route/AboutPage'
import FaqPage from './route/FaqPage'
import ForgotPage from './route/ForgotPage'
import TOSPage from './route/TOSPage'

import DashboardPage from './route/auth/DashboardPage'
import LoginPage from "./route/auth/LoginPage"
import RegisterPage from './route/auth/RegisterPage'
import VerifyPage from './route/auth/VerifyPage'
import ResetPasswordPage from './route/auth/ResetPasswordPage'
import LogoutPage from './route/auth/LogoutPage'
import LoginAdminPage from './route/auth/LoginAdminPage'
import RegisterAdminPage from './route/auth/RegisterAdminPage'

import NoPage from './route/NoPage'

import AuthRoute from "./route/security/AuthRoute"
import RecoverVerifyRoute from "./route/security/RecoverVerifyRoute"

// Customer Pages
import CustomerPage from "./route/dashboard/customer/CustomerPage"
import CustomerHomePage from "./route/dashboard/customer/CustomerHomePage"
import CustomerProfilePage from "./route/dashboard/customer/CustomerProfilePage"
import CustomerNotifPage from "./route/dashboard/customer/CustomerNotifPage"
import CustomerSupportPage from "./route/dashboard/customer/CustomerSupportPage"
import CustomerServicePage from "./route/dashboard/customer/CustomerServicePage"
import CustomerManagerPage from "./route/dashboard/customer/CustomerManagerPage"
import CustomerHistoryPage from "./route/dashboard/customer/CustomerHistoryPage"

// Owner page
import OwnerPage from "./route/dashboard/owner/OwnerPage"
import OwnerHomePage from "./route/dashboard/owner/OwnerHomePage"
import OwnerProfilePage from "./route/dashboard/owner/OwnerProfilePage"
import OwnerNotifPage from "./route/dashboard/owner/OwnerNotifPage"
import OwnerSupportPage from "./route/dashboard/owner/OwnerSupportPage"
import OwnerManagerPage from "./route/dashboard/owner/OwnerManagerPage"
import OwnerReportPage from "./route/dashboard/owner/OwnerReportPage"
import OwnerServicePage from "./route/dashboard/owner/OwnerServicePage"

// Admin page
import AdminPage from "./route/dashboard/admin/AdminPage"
import AdminHomePage from "./route/dashboard/admin/AdminHomePage"
import AdminMyPage from "./route/dashboard/admin/AdminMyPage"
import AdminShopsPage from "./route/dashboard/admin/AdminShopsPage"
import AdminCustomersPage from "./route/dashboard/admin/AdminCustomersPage"
import AdminLoginsPage from "./route/dashboard/admin/AdminLoginsPage"
import AdminSettingsPage from "./route/dashboard/admin/AdminSettingsPage"

// Global page
import FeedbackRatePage from "./route/dashboard/FeedbackRatePage"

function App()
{
	return (
		<BrowserRouter>
			<Routes>
        
				{/* Public Routes */}
        
				<Route path="/" element={<HomePage/>}>
					<Route path="home"/>
				</Route>
        
				<Route path="/login" element={<LoginPage/>} />
				<Route path="/aboutus" element={<AboutPage/>} />
				<Route path="/register" element={<RegisterPage/>} />
				<Route path="/faqs" element={<FaqPage/>} />
				<Route path="/recover" element={<ForgotPage/>}/>
				<Route path="/tos" element={<TOSPage/>}/>

				<Route path="/login/admin" element={<LoginAdminPage/>}/>
				<Route path="/register/admin" element={<RegisterAdminPage/>}/>

				{/* Protected Routes */}

				<Route path="/verify" element={
					<RecoverVerifyRoute>
						<VerifyPage/>
					</RecoverVerifyRoute>
				} />

				<Route path="/reset" element={
					<RecoverVerifyRoute>
						<ResetPasswordPage/>
					</RecoverVerifyRoute>
				} />

				<Route path="/logout" element={
					<AuthRoute>
						<LogoutPage/>
					</AuthRoute>
				} />

				<Route path="/dashboard" element={
					<AuthRoute>
						<DashboardPage/>
					</AuthRoute>
				}>

					<Route path="customer" element={<CustomerPage/>} >
						<Route path="home" element={<CustomerHomePage/>} />
						<Route path="profile" element={<CustomerProfilePage/>} />
						<Route path="notifs" element={<CustomerNotifPage/>} />
						<Route path="support" element={<CustomerSupportPage/>} />
						<Route path="service" element={<CustomerServicePage/>} />
						<Route path="manage" element={<CustomerManagerPage/>} />
						<Route path="history" element={<CustomerHistoryPage/>} />
						<Route path="rate" element={<FeedbackRatePage/>} />
					</Route>

					<Route path="owner" element={<OwnerPage />}>
						<Route path="home" element={<OwnerHomePage/>} />
						<Route path="profile" element={<OwnerProfilePage/>} />
						<Route path="notifs" element={<OwnerNotifPage/>} />
						<Route path="support" element={<OwnerSupportPage/>} />
						<Route path="manage" element={<OwnerManagerPage/>} />
						<Route path="reports" element={<OwnerReportPage />} />
						<Route path="services" element={<OwnerServicePage />} />
					</Route>

					<Route path="admin" element={<AdminPage />}>
						<Route path="home" element={<AdminHomePage />} />
						<Route path="my" element={<AdminMyPage />} />
						<Route path="shops" element={<AdminShopsPage />} />
						<Route path="customers" element={<AdminCustomersPage />} />
						<Route path="logins" element={<AdminLoginsPage />} />
						<Route path="settings" element={<AdminSettingsPage />} />
					</Route>

				</Route>

				{/* 404 Route */}

				<Route path="*" element={<NoPage/>} />

			</Routes>
		</BrowserRouter>
	);
}

export default App;