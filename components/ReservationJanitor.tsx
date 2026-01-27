"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export function ReservationJanitor() {
  useEffect(() => {
    supabase.rpc("release_expired_reservations");

    const t = setInterval(() => {
      supabase.rpc("release_expired_reservations");
    }, 60_000);

    return () => clearInterval(t);
  }, []);

  return null;
}
