"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "./Login.scss"
import useLogin from "@/features/Login/useLogin";
import ErrorMessages from "@/components/ErrorMessages";

const Login = () => {
  const {
    errors,
    loginRequest,
    handleInputChange,
    handleSubmit,
    handleToSignup,
    showGuestDialog,
    guestUsername,
    handlePlayAsGuest,
    handleGuestUsernameChange,
    handleGuestSubmit,
    handleCloseGuestDialog,
  } = useLogin()
  return (
    <div className="Login">
      <Dialog open={showGuestDialog} onOpenChange={handleCloseGuestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Play as Guest</DialogTitle>
            <DialogDescription>
              Enter a username to play as a guest. You won't be able to track your stats or save your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="guest-input">
            <Label htmlFor="guestUsername">Username</Label>
            <Input
              id="guestUsername"
              type="text"
              placeholder="Enter your username"
              value={guestUsername}
              onInput={handleGuestUsernameChange}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseGuestDialog}>
              Cancel
            </Button>
            <Button onClick={handleGuestSubmit}>
              Continue as Guest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="login-form">
        <CardHeader>
          <div className="login-header">
            <div className="header-text">
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your username below to login to your account
              </CardDescription>
            </div>
            <Button
              variant="link"
              onClick={handleToSignup}
            >
              Sign Up
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="input-group">
              <div className="input-field">
                <Label htmlFor="username">Username</Label>
                <ErrorMessages errors={errors.username}>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your username"
                    name="username"
                    value={loginRequest.username}
                    onInput={handleInputChange}
                    autoFocus
                    required
                  />
                </ErrorMessages>
              </div>
              <div className="input-field">
                <div className="password-label">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <ErrorMessages errors={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={loginRequest.password}
                    onInput={handleInputChange}
                    required
                  />
                </ErrorMessages>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="footer-actions">
            <Button
              type="button"
              className="login-btn"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <div className="separator">
              <span>or</span>
            </div>
            <Button
              type="button"
              variant="outline"
              className="guest-btn"
              onClick={handlePlayAsGuest}
            >
              Play as Guest
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login