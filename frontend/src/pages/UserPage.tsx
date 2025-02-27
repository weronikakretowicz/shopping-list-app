import { useGetUserDetails } from "@/api/user/useGetUserDetails.ts";
import { useUpdateUserPassword } from "@/api/user/useUpdateUserPassword.tsx";
import { useUpdateUsernameAndEmail } from "@/api/user/useUpdateUsernameAndEmail.tsx";
import Layout from "@/components/Layout.tsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ROUTES } from "@/pages/routes.ts";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { data, isLoading, isError } = useGetUserDetails();
  const { updateUsernameAndEmailMutation } = useUpdateUsernameAndEmail();
  const { updateUserPasswordMutation } = useUpdateUserPassword();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (data) {
      setUsername(data.name);
      setEmail(data.email);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Layout breadcrumbs={[{ label: "My Profile", path: ROUTES.USER_PAGE }]}>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout breadcrumbs={[{ label: "My Profile", path: ROUTES.USER_PAGE }]}>
        <div>Error loading user data.</div>
      </Layout>
    );
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSaveChanges = () => {
    updateUsernameAndEmailMutation.mutate({ username, email });
  };

  const handleSavePassword = async () => {
    setPasswordError("");
    debugger;
    updateUserPasswordMutation.mutate({ oldPassword, newPassword });
  };

  return (
    <Layout breadcrumbs={[{ label: "My Profile", path: ROUTES.USER_PAGE }]}>
      <div className="flex w-full h-full justify-center items-top mt-24">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    id="username"
                    // defaultValue={data?.email ?? "Email"}
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="btn-secondary" onClick={handleSaveChanges}>
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" value={oldPassword} onChange={handleOldPasswordChange} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" value={newPassword} onChange={handleNewPasswordChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="btn-secondary" onClick={handleSavePassword}>
                  Save password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
