"use client";

import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { Loader } from "@googlemaps/js-api-loader";

interface Props {
  lng: number;
  lat: number;
}

export const Map = ({ lng, lat }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      const { Map } = await loader.importLibrary("maps");
      const map = new Map(ref.current as HTMLDivElement, {
        center: { lng, lat },
        zoom: 15,
        mapId: "map",
      });
      const marker = new AdvancedMarkerElement({
        map: map,
        position: { lng, lat },
      });
    };

    initMap();
  }, [ref]);

  return <div ref={ref} className={styles.map}></div>;
};
