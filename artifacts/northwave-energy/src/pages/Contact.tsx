import { Layout } from "@/components/Layout";
import { SEO, organizationJsonLd } from "@/components/SEO";
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
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Message Sent", description: "Your inquiry has been received by our operations team." });
        form.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
      },
    });
  }

  return (
    <Layout>
      <SEO
        title="Contact Us | NorthWave Energy Drilling"
        description="Get in touch with NorthWave Energy Drilling for consultation on your next major offshore project."
        url="/contact"
        jsonLd={organizationJsonLd}
      />

      {/* Header */}
      <section className="bg-[hsl(221,40%,8%)] pt-28 pb-16 border-b border-white/[0.06]">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Command</h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            Direct line to our operations and procurement teams. Tell us about your next project.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Headquarters</h2>
                <div className="space-y-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-1">Location</p>
                      <p className="text-white/80 text-sm font-medium whitespace-pre-line leading-relaxed">
                        {settings?.address || "1400 Offshore Blvd, Suite 800\nHouston, TX 77002"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-1">Dispatch & Comm</p>
                      <p className="text-white/80 text-sm font-medium">{settings?.phone1 || "+1 (555) 019-8472"}</p>
                      {settings?.phone2 && <p className="text-white/80 text-sm font-medium">{settings.phone2}</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-1">Electronic Comm</p>
                      <p className="text-white/80 text-sm font-medium">
                        {settings?.contactEmail || "operations@northwave-energy.com"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed — OpenStreetMap dark-filtered to match navy design */}
              <div className="w-full h-56 rounded-lg overflow-hidden border border-white/[0.07]">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                  loading="lazy"
                  allowFullScreen
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-95.385%2C29.748%2C-95.355%2C29.762&layer=mapnik&marker=29.7558%2C-95.3674"
                  title="NorthWave Energy Drilling, Houston Office"
                />
              </div>

              {/* Regional offices */}
              <div>
                <h3 className="text-sm font-bold text-white/35 uppercase tracking-widest mb-3">Regional Offices</h3>
                <div className="space-y-2">
                  {["Houston, TX, USA: Operations HQ", "Aberdeen, Scotland: North Sea Division", "Anchorage, AK, USA: Arctic Operations"].map((office) => (
                    <div key={office} className="flex items-center gap-3 text-white/55 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></div>
                      {office}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border border-white/[0.07] rounded-xl p-7 md:p-9">
              <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                          <FormLabel className="text-white/55 text-xs font-semibold uppercase tracking-widest">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="bg-[hsl(220,30%,13%)] border-white/[0.08] text-white placeholder:text-white/25 focus-visible:ring-primary/60 rounded-lg h-10"
                              {...field}
                              data-testid="input-name"
                            />
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
                          <FormLabel className="text-white/55 text-xs font-semibold uppercase tracking-widest">Corporate Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="j.doe@company.com"
                              className="bg-[hsl(220,30%,13%)] border-white/[0.08] text-white placeholder:text-white/25 focus-visible:ring-primary/60 rounded-lg h-10"
                              {...field}
                              data-testid="input-email"
                            />
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
                        <FormLabel className="text-white/55 text-xs font-semibold uppercase tracking-widest">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Equipment Leasing / Platform Contract"
                            className="bg-[hsl(220,30%,13%)] border-white/[0.08] text-white placeholder:text-white/25 focus-visible:ring-primary/60 rounded-lg h-10"
                            {...field}
                            data-testid="input-subject"
                          />
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
                        <FormLabel className="text-white/55 text-xs font-semibold uppercase tracking-widest">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide details about timeline, requirements, and location..."
                            className="min-h-[130px] bg-[hsl(220,30%,13%)] border-white/[0.08] text-white placeholder:text-white/25 focus-visible:ring-primary/60 rounded-lg resize-y"
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
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    data-testid="button-submit-contact"
                  >
                    {submitContact.isPending ? "Sending..." : "Send Message"} <Send size={16} />
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
