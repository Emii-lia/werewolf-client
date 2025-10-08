"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ErrorMessages from "@/components/ErrorMessages";
import { Input } from "@/components/ui/input";
import useSignup from "@/features/Signup/useSignup";
import { Loader2Icon } from "lucide-react";
import "./Signup.scss"

const Signup = () => {
  const {
    handleInputChange,
    handleToLogin,
    handleSubmit,
    signupRequest,
    isLoading,
    errors
  } = useSignup()
  return (
    <div className="Signup">
      <Card className="signup-form">
        <CardHeader>
          <div className="signup-header">
            <div className="header-text">
              <CardTitle>
                Create your account
              </CardTitle>
              <CardDescription>
                Enter your username and password to create your account
              </CardDescription>
            </div>
            <Button
              variant="link"
              onClick={handleToLogin}
            >
              Login
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
                    value={signupRequest.username}
                    onInput={handleInputChange}
                    autoFocus
                    required
                  />
                </ErrorMessages>
              </div>
              <div className="input-field">
                <div className="password-label">
                  <Label htmlFor="password">Password</Label>
                </div>
                <ErrorMessages errors={errors.password}>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={signupRequest.password}
                    onInput={handleInputChange}
                    required
                  />
                </ErrorMessages>
              </div>
              <div className="input-field">
                <div className="password-label">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <ErrorMessages errors={errors.confirmPassword}>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Your password"
                    name="confirmPassword"
                    value={signupRequest.confirmPassword}
                    onInput={handleInputChange}
                    required
                  />
                </ErrorMessages>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            className="signup-btn"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            Signup
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup;