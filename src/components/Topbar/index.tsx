"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User } from "lucide-react";
import useTopbar from "./useTopbar";
import "./Topbar.scss";
import { CSSProperties } from "react";
import Link from "next/link";

const Topbar = () => {
  const { user, isGuest, handleLogout } = useTopbar();

  return (
    <div className="Topbar">
      <div className="topbar-container">
        <Link className="topbar-brand" href="/">
          <div
            className="brand-logo"
            style={{
              "--logo": "url(/icons/werewolf.svg)",
            } as CSSProperties}
          />
          <h1 className="brand-title">Werewolf</h1>
        </Link>
        {!!user &&
          <div className="topbar-actions">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="user-menu-trigger">
                  <User className="user-icon" />
                  <span className="username">{user.username}</span>
                  {isGuest && <Badge variant="secondary">Guest</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="user-info">
                    <div className="user-name">{user.username}</div>
                    <div className="user-status">{isGuest ? "Guest Player" : "Registered User"}</div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="logout-item">
                  <LogOut className="logout-icon" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      </div>
    </div>
  );
};

export default Topbar;
