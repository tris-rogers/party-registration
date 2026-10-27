
import { describe, it, expect } from "vitest";
import {
  normalizePartyFieldValue,
  isFieldValueValid,
  getFieldErrorMessage,
  buildPartyPayload,
} from "./party-form.utils";
import type {
  ApiError,
  PartyFieldInfo,
  PartyFormFields,
} from "../types/party";

describe("normalizePartyFieldValue", () => {
  it("removes a space from an email", () => {
    expect(normalizePartyFieldValue("test @example.com", "email")).toBe(
      "test@example.com",
    );
  });

  it("removes spaces and uppercases a postcode", () => {
    expect(normalizePartyFieldValue("sw1a 1aa", "postcode")).toBe("SW1A1AA");
  });

  it("leaves other field values unchanged", () => {
    expect(normalizePartyFieldValue("John Smith", "fullName")).toBe(
      "John Smith",
    );
  });
});

describe("isFieldValueValid", () => {
  it("rejects empty values", () => {
    expect(isFieldValueValid("", "email")).toBe(false);
  });

  it("accepts a valid email", () => {
    expect(isFieldValueValid("test@example.com", "email")).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(isFieldValueValid("not-an-email", "email")).toBe(false);
  });

  it("accepts a valid UK postcode", () => {
    expect(isFieldValueValid("SW1A 1AA", "postcode")).toBe(true);
  });

  it("rejects an invalid UK postcode", () => {
    expect(isFieldValueValid("not a postcode", "postcode")).toBe(false);
  });

  it("rejects a blank value containing only spaces", () => {
    expect(isFieldValueValid("   ", "fullName")).toBe(false);
  });

  it("accepts a non-empty full name", () => {
    expect(isFieldValueValid("John Smith", "fullName")).toBe(true);
  });
});

describe("getFieldErrorMessage", () => {
  const apiError: ApiError = {
    errors: [
      { field: "email", message: "Invalid email" },
      { field: "postcode", message: "Invalid postcode" },
    ],
  };

  it("returns the error message for the requested field", () => {
    expect(getFieldErrorMessage(apiError, "email", "Email address")).toBe(
      "Invalid Email address",
    );
  });

  it("returns an empty string when the field has no error", () => {
    expect(getFieldErrorMessage(apiError, "fullName", "Full name")).toBe("");
  });
});

describe("buildPartyPayload", () => {
  const partyFields: PartyFormFields = {
    email: "test@example.com",
    postcode: "sw1a 1aa",
    fullName: "John Smith",
    dateOfBirth: "1990-01-01",
    registeredName: "Example Ltd",
    companyRegistrationNumber: "12345678",
  };

  it("builds a Natural Person payload with normalized values", () => {
    const relevantFields: PartyFieldInfo[] = [
      { id: "email", type: "email" },
      { id: "postcode", type: "postcode" },
      { id: "fullName", type: "fullName" },
      { id: "dateOfBirth", type: "dateOfBirth" },
    ] as PartyFieldInfo[];

    expect(
      buildPartyPayload("Natural Person", relevantFields, partyFields),
    ).toEqual({
      type: "Natural Person",
      email: "test@example.com",
      postcode: "SW1A1AA",
      fullName: "John Smith",
      dateOfBirth: "1990-01-01",
    });
  });

  it("builds a Legal Entity payload with only relevant fields", () => {
    const relevantFields: PartyFieldInfo[] = [
      { id: "email", type: "email" },
      { id: "postcode", type: "postcode" },
      { id: "registeredName", type: "registeredName" },
      {
        id: "companyRegistrationNumber",
        type: "companyRegistrationNumber",
      },
    ] as PartyFieldInfo[];

    expect(
      buildPartyPayload("Legal Entity", relevantFields, partyFields),
    ).toEqual({
      type: "Legal Entity",
      email: "test@example.com",
      postcode: "SW1A1AA",
      registeredName: "Example Ltd",
      companyRegistrationNumber: "12345678",
    });
  });
});
