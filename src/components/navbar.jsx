import React from 'react'

const Navbar = () => {
    return (
        <div className="nav-header">
            <div className="brand-logo">
                <img
                    className="logo-tabib"
                    src="/assets/images/7 chọ siu.avif"
                    alt=""
                />
                <img
                    className="brand-title"
                    style={{ width: "100px", height: "60px" }}
                    src="/assets/images/logo.png"
                    alt=""
                />
            </div>
        </div>
    )
}

export default Navbar