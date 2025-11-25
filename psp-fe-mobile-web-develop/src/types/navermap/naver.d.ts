declare namespace naver {
  namespace maps {
    class Map {
      constructor(elementId: string, options?: MapOptions);
      setOptions(options: MapOptions): void;
      setCenter(point: LatLng): void;
      setZoom(zoom: number): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
    }

    class Marker {
      constructor(options?: MarkerOptions);
      setPosition(point: Point | LatLng): void;
      setMap(map: Map | null): void;
    }

    class Point {
      constructor(x: number, y: number);
    }

    class Event {
      static addListener(
        element: any,
        eventName: string,
        handler: (event?: any) => void
      ): void;
    }

    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      scaleControl?: boolean;
      logoControl?: boolean;
      mapDataControl?: boolean;
      zoomControl?: boolean;
      zoomControlOptions?: ZoomControlOptions;
    }

    interface ZoomControlOptions {
      position?: Position;
      style?: ZoomControlStyle;
    }

    enum Position {
      BOTTOM_RIGHT
    }

    enum ZoomControlStyle {
      LARGE
    }

    namespace Service {
      function geocode(
        options: { query: string },
        callback: (status: any, response: any) => void
      ): void;

      enum Status {
        ERROR
      }
    }
  }
}
