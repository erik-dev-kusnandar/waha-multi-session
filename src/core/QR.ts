import { NotFoundException } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRCode = require('qrcode');

export class QR {
  public raw?: string;

  save(raw?: string) {
    this.raw = raw;
  }

  async get(): Promise<Buffer> {
    if (!this.raw) {
      throw new NotFoundException(
        'QR code is not available. The session might be already authenticated.',
      );
    }
    const url = await QRCode.toDataURL(this.raw);
    const base64 = url.replace(/^data:image\/png;base64,/, '');
    return Buffer.from(base64, 'base64');
  }
}
