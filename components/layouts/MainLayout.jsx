
import Sidebar from './Sidebar'
import RightSidebar from './RightSidebar'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto flex">
        <Sidebar />
        <main className="flex-1 border-x border-secondary-extraLight min-h-screen">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}
