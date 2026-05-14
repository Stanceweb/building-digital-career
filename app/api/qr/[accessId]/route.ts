// === FILE: app/api/qr/[accessId]/route.ts ===
// Returns a PNG QR code image for a given access ID.
// Used as a real hosted URL in emails so clients can load it as a normal image.

import QRCode from "qrcode";

export async function GET(
  _req: Request,
  { params }: { params: { accessId: string } }
) {
  const { accessId } = params;
  const verifyUrl = `https://bdc.stanceweb.us/verify/${encodeURIComponent(accessId)}`;

  const buffer = await QRCode.toBuffer(verifyUrl, {
    width: 220,
    margin: 1,
    color: { dark: "#0F172A", light: "#FFFFFF" },
  });

  return new Response(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
