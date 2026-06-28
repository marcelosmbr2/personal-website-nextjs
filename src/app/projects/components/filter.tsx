"use client";

import { IconFilter } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type StatusValue = "completed" | "in-progress";

interface FilterFormProps extends React.ComponentProps<"form"> {
	status: StatusValue;
	setStatus: (value: StatusValue) => void;
	handleClear: () => void;
	handleSubmit: (e: React.FormEvent) => void;
}

export function ProjectsFilter() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const isMobile = useIsMobile();

	const [open, setOpen] = React.useState<boolean>(false);
	const [search, setSearch] = React.useState<string>(
		searchParams.get("search") || "",
	);
	const [status, setStatus] = React.useState<StatusValue>(
		(searchParams.get("status") as StatusValue) || "completed",
	);
	const [page, setPage] = React.useState<string>(
		searchParams.get("page") || "1",
	);

	const updateURL = React.useCallback(
		(params: Record<string, string>) => {
			const newParams = new URLSearchParams(searchParams);

			Object.entries(params).forEach(([key, value]) => {
				if (value && value !== "1" && key !== "page") {
					newParams.set(key, value);
				} else if (key === "page" && value !== "1") {
					newParams.set(key, value);
				} else if (key !== "status") {
					newParams.delete(key);
				}
			});

			replace(`${pathname}?${newParams.toString()}`);
		},
		[searchParams, pathname, replace],
	);

	const handleSearchDebounced = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", "1");

		if (term) {
			params.set("search", term);
		} else {
			params.delete("search");
		}

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearch(value);
		handleSearchDebounced(value);
	};

	const handleClear = () => {
		setStatus("completed");
		setPage("1");
		setSearch("");
		replace(pathname);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateURL({
			search,
			status,
			page: "1",
		});
		setPage("1");
		setOpen(false);
	};

	const getStatusLabel = (): string => {
		const labels: Record<string, string> = {
			completed: "Concluído",
			"in-progress": "Em progresso",
		};
		return labels[status] || status;
	};

	return (
		<div className="mb-8 w-full">
			<Input
				type="text"
				placeholder="Procurar"
				className="w-full mb-4"
				value={search}
				onChange={handleSearchChange}
				defaultValue={searchParams.get("search")?.toString()}
			/>
			<div className="flex items-center gap-2">
				{isMobile ? (
					<Drawer open={open} onOpenChange={setOpen}>
						<DrawerTrigger asChild>
							<Button variant="ghost">
								<IconFilter />
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader className="text-left">
								<DrawerTitle>Filtros Avançados</DrawerTitle>
								<DrawerDescription>
									Selecione os filtros para carregar os posts
								</DrawerDescription>
							</DrawerHeader>
							<FilterForm
								className="px-4"
								status={status}
								setStatus={setStatus}
								handleClear={handleClear}
								handleSubmit={handleSubmit}
							/>
							<DrawerFooter className="pt-2">
								<DrawerClose asChild>
									<Button variant="outline">Cancelar</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				) : (
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant="ghost">
								<IconFilter />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="space-y-4">
								<div className="space-y-2">
									<h4 className="font-medium leading-none">
										Filtros Avançados
									</h4>
									<p className="text-sm text-muted-foreground">
										Selecione os filtros para carregar os posts
									</p>
								</div>
								<FilterForm
									status={status}
									setStatus={setStatus}
									handleClear={handleClear}
									handleSubmit={handleSubmit}
								/>
							</div>
						</PopoverContent>
					</Popover>
				)}

				<div className="flex flex-wrap gap-2">
					<span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-neutral-800 dark:text-neutral-300">
						Status: {getStatusLabel()}
					</span>
				</div>
			</div>
		</div>
	);
}

function FilterForm({
	className,
	status,
	setStatus,
	handleClear,
	handleSubmit,
}: FilterFormProps) {
	return (
		<form
			className={cn("grid items-start gap-4", className)}
			onSubmit={handleSubmit}
		>
			<div className="grid gap-2">
				<Label>Status</Label>
				<ToggleGroup
					type="single"
					variant="outline"
					value={status}
					onValueChange={(val) => {
						if (val) setStatus(val as StatusValue);
					}}
				>
					<ToggleGroupItem value="completed">Concluídos</ToggleGroupItem>
					<ToggleGroupItem value="in-progress">Em progresso</ToggleGroupItem>
				</ToggleGroup>
			</div>


			<div className="flex gap-2">
				<Button type="submit" className="flex-1">
					Aplicar Filtros
				</Button>
				<Button
					type="button"
					variant="outline"
					onClick={handleClear}
					className="flex-1"
				>
					Limpar
				</Button>
			</div>
		</form >
	);
}
