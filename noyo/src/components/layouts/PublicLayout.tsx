import { Link, Outlet, useNavigate } from "react-router";
import Footer from "@/components/Footer";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizeable-navbar";
import { useState } from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { Badge } from "../ui/badge";
import { useAuth, useCart } from "@/hooks";
import {
    List,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/utils";
import { useWishlist } from "@/hooks/wishlist";

const NavUser = ({ handleMobileMenuUpdate }: { handleMobileMenuUpdate: (val: boolean) => void }) => {
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const handleAuthAction = () => {
        handleMobileMenuUpdate(false)
        if (currentUser) {
            logout()
            navigate('/')
        } else {
            navigate('/auth')
        }
    }

    const userData = {
        name: currentUser?.name || 'N/A',
        email: currentUser?.email || 'N/A',
        nameInitials: currentUser?.name ? getInitials(currentUser?.name) : 'N/A',
    }
    return (
        <>
            {
                currentUser ?
                    (

                        <DropdownMenu>
                            < DropdownMenuTrigger asChild >
                                <div className="flex cursor-pointer">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        {/* <AvatarImage src={userData?.avatar} alt={userData.name} /> */}
                                        <AvatarFallback className="rounded-lg bg-primary">{userData?.nameInitials}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </DropdownMenuTrigger >
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            {/* <AvatarImage src={userData?.avatar} alt={userData.name} /> */}
                                            <AvatarFallback className="rounded-lg bg-primary">{userData?.nameInitials}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">{userData.name}</span>
                                            <span className="truncate text-xs">{userData.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => { navigate('/orders') }}>
                                    <List />
                                    My Orders
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleAuthAction}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu >
                    )

                    :
                    <NavbarButton variant="primary" onClick={handleAuthAction}>Login</NavbarButton>

            }
        </>

    )
}



export default function PublicLayout() {
    const { cartItems } = useCart()
    const { wishlist } = useWishlist()
    const navItems = [
        {
            name: "Products",
            link: "/products",
        },
        {
            name: "About Us",
            link: "/about",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavUser handleMobileMenuUpdate={(val) => setIsMobileMenuOpen(val)} />
                        {/* <NavbarButton variant="primary" onClick={handleAuthAction}>{authState}</NavbarButton> */}
                        <Link
                            to="/cart"
                            className="hover:text-primary relative">
                            <FiShoppingCart className="text-lg" />
                            {
                                cartItems?.length > 0 &&
                                <Badge className="z-99 absolute -top-3 -right-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                                    {cartItems?.length}
                                </Badge>
                            }
                        </Link>
                        <Link
                            to="/wishlist"
                            className="hover:text-primary relative"
                        >
                            <FiHeart className="text-lg" />
                            {
                                wishlist?.length > 0 &&
                                <Badge className="z-99 absolute -top-3 -right-3 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                                    {wishlist?.length}
                                </Badge>
                            }
                        </Link>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavUser handleMobileMenuUpdate={(val) => setIsMobileMenuOpen(val)} />
                            {/* <NavbarButton
                                onClick={handleAuthAction}
                                variant="primary"
                                className="w-full"
                            >
                                {authState}
                            </NavbarButton> */}
                            <div className="flex gap-4 justify-center">

                                <Link to="/cart"
                                    className="hover:text-primary relative">
                                    <FiShoppingCart />
                                </Link>
                                <Link
                                    to="/wishlist"
                                    className="hover:text-primary relative"
                                >
                                    <FiHeart />
                                </Link>
                            </div>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
            <div className="container mx-auto p-8 pt-10 w-full max-w-7xl h-auto md:min-h-[calc(100vh-250px)]">
                <Outlet />
            </div>
            {/* Fix footer later on after finalizing layout */}
            <Footer />

            {/* Navbar */}
        </div>
    )
}
