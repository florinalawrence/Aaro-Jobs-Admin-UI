export type DashboardRecordStatus = "Active" | "Complete" | "Pending";

export interface DashboardRecord {
  name: string;
  details: string;
  status: DashboardRecordStatus;
  updated: string;
}
