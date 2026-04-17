"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Save, Upload, Bell, Shield, Palette, Globe, Building, User } from "lucide-react"
import { useTheme } from "next-themes"
import { usePreferences, type AppLanguage } from "@/components/preferences-provider"
import { changePassword, deleteMe } from "@/lib/api/user"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = usePreferences()
  const [compactMode, setCompactMode] = useState(false)
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })
  const [securityError, setSecurityError] = useState<string | null>(null)
  const [securitySuccess, setSecuritySuccess] = useState<string | null>(null)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const auth = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@company.com",
    phone: "+91 98765 43210",
    bio: "",
  })
  const [company, setCompany] = useState({
    companyName: "Acme Corporation",
    industry: "retail",
    website: "https://acme.in",
    timezone: "ist",
    address: "101 Business Park, Andheri East, Mumbai, Maharashtra 400069",
  })
  const [notifications, setNotifications] = useState({
    lowStock: true,
    newOrders: true,
    orderStatus: true,
    reports: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = window.localStorage.getItem("logistq_compact_mode")
    const isCompact = saved === "true"
    setCompactMode(isCompact)
    document.body.classList.toggle("compact", isCompact)

    try {
      const p = window.localStorage.getItem("logistq_settings_profile")
      const c = window.localStorage.getItem("logistq_settings_company")
      const n = window.localStorage.getItem("logistq_settings_notifications")
      if (p) setProfile((prev) => ({ ...prev, ...JSON.parse(p) }))
      if (c) setCompany((prev) => ({ ...prev, ...JSON.parse(c) }))
      if (n) setNotifications((prev) => ({ ...prev, ...JSON.parse(n) }))
      const twoFA = window.localStorage.getItem("logistq_2fa_enabled")
      if (twoFA === "true" || twoFA === "false") {
        setSecurity((s) => ({ ...s, twoFactorEnabled: twoFA === "true" }))
      }
    } catch {
      // ignore
    }
  }, [])

  const handleCompactModeChange = (checked: boolean) => {
    setCompactMode(checked)
    document.body.classList.toggle("compact", checked)
    window.localStorage.setItem("logistq_compact_mode", String(checked))
  }

  const handleSave = () => {
    setIsSaving(true)
    try {
      window.localStorage.setItem("logistq_settings_profile", JSON.stringify(profile))
      window.localStorage.setItem("logistq_settings_company", JSON.stringify(company))
      window.localStorage.setItem("logistq_settings_notifications", JSON.stringify(notifications))
    } catch {
      // ignore
    } finally {
      setTimeout(() => setIsSaving(false), 400)
    }
  }

  const handleUpdatePassword = async () => {
    setSecurityError(null)
    setSecuritySuccess(null)

    if (!security.currentPassword || !security.newPassword) {
      setSecurityError("Please enter current and new password.")
      return
    }
    if (security.newPassword !== security.confirmPassword) {
      setSecurityError("New password and confirm password do not match.")
      return
    }

    setIsUpdatingPassword(true)
    try {
      await changePassword(security.currentPassword, security.newPassword)
      setSecuritySuccess("Password updated successfully.")
      setSecurity((s) => ({
        ...s,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update password"
      setSecurityError(msg)
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  const handleToggle2FA = (checked: boolean) => {
    setSecurity((s) => ({ ...s, twoFactorEnabled: checked }))
    window.localStorage.setItem("logistq_2fa_enabled", String(checked))
  }

  const handleDeleteAccount = async () => {
    const ok = window.confirm("Are you sure you want to delete your account? This cannot be undone.")
    if (!ok) return

    setIsDeletingAccount(true)
    setSecurityError(null)
    setSecuritySuccess(null)
    try {
      await deleteMe()
      auth.logout()
      router.push("/login")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete account"
      setSecurityError(msg)
    } finally {
      setIsDeletingAccount(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Settings" description="Manage your account and application preferences" />
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-muted border-border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-background">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="data-[state=active]:bg-background">
              <Building className="h-4 w-4 mr-2" />
              Company
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-background">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-background">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-background">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Profile Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="border-border text-foreground">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us a little about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Company Details</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your organization&apos;s information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-foreground">Company Name</Label>
                    <Input
                      id="companyName"
                      value={company.companyName}
                      onChange={(e) => setCompany((c) => ({ ...c, companyName: e.target.value }))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-foreground">Industry</Label>
                    <Select value={company.industry} onValueChange={(v) => setCompany((c) => ({ ...c, industry: v }))}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="retail" className="text-foreground">Retail</SelectItem>
                        <SelectItem value="manufacturing" className="text-foreground">Manufacturing</SelectItem>
                        <SelectItem value="logistics" className="text-foreground">Logistics</SelectItem>
                        <SelectItem value="ecommerce" className="text-foreground">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-foreground">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={company.website}
                      onChange={(e) => setCompany((c) => ({ ...c, website: e.target.value }))}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-foreground">Timezone</Label>
                    <Select value={company.timezone} onValueChange={(v) => setCompany((c) => ({ ...c, timezone: v }))}>
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="ist" className="text-foreground">India Standard Time (IST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">Address</Label>
                  <Textarea
                    id="address"
                    value={company.address}
                    onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value }))}
                    className="bg-input border-border text-foreground resize-none"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Email Notifications</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose what updates you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: "lowStock", label: "Low Stock Alerts", description: "Get notified when products fall below minimum stock levels" },
                  { id: "newOrders", label: "New Orders", description: "Receive notifications for incoming orders" },
                  { id: "orderStatus", label: "Order Status Updates", description: "Get updates when order status changes" },
                  { id: "reports", label: "Weekly Reports", description: "Receive weekly summary reports" },
                  { id: "marketing", label: "Product Updates", description: "News about new features and improvements" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id} className="text-foreground font-medium">{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      id={item.id}
                      checked={(notifications as any)[item.id]}
                      onCheckedChange={(checked) =>
                        setNotifications((n) => ({ ...n, [item.id]: checked } as typeof n))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Display Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Customize how the application looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-foreground">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Light", value: "light" },
                      { label: "Dark", value: "dark" },
                      { label: "System", value: "system" },
                    ].map((themeOption) => (
                      <button
                        key={themeOption.value}
                        type="button"
                        onClick={() => setTheme(themeOption.value)}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          theme === themeOption.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className={`h-8 rounded mb-2 ${
                          themeOption.value === "light" ? "bg-white border border-border" :
                          themeOption.value === "dark" ? "bg-gray-900" : "bg-gradient-to-r from-white to-gray-900"
                        }`} />
                        <p className="text-sm text-foreground">{themeOption.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-foreground">Language</Label>
                  <Select value={language} onValueChange={(v) => setLanguage(v as AppLanguage)}>
                    <SelectTrigger className="w-[200px] bg-input border-border text-foreground">
                      <Globe className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="en" className="text-foreground">English</SelectItem>
                      <SelectItem value="hi" className="text-foreground">Hindi (हिन्दी)</SelectItem>
                      <SelectItem value="mr" className="text-foreground">Marathi (मराठी)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="space-y-0.5">
                    <Label className="text-foreground font-medium">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Use smaller spacing throughout the interface</p>
                  </div>
                  <Switch checked={compactMode} onCheckedChange={handleCompactModeChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Change Password</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your password regularly to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-foreground">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={security.currentPassword}
                    onChange={(e) => setSecurity((s) => ({ ...s, currentPassword: e.target.value }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-foreground">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={security.newPassword}
                    onChange={(e) => setSecurity((s) => ({ ...s, newPassword: e.target.value }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => setSecurity((s) => ({ ...s, confirmPassword: e.target.value }))}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleUpdatePassword}
                  disabled={isUpdatingPassword}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Update Password
                </Button>

                {securityError && (
                  <p className="text-sm text-destructive">{securityError}</p>
                )}
                {securitySuccess && (
                  <p className="text-sm text-primary">{securitySuccess}</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Two-Factor Authentication</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium">Enable 2FA</p>
                    <p className="text-sm text-muted-foreground">Use an authenticator app to generate codes</p>
                  </div>
                  <Switch checked={security.twoFactorEnabled} onCheckedChange={handleToggle2FA} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-foreground font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" disabled={isDeletingAccount} onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </span>
              )}
            </Button>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
