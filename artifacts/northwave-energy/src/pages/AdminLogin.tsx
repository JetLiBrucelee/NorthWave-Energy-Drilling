import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAdminLogin, useGetAdminSession } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { useEffect } from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const adminLogin = useAdminLogin();
  const { data: session } = useGetAdminSession({
    query: { retry: false, throwOnError: false, queryKey: ["adminSession"] }
  });

  useEffect(() => {
    if (session?.authenticated) {
      setLocation("/admin/dashboard");
    }
  }, [session, setLocation]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    adminLogin.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Auth Success", description: "Access granted." });
        setLocation("/admin/dashboard");
      },
      onError: () => {
        toast({ title: "Auth Failed", description: "Invalid credentials.", variant: "destructive" });
      }
    });
  }

  return (
    <Layout>
      <SEO title="Secure Access | NorthWave Energy" description="Authorized personnel only." url="/admin" robots="noindex, nofollow" />

      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-card border border-white/[0.07] rounded-xl p-8 shadow-2xl relative">

          <div className="absolute top-0 inset-x-0 h-0.5 bg-primary rounded-t-xl"></div>

          <div className="flex justify-center mb-7">
            <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
              <Lock size={26} className="text-primary" />
            </div>
          </div>

          <div className="text-center mb-7">
            <h1 className="text-xl font-bold text-white">Secure Access</h1>
            <p className="text-white/35 text-xs font-semibold tracking-widest uppercase mt-1.5">Authorized Personnel Only</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/50 text-xs font-semibold uppercase tracking-widest">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@northwave.com"
                        className="bg-[hsl(220,30%,13%)] border-white/[0.08] text-white placeholder:text-white/20 focus-visible:ring-primary/60 rounded-lg h-10 font-mono text-sm"
                        {...field}
                        data-testid="input-email"
                      />
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
                    <FormLabel className="text-white/50 text-xs font-semibold uppercase tracking-widest">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-[hsl(220,30%,13%)] border-white/[0.08] text-white placeholder:text-white/20 focus-visible:ring-primary/60 rounded-lg h-10 font-mono text-base"
                        {...field}
                        data-testid="input-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={adminLogin.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-white h-10 text-sm font-semibold rounded-lg transition-all disabled:opacity-50 mt-2"
                data-testid="button-login"
              >
                {adminLogin.isPending ? "Authenticating..." : "Sign In"}
              </button>
            </form>
          </Form>

          <div className="mt-6 pt-5 border-t border-white/[0.06] text-center">
            <p className="text-white/25 text-[10px] uppercase tracking-widest font-mono">
              Unauthorized access is strictly prohibited
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
