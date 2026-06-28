"use client";

import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export const MobileSidebar = () => {
	const isMobile = useIsMobile();
	const [activeSection, setActiveSection] = useState("home");
	const [open, setOpen] = useState(false);

	if (!isMobile) return null;

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="outline"
					size="icon"
					className="hs-collapse-toggle flex justify-center items-center size-9.5 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
					id="hs-navbar-header-floating-collapse"
					aria-expanded="false"
					aria-controls="hs-navbar-header-floating"
					aria-label="Toggle navigation"
					data-hs-collapse="#hs-navbar-header-floating"
				>
					<IconMenu2 />
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[280px]">
				<SheetHeader>
					<SheetTitle>SMBR</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col gap-4 mt-8">
					<Link
						onClick={() => setActiveSection("home")}
						className={`py-2 px-4 border-s-2 transition-colors ${
							activeSection === "home"
								? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
								: "border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
						} focus:outline-hidden`}
						href="#home"
					>
						Home
					</Link>
					<Link
						onClick={() => setActiveSection("skills")}
						className={`py-2 px-4 border-s-2 transition-colors ${
							activeSection === "skills"
								? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
								: "border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
						} focus:outline-hidden`}
						href="#skills"
					>
						Skills
					</Link>
					<Link
						onClick={() => setActiveSection("projects")}
						className={`py-2 px-4 border-s-2 transition-colors ${
							activeSection === "projects"
								? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
								: "border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
						} focus:outline-hidden`}
						href="#projects"
					>
						Projetos
					</Link>
					<Link
						onClick={() => setActiveSection("experiencia")}
						className={`py-2 px-4 border-s-2 transition-colors ${
							activeSection === "experiencia"
								? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
								: "border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
						} focus:outline-hidden`}
						href="#experiencia"
					>
						Experiência
					</Link>
					<Link
						onClick={() => setActiveSection("cursos")}
						className={`py-2 px-4 border-s-2 transition-colors ${
							activeSection === "cursos"
								? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
								: "border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
						} focus:outline-hidden`}
						href="#cursos"
					>
						Cursos
					</Link>
					<Link
						onClick={() => setActiveSection("blog")}
						className={`py-2 px-4 border-s-2 transition-colors ${
							activeSection === "blog"
								? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
								: "border-transparent text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
						} focus:outline-hidden`}
						href="#blog"
					>
						Blog
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	);
};
