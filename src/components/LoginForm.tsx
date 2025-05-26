
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, User, Lock, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const demoCredentials = [
    {
      role: "Staff Member",
      email: "staff@salonrewards.com",
      password: "demo123",
      redirect: "/staff-dashboard",
      color: "from-blue-500 to-purple-500"
    },
    {
      role: "Admin",
      email: "admin@salonrewards.com", 
      password: "admin123",
      redirect: "/admin-settings",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
      toast({
        title: "Copied!",
        description: `${field} copied to clipboard`,
      });
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };

  const fillCredentials = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
  };

  const onSubmit = (data: LoginFormData) => {
    const credential = demoCredentials.find(
      cred => cred.email === data.email && cred.password === data.password
    );

    if (credential) {
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${credential.role}`,
      });
      navigate(credential.redirect);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please use the demo credentials provided.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Demo Credentials Cards */}
        <div className="space-y-3">
          <h2 className="text-center text-sm font-medium text-gray-600 mb-4">Demo Credentials</h2>
          {demoCredentials.map((cred, index) => (
            <Card key={index} className={`bg-gradient-to-r ${cred.color} border-0 text-white cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                  onClick={() => fillCredentials(cred.email, cred.password)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{cred.role}</p>
                    <p className="text-xs text-white/80">Click to auto-fill</p>
                  </div>
                  <LogIn className="w-5 h-5 text-white/80" />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">Email:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-white/20 px-2 py-1 rounded">{cred.email}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(cred.email, `${cred.role} Email`);
                        }}
                      >
                        {copiedField === `${cred.role} Email` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">Password:</span>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-white/20 px-2 py-1 rounded">{cred.password}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(cred.password, `${cred.role} Password`);
                        }}
                      >
                        {copiedField === `${cred.role} Password` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Login Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Demo Application - Use credentials above to explore
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
