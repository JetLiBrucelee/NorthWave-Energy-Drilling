import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact, useGetSiteSettings } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const { data: settings } = useGetSiteSettings();
  const submitContact = useSubmitContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Your inquiry has been received by our operations team.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.error || "Failed to send message.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <Layout>
      <SEO 
        title="Contact Us | NorthWave Energy Drilling"
        description="Get in touch with NorthWave Energy Drilling for consultation on your next major offshore project."
      />
      
      <section className="bg-slate-900 py-16 border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Contact <span className="text-primary">Command</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Direct line to our operations and procurement teams. Secure your contract.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Map */}
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-heading font-bold uppercase tracking-tight mb-8 border-b-2 border-primary inline-block pb-2">Headquarters</h2>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-sm text-primary shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Location</h4>
                      <p className="font-medium whitespace-pre-line leading-relaxed">{settings?.address || "1400 Offshore Blvd, Suite 800\nHouston, TX 77002"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-sm text-primary shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Dispatch & Comm</h4>
                      <p className="font-medium">{settings?.phone1 || "+1 (555) 019-8472"}</p>
                      {settings?.phone2 && <p className="font-medium">{settings.phone2}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-muted flex items-center justify-center rounded-sm text-primary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Electronic Comm</h4>
                      <p className="font-medium">{settings?.contactEmail || "operations@northwave-energy.com"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="w-full h-64 bg-slate-200 border border-border rounded-sm relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>
                <div className="bg-background/80 backdrop-blur-sm p-4 border border-border flex items-center gap-2 z-10 font-bold uppercase tracking-widest text-sm shadow-md">
                  <MapPin className="text-primary" size={18} /> GPS Mapping Online
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-border p-8 md:p-12 rounded-sm shadow-lg relative">
               <div className="absolute top-0 right-0 w-16 h-1 bg-primary"></div>
               
               <h2 className="text-2xl font-heading font-bold uppercase tracking-tight mb-8">Contract Inquiry</h2>
               
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Full Name / Rank</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="rounded-sm bg-background border-input focus-visible:ring-primary" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Corporate Email</FormLabel>
                          <FormControl>
                            <Input placeholder="j.doe@company.com" className="rounded-sm bg-background border-input focus-visible:ring-primary" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Subject of Inquiry</FormLabel>
                        <FormControl>
                          <Input placeholder="Equipment Leasing / Platform Contract" className="rounded-sm bg-background border-input focus-visible:ring-primary" {...field} data-testid="input-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Operational Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide details about timeline, requirements, and location..." 
                            className="min-h-[150px] rounded-sm bg-background border-input focus-visible:ring-primary resize-y" 
                            {...field} 
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button 
                    type="submit" 
                    disabled={submitContact.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-sm font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    data-testid="button-submit-contact"
                  >
                    {submitContact.isPending ? "Transmitting..." : "Transmit Message"} <Send size={18} />
                  </button>
                </form>
              </Form>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
