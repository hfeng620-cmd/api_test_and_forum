export type SubmissionStatus = "pending" | "approved" | "rejected";

export type StationSubmission = {
  id: string;
  kind: "新站点" | "纠错" | "补充备注";
  stationName: string;
  url: string;
  priceOrRate: string;
  note: string;
  contact: string;
  status: SubmissionStatus;
  adminNote: string;
  submittedAt: string;
  reviewedAt?: string;
};

const STORAGE_KEY = "timin-station-submissions";

export function loadStationSubmissions(): StationSubmission[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved) as StationSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStationSubmissions(submissions: StationSubmission[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function createSubmission(
  input: Omit<StationSubmission, "id" | "status" | "adminNote" | "submittedAt">,
) {
  const next: StationSubmission = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    status: "pending",
    adminNote: "",
    submittedAt: new Date().toISOString(),
  };

  const current = loadStationSubmissions();
  saveStationSubmissions([next, ...current]);
}

export function updateSubmissionReview(
  id: string,
  updates: Pick<StationSubmission, "status" | "adminNote">,
) {
  const current = loadStationSubmissions();
  const next = current.map((item) =>
    item.id === id
      ? {
          ...item,
          status: updates.status,
          adminNote: updates.adminNote,
          reviewedAt: new Date().toISOString(),
        }
      : item,
  );

  saveStationSubmissions(next);
  return next;
}
