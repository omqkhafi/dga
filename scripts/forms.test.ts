// Logic inside the form components: digit normalisation (Number Input) and file validation
// (File Upload). Both are exported from the registry source, so the tests cover what is installed.
import { describe, expect, test } from "bun:test";
import { acceptsFile, formatBytes, validateFiles } from "../registry/bases/base/ui/file-upload";
import { normalizeDigits } from "../registry/bases/base/ui/number-input";

const file = (name: string, size: number, type = "") => ({ name, size, type }) as File;

describe("normalizeDigits", () => {
  test("Arabic-Indic digits become Western digits", () => {
    expect(normalizeDigits("٠١٢٣٤٥٦٧٨٩")).toBe("0123456789");
  });

  test("Persian digits become Western digits", () => {
    expect(normalizeDigits("۰۱۲۳۴۵۶۷۸۹")).toBe("0123456789");
  });

  test("the Arabic decimal and thousands separators become . and ,", () => {
    expect(normalizeDigits("١٬٢٣٤٫٥")).toBe("1,234.5");
    expect(normalizeDigits("١،٢٣٤")).toBe("1,234");
  });

  test("Western digits, signs and other text are left alone", () => {
    expect(normalizeDigits("-12.5")).toBe("-12.5");
    expect(normalizeDigits("abc")).toBe("abc");
    expect(normalizeDigits("")).toBe("");
  });

  test("mixed input is normalised digit by digit", () => {
    expect(normalizeDigits("12٣4")).toBe("1234");
  });
});

describe("acceptsFile", () => {
  test("no accept list accepts everything", () => {
    expect(acceptsFile(file("a.exe", 1))).toBe(true);
    expect(acceptsFile(file("a.exe", 1), "")).toBe(true);
  });

  test("extensions are matched case-insensitively", () => {
    expect(acceptsFile(file("Report.PDF", 1), ".pdf,.png")).toBe(true);
    expect(acceptsFile(file("report.docx", 1), ".pdf,.png")).toBe(false);
  });

  test("MIME types and wildcards", () => {
    expect(acceptsFile(file("a", 1, "application/pdf"), "application/pdf")).toBe(true);
    expect(acceptsFile(file("a", 1, "image/jpeg"), "image/*")).toBe(true);
    expect(acceptsFile(file("a", 1, "video/mp4"), "image/*")).toBe(false);
  });

  test("Arabic file names", () => {
    expect(acceptsFile(file("عقد الإيجار.pdf", 1), ".pdf")).toBe(true);
  });
});

describe("validateFiles", () => {
  const options = { accept: ".pdf,.png", maxSize: 1000, maxFiles: 2 };

  test("accepts files that pass every rule", () => {
    const a = file("a.pdf", 10);
    expect(validateFiles([a], options)).toEqual({ accepted: [a], rejected: [] });
  });

  test("rejects the wrong type first", () => {
    const exe = file("a.exe", 10);
    expect(validateFiles([exe], options).rejected).toEqual([{ file: exe, reason: "type" }]);
  });

  test("rejects files over the size limit, exactly at the limit passes", () => {
    const big = file("big.pdf", 1001);
    const edge = file("edge.pdf", 1000);
    const result = validateFiles([big, edge], options);
    expect(result.rejected).toEqual([{ file: big, reason: "size" }]);
    expect(result.accepted).toEqual([edge]);
  });

  test("rejects files beyond the count, counting the ones already in the list", () => {
    const [a, b, c] = [file("a.pdf", 1), file("b.pdf", 1), file("c.pdf", 1)] as [File, File, File];
    const result = validateFiles([a, b, c], options);
    expect(result.accepted).toEqual([a, b]);
    expect(result.rejected).toEqual([{ file: c, reason: "count" }]);
    expect(validateFiles([a], { ...options, currentCount: 2 }).rejected[0]?.reason).toBe("count");
  });

  test("a rejected file does not use up the count", () => {
    const exe = file("a.exe", 1);
    const [a, b] = [file("a.pdf", 1), file("b.pdf", 1)] as [File, File];
    expect(validateFiles([exe, a, b], options).accepted).toEqual([a, b]);
  });

  test("no limits accept everything", () => {
    const files = [file("a.exe", 1e9), file("b.zip", 1e9)];
    expect(validateFiles(files).accepted).toEqual(files);
  });
});

describe("formatBytes", () => {
  test("uses Western digits and one decimal under 10", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1023)).toBe("1023 B");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(12 * 1024)).toBe("12 KB");
    expect(formatBytes(2_400_000)).toBe("2.3 MB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5 MB");
  });
});
