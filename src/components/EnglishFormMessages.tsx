"use client";

import { useEffect } from "react";

// On English (/en) pages, the browser's native form-validation bubbles
// ("Veuillez remplir ce champ.") appear in the visitor's browser language,
// which is often French. This component overrides those messages with
// English equivalents for every form field under /en, then clears the
// override as soon as the user edits the field so validation re-runs.
export function EnglishFormMessages() {
  useEffect(() => {
    const field = "setCustomValidity";

    const handleInvalid = (e: Event) => {
      const el = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!el || !(field in el) || !el.validity) return;
      const v = el.validity;
      let msg = "";
      if (v.valueMissing) {
        msg =
          el.tagName === "SELECT"
            ? "Please select an item in the list."
            : el instanceof HTMLInputElement && el.type === "checkbox"
            ? "Please check this box if you want to proceed."
            : "Please fill out this field.";
      } else if (v.typeMismatch) {
        msg =
          el instanceof HTMLInputElement && el.type === "email"
            ? "Please enter a valid email address."
            : "Please enter a valid value.";
      } else if (v.tooShort) {
        msg = "Please lengthen this text.";
      } else if (v.tooLong) {
        msg = "Please shorten this text.";
      } else if (v.rangeUnderflow || v.rangeOverflow || v.stepMismatch) {
        msg = "Please enter a valid value.";
      } else if (v.patternMismatch) {
        msg = "Please match the requested format.";
      } else if (!v.valid) {
        msg = "Please complete this field.";
      }
      if (msg) (el as HTMLInputElement).setCustomValidity(msg);
    };

    const clear = (e: Event) => {
      const el = e.target as HTMLInputElement;
      if (el && field in el && typeof el.setCustomValidity === "function") {
        el.setCustomValidity("");
      }
    };

    document.addEventListener("invalid", handleInvalid, true);
    document.addEventListener("input", clear, true);
    document.addEventListener("change", clear, true);
    return () => {
      document.removeEventListener("invalid", handleInvalid, true);
      document.removeEventListener("input", clear, true);
      document.removeEventListener("change", clear, true);
    };
  }, []);

  return null;
}
