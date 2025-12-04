import { AppSidebar } from '@/components/app-sidebar'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import { ThemeProvider } from '../theme-provider'
import { NavProvider } from '@/app/contexts/nav-context'


export default function MainLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider style={{
        "--sidebar-width": "18rem",
        "--sidebar-width-mobile": "20rem",
      }}>
        <NavProvider>
          <div className="flex h-screen w-screen">
            {/* Sidebar */}
            <AppSidebar />
            {/* Sidebar */}

            {/* Main Content */}
            <main className="flex flex-col flex-1">
                <Outlet />
            </main>
            {/* Main Content */}

          </div>
        </NavProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
