"use client";

import { useEffect, useRef } from "react";

import { Loader } from "@googlemaps/js-api-loader";

import styles from "./styles.module.scss";

interface Props {
  lng: number;
  lat: number;
}

let googleMapsLoaded = false;

export const Map = ({ lng, lat }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const initMap = async () => {
      if (!googleMapsLoaded) {
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
          rotateControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        });
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lng, lat },
        });
        googleMapsLoaded = true;
      }
    };

    initMap();
  }, [lng, lat]);

  return <div ref={ref} className={styles.map}></div>;
};
