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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    adminLogin.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Auth Success", description: "Access granted." });
        setLocation("/admin/dashboard");
      },
      onError: () => {
        toast({
          title: "Auth Failed",
          description: "Invalid credentials.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Layout>
      <SEO title="Secure Access | NorthWave Energy" description="Authorized personnel only." url="/admin" />
      
      <div className="min-h-[calc(100vh-88px)] bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-slate-800 p-8 shadow-2xl relative rounded-sm">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-slate-900 border border-slate-800 flex items-center justify-center rounded-sm">
              <Lock size={32} className="text-primary" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold uppercase tracking-widest text-foreground">Secure Access</h1>
            <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mt-2">Level 4 Clearance Required</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-[10px] font-bold text-muted-foreground">Identifier</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@northwave.com" 
                        className="rounded-sm bg-background border-slate-800 focus-visible:ring-primary font-mono text-sm h-12" 
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
                    <FormLabel className="uppercase tracking-widest text-[10px] font-bold text-muted-foreground">Passcode</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="••••••••" 
                        className="rounded-sm bg-background border-slate-800 focus-visible:ring-primary font-mono text-lg h-12" 
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-sm font-bold uppercase tracking-widest rounded-sm transition-all disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                data-testid="button-login"
              >
                {adminLogin.isPending ? "Authenticating..." : "Initialize Override"}
              </button>
            </form>
          </Form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
