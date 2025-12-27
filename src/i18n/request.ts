import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  // Try to get locale from cookie first, then from Accept-Language header
  const cookieStore = await cookies();
  const headerStore = await headers();

  let locale = cookieStore.get("locale")?.value;

  if (!locale) {
    const acceptLanguage = headerStore.get("accept-language") || "";
    locale = acceptLanguage.includes("fr") ? "fr" : "en";
  }

  // Validate locale
  if (!["en", "fr"].includes(locale)) {
    locale = "fr"; // Default to French
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
