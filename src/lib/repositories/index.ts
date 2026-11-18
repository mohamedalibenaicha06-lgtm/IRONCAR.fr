import { localVehicleRepository } from "./local";
import type { VehicleRepository } from "./types";

/**
 * Point d'entrée unique des données véhicules.
 * Plus tard : `if (process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase") return supabaseVehicleRepository;`
 */
export const vehicles: VehicleRepository = localVehicleRepository;
export type { VehicleRepository };
