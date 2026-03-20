"use client";

import { useState, useActionState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addRumor,
  updateRumor,
  deleteRumor,
  updateRumorStatus,
  logoutAdmin,
} from "./actions";
import type { Rumor, RumorCategory, RumorStatus } from "@/lib/supabase/types";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  LogOutIcon,
  BarChart3Icon,
  NewspaperIcon,
  VoteIcon,
  ChevronDownIcon,
} from "lucide-react";

const CATEGORIES: { value: RumorCategory; label: string }[] = [
  { value: "transfer", label: "Transfer" },
  { value: "manager", label: "Manager" },
  { value: "injury", label: "Injury" },
  { value: "contract", label: "Contract" },
  { value: "other", label: "Other" },
];

const STATUSES: { value: RumorStatus; label: string; variant: "default" | "secondary" | "destructive" | "outline" }[] = [
  { value: "active", label: "Active", variant: "default" },
  { value: "confirmed", label: "Confirmed", variant: "secondary" },
  { value: "denied", label: "Denied", variant: "destructive" },
  { value: "expired", label: "Expired", variant: "outline" },
];

function StatusBadge({ status }: { status: RumorStatus }) {
  const config = STATUSES.find((s) => s.value === status) ?? STATUSES[0];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

function CategoryBadge({ category }: { category: RumorCategory }) {
  return <Badge variant="outline">{category}</Badge>;
}

// ---------- Add Rumor Form ----------
function AddRumorForm({ onSuccess }: { onSuccess: () => void }) {
  const [state, formAction, isPending] = useActionState(addRumor, {});

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="add-title">Title *</Label>
        <Input id="add-title" name="title" placeholder="Rumor title" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="add-description">Description</Label>
        <Textarea
          id="add-description"
          name="description"
          placeholder="Rumor description"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="add-player">Player Name</Label>
          <Input id="add-player" name="player_name" placeholder="e.g. Arda Guler" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="add-category">Category</Label>
          <select
            id="add-category"
            name="category"
            defaultValue="transfer"
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="add-source">Source URL</Label>
        <Input
          id="add-source"
          name="source_url"
          type="url"
          placeholder="https://..."
        />
      </div>
      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Rumor"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ---------- Edit Rumor Form ----------
function EditRumorForm({
  rumor,
  onSuccess,
}: {
  rumor: Rumor;
  onSuccess: () => void;
}) {
  const [state, formAction, isPending] = useActionState(updateRumor, {});

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="id" value={rumor.id} />
      <div className="grid gap-2">
        <Label htmlFor={`edit-title-${rumor.id}`}>Title *</Label>
        <Input
          id={`edit-title-${rumor.id}`}
          name="title"
          defaultValue={rumor.title}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`edit-desc-${rumor.id}`}>Description</Label>
        <Textarea
          id={`edit-desc-${rumor.id}`}
          name="description"
          defaultValue={rumor.description ?? ""}
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor={`edit-player-${rumor.id}`}>Player Name</Label>
          <Input
            id={`edit-player-${rumor.id}`}
            name="player_name"
            defaultValue={rumor.player_name ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor={`edit-category-${rumor.id}`}>Category</Label>
          <select
            id={`edit-category-${rumor.id}`}
            name="category"
            defaultValue={rumor.category}
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`edit-source-${rumor.id}`}>Source URL</Label>
        <Input
          id={`edit-source-${rumor.id}`}
          name="source_url"
          type="url"
          defaultValue={rumor.source_url ?? ""}
        />
      </div>
      {state.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <DialogFooter>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ---------- Delete Rumor Button ----------
function DeleteRumorButton({ rumor }: { rumor: Rumor }) {
  const [state, formAction, isPending] = useActionState(deleteRumor, {});

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" size="icon-sm">
            <TrashIcon />
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Rumor</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{rumor.title}&quot;? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <input type="hidden" name="id" value={rumor.id} />
            <AlertDialogAction
              type="submit"
              variant="destructive"
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ---------- Status Dropdown ----------
function StatusDropdown({ rumor }: { rumor: Rumor }) {
  const [state, formAction, isPending] = useActionState(updateRumorStatus, {});

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" disabled={isPending}>
            <StatusBadge status={rumor.status} />
            <ChevronDownIcon className="ml-1 size-3" />
          </Button>
        }
      />
      <DropdownMenuContent>
        {STATUSES.map((s) => (
          <DropdownMenuItem
            key={s.value}
            disabled={s.value === rumor.status}
            onSelect={() => {
              const fd = new FormData();
              fd.set("id", rumor.id);
              fd.set("status", s.value);
              formAction(fd);
            }}
          >
            {s.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
      {state.error && (
        <p className="mt-1 text-xs text-destructive">{state.error}</p>
      )}
    </DropdownMenu>
  );
}

// ---------- Main Dashboard ----------
export function AdminDashboard({ rumors }: { rumors: Rumor[] }) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingRumor, setEditingRumor] = useState<Rumor | null>(null);

  const totalRumors = rumors.length;
  const activeRumors = rumors.filter((r) => r.status === "active").length;
  const totalVotes = rumors.reduce(
    (sum, r) => sum + r.believe_count + r.cap_count,
    0
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage rumors, review stats, and moderate content.
          </p>
        </div>
        <form action={logoutAdmin}>
          <Button variant="outline" size="sm">
            <LogOutIcon className="mr-1 size-4" />
            Logout
          </Button>
        </form>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Rumors
            </CardTitle>
            <NewspaperIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRumors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Rumors
            </CardTitle>
            <BarChart3Icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeRumors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Votes
            </CardTitle>
            <VoteIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVotes.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      {/* Rumors Table */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Rumors</h2>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger
            render={
              <Button>
                <PlusIcon className="mr-1 size-4" />
                Add Rumor
              </Button>
            }
          />
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Rumor</DialogTitle>
              <DialogDescription>
                Create a new rumor for fans to vote on.
              </DialogDescription>
            </DialogHeader>
            <AddRumorForm onSuccess={() => setAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {rumors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No rumors yet. Add your first rumor to get started.
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell text-right">
                  Believe
                </TableHead>
                <TableHead className="hidden md:table-cell text-right">
                  Cap
                </TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rumors.map((rumor) => (
                <TableRow key={rumor.id}>
                  <TableCell className="max-w-[200px] truncate font-medium">
                    {rumor.title}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <CategoryBadge category={rumor.category} />
                  </TableCell>
                  <TableCell>
                    <StatusDropdown rumor={rumor} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right tabular-nums">
                    {rumor.believe_count.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right tabular-nums">
                    {rumor.cap_count.toLocaleString()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {new Date(rumor.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Edit button */}
                      <Dialog
                        open={editingRumor?.id === rumor.id}
                        onOpenChange={(open) =>
                          setEditingRumor(open ? rumor : null)
                        }
                      >
                        <DialogTrigger
                          render={
                            <Button variant="outline" size="icon-sm">
                              <PencilIcon />
                            </Button>
                          }
                        />
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit Rumor</DialogTitle>
                            <DialogDescription>
                              Update the rumor details below.
                            </DialogDescription>
                          </DialogHeader>
                          {editingRumor && (
                            <EditRumorForm
                              rumor={editingRumor}
                              onSuccess={() => setEditingRumor(null)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      {/* Delete button */}
                      <DeleteRumorButton rumor={rumor} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
