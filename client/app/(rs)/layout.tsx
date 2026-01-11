import React from 'react'
import Header from '../components/header'
function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {/* header */}
            <Header />
            {children}
        </div>
    )
}

export default layout