import * as React from "react"
import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn(
      "flex h-screen w-64 flex-col border-r bg-card",
      className
    )}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center border-b px-4", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-4", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t p-4", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("flex flex-col gap-1 px-2", className)}
    {...props}
  />
))
SidebarNav.displayName = "SidebarNav"

const SidebarNavItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
      active
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:text-foreground hover:bg-accent",
      className
    )}
    {...props}
  />
))
SidebarNavItem.displayName = "SidebarNavItem"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
}
