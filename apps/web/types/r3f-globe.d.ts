declare module "r3f-globe" {
  import { FC } from "react";
  import * as THREE from "three";

  export interface R3fGlobeProps {
    globeTileEngineUrl?: (x: number, y: number, l: number) => string;
    globeImageUrl?: string;
    showGlobe?: boolean;
    showAtmosphere?: boolean;
    atmosphereColor?: string;
    onClick?: (layer: string, elementData: unknown, event: { point?: THREE.Vector3 }) => void;
    [key: string]: unknown;
  }

  const R3fGlobe: FC<
    R3fGlobeProps & {
      ref?: React.RefObject<{ setPointOfView?: (camera: THREE.Camera) => void } | null>;
    }
  >;
  export default R3fGlobe;
}
