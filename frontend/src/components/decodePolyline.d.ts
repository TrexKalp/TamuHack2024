declare module './decodePolyline.js' {
  const decodePolyline: (encoded: string) => { lat: number, lng: number }[];
  export default decodePolyline;
}