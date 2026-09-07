import { ActiveFilterChip } from "@/components/ui/choicelog-chips";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getDateTime(date: string | null) {
  return date ? new Date(date).getTime() : 0;
}



export function createChip(
  condition: boolean,
  label: string,
  clear: () => void
): ActiveFilterChip | null {
  return condition
    ? {
      label,
      clear,
    }
    : null;
}

export function toSystemName(friendlyName: string): string {
  return friendlyName
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 30);
}


export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 0)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string): string {
  const colors = [
    'from-blue-200 to-blue-300',
    'from-indigo-200 to-indigo-300',
    'from-violet-200 to-violet-300',
    'from-emerald-200 to-emerald-300',
    'from-amber-200 to-amber-300',
    'from-rose-200 to-rose-300',
    'from-cyan-200 to-cyan-300',
    'from-fuchsia-200 to-fuchsia-300',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

export function formatDatetime(dateStr: string): string {
  const date = new Date(dateStr);

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** "4990" -> "49,90" (BRL, digits-only masking) */
export function formatBRLFromDigits(digits: string) {
  const clean = digits.replace(/\D/g, "").slice(0, 11);
  if (!clean) return "";
  const cents = clean.padStart(3, "0");
  const int = cents.slice(0, -2).replace(/^0+(?=\d)/, "");
  const dec = cents.slice(-2);
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")},${dec}`;
}

export function brlDigitsToNumber(digits: string) {
  const clean = digits.replace(/\D/g, "");
  return clean ? Number(clean) / 100 : 0;
}

export function formatItemTypeLabel(type?: string | null): string {
  const normalized = (type ?? "").trim().toUpperCase();

  switch (normalized) {
    case "PRODUCT":
      return "Produto";
    case "SERVICE":
      return "Serviço";
    default:
      return normalized;
  }
}