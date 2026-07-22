"use client";

import { useLanguage } from "@/components/language-provider";

// TODO: replace with the real business number (digits only, country code first).
const WHATSAPP_NUMBER = "10000000000";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.04 2a9.9 9.9 0 0 0-8.47 15.06L2 22l5.09-1.53A9.9 9.9 0 1 0 12.04 2Zm0 1.67a8.23 8.23 0 1 1-4.2 15.3l-.3-.18-3.02.9.93-2.94-.2-.31a8.23 8.23 0 0 1 6.79-12.77Zm-3.1 3.72c-.19 0-.49.07-.75.35-.25.28-.98.96-.98 2.33 0 1.38 1 2.71 1.15 2.9.14.18 1.97 3.15 4.86 4.29 2.4.95 2.89.76 3.41.71.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33-.28-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.61.07-.29-.14-1.2-.44-2.29-1.41-.85-.75-1.42-1.69-1.58-1.97-.17-.28-.02-.44.12-.58.13-.13.29-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.52-.87-2.09-.23-.55-.46-.47-.64-.48l-.57-.01Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#24ca62] px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#1fb356]"
    >
      <WhatsAppIcon className="size-5" />
      {t.whatsapp.label}
    </a>
  );
}
