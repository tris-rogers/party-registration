
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitParty } from "../services/party-service";
import { useCreateParty } from "./use-create-party";
import type { PartyCreate, PartyCreated } from "../../../generated";

vi.mock("../services/party-service", () => ({
  submitParty: vi.fn(),
}));

const validPayload: PartyCreate = {
  type: "Natural Person",
  email: "test@example.com",
  postcode: "SW1A1AA",
  fullName: "John Smith",
  dateOfBirth: "1990-01-01",
};

const createdParty: PartyCreated = {
  id: "party_123",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useCreateParty", () => {
  it("stores the ID after successful submission", async () => {
    vi.mocked(submitParty).mockResolvedValue(createdParty);

    const { result } = renderHook(() => useCreateParty());

    let response: PartyCreated | undefined;

    await act(async () => {
      response = await result.current.submit(validPayload);
    });

    expect(submitParty).toHaveBeenCalledWith(validPayload);
    expect(response).toEqual(createdParty);
    expect(result.current.successID).toBe("party_123");
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("stores an API error and rethrows it", async () => {
    const apiError = {
      errors: [
        {
          field: "email",
          message: "Email is already taken",
        },
      ],
    };

    vi.mocked(submitParty).mockRejectedValue(apiError);

    const { result } = renderHook(() => useCreateParty());

    await act(async () => {
      await expect(result.current.submit(validPayload)).rejects.toEqual(
        apiError,
      );
    });

    expect(result.current.error).toEqual(apiError);
    expect(result.current.successID).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("sets loading while submission is in progress", async () => {
    let resolveSubmission!: (value: PartyCreated) => void;

    vi.mocked(submitParty).mockReturnValue(
      new Promise<PartyCreated>((resolve) => {
        resolveSubmission = resolve;
      }),
    );

    const { result } = renderHook(() => useCreateParty());

    let submission!: Promise<PartyCreated>;

    act(() => {
      submission = result.current.submit(validPayload);
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveSubmission(createdParty);
      await submission;
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("clears errors for a specific field", async () => {
    const apiError = {
      errors: [
        { field: "email", message: "Email is invalid" },
        { field: "postcode", message: "Postcode is invalid" },
      ],
    };

    vi.mocked(submitParty).mockRejectedValue(apiError);

    const { result } = renderHook(() => useCreateParty());

    await act(async () => {
      await expect(result.current.submit(validPayload)).rejects.toEqual(
        apiError,
      );
    });

    act(() => {
      result.current.clearError("email");
    });

    expect(result.current.error).toEqual({
      errors: [{ field: "postcode", message: "Postcode is invalid" }],
    });

    act(() => {
      result.current.clearError("postcode");
    });

    expect(result.current.error).toBeNull();
  });
});
