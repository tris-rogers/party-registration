
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PartyFields from "./party-fields";
import type { PartyFormFields } from "../../types/party";

const emptyValues: PartyFormFields = {
  email: "",
  postcode: "",
  fullName: "",
  dateOfBirth: "",
  registeredName: "",
  companyRegistrationNumber: "",
};

const baseProps = {
  setPartyFields: vi.fn(),
  createPartyProps: {
    submit: vi.fn(async () => ({ id: "party_123" })),
    isLoading: false,
    error: null,
    clearError: vi.fn(),
  },
};

describe("PartyFields", () => {
  it("shows natural person fields and hides legal entity fields", () => {
    render(
      <PartyFields
        {...baseProps}
        partyType="Natural Person"
        partyFields={emptyValues}
      />,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument();

    expect(
      screen.queryByLabelText(/registered name/i),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText(/company registration number/i),
    ).not.toBeInTheDocument();
  });

  it("shows legal entity fields and hides natural person fields", () => {
    render(
      <PartyFields
        {...baseProps}
        partyType="Legal Entity"
        partyFields={emptyValues}
      />,
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/registered name/i)).toBeInTheDocument();

    expect(
      screen.getByLabelText(/company registration number/i),
    ).toBeInTheDocument();

    expect(
      screen.queryByLabelText(/full name/i),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText(/date of birth/i),
    ).not.toBeInTheDocument();
  });

  it("disables submission when required fields are empty", () => {
    render(
      <PartyFields
        {...baseProps}
        partyType="Natural Person"
        partyFields={emptyValues}
      />,
    );

    expect(
      screen.getByRole("button", { name: /submit/i }),
    ).toBeDisabled();
  });

  it("disables submission while loading", () => {
    const validValues: PartyFormFields = {
      ...emptyValues,
      email: "test@example.com",
      postcode: "SW1A 1AA",
      fullName: "John Smith",
      dateOfBirth: "1990-01-01",
    };

    render(
      <PartyFields
        {...baseProps}
        createPartyProps={{
          ...baseProps.createPartyProps,
          isLoading: true,
        }}
        partyType="Natural Person"
        partyFields={validValues}
      />,
    );

    expect(
      screen.getByRole("button", { name: /submit/i }),
    ).toBeDisabled();
  });
});
