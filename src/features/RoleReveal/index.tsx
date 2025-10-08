"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RoleResponse } from "@/api/openapi";
import "./RoleReveal.scss";
import { CSSProperties } from "react";

type Props = {
  role: RoleResponse;
  open: boolean;
  onClose: () => void;
}

const RoleReveal = ({ role, open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="RoleReveal">
        <DialogHeader>
          <DialogTitle className="role-title">Your Role</DialogTitle>
          <DialogDescription className="role-subtitle">
            You have been assigned a role for this game
          </DialogDescription>
        </DialogHeader>

        <div className="role-content">
          {role.image && (
            <div
              className="role-image"
              style={{
                "--bg": `url(${role.image})`,
              } as CSSProperties}
            />
          )}

          <div className="role-info">
            <h2 className="role-name">{role.name}</h2>
            <span className={`role-type ${role.role_type.toLowerCase()}`}>
              {role.role_type}
            </span>
            <p className="role-description">{role.description}</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="confirm-btn">
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleReveal;
