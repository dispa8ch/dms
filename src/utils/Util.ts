export default class Util {
  static isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }
    if (typeof value === "string" && value.trim() === "") {
      return true;
    }
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    if (typeof value === "object" && Object.keys(value).length === 0) {
      return true;
    }
    return false;
  }

  static cleanText(text: string): string {
    if (this.isEmpty(text)) {
      return "";
    }
    return text
      .replace(/[\n\r]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  static getInitials(name: string): string {
    if (!name) return "";

    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidUrl(url: string): boolean {
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
    return urlRegex.test(url);
  }

  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phone);
  }

  static isValidDate(date: string): boolean {
    const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/; // YYYY-MM-DD format
    return dateRegex.test(date);
  }

  static isValidTime(time: string): boolean {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // HH:mm format
    return timeRegex.test(time);
  }

  static isValidDateTime(dateTime: string): boolean {
    const dateTimeRegex =
      /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/; // YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss format
    return dateTimeRegex.test(dateTime);
  }

  static safeValue(value: any, defaultValue: any = null): any {
    return this.isEmpty(value) ? defaultValue : value;
  }

  static formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
    const options: Intl.DateTimeFormatOptions = {};
    if (format.includes("YYYY")) options.year = "numeric";
    if (format.includes("MM")) options.month = "2-digit";
    if (format.includes("DD")) options.day = "2-digit";
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  static formatTime(date: Date, format: string = "HH:mm"): string {
    const options: Intl.DateTimeFormatOptions = {};
    if (format.includes("HH")) options.hour = "2-digit";
    if (format.includes("mm")) options.minute = "2-digit";
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  static formatCurrency(
    value: number,
    currency: string = "USD",
    locale: string = "en-US"
  ): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  }

  static isValidPassword(password: string): boolean {
    // At least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^#\-_=+])[A-Za-z\d@$!%*?&#^#\-_=+]{8,}$/;
    return passwordRegex.test(password);
  }

  static removeWhitespace(value: string): string {
    return value.trimStart();
  }

  static capitalize(value: string) {
    const chars = value.split("");
    const first = chars[0].toUpperCase();
    const final = first.concat(chars.slice(1).join(""));
    return final;
  }

  static isAllValid(values: string[]): boolean {
    if (Array.isArray(values) && values.length !== 0)
      return values.every((item) => item !== "");
    else {
      return false;
    }
  }

  static formatCounts(count: number): string {
    if (count < 1000) return count.toString();

    const units = ["K", "M", "B", "T"];
    let unitIndex = -1;

    while (count >= 1000 && unitIndex < units.length - 1) {
      count /= 1000;
      unitIndex++;
    }

    const isInteger = Number.isInteger(count);
    return `${isInteger ? count.toFixed(0) : count.toFixed(1)}${
      units[unitIndex]
    }`;
  }

  static generateDeepColor(): string {
    // Use HSLA: Keep saturation high and lightness low for deep colors
    const hue = Math.floor(Math.random() * 360); // 0 - 359
    const saturation = Math.floor(60 + Math.random() * 30); // 60% - 90%
    const lightness = Math.floor(20 + Math.random() * 20); // 20% - 40%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
