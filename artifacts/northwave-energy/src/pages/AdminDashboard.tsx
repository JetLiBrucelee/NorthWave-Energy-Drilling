import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  useGetAdminSession, 
  useAdminLogout, 
  useGetSiteSettings, 
  useUpdateSiteSettings,
  useListWorkers,
  useCreateWorker,
  useUpdateWorker,
  useDeleteWorker,
  useRequestUploadUrl,
  getListWorkersQueryKey,
  getGetSiteSettingsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LogOut, Save, Plus, Trash2, Edit, Upload } from "lucide-react";
import { formatPhone } from "@/lib/formatPhone";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

// Schemas
const settingsSchema = z.object({
  contactEmail: z.string().email(),
  address: z.string().min(1),
  phone1: z.string().min(1),
  phone2: z.string().nullable().optional(),
  ceoName: z.string().min(1),
});

const workerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  role: z.string().nullable().optional(),
  sortOrder: z.coerce.number().int(),
});

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: session, isLoading: sessionLoading } = useGetAdminSession({ query: { retry: false, throwOnError: false, queryKey: ["adminSession"] } });
  const logout = useAdminLogout();
  
  // Data hooks
  const { data: settings } = useGetSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  const { data: workers } = useListWorkers();
  const createWorker = useCreateWorker();
  const updateWorker = useUpdateWorker();
  const deleteWorker = useDeleteWorker();
  const requestUploadUrl = useRequestUploadUrl();

  // Dialog states
  const [workerDialog, setWorkerDialog] = useState<{isOpen: boolean, mode: 'create'|'edit', id?: number}>({ isOpen: false, mode: 'create' });
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{isOpen: boolean, id?: number, name?: string}>({ isOpen: false });

  // Guard
  useEffect(() => {
    if (!sessionLoading && !session?.authenticated) {
      setLocation("/admin");
    }
  }, [session, sessionLoading, setLocation]);

  // Forms
  const settingsForm = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
  });

  const workerForm = useForm<z.infer<typeof workerSchema>>({
    resolver: zodResolver(workerSchema),
    defaultValues: { name: "", phone: "", role: "", sortOrder: 0 }
  });

  // Init settings form
  useEffect(() => {
    if (settings) {
      settingsForm.reset({
        contactEmail: settings.contactEmail,
        address: settings.address,
        phone1: settings.phone1,
        phone2: settings.phone2,
        ceoName: settings.ceoName,
      });
    }
  }, [settings, settingsForm]);

  // Handlers
  const onSettingsSubmit = (values: z.infer<typeof settingsSchema>) => {
    updateSettings.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Settings Updated" });
        queryClient.invalidateQueries({ queryKey: getGetSiteSettingsQueryKey() });
      }
    });
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => setLocation("/")
    });
  };

  const openCreateWorker = () => {
    workerForm.reset({ name: "", phone: "", role: "", sortOrder: workers ? workers.length * 10 : 0 });
    setWorkerDialog({ isOpen: true, mode: 'create' });
  };

  const openEditWorker = (worker: any) => {
    workerForm.reset({
      name: worker.name,
      phone: worker.phone,
      role: worker.role,
      sortOrder: worker.sortOrder
    });
    setWorkerDialog({ isOpen: true, mode: 'edit', id: worker.id });
  };

  const onWorkerSubmit = (values: z.infer<typeof workerSchema>) => {
    if (workerDialog.mode === 'create') {
      createWorker.mutate({ data: values }, {
        onSuccess: () => {
          toast({ title: "Worker Added" });
          queryClient.invalidateQueries({ queryKey: getListWorkersQueryKey() });
          setWorkerDialog({ isOpen: false, mode: 'create' });
        }
      });
    } else if (workerDialog.mode === 'edit' && workerDialog.id) {
      updateWorker.mutate({ id: workerDialog.id, data: values }, {
        onSuccess: () => {
          toast({ title: "Worker Updated" });
          queryClient.invalidateQueries({ queryKey: getListWorkersQueryKey() });
          setWorkerDialog({ isOpen: false, mode: 'create' });
        }
      });
    }
  };

  const confirmDeleteWorker = () => {
    if (deleteConfirmDialog.id) {
      deleteWorker.mutate({ id: deleteConfirmDialog.id }, {
        onSuccess: () => {
          toast({ title: "Worker Deleted" });
          queryClient.invalidateQueries({ queryKey: getListWorkersQueryKey() });
          setDeleteConfirmDialog({ isOpen: false });
        }
      });
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1. Get upload URL
      const { uploadURL, objectPath } = await requestUploadUrl.mutateAsync({
        data: { name: file.name, size: file.size, contentType: file.type }
      });

      // 2. PUT file directly to GCS
      await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // 3. Update settings with object path
      await updateSettings.mutateAsync({
        data: {
          ...settingsForm.getValues(), // preserve existing
          ceoPhotoUrl: objectPath
        }
      });

      queryClient.invalidateQueries({ queryKey: getGetSiteSettingsQueryKey() });
      toast({ title: "Photo Updated Successfully" });
      
    } catch (err) {
      toast({ title: "Upload Failed", variant: "destructive" });
    }
  };

  if (sessionLoading || !session?.authenticated) return null;

  return (
    <Layout>
      <SEO title="Command Center | NorthWave Energy" description="Admin dashboard for managing site content." url="/admin/dashboard" robots="noindex, nofollow" />
      
      <div className="bg-slate-950 border-b border-slate-800 py-8">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading font-black text-white uppercase tracking-tight">Command Center</h1>
            <p className="text-sm text-primary font-bold tracking-widest uppercase">System Override Active</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          >
            Terminate Session <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="bg-slate-900 border border-slate-800 rounded-sm h-auto p-1 mb-8">
            <TabsTrigger value="settings" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-6 uppercase font-bold tracking-widest text-xs">Site Config</TabsTrigger>
            <TabsTrigger value="workers" className="rounded-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-6 uppercase font-bold tracking-widest text-xs">Crew Roster</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-8">
            <div className="bg-card border border-border p-8 rounded-sm shadow-sm">
              <h2 className="text-xl font-heading font-bold uppercase tracking-wider mb-6">Global Variables</h2>
              <Form {...settingsForm}>
                <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)} className="space-y-6 max-w-2xl">
                  
                  <div className="grid grid-cols-2 gap-6">
                    <FormField control={settingsForm.control} name="contactEmail" render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Primary Comms Email</FormLabel>
                        <FormControl><Input className="rounded-sm" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={settingsForm.control} name="phone1" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Dispatch Line 1</FormLabel>
                        <FormControl><Input className="rounded-sm" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={settingsForm.control} name="phone2" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Dispatch Line 2 (Opt)</FormLabel>
                        <FormControl><Input className="rounded-sm" {...field} value={field.value || ""} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={settingsForm.control} name="address" render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">HQ Location</FormLabel>
                        <FormControl><Input className="rounded-sm" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="pt-6 border-t border-border mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Leadership Identity</h3>
                    <FormField control={settingsForm.control} name="ceoName" render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">CEO Designation</FormLabel>
                        <FormControl><Input className="rounded-sm" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="flex items-center gap-6 p-4 bg-muted border border-border rounded-sm">
                      {settings?.ceoPhotoUrl ? (
                        <img src={`/api/storage${settings.ceoPhotoUrl}`} alt="CEO" className="w-16 h-16 rounded-full object-cover border-2 border-slate-800" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">No Img</div>
                      )}
                      <div>
                        <label className="bg-background border border-border hover:bg-muted text-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm cursor-pointer transition-colors inline-flex items-center gap-2">
                          <Upload size={14} /> Upload Portrait
                          <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} disabled={requestUploadUrl.isPending} />
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">Max 5MB (JPG, PNG)</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={updateSettings.isPending}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-sm transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 inline-flex items-center gap-2"
                  >
                    <Save size={16} /> {updateSettings.isPending ? "Committing..." : "Commit Changes"}
                  </button>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="workers">
             <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex justify-between items-center bg-muted/50">
                  <h2 className="text-xl font-heading font-bold uppercase tracking-wider">Crew Manifest</h2>
                  <button 
                    onClick={openCreateWorker}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-2"
                  >
                    <Plus size={14} /> Assign Personnel
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
                      <tr>
                        <th className="px-6 py-4">Sort Idx</th>
                        <th className="px-6 py-4">Designation</th>
                        <th className="px-6 py-4">Role / Station</th>
                        <th className="px-6 py-4">Comms Link</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {workers?.sort((a,b) => a.sortOrder - b.sortOrder).map(worker => (
                        <tr key={worker.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-muted-foreground">{worker.sortOrder}</td>
                          <td className="px-6 py-4 font-bold uppercase">{worker.name}</td>
                          <td className="px-6 py-4 text-primary font-semibold">{worker.role || "N/A"}</td>
                          <td className="px-6 py-4 font-mono tracking-wide">{formatPhone(worker.phone)}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button onClick={() => openEditWorker(worker)} className="p-2 text-slate-500 hover:text-primary transition-colors bg-background border border-border rounded-sm">
                              <Edit size={14} />
                            </button>
                            <button onClick={() => setDeleteConfirmDialog({ isOpen: true, id: worker.id, name: worker.name })} className="p-2 text-slate-500 hover:text-destructive transition-colors bg-background border border-border rounded-sm">
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {workers?.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground uppercase tracking-widest font-bold">
                            Manifest Empty
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Worker Dialog */}
      <Dialog open={workerDialog.isOpen} onOpenChange={(o) => !o && setWorkerDialog({ isOpen: false, mode: 'create' })}>
        <DialogContent className="sm:max-w-md bg-card border-slate-800 rounded-sm shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading uppercase tracking-widest text-xl">
              {workerDialog.mode === 'create' ? 'Assign Personnel' : 'Modify File'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...workerForm}>
            <form onSubmit={workerForm.handleSubmit(onWorkerSubmit)} className="space-y-4 py-4">
              <FormField control={workerForm.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Full Designation</FormLabel>
                  <FormControl><Input className="rounded-sm" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField control={workerForm.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Station / Role</FormLabel>
                    <FormControl><Input className="rounded-sm" {...field} value={field.value || ""} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={workerForm.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Comms Link</FormLabel>
                    <FormControl><Input className="rounded-sm" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={workerForm.control} name="sortOrder" render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Hierarchy Index</FormLabel>
                  <FormControl><Input type="number" className="rounded-sm" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <DialogFooter className="pt-4">
                <button type="submit" disabled={createWorker.isPending || updateWorker.isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-xs font-bold uppercase tracking-widest rounded-sm w-full">
                  {createWorker.isPending || updateWorker.isPending ? "Processing..." : "Confirm Record"}
                </button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={deleteConfirmDialog.isOpen} onOpenChange={(o) => !o && setDeleteConfirmDialog({ isOpen: false })}>
        <DialogContent className="sm:max-w-md bg-card border-destructive rounded-sm shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading uppercase tracking-widest text-destructive text-xl">Expunge Record</DialogTitle>
            <DialogDescription className="text-slate-400 mt-2">
              Are you sure you want to permanently remove <strong className="text-foreground">{deleteConfirmDialog.name}</strong> from the active manifest? This action cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-6">
            <button onClick={() => setDeleteConfirmDialog({ isOpen: false })} className="px-6 py-2 border border-border rounded-sm hover:bg-muted text-xs uppercase font-bold tracking-widest">
              Abort
            </button>
            <button onClick={confirmDeleteWorker} disabled={deleteWorker.isPending} className="px-6 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-sm text-xs uppercase font-bold tracking-widest">
              {deleteWorker.isPending ? "Expunging..." : "Execute"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </Layout>
  );
}
